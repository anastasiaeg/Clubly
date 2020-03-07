var express = require('express');
var router = express.Router();
const err = require("http-errors");
let eventsController = require('../controllers/events');

router.post('/', async function (req, res, next) {
    let eventData = req.body;
    try {
        eventsController.createEvent(eventData).then(function (event) {
            res.json({
                data: event
            });
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

/* GET a certain event */
router.get("/:id", async function (req, res, next) {
    let id = req.params.id;
    try {
        eventsController.getEvent(id).then(function (event) {
            if (!event) {
                return next(new err.NotFound("This event does not exist. "));
            }
            res.json({
                data: event
            })
        })
    } catch (e) {
        return next(new err.InternalServerError(e.message));
    }
});

router.put("/:id", async function (req, res, next) {
    let id = req.params.id;
    let eventData = req.body;
    try {
        eventsController.updateEvent(id, eventData).then((updated) => {
            if (!updated || updated[0] !== 1) {
                return next(new err.NotFound('This user does not exist. '));
            }
            res.json({
                data: updated[1][0]
            });
        })
    } catch (e) {
        return next(new err.InternalServerError(e.message));
    }
});

router.post('/byclub/:id', async function (req, res, next) {
    let id = req.params.id;
    let eventData = req.body;
    try {
        eventsController.createEvent(eventData)
            .then(function (event) {
                ClubsEvents.create({
                    clubId: id,
                    eventId: event.id
                })
                res.json({
                    data: event
                });
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