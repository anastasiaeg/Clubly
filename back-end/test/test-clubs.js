var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();

chai.use(chaiHttp);

describe("Clubs", function () {
  var clubId;
  it("should list ALL clubs on /clubs GET", function (done) {
    chai.request(server)
      .get("/clubs")
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        //  res.body.should.be.a("array");
        done();
      });
  });
  it("should add a SINGLE club on /clubs POST", function (done) {
    chai.request(server)
      .post("/clubs")
      .send({
        "name": "WiCS",
        "description": "women in computer science"
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("name");
        res.body.data.should.have.property("description");
        res.body.data.name.should.equal("WiCS");
        res.body.data.description.should.equal("women in computer science");
        clubId = res.body.data.oid;

        done();
      });
  });
  it("should list ALL clubs on /clubs<id> GET", function (done) {
    chai.request(server)
      .get("/clubs/" + clubId)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("name");
        res.body.data.should.have.property("description");
        res.body.data.name.should.equal("WiCS");
        res.body.data.description.should.equal("women in computer science");
        done();
      });
  });
  it("should update a SINGLE club on /clubs/<id> PUT", function (done) {
    chai.request(server)
      .put("/clubs/" + clubId)
      .send({
        "name": "WiCS 2.0",
        "description": "women in computer science acm"
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("name");
        res.body.data.should.have.property("description");
        res.body.data.name.should.equal("WiCS 2.0");
        res.body.data.description.should.equal("women in computer science acm");
        done();
      });
  });
  it("should delete a SINGLE club on /clubs/<id> DELETE", function (done) {
    chai.request(server)
      .delete("/clubs/" + clubId)
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("data");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("name");
        res.body.data.should.have.property("description");
        res.body.data.name.should.equal("WiCS 2.0");
        res.body.data.description.should.equal("women in computer science acm");
        done();
      });
  });
});