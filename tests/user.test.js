const request = require('supertest');
const server = require('../app');
const User = require('../models/user');
const { studentOneId, studentOne, admin, adminId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup a new student', async () => {
    const response = await request(server).post('/api/users').send({
        firstName: 'Janaka',
        lastName: 'Perera',
        email: 'it20000000@my.sliit.lk',
        password: 'asg87sak3423$'
    }).expect(201);

    const user = await User.findById(response.body.body.user._id);
    expect(user).not.toBeNull();

    expect(response.body.body).toMatchObject({
        user: {
            firstName: 'janaka',
            lastName: 'perera',
            email: 'it20000000@my.sliit.lk',
            "role": "student"
        },
        token: user.tokens[0].token
    });
    expect(user.password).not.toBe('asg87sak3423');
});

test('Should login existing student', async () => {
    const response = await request(server).post('/api/users/login').send({
        email: studentOne.email,
        password: studentOne.password
    }).expect(200);
    const user = await User.findById(studentOneId);
    expect(response.body.body.token).toBe(user.tokens[1].token);
});

test('Should not login non existent student', async () => {
    await request(server).post('/api/users/login').send({
        email: studentOne.email,
        password: 'dasdaddsaf'
    }).expect(500);
});