const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cock')
		.setDescription('Just give it a shot'),
	async execute(interaction) {
        await interaction.reply("https://media.giphy.com/media/l378z63MdA0vnpGr6/giphy.gif");
	},
};