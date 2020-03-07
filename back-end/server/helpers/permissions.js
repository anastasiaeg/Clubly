const err = require('http-errors');

var loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401).json({
            error: "Log in to view"
        });
    }
}

var sameUser = function (req, res, next) {
    if (req.user && req.user.id.toString() === req.params.id) {
        next();
    } else {
        res.status(401).json({
            error: "You can't edit other user's information"
        });
    }
}

var isUserAdmin = function (req, res, next) {
    if (req.user && req.user.employeeId) {
        next();
    } else {
        res.status(401).json({
            error: "Only admins can do this"
        });
    }
};

var isUserOrganizer = function (req, res, next, orgId) {
    if (req.user && (req.user.employeeId || res.user)) {
        next();
    } else {
        res.status(401).json({
            error: "Only organizer of this club can do this"
        });
    }
}

module.exports = {
    loggedin,
    sameUser,
    isUserAdmin,
    isUserOrganizer
}