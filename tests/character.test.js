const request = require('supertest');
const app = require('../app');

describe('Character API', () => {
    let server;
    let port;

    beforeAll((done) => {
        server = app.listen(0, () => {
            port = server.address().port;
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should deal damage to a character', async () => {
        const res = await request(`http://localhost:${port}`)
            .post('/characters/briv/damage')
            .send({
                damageType: 'Piercing',
                damageAmount: 10
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Damage dealt successfully');
    });

    it('should heal a character', async () => {
        const res = await request(`http://localhost:${port}`)
            .post('/characters/briv/heal')
            .send({
                healAmount: 20
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Character healed successfully');
    });

    it('should add temporary Hit Points to a character', async () => {
        const res = await request(`http://localhost:${port}`)
            .post('/characters/briv/temp-hp')
            .send({
                tempHpAmount: 15
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Temporary Hit Points added successfully');
    });
});