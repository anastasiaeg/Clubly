const {
    ClubsUsers
} = require("../models");

async function createClubsUsers(newData) {
    return await ClubsUsers.create(newData);
}

async function updateClubsUsers(id, newData) {
    return await ClubsUsers.update({
        clubId: newData.clubId,
        userId: newData.userId
    }, {
        where: {
            id: id
        },
        returning: true
    });
}

async function destroyClubsUsers(id) {
    return await ClubsUsers.destroy({
        where: {
            id: id
        }
    });
}
module.exports = {
    createClubsUsers,
    updateClubsUsers,
    destroyClubsUsers
}