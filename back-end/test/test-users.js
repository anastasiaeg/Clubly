var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();

chai.use(chaiHttp);

describe("Users", function () {
    var userId;
    it("should list ALL users on /users GET", function (done) {
      chai.request(server)
        .get("/users")
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          //  res.body.should.be.a("array");
          done();
        });
    });
    it("should add a SINGLE user on /users POST", function (done) {
      chai.request(server)
        .post("/users")
        .send({
          "firstName": "chris",
          "lastName": "hemsworth",
          "email": "testemail@ncsu.edu",
          "password": "123456"
        })
        .end(function (err, res) {
  
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.firstName.should.equal("chris");
          res.body.data.lastName.should.equal("hemsworth");
          userId = res.body.data.oid;
          done();
        });
    });
    it("should list ALL users on /users<id> GET", function (done) {
      chai.request(server)
        .get("/users/" + userId)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.firstName.should.equal("chris");
          res.body.data.lastName.should.equal("hemsworth");
          done();
        });
    });
    it("should update a SINGLE user on /users/<id> PUT", function (done) {
      chai.request(server)
        .put("/users/" + userId)
        .send({
          "firstName": "chris",
          "lastName": "evans",
          "email": "testemail@ncsu.edu",
          "password": "123456"
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.firstName.should.equal("chris");
          res.body.data.lastName.should.equal("evans");
          done();
        });
    });
    it("should delete a SINGLE user on /users/<id> DELETE", function (done) {
      chai.request(server)
        .delete("/users/" + userId)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.oid.should.equal(userId);
          done();
        });
    });
  });