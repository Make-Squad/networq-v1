const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const app = require('../../server');

// Configure chai to use http assertion
chai.use(chaiHttp);

// Start our tests
describe('API', () => {
  // GET INDEX
  it('should respond with welcome message at /api/v1 GET', async () => {
    const res = await chai.request(app).get('/api/v1');
    res.should.be.json;
    res.should.have.status(200);
  });

  // TEST PAGE NOT FOUND
  it('should respond with error not found at /api/v1/invalidpath GET', async () => {
    const res = await chai.request(app).get('/api/v1/invalidpath');
    res.should.be.json;
    res.should.have.status(404);
  });
});