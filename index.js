const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./db/mongoose');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const userRoute = require('./routes/user');
const adminRoute = require('./routes/admin');
const studentRoute = require('./routes/student');

app.use('/images', express.static('public'));
app.use(userRoute);
app.use(adminRoute);
app.use(studentRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});