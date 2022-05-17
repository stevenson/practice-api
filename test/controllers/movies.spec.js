require('chai').should();

const controller = require('controllers/movies');

describe('Movies Controller', () => {
    describe('Retrieve All', () => {
        it('should return success upon retrieving an existing test', async () => {
            const response = await controller.retrieveMany({ test: {}, query: { query: '' } });
            response.should.be.an('object');
            response.data.should.be.an('array');
        });
    });
});
