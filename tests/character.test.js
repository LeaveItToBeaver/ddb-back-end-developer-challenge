const request = require('supertest');
const app = require('../app');

const CharacterRepository = require('../src/repositories/CharacterRepository.js');
const path = require('path');
const charactersFolder = path.join(__dirname, '../', 'src', 'data', 'charactersJSON');

let characterRepo = new CharacterRepository(charactersFolder);

describe('Character API', () => {
    let server;
    let port;

    beforeAll(async () => {
        characterRepo = new CharacterRepository(charactersFolder);
        await characterRepo.loadCharacters();

        server = await app.listen(0);
        port = server.address().port;
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should retrieve a character by ID', async () => {
        const characters = characterRepo.getAllCharacters();
        expect(characters).not.toBeNull();
        expect(characters.length).toBeGreaterThan(0);

        const character = characters[0];
        const characterId = character.id;


        const retrievedCharacter = characterRepo.getCharacterById(characterId);
        expect(retrievedCharacter).toEqual(character);
    });

    it('should deal damage to a character', async () => {
        const damageTypes = [
            'Bludgeoning',
            'Piercing',
            'Slashing',
            'Fire',
            'Cold',
            'Acid',
            'Thunder',
            'Lightning',
            'Poison',
            'Radiant',
            'Necrotic',
            'Psychic',
            'Force'
        ];
        const characters = characterRepo.getAllCharacters();
        expect(characters).not.toBeNull();
        expect(characters.length).toBeGreaterThan(0);

        const character = characters[0];
        const characterId = character.id;

        for (const damageType of damageTypes) {
            const res = await request(`http://localhost:${port}`)
                .post(`/characters/${character.id}/damage`)
                .send({
                    damageType: 'Piercing',
                    damageAmount: 10
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('message', 'Damage dealt successfully');
        }
    });

    it('should heal a character', async () => {

        const characters = characterRepo.getAllCharacters();
        expect(characters).not.toBeNull();
        expect(characters.length).toBeGreaterThan(0);

        const character = characters[0];
        const characterId = character.id;

        const res = await request(`http://localhost:${port}`)
            .post(`/characters/${characterId}/heal`)
            .send({
                healAmount: 20
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Character healed successfully');
    });

    it('should add temporary Hit Points to a character', async () => {

        const characters = characterRepo.getAllCharacters();
        expect(characters).not.toBeNull();
        expect(characters.length).toBeGreaterThan(0);

        const character = characters[0];
        const characterId = character.id;

        const res = await request(`http://localhost:${port}`)
            .post(`/characters/${characterId}/temp-hp`)
            .send({
                tempHpAmount: 15
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Temporary Hit Points added successfully');
    });

    // Test healing beyond max HP
    it('should not heal beyond max HP', async () => {
        const characters = characterRepo.getAllCharacters();
        expect(characters).not.toBeNull();
        expect(characters.length).toBeGreaterThan(0);

        const character = characters[0];
        const characterId = character.id;

        const res = await request(`http://localhost:${port}`)
            .post(`/characters/${characterId}/heal`)
            .send({
                healAmount: 1000 // Excessive healing to test cap
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Character healed successfully');

        const expectedMaxHp = Number(character.maxHp);
        expect(res.body.character.hitPoints).toBeLessThanOrEqual(expectedMaxHp);
    });

    // Test invalid damage amount
    it('should return an error for negative damage amount', async () => {
        const characters = characterRepo.getAllCharacters();
        expect(characters).not.toBeNull();
        expect(characters.length).toBeGreaterThan(0);

        const character = characters[0];
        const characterId = character.id;

        const res = await request(`http://localhost:${port}`)
            .post(`/characters/${characterId}/damage`)
            .send({
                damageType: 'Piercing',
                damageAmount: -10 // Invalid damage amount
            });

        expect(res.statusCode).toEqual(400); // Bad Request
        expect(res.body).toHaveProperty('error');
    });
});