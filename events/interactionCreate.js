module.exports = {
    name: 'interactionCreate',
    async execute(client, interaction) {
        console.log(`\n${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
        //console.log(interaction.channel.name);
        if (!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }

    }
}