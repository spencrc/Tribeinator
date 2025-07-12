import { SlashCommandBuilder, ChatInputCommandInteraction, Guild } from 'discord.js';
import { SlashCommand } from '../../classes/slash-command.js';

export default new SlashCommand ({
	data: new SlashCommandBuilder()
		.setName('membercount')
		.setDescription('Provides the number of members in a server.'),
	execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		let guild = interaction.guild as Guild
		await interaction.reply(`This server is ${guild.name} and has ${guild.memberCount} members!`);
	}
});