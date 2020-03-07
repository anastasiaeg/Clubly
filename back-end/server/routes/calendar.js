var express = require('express');
var router = express.Router();
const err = require("http-errors");
let eventsController = require('../controllers/events');

router.get('/rsvp/:id&:from&:to', async function (req, res, next) {
    let id = req.params.id;
    let from = new Date(req.params.from);
    let to = new Date(req.params.to);
    if (isNaN(from) || isNaN(to)) {
        res.status(400);
        res.json({
            error: "Invalid parameter date"
        });
        return next();
    }
    try {
        eventsController.getRsvp(id, from, to).then((result) => {
            res.json({
                data: result
            })
        })
    } catch (e) {
        if (e instanceof Sequelize.DatabaseError) {
            res.status(400);
            res.json({
                error: "Columns don't exist"
            });
            return next();
        }
        res.status(500);
        res.json({
            error: e.message
        });
        return next();
    }
})

module.exports = router;