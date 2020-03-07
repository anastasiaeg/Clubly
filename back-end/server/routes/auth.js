var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
const err = require("http-errors");
const {
    Sequelize
} = require("../models");
let usersController = require('../controllers/users');
var mail = require("../helpers/email");
let permissions = require('../helpers/permissions');

const salt = bcrypt.genSaltSync(8);

// Helper functions
function hash(secret) {
    return bcrypt.hashSync(secret, salt);
}

function validateEmail(email) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.edu$/;

    const validEmail =
        typeof email == "string" && email.trim() != "" && regex.test(email);
    return validEmail;
}

function validatePassword(pwd) {
    return typeof pwd == "string" && pwd.trim() != "" && pwd.trim().length >= 6;
}

module.exports = (passport) => {
    router.get("/verify", async function (req, res, next) {
        if (req.protocol + "://" + req.get("host") !== "http://" + req.get("host")) {
            res.status(400).json({
                error: "Request is from unknown source"
            });
            return next();
        }
        const {
            email,
            hash
        } = req.query;
        try {
            usersController.getByEmail(email).then((user) => {
                if (!user) {
                    res.status(404).json({
                        error: "Invalid password."
                    });
                    return next();
                }
                if (!user.confirmHash === hash) {
                    res.status(400).json({
                        error: "Unable to process"
                    });
                    return next();
                }
                user.updateAttributes({
                    active: true
                });
                res.setHeader("Content-Type", "text/html");
                res.send(
                    new Buffer(
                        '<h2><a href="http://localhost:3001/login" target="_blank"> Login to Clubly </a></h2>'
                    )
                );
            });
        } catch (e) {
            res.status(500).json({
                error: e.message
            });
            return next();
        }
    });

    /* POST a new user */
    router.post("/signup", async function (req, res, next) {
        const {
            email,
            password
        } = req.body;

        if (!validateEmail(email)) {
            res.status(400).json({
                error: "Invalid email"
            });
        } else if (!validatePassword(password)) {
            res.status(400).json({
                error: "Invalid password"
            });
        } else {
            var rand = Math.floor(Math.random() * 100 + 54) + "";
            var confirmHash = hash(rand);
            try {
                let userData = Object.assign({}, req.body);
                userData.password = hash(password);
                userData.confirmHash = confirmHash;
                usersController.createUser(userData).then((newUser) => {
                    if (newUser) {
                        res.json({
                            data: newUser
                        });
                        mail.sendEmail(req.get("host"), email, confirmHash);
                    } else {
                        res.status(500).json({
                            error: "Error creating a user, it might already exist"
                        })
                    }
                })
            } catch (e) {
                res.status(500).json({
                    error: e.message
                });
            }
        }
    });

    router.post('/login', (req, res, next) => {
        const {
            email,
            password
        } = req.body;
        if (!validateEmail(email)) {
            res.status(400).json({
                error: "Invalid email"
            });
        } else if (!validatePassword(password)) {
            res.status(400).json({
                error: "Invalid password"
            });
        } else {
            next();
        }
    }, (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            if (err) {
                res.status(400).json({
                    error: err
                })
            } else {
                req.session.user = req.user;
                req.logIn(user, (err) => {
                    if (err) {
                        res.status(400).json({
                            error: err
                        })
                    } else {
                        res.json({
                            data: user
                        })
                    }
                });

            }
        })(req, res, next);
    });

    router.post('/logout', function (req, res) {
        req.logout()
        res.send('You logged out!')
    })

    return router;
};