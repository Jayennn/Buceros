import {SlashCommandBuilder} from '@discordjs/builders';
import {CommandInteraction} from 'discord.js';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info'),
    async execute(interaction: CommandInteraction) {
        await interaction.reply(`This command was run by ${interaction.user.username}#${interaction.user.discriminator}`);
    }
};
