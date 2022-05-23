const users = [];

const addUser = ({ id, email, group }) => {
    email = email.trim().toLowerCase();
    group = group.trim().toLowerCase();

    if (!email || !group) {
        return {
            error: 'email and group are required!'
        };
    }

    const existingUser = users.find((user) => user.email === email && user.group === group);

    if (existingUser) {
        return {
            error: 'email is in use!'
        };
    }

    const user = { id, email, group };
    users.push(user);
    return { user };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => {
    return users.find((user) => user.id === id);
};

const getUsersInRoom = (group) => {
    return users.filter((user) => user.group === group);
};

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
};