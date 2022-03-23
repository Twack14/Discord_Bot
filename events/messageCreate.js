const update = require('../db_functions/updatePointsLevelUp')

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        if (message.author.bot) return;
        var tag = message.author.tag
        update.updatePointsLevelUp(tag, message);
    }
};