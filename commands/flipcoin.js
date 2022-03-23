const { SlashCommandBuilder } = require('@discordjs/builders');
const random = require('random');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('flipcoin')
		.setDescription('Replies with Heads or Tails'),
	async execute(interaction) {

        var coin = [
            "Heads!",
            "Tails!"
        ]

        var i = flipCoin()

        await interaction.reply(coin[i]);
	},
};

function flipCoin() {
    x = random.int(0,1);
    return x;
}