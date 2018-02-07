const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["bike", "station"],
        default: "station"
    },
    referenceId: {
        type: Number,
        required: [true, 'Reference number is needed']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        // required: [true, 'Issue needs an user']
    },
    message: {
        type: String,
        required: [true, `Tweet can't be empty`]
    },
    imageUrl: {
        type: String,
    }
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema);
module.exports = Issue;