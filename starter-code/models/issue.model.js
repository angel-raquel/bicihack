const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({

})

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;