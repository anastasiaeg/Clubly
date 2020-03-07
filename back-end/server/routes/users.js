var express = require('express');
var router = express.Router();
const err = require('http-errors');
let usersController = require('../controllers/users');
let permissions = require('../helpers/permissions');

/* GET a certain user */
router.get('/:id', async function (req, res, next) {
  let id = req.params.id;
  try {
    usersController.getUser(id).then((user) => {
      if (!user) {
        return next(new err.NotFound('This user does not exist. '));
      }
      res.json({
        data: user
      })
    })
  } catch (e) {
    return next(new err.InternalServerError(e.message));
  }
});

router.put('/:id', permissions.sameUser, async function (req, res, next) {
  let id = req.params.id;
  let userData = req.body;
  try {
    usersController.updateUser(id, userData).then((updated) => {
      if (!updated) {
        return next(new err.NotFound('This user does not exist. '));
      }
      res.json({
        data: updated
      });
    })
  } catch (e) {
    return next(new err.InternalServerError(e.message));
  }
});

module.exports = router;