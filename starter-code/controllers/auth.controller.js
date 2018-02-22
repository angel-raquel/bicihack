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
                res.render('auth/signup', {
                    error: { email: 'Email already exists'}
                })
            }
            else {
                user = new User({
                    email: req.body.email,
                    password: req.body.password,
                    name: req.body.name,
                    cardNumber: req.body.cardNumber,
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
    res.render('auth/login');
}

module.exports.doLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        res.render('auth/login', { 
            user: { email: email }, 
            error: {
                email: email ? '' : 'Email is required',
                password: password ? '' : 'Password is required'
            }
        });
    } else {
        passport.authenticate('local-auth', (error, user, validation) => {
            if (error) {
                next(error);
            } else if (!user) {
                res.render('auth/login', { error: validation });
            } else {
                req.login(user, (error) => {
                    if (error) {
                        next(error);
                    } else {
                        res.redirect(`/user/${user._id}`);
                    }
                });
            }
        })(req, res, next);
    }
}

module.exports.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/login');
}

module.exports.isLogged = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200)
        res.send(req.user);
    } else {
        res.status(403)
        res.send(null);
    }
}