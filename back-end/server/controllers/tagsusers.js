const {
    TagsUsers
} = require("../models");

async function createTagsUsers(newData) {
    return await TagsUsers.create(newData);
}

async function updateTagsUsers(id, newData) {
    await TagsUsers.destroy({
        where: {
            userId: id
        }
    })
    for (const tag of newData) {
        await TagsUsers.create({
            userId: id,
            tagId: tag.id
        })
    };
    return true;
}

async function destroyTagsUsers(id) {
    return await TagsUsers.destroy({
        where: {
            id: id
        }
    });
}
module.exports = {
    createTagsUsers,
    updateTagsUsers,
    destroyTagsUsers
}