const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const SubmissionType = require('../../models/submissionTypes');
const MarkingSchema = require('../../models/markingSchema');

const studentOneId = new mongoose.Types.ObjectId();
const studentOne = {
    _id: studentOneId,
    firstName: 'Amith',
    lastName: 'Weerasingha',
    email: 'it20000001@my.sliit.lk',
    password: 'g76Hdsa$2fd',
    tokens: [{
        token: jwt.sign({ _id: studentOneId }, process.env.JWT_SECRET)
    }]
};

const studentTwoId = new mongoose.Types.ObjectId();
const studentTwo = {
    _id: studentTwoId,
    firstName: 'Lahiru',
    lastName: 'Thilakarathne',
    email: 'it20000002@my.sliit.lk',
    password: 'da7%sara31d$2fd',
    tokens: [{
        token: jwt.sign({ _id: studentTwoId }, process.env.JWT_SECRET)
    }]
};

const adminId = new mongoose.Types.ObjectId();
const admin = {
    _id: adminId,
    firstName: 'Krishan',
    lastName: 'Senavirathna',
    email: 'admin@sliit.lk',
    password: 'gaj6$3sd@34g',
    role: 'admin',
    tokens: [{
        token: jwt.sign({ _id: adminId }, process.env.JWT_SECRET)
    }]
};


// submission types
const submissionTypeOne = {
    _id: new mongoose.Types.ObjectId(),
    name: "project charter",
    type: "initial"
};

const markingSchemaOne = {
    name: 'PP2 Presentation',
    fileName: '1653850157099_markingSchemaExample.pdf'
};

const setupDatabase = async () => {
    await User.deleteMany();
    await SubmissionType.deleteMany();
    await MarkingSchema.deleteMany();
    await new User(studentOne).save();
    await new User(studentTwo).save();
    await new User(admin).save();
    await new SubmissionType(submissionTypeOne).save();
    await new MarkingSchema(markingSchemaOne).save();
};

module.exports = {
    studentOneId,
    studentOne,
    studentTwoId,
    studentTwo,
    adminId,
    admin,
    submissionTypeOne,
    setupDatabase
};