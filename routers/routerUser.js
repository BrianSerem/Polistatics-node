const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrpyt = require('bcrypt');
const saltRounds = 10;

router.post('/login', async (req, res) => {
    const user = {
        name: req.body.name,
        password: req.body.password
    }

    try {
        const user = User.find({
            name: req.body.name
        });
        if (user) {
            jwt.sign({
                user
            }, 'verysecretkey', (err, token) => {
                res.json({
                    token
                });
            })

        } else {
            res.json({
                message: 'wrong user password combination'
            })
        }
    } catch (error) {
        res.json({
            message: 'error retrieving user from database',
            error
        })
    }
});

router.post('/', async (req, res) => {

    const newUser = new User({
        name: req.body.name,
        password: bcrpyt.hash(req.body.password, saltRounds, (err, hash) => {
            console.log(hash)
        })
    });
    try {
        const savedUser = await newUser.save();
        res.json({
            message: 'user saved successfully',
            newUser
        })
    } catch (error) {
        res.status(400).json({
            message: 'error saving user',
            error
        });
    }
});

module.exports = router;