const request = require('supertest');
const server = require('../app');
const SubmissionType = require('../models/submissionTypes');
const { admin, adminId, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create submission type', async () => {

    const response = await request(server)
        .post('/api/submissions')
        .set('Authorization', `Bearer ${admin.tokens[0].token}`)
        .send({
            name: "project proposal presentation",
            type: "proposal"
        })
        .expect(201);

    const submissionType = await SubmissionType.findById(response.body.body.submission._id);
    expect(submissionType).not.toBeNull();
});

test('Should fetch all submissions', async () => {
    const response = await request(server)
        .get('/api/submissions')
        .set('Authorization', `Bearer ${admin.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.body.submissions.length).toEqual(1);
});

test('Should not create submission for unauthenticated admin', async () => {
    await request(server)
        .post('/api/submissions')
        .send({
            name: "project proposal presentation",
            type: "proposal"
        })
        .expect(401);
});