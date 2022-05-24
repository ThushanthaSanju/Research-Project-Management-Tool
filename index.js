const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const generateMessage = require('./utils/messages');
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');

require('dotenv').config();
require('./db/mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log('New web socket connection');

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options });

        if (error) {
            return callback(error);
        }

        const { email, group } = user;

        socket.join(group);

        socket.emit('message', generateMessage('Welcome', 'Admin'));
        socket.broadcast.to(group).emit('message', generateMessage(`${email} has joined!`, 'Admin'));
        io.to(group).emit('groupData', {
            group,
            users: getUsersInRoom(group)
        });
        callback();
    });

    socket.on("sendMessage", (msg, callback) => {
        const { email, group } = getUser(socket.id);

        io.to(group).emit('message', generateMessage(msg, email));
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.group).emit('message', generateMessage(`${user.email} has left!`, 'Admin'));
            io.to(user.group).emit('groupData', {
                group: user.group,
                users: getUsersInRoom(user.group)
            });
        }
    });
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const studentRoute = require('./routes/student');
const groupRoute = require('./routes/group');
const researchTopicRoute = require('./routes/researchTopic');
const requestRoute = require('./routes/request');

app.use('/images', express.static('public'));
app.use(userRoute);
app.use(adminRoute);
app.use(studentRoute);
app.use(groupRoute);
app.use(researchTopicRoute);
app.use(requestRoute);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
