var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();

chai.use(chaiHttp);

describe("Events", function () {
    var eventId;
    const clubId = 10;
    it("should add a SINGLE event on /events POST", function (done) {
      chai.request(server)
        .post("/events")
        .send({
          "name": "WiCS Meeting",
          "description": "free food",
          "club": clubId
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.name.should.equal("WiCS Meeting");
          res.body.data.description.should.equal("free food");
          eventId = res.body.data.oid;
          done();
        });
    });
    it("should list ALL events on /events<id> GET", function (done) {
      chai.request(server)
        .get("/events/" + eventId)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.name.should.equal("WiCS Meeting");
          res.body.data.description.should.equal("free food");
          done();
        });
    });
    it("should update a SINGLE event on /events/<id> PUT", function (done) {
      chai.request(server)
        .put("/events/" + eventId)
        .send({
          "name": "WiCS Lean in circle",
          "description": "free food"
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.name.should.equal("WiCS Lean in circle");
          res.body.data.description.should.equal("free food");
          done();
        });
    });
    it("should delete a SINGLE event on /events/<id> DELETE", function (done) {
      chai.request(server)
        .delete("/events/" + eventId)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.oid.should.equal(eventId);
          done();
        });
    });
    it("should get all events for a club on /clubs/byclub/<club>", function (done) {
      chai.request(server)
        .get("/events/byclub/" + clubId)
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
          res.body.data.should.have.property("past");
          res.body.data.should.have.property("upcoming");
          res.body.data.past[0].name.should.equal("Welcome Back Bash");
          done();
        });
    })
  });