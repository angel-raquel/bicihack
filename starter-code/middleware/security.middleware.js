const mongoose = require('mongoose');
const User = require('../models/user.model');
const Issue = require('../models/issue.model');

// Check if a user is authenticated
module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.status(401);
        res.redirect('/login');
    }
}

// Check if i am the owner of my profile
module.exports.isMyProfile = (req, res, next) => {
    if(req.user._id != req.params.id) {
       res.render("auth/login", {
           error: { password: `You can only modify your profile` }
       });
    }
    else {
       next();
    }
}

// Check if a issue was written by me
module.exports.isMyIssue = (req, res, next) => {
    console.log(req);
    next();
}