var express = require("express");
var User = require("../models/user")

var router = express.Router();

router.post("/", function(req, res, next) {
    let data = '';
    req.on('data', chuck => {
        data += chuck
    })
    req.on('end', () => {
        data = JSON.parse(data)
        const username = data.username
        const password = data.password
        User.find().then(users => {
            const isValid = users.some(user => {
                return user.username === username && user.password === password
            })
            res.json({
                result: isValid
            })
        })
    })
});

module.exports = router;