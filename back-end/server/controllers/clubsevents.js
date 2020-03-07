const {
    ClubsEvents
} = require("../models");

async function createClubsEvents(newData) {
    return await ClubsEvents.create(newData);
}

async function updateClubsEvents(id, newData) {
    return await ClubsEvents.update({
        eventId: newData.eventId,
        clubId: newData.clubId
    }, {
        where: {
            id: id
        },
        returning: true
    });
}

async function destroyClubsEvents(id) {
    return await ClubsEvents.destroy({
        where: {
            id: id
        }
    });
}
module.exports = {
    createClubsEvents,
    updateClubsEvents,
    destroyClubsEvents
}