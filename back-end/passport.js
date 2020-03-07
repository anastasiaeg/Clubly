var bcrypt = require("bcrypt");

var localStrategy = require('passport-local').Strategy;
let usersController = require('./server/controllers/users');
let adminsController = require('./server/controllers/admins');
const {
    Sequelize
} = require('./server/models');

function compareHash(given, actual) {
    return bcrypt.compareSync(given, actual);
}

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new localStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, done) {
            try {
                console.log({
                    email,
                    password
                })
                usersController.getByEmail(email).then((user) => {
                    if (!user) {
                        adminsController.getByEmail(email).then(function (admin) {
                            if (!admin) {
                                return done("Email and/or password incorrect. Please try again or reset your password.")
                            }
                            if (!compareHash(password, admin.password)) {
                                return done("Email and/or password incorrect. Please try again or reset your password.")
                            }
                            return done(null, admin)
                        });
                    } else {
                        if (!compareHash(password, user.password)) {
                            return done("Email and/or password incorrect. Please try again or reset your password.")
                        }
                        if (!user.active) {
                            return done("Activate the profile throught the email");
                        }
                        return done(null, user)
                    }
                });
            } catch (e) {
                return done(e.message || e);
            }
        }))

}