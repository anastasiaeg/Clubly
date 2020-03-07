var express = require("express");
var router = express.Router();
const err = require("http-errors");
const {
  Sequelize
} = require("../models");
let tagsUsersController = require('../controllers/tagsusers');

router.post("/", async function (req, res, next) {
  let newData = req.body;
  try {
    tagsUsersController.createTagsUsers(newData).then((created) => {
      res.json({
        data: created
      });
    });
  } catch (e) {
    if (e instanceof Sequelize.DatabaseError) {
      console.log("Columns don't exist")
      return next(new err.BadRequest("Columns don't exist"));
    }
    return next(new err.InternalServerError(e.message));
  }
});

router.put("/:id", async function (req, res, next) {
  let id = req.params.id;
  let newData = req.body;
  console.log({
    newData
  })
  try {
    tagsUsersController.updateTagsUsers(id, newData).then((updated) => {
      if (!updated) {
        console.log("This user does not exist.")
        return next(new err.NotFound('This user does not exist.'));
      }
      res.json({
        data: "Updated Tags"
      });
    })
  } catch (e) {
    console.log(e.message)
    return next(new err.InternalServerError(e.message));
  }
});

router.delete("/:id", async function (req, res, next) {
  let id = req.params.id;
  try {
    tagsUsersController.destroyTagsUsers(id).then((deleted) => {
      res.json({
        data: "Successfully deleted."
      });
    })
  } catch (e) {
    return next(new err.InternalServerError(e.message));
  }
});

module.exports = router;