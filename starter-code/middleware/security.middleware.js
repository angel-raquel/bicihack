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

// Only can edit issues: owner and ADMIN
module.exports.canEditIssue = (req, res, next) => {
    Issue.findById(req.params.id)
    .then(issue => {
        if(issue != null) {
            console.log("ISSUE != NULL")
            if(issue.userId.equals(req.user._id || req.user.role == "ADMIN")){
                next();
            }
            else {
                res.status(403);
                res.render('error', {
                    message: 'Forbidden',
                    error: { password: `Only the owner or ${req.user.role} role can delete this issue` }
                });
            }
        }
    })
}

module.exports.checkRole = (role) => {
    return (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.status(401);
            res.render('auth/login', {
                error: {password: `Only a ${role} user can access to this section` }
            })
        } else if (req.user.role === role) {
            next();
        } else {
            res.status(403);
            res.render('error', {
                message: 'Forbidden',
                error: { password: `Only a ${role} user can access to this section and you are ${req.user.role}` }
            });
        }
    }
}