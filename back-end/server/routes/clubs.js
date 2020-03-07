var express = require('express');
var router = express.Router();
const err = require('http-errors');
let clubsController = require('../controllers/clubs');
let permissions = require('../helpers/permissions');

/* GET a certain club */
router.get('/:id', async function (req, res, next) {
    let id = req.params.id;
    try {
        clubsController.getClub(id).then((club) => {
            if (!club) {
                return next(new err.NotFound('This club does not exist. '));
            }
            res.json({
                data: club
            });
        })
    } catch (e) {
        return next(new err.InternalServerError(e.message));
    }
});

/* POST new club */
router.post('/', permissions.isUserAdmin, async function (req, res, next) {
    let clubData = req.body;
    try {
        clubsController.createClub(clubData).then(function (newClub) {
            res.json({
                data: newClub
            });
        });
    } catch (e) {
        return next(new err.InternalServerError(e.message));
    }
});

router.put('/:id', async function (req, res, next) {
    let clubData = req.body;
    let id = req.params.id;
    try {
        clubsController.updateClub(id, clubData).then((updated) => {
            if (!updated || updated[0] !== 1) {
                return next(new err.NotFound('This user does not exist. '));
            }
            res.json({
                data: updated[1][0]
            });
        })
    } catch (e) {
        return next(new err.InternalServerError(e.message || e));
    }
});

module.exports = router;