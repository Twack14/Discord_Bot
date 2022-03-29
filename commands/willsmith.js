const { SlashCommandBuilder } = require('@discordjs/builders');
var gif = 'https://c.tenor.com/BpCSsMEt-54AAAAd/stfu-shut-up.gif'

module.exports = {
	data: new SlashCommandBuilder()
		.setName('willsmith')
		.setDescription('Replies with a gif of Will Smith slapping Chris Rock'),
	async execute(interaction) {
        await interaction.reply(`Keep my wife's name out yo FUCKIN MOUTH\n${gif}`);
	},
};