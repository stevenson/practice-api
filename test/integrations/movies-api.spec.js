require('chai').should();
const request = require('supertest');
const sinon = require('sinon');

const server = require('server');
const movieRepo = require('repositories/movies');

describe('Movies API Validation ', () => {
    describe('GET /movies', () => {
        it('should return 200', async () => {
            const dataStub = {
                name: 'Moonlight',
                rating: 98,
                genres: [
                    'Drama',
                ],
                showings: [
                    '18:30:00+11:00',
                    '20:30:00+11:00',
                ],
            };
            sinon.stub(movieRepo, 'retrieveMany').resolves([dataStub]);
            const res = await request(server)
                .get('/movies')
                .expect(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.an('array');
            res.body.data.should.deep.contain(dataStub);
        });
    });
    afterEach(() => sinon.restore());
});
