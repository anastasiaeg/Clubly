var express = require('express');
var router = express.Router();
const err = require("http-errors");
let clubsController = require('../controllers/clubs');
let eventsController = require('../controllers/events');

router.get('/clubs', async function (req, res, next) {
    let query = req.query.query;
    if (query == undefined) {
        query = ""
    }
    try {
        clubsController.searchClubs(query).then((result) => {
            res.json({
                data: result
            })
        })
    } catch (e) {
        if (e instanceof Sequelize.DatabaseError) {
            return next(
                new err.BadRequest("Columns don't exist")
            );
        }
        return next(new err.InternalServerError(e.message));
    }
})

router.get('/events', async function (req, res, next) {
    let query = req.query.query;
    if (query == undefined) {
        query = ""
    }
    try {
        eventsController.searchEvents(query).then((result) => {
            res.json({
                data: result
            })
        })
    } catch (e) {
        if (e instanceof Sequelize.DatabaseError) {
            return next(
                new err.BadRequest("Columns don't exist")
            );
        }
        return next(new err.InternalServerError(e.message));
    }
})

module.exports = router;