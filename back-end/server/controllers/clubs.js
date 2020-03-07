const {
    Users,
    Clubs,
    Events,
    Tags
} = require('../models');
const {
    Sequelize
} = require("../models");

async function createClub(newData) {
    return await Clubs.create(newData);
}
async function getClub(id) {
    return await Clubs.findOne({
        include: [{
                model: Users,
                as: 'members',
                through: {
                    where: {
                        isOrganizer: null
                    }
                }
            },
            {
                model: Users,
                as: 'organizers',
                through: {
                    where: {
                        isOrganizer: true
                    }
                }
            },
            {
                model: Tags,
                as: 'tags'
            },
            {
                model: Events,
                as: 'events',
                include: [{
                    model: Tags,
                    as: 'tags'
                }]
            }
        ],
        where: {
            id: id
        }
    })
}

async function updateClub(id, newData) {
    const {
        name,
        description,
        image,
        webpage,
        email,
        socialMedia
    } = newData;
    return await Clubs.update({
        name,
        description,
        image,
        webpage,
        email,
        socialMedia
    }, {
        where: {
            id: id
        },
        returning: true
    })
}

async function searchClubs(query) {
    return await Clubs.findAll({
        where: {
            $or: [{
                    description: {
                        $iLike: `%${query}%`
                    }
                },
                {
                    name: {
                        $iLike: `%${query}%`
                    }
                }
            ]
        }
    });
}

module.exports = {
    createClub,
    getClub,
    updateClub,
    searchClubs
}