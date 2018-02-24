const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const ADMIN_ROLE = "ADMIN";
const USER_ROLE = "USER";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minlength: [8, 'Password must have at least 8 characters.']
    },
    role: {
        type: String,
        enum: [ADMIN_ROLE, USER_ROLE],
        default: USER_ROLE
    },
    name: {
        type: String,
    },
    cardNumber: {
        type: Number,
    },
    favoriteStations: {
        type: [mongoose.Schema.Types.ObjectId]
    },
    imageUrl: {
        type: String,
        default: '/images/user.png'
    }
}, { timestamps: true} );

userSchema.pre('save', function(next) {

    if (!this.isModified('password')) {
        return next();
    }

    if (this.isAdmin()) {
        this.role = ADMIN_ROLE;
    }

    bcrypt.genSalt(SALT_WORK_FACTOR)
        .then(salt => {
            bcrypt.hash(this.password, salt)
                .then(hash => {
                    this.password = hash;
                    next();
                })
        })
        .catch(error => next(error));

});

userSchema.methods.checkPassword = function(password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.isAdmin = function() {
    return this.role === ADMIN_ROLE;
}

const User = mongoose.model('User', userSchema);
module.exports = User;
