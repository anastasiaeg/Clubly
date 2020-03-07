const {
    Clubs,
    Events,
    Users,
    Tags
} = require("../models");

async function createEvent(newData) {
    return await Events.create(newData);
}
async function getEvent(id) {
    return await Events.findOne({
        include: [{
            model: Users,
            as: 'users',
            attributes: {
                exclude: ['password']
            }
        }, {
            model: Tags,
            as: 'tags'
        }, {
            model: Clubs,
            as: 'clubs'
        }],
        where: {
            id: id
        }
    })
}

async function updateEvent(id, newData) {
    const {
        name,
        description,
        location,
        startTime,
        endTime,
        image,
        attendanceCode
    } = newData;
    return await Events.update({
        name,
        description,
        location,
        startTime,
        endTime,
        image,
        attendanceCode
    }, {
        where: {
            id: id
        },
        returning: true
    })
}

async function getRsvp(id, from, to) {
    return await Events.findAll({
        where: {
            '$users.EventsUsers.rsvp$': true,
            '$users.id$': id,
            "startTime": {
                $gte: from
            },
            "endTime": {
                $lte: to
            }
        },
        include: [{
            model: Users,
            as: 'users',
            attributes: {
                exclude: ['password']
            }
        }, {
            model: Tags,
            as: 'tags'
        }, {
            model: Clubs,
            as: 'clubs'
        }],
        order: [
            ['startTime', 'ASC']
        ]
    })
}

async function searchEvents(query) {
    return await Events.findAll({
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
    createEvent,
    getEvent,
    updateEvent,
    getRsvp,
    searchEvents
}