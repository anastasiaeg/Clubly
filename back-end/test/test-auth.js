var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();

chai.use(chaiHttp);

describe("Auth", function () {
    var authId;
    it("should signup a SINGLE user on /signup POST", function (done) {
      chai.request(server)
        .post("/auth/signup")
        .send({
          "email": "testemail@ncsu.edu",
          "password": "123456"
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("user");
          res.body.data.user.should.be.a("object");
          res.body.data.user.should.have.property("email");
          res.body.data.user.should.have.property("password");
          res.body.data.user.email.should.equal("testemail@ncsu.edu");
          authId = res.body.data.user.oid;
          done();
        });
    });
    it("should not signup a SINGLE user with existing email on /signup POST", function (done) {
      chai.request(server)
        .post("/auth/signup")
        .send({
          "email": "testemail@ncsu.edu",
          "password": "123456"
        })
        .end(function (err, res) {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.be.a("object");
          res.body.error.should.have.property("code");
          res.body.error.should.have.property("message");
          res.body.error.code.should.equal(401);
          res.body.error.message.should.equal("This user already exists");
          done();
        });
    });
    it("should not signup a SINGLE user with invalid email on /signup POST", function (done) {
      chai.request(server)
        .post("/auth/signup")
        .send({
          "email": "testemail",
          "password": "123456"
        })
        .end(function (err, res) {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.be.a("object");
          res.body.error.should.have.property("code");
          res.body.error.should.have.property("message");
          res.body.error.code.should.equal(401);
          res.body.error.message.should.equal("Invalid email");
          done();
        });
    });
    it("should not signup a SINGLE user with invalid password on /signup POST", function (done) {
      chai.request(server)
        .post("/auth/signup")
        .send({
          "email": "newtestemail@ncsu.edu",
          "password": "222"
        })
        .end(function (err, res) {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.be.a("object");
          res.body.error.should.have.property("code");
          res.body.error.should.have.property("message");
          res.body.error.code.should.equal(401);
          res.body.error.message.should.equal("Invalid password");
          done();
        });
    });
    it("should login a SINGLE user on /login POST", function (done) {
      chai.request(server)
        .post("/auth/login")
        .send({
          "email": "testemail@ncsu.edu",
          "password": "123456"
        })
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("email");
          res.body.data.email.should.equal("testemail@ncsu.edu");
          done();
        });
    });
    it("should not login a SINGLE user email does not exist on /login POST", function (done) {
      chai.request(server)
        .post("/auth/login")
        .send({
          "email": "wrongemail@ncsu.edu",
          "password": "123456"
        })
        .end(function (err, res) {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.be.a("object");
          res.body.error.should.have.property("code");
          res.body.error.should.have.property("message");
          res.body.error.code.should.equal(401);
          res.body.error.message.should.equal("This user doesn't exists.");
          done();
        });
    });
    it("should not login a SINGLE user invalid password on /login POST", function (done) {
      chai.request(server)
        .post("/auth/login")
        .send({
          "email": "testemail@ncsu",
          "password": "123456"
        })
        .end(function (err, res) {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.be.a("object");
          res.body.error.should.have.property("code");
          res.body.error.should.have.property("message");
          res.body.error.code.should.equal(401);
          res.body.error.message.should.equal("Invalid email");
          done();
        });
    });
    it("should not login a SINGLE user invalid password on /login POST", function (done) {
      chai.request(server)
        .post("/auth/login")
        .send({
          "email": "testemail@ncsu.edu",
          "password": "222"
        })
        .end(function (err, res) {
          res.should.have.status(401);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          res.body.error.should.be.a("object");
          res.body.error.should.have.property("code");
          res.body.error.should.have.property("message");
          res.body.error.code.should.equal(401);
          res.body.error.message.should.equal("Invalid password");
          done();
        });
    });
    it("should delete a SINGLE user on /users/<id> DELETE", function (done) {
      chai.request(server)
        .delete("/users/" + authId)
        .end(function (err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          res.body.should.have.property("data");
          res.body.data.oid.should.equal(authId);
          done();
        });
    });
  });