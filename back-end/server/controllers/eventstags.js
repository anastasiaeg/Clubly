const {
    EventsTags
} = require("../models");

async function createEventsTags(newData) {
    return await EventsTags.create(newData);
}

async function updateEventsTags(id, newData) {
    return await EventsTags.update({
        eventId: newData.eventId,
        tagId: newData.tagId
    }, {
        where: {
            id: id
        },
        returning: true
    });
}

async function destroyEventsTags(id) {
    return await EventsTags.destroy({
        where: {
            id: id
        }
    });
}
module.exports = {
    createEventsTags,
    updateEventsTags,
    destroyEventsTags
}