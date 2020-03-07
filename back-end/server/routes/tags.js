var express = require("express");
var router = express.Router();
const err = require("http-errors");
let tagsController = require('../controllers/tags');

/* POST new club */
router.post('/', async function (req, res, next) {
    let tagData = req.body;
    try {
        tagsController.createTag(tagData).then(function (newTag) {
            res.json({
                data: newTag
            });
        });
    } catch (e) {
        return next(new err.InternalServerError(e.message));
    }
});

router.get("/", async function (req, res, next) {
    try {
        tagsController.getAllTags().then(function (tags) {
            res.json({
                data: tags
            })
        })
    } catch (e) {
        return next(new err.InternalServerError(e && e.message ? e.message : "Server Error"));
    }
});

/* GET a certain tag */
router.get("/:id", async function (req, res, next) {
    let id = req.params.id;
    try {
        tagsController.getTag(id).then(function (tag) {
            if (!tag) {
                return next(new err.NotFound("This tag does not exist. "));
            }
            res.json({
                data: tag
            })
        })
    } catch (e) {
        return next(new err.InternalServerError(e && e.message ? e.message : "Server Error"));
    }
});

router.put("/:id", async function (req, res, next) {
    let tagData = req.body;
    let id = req.params.id;
    try {
        tagsController.updateTag(id, tagData).then((updated) => {
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

module.exports = router;