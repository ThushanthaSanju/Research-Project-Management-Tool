const request = require('supertest');
const server = require('../app');
const MarkingSchema = require('../models/markingSchema');
const { admin, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should upload a marking schema', async () => {

    const response = await request(server)
        .post('/api/marking-schemas')
        .set('Authorization', `Bearer ${admin.tokens[0].token}`)
        .attach('file', 'tests/fixtures/markingSchemaExample.pdf')
        .field({
            name: 'PP1 Presentation'
        })
        .expect(201);

    const markingSchema = await MarkingSchema.findById(response.body.body.markingSchema._id);
    expect(markingSchema).not.toBeNull();
});

test('Should fetch all marking schemas', async () => {
    const response = await request(server)
        .get('/api/marking-schemas')
        .set('Authorization', `Bearer ${admin.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.body.schemas.length).toEqual(1);
});

test('Should not create marking schema for unauthenticated admin', async () => {
    await request(server)
        .post('/api/marking-schemas')
        .send({
            name: "project assessment",
            type: "initial"
        })
        .expect(401);
});