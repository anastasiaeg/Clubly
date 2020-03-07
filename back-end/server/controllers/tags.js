const {
    Tags
} = require("../models");

async function createTag(newData) {
    return await Tags.create(newData);
}

async function getAllTags() {
    return await Tags.findAll({});
}

async function getTag(id) {
    return await Tags.findOne({
        where: {
            id: id
        }
    })
}

async function updateTag(id, newData) {
    return await Tags.update({
        name: newData.name
    }, {
        where: {
            id: id
        },
        returning: true
    })
}

module.exports = {
    createTag,
    getAllTags,
    getTag,
    updateTag
}