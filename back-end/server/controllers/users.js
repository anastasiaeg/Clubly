const {
    Users,
    Clubs,
    Events,
    Tags
} = require('../models');

const {
    Sequelize
} = require("../models");

async function createUser(newData) {
    try {
        return await Users.create(newData);
    } catch (e) {
        return null;
    }
}

async function getUser(id) {
    return await Users.findOne({
        include: [{
                model: Clubs,
                as: 'memberOf',
                through: {
                    where: {
                        isOrganizer: null
                    }
                }
            },
            {
                model: Clubs,
                as: 'organizerOf',
                through: {
                    where: {
                        isOrganizer: true
                    }
                }
            },
            {
                model: Tags,
                as: 'tags',
                through: {
                    attributes: []
                }
            },
            {
                model: Events,
                as: 'events'
            }
        ],
        order: [
            [{
                model: Events,
                as: 'events'
            }, 'startTime']
        ],
        where: {
            id: id
        },
        attributes: {
            exclude: ['password']
        }
    })
}

async function updateUser(id, newData) {
    const {
        firstName,
        lastName,
        year,
        studentId,
        major,
        email,
        image
    } = newData;
    await Users.update({
        firstName,
        lastName,
        year,
        studentId,
        major,
        email,
        image
    }, {
        where: {
            id: id
        }
    })

    return await getUser(id);
}

async function getByEmail(email) {
    return await Users.findOne({
        include: [{
            model: Clubs,
            as: 'organizerOf',
            through: {
                where: {
                    isOrganizer: true
                }
            }
        }],
        where: {
            email: email
        }
    })
}
module.exports = {
    createUser,
    getUser,
    updateUser,
    getByEmail
}