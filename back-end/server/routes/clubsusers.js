var express = require("express");
var router = express.Router();
const err = require("http-errors");
const {
    Sequelize
} = require("../models");
let clubsUsersController = require('../controllers/clubsusers');

router.post("/", async function (req, res, next) {
    let newData = req.body;
    try {
        clubsUsersController.createClubsUsers(newData).then((created) => {
            res.json({
                data: created
            });
        });
    } catch (e) {
        if (e instanceof Sequelize.DatabaseError) {
            return next(new err.BadRequest("Columns don't exist"));
        }
        return next(new err.InternalServerError(e.message));
    }
});

router.put("/:id", async function (req, res, next) {
    let id = req.params.id;
    let newData = req.body;
    try {
        clubsUsersController.updateClubsUsers(id, newData).then((updated) => {
            if (!updated || updated[0] !== 1) {
                return next(new err.NotFound('This user does not exist.'));
            }
            res.json({
                data: updated[1][0]
            });
        })
    } catch (e) {
        return next(new err.InternalServerError(e.message));
    }
});

router.delete("/:id", async function (req, res, next) {
    let id = req.params.id;
    try {
        clubsUsersController.destroyClubsUsers(id).then((deleted) => {
            res.json({
                data: "Successfully deleted."
            });
        })
    } catch (e) {
        return next(new err.InternalServerError(e.message));
    }
});

module.exports = router;