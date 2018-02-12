const mongoose = require('mongoose');
const Issue = require('../models/issue.model');
const Station = require('../models/station.model');

module.exports.show = (req, res, next) => {
    Issue.findById(req.params.id)
    .then(issue => {
        if(issue != null) {
            res.render('issue/details', {
                user: req.user,
                issue
            });
        }
    })
    .catch(error => {
        next(error);
    })
}

module.exports.select = (req, res, next) => {
    res.render('issue/select');
}

module.exports.new = (req, res, next) => {
    switch(req.params.type) {
        case 'station':
            Station.find({})
            .then(stations => {
                res.render('issue/new', {
                    type: req.params.type,
                    stations: stations
                });
            })
            .catch(error => {
                next(error);
            })
            break;
        case 'bike':
            res.render('issue/new', {
                type: req.params.type
            });    
            break;
        default:
            res.send("ERROR");
    }

}

module.exports.doNew = (req, res, next) => {
    issue = new Issue({
        type: req.body.type,
        referenceId: req.body.referenceId,
        userId: req.user._id,
        message: req.body.message
        // imageUrl: req.body.imageUrl
    });
    issue.save()
    .then(() => {
        res.redirect("/");
    })
    .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
            res.send("MONGOOSE VALIDATION ERROR");
        } else {
            next(error);
        }
    })
}

module.exports.edit = (req, res, next) => {
    Issue.findById(req.params.id)
    .then((issue) => {
        switch(issue.type) {
            case 'station':
                Station.find({})
                    .then(stations => {
                        res.render('issue/edit', {
                            issue: issue,
                            stations: stations
                        });
                    })
                    .catch(error => {
                        next(error);
                    })
                break;
            case 'bike':
                res.render('issue/edit', {
                    issue: issue
                });    
                break;
            default:
                res.send("EDIT: no station nor bike");
        }
    })
    .catch((error) => next(error));
}

module.exports.doEdit = (req, res, next) => {
    Issue.findById(req.params.id)
    .then(issue => {
        if(issue != null) {
            issue.referenceId = req.body.referenceId;
            issue.message = req.body.message;
            issue.save()
                .then(() => {
                    res.redirect(`/issue/${req.params.id}`);
                })
                .catch(error => {
                    next(error);
                })
        }
        else {
            res.send("issue>doEdit>error")
        }
    })
}

module.exports.delete = (req, res, next) => {
    Issue.findByIdAndRemove(req.params.id)
    .then(
        Issue.find({userId: req.user})
        .then(issues => {
            res.redirect('/issue/list');
        })
    )
    .catch((error) => next(error));
}

module.exports.search = (req, res, next) => {
    if(req.body.referenceIdBike != '') {
        searchObj = {
            type: "bike",
            referenceId: req.body.referenceIdBike
        }
    }
    else {
        if(req.body.referenceIdStation != '') {
            searchObj = {
                type: "station",
                referenceId: req.body.referenceIdStation
            }
        }    
        else {
            searchObj = {
            }
        }
    }
    Issue.find(searchObj)
    .then(issues => {
        res.render('issue/list', {
            user: req.user,
            bike: {referenceId: req.body.referenceId},
            issues: issues
        })
    })
    .catch(error => next(error))
}

module.exports.myIssues = (req, res, next) => {
    Issue.find({userId: req.user})
    .then(issues => {
        res.render('issue/myIssues', {
            user: req.user,
            issues: issues
        })
    })
    .catch(error => next(error))
}