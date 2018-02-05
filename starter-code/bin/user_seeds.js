const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const User = require('../models/user.model');

mongoose.connect("mongodb://localhost/bicihack");

const salt = bcrypt.genSalt(SALT_WORK_FACTOR)
const password = '1234567890';

const users = [
    {
        email: 'admin1@bicihack.com',
        password: password,
        role: 'ADMIN',
        name: 'Admin 1',
        cardNumber: 1001,
    },
    {
        email: 'admin2@bicihack.com',
        password: password,
        role: 'ADMIN',
        name: 'Admin 2',
        cardNumber: 1002,
    },
    {
        email: 'user1@bicihack.com',
        password: password,
        role: 'USER',
        name: 'User 1',
        cardNumber: 1,
    },
    {
        email: 'user2@bicihack.com',
        password: password,
        role: 'USER',
        name: 'User 2',
        cardNumber: 2,
    },
    {
        email: 'user3@bicihack.com',
        password: password,
        role: 'USER',
        name: 'User 3',
        cardNumber: 3,
    },
    {
        email: 'user4@bicihack.com',
        password: password,
        role: 'USER',
        name: 'User 4',
        cardNumber: 4,
    },
    {
        email: 'user5@bicihack.com',
        password: password,
        role: 'USER',
        name: 'User 5',
        cardNumber: 5,
    },
    {
        email: 'user6@bicihack.com',
        password: password,
        role: 'USER',
        name: 'User 6',
        cardNumber: 6,
    },
    {
        email: 'user7@bicihack.com',
        password: password,
        role: 'USER',
        name: 'User 7',
        cardNumber: 7,
    },
    {
        email: 'user8@bicihack.com',
        password: password,
        role: 'USER',
        name: 'User 8',
        cardNumber: 8,
    }
]

User.create(users, (err, data) => {
    if (err) { throw err; }
    data.forEach(user => {
        console.log(user);
    })
    mongoose.connection.close();
});