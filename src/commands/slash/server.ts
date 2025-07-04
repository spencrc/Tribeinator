import { SlashCommandBuilder, ChatInputCommandInteraction, Guild } from 'discord.js';
import { SlashCommand } from '../slash-command.js';

export default class implements SlashCommand {
	public data = new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.')
	public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		let guild = interaction.guild as Guild
		await interaction.reply(`This server is ${guild.name} and has ${guild.memberCount} members!`);
	}
};