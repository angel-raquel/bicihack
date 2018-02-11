const mongoose = require('mongoose');
const User = require('../models/user.model');
const Issue = require('../models/issue.model');

mongoose.connect("mongodb://localhost/bicihack");

User.findOne({email: 'user1@bicihack.com'}, (error, user) => {
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 1001,
            userId: user._id,
            message: 'Sillin roto.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'station',
            referenceId: 1,
            userId: user._id,
            message: 'Estacion en obras.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
})

User.findOne({email: 'user2@bicihack.com'}, (error, user) => {
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 2002,
            userId: user._id,
            message: 'No frena bien.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'station',
            referenceId: 22,
            userId: user._id,
            message: 'Estacion en mantenimiento.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
})

User.findOne({email: 'user3@bicihack.com'}, (error, user) => {
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 3003,
            userId: user._id,
            message: 'No tiene cesta.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 3033,
            userId: user._id,
            message: 'Sin luces.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'station',
            referenceId: 33,
            userId: user._id,
            message: 'No funciona el tarjetero.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
})

User.findOne({email: 'user4@bicihack.com'}, (error, user) => {
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 104,
            userId: user._id,
            message: 'Rueda pinchada.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 44,
            userId: user._id,
            message: 'Manillar roto',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'station',
            referenceId: 44,
            userId: user._id,
            message: 'Pantallas rotas',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
})

User.findOne({email: 'user5@bicihack.com'}, (error, user) => {
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 5,
            userId: user._id,
            message: 'Rueda desinflada.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 55,
            userId: user._id,
            message: 'Cadena partida',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 555,
            userId: user._id,
            message: 'No tiene timbre',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
})

User.findOne({email: 'user6@bicihack.com'}, (error, user) => {
    issue = new Issue(
        {
            type: 'station',
            referenceId: 16,
            userId: user._id,
            message: 'Falla al devolver la bici.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'station',
            referenceId: 56,
            userId: user._id,
            message: 'Estacion inoperativa.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'station',
            referenceId: 26,
            userId: user._id,
            message: 'Fuera de servicio temporalmente.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
})

User.findOne({email: 'user7@bicihack.com'}, (error, user) => {
    issue = new Issue(
        {
            type: 'station',
            referenceId: 37,
            userId: user._id,
            message: 'No me ha dejado coger bicis.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 2777,
            userId: user._id,
            message: 'Freno delantero gastado.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 777,
            userId: user._id,
            message: 'Pedal izquierdo suelto.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
})

User.findOne({email: 'user8@bicihack.com'}, (error, user) => {
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 88,
            userId: user._id,
            message: 'Falta rueda delantera.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
    issue = new Issue(
        {
            type: 'bike',
            referenceId: 888,
            userId: user._id,
            message: 'Amortiguación rota.',
            imageUrl: '/images/default_bike.jpg'
        }
    );
    issue
        .save(error => {
            if(error) {
                console.log("Error saving issue");
            }
            else {
                console.log(`issue added`);
            }
        })
})