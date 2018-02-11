const mongoose = require('mongoose');
const User = require('../models/user.model');

module.exports.profile = (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            res.render('user/profile', {user: user});
        })
        .catch(error => {
            next(error);
        })
}

module.exports.edit = (req, res, next) => {
    User.findById(req.params.id)
    .then((user) => {
        res.render('user/edit', { user: user });
    })
    .catch((error) => next(error));
}

module.exports.doEdit = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user != null) {
                if (req.file) {
                  user.imageUrl = `/user-avatars/${req.file.filename}`
                }
                user.email = req.body.email;
                user.password = req.body.password || user.password;
                user.name = req.body.name;
                user.cardNumber = req.body.cardNumber;
                user.save()
                    .then(() => {
                        res.redirect(`/user/${req.user._id}`);
                    })
                    .catch(error => {
                        res.send("ERROR UPDATING")
                    })
            }
            else {
                res.send("USER NOT FOUND");
            }
        })
}
