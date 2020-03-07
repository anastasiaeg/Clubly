const {
    EventsUsers
} = require("../models");

async function createEventsUsers(newData) {
    return await EventsUsers.create(newData);
}

async function updateEventsUsers(id, newData) {
    return await EventsUsers.update({
        eventId: newData.eventId,
        userId: newData.userId
    }, {
        where: {
            id: id
        },
        returning: true
    });
}

async function destroyEventsUsers(id) {
    return await EventsUsers.destroy({
        where: {
            id: id
        }
    });
}
module.exports = {
    createEventsUsers,
    updateEventsUsers,
    destroyEventsUsers
}