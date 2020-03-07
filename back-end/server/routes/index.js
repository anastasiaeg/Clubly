var express = require('express');
var router = express.Router();
const pug = require('pug');

router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Hey'
    })
});

module.exports = router;