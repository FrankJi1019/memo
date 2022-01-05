var express = require("express");
var User = require("../models/user")

var router = express.Router();

router.post("/", function(req, res, next) {
    let data = ''
    req.on('data', chuck => {
        data += chuck
    })
    req.on('end', () => {
        data = JSON.parse(data)
        const username = data.username
        const password = data.password
        User.find().then(users => {
            const userExist = users.some(user => {
                return username === user.username
            })
            if (userExist) {
                res.json({
                    result: false
                })
            } else {
                const newUser = new User({
                    username, password
                })
                newUser.save().then(() => {
                    res.json({
                        result: true
                    })
                })
            }
        })
    })
});

module.exports = router;