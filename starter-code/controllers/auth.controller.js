const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');

module.exports.signup = (req, res, next) => {
    res.render('auth/signup');
}

module.exports.doSignup = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user != null) {
                console.log("email ya existe");
                res.render('auth/signup', {
                    error: { email: 'Email already exists'}
                })
            }
            else {
                console.log("nuevo usuario");
                user = new User({
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role
                });
                user.save()
                    .then(() => {
                        res.redirect("/login");
                    })
                    .catch(error => {
                        if (error instanceof mongoose.Error.ValidationError) {
                            res.render('auth/signup', { 
                                user: user, 
                                error: error.errors 
                            });
                        } else {
                            next(error);
                        }
                    })
            }
        }).catch(error => next(error));
}

module.exports.login = (req, res, next) => {
    res.send("GET LOGIN");
}

module.exports.logout = (req, res, next) => {
    res.send("GET LOGOUT");
}