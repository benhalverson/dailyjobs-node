var app = require('express');
var expect = require('expect.js');


describe('Our API', function(){
  describe('POST empty data to /jobs', function(){
    it("returns a 400", function(done) {
      request.post("/jobs").end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('POST valid data to /jobs', function(){
    it("returns the saved job in json", function(done) {
      request.post("/jobs")
        .send({body: 'one test job', email: 'test@test.com'})
        .end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(200);
        expect(res.body.email).to.equal('test@test.com');
        expect(res.body.slug).to.equal('one-test-job');
        done();
      });
    });
  });
  describe('POST duplicate data to /jobs', function(){
    it("returns a 400", function(done) {
      request.post("/jobs")
        .send({body: 'one test question', email: 'test@test.com'})
        .end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('GET /jobs', function(){
    it("returns an array of all the jobs", function(done) {
      request.get("/jobs").end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0].body).to.equal("one test job");
        done();
      });
    });
  });
    describe('GET /jobs/:jobListing', function(){
    it("returns the question which have that code", function(done) {
      request.get("/jobs/one-test-question").end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(200);
        expect(res.body.body).to.equal("one test question");
        done();
      });
    });
  });
  describe('GET /jobs/:jobListing', function(){
    it("returns 404 if the code does not exist", function(done) {
      request.get("/jobs/dsajflkasdjfjadsjflkjaslkdf").end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('PATCH /jobs/:jobListing', function(){
    it("returns 404 if the code does not exist", function(done) {
      request.patch("/jobs/dsajflkasdjfjadsjflkjaslkdf").end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('PATCH /jobs/:jobListing', function(){
    it("update the question with new data", function(done) {
      request.patch("/jobs/one-test-question")
      .send({body: 'it is new now', email: 'hacker@test.com'})
      .end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(200);
        expect(res.body.body).to.equal("it is new now");
        expect(res.body.email).to.equal("hacker@test.com");
        done();
      });
    });
  });
  describe('DELETE /jobs/:jobListing', function(){
    it("returns 404 if the code does not exist", function(done) {
      request.del("/jobs/dsajflkasdjfjadsjflkjaslkdf").end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('DELETE /jobs/:jobListing', function(){
    it("update the question with new data", function(done) {
      request.del("/jobs/one-test-question")
      .end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(200);
        done();
      });
    });
  });
});
