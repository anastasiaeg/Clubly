const {
    ClubsTags
} = require("../models");

async function createClubsTags(newData) {
    return await ClubsTags.create(newData);
}

async function updateClubsTags(id, newData) {
    return await ClubsTags.update({
        clubId: newData.clubId,
        tagId: newData.tagId
    }, {
        where: {
            id: id
        },
        returning: true
    });
}

async function destroyClubsTags(id) {
    return await ClubsTags.destroy({
        where: {
            id: id
        }
    });
}
module.exports = {
    createClubsTags,
    updateClubsTags,
    destroyClubsTags
}