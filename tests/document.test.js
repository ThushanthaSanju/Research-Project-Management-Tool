const request = require('supertest');
const server = require('../app');
const { admin, submissionTypeOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should upload a document', async () => {
    await request(server)
        .post('/api/documents')
        .set('Authorization', `Bearer ${admin.tokens[0].token}`)
        .attach('file', 'tests/fixtures/documentExample.pdf')
        .field({
            submission_type: submissionTypeOne._id.toString()
        })
        .expect(201);
});

test('Should fetch all documents', async () => {
    await request(server)
        .get('/api/documents')
        .set('Authorization', `Bearer ${admin.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not upload for unauthenticated admin', async () => {
    await request(server)
        .post('/api/documents')
        .attach('file', 'tests/fixtures/documentExample.pdf')
        .field({
            submission_type: submissionTypeOne._id.toString()
        })
        .expect(401);
});