const {
    Admins
} = require('../models');

async function getByEmail(email) {
    return await Admins.findOne({
        where: {
            email: email
        }
    })
}

module.exports = {
    getByEmail
}