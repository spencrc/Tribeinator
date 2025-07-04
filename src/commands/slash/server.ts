import { SlashCommandBuilder, ChatInputCommandInteraction, Guild } from 'discord.js';
import type { SlashCommand } from "../commands.js";

export default class implements SlashCommand {
	public data = new SlashCommandBuilder()
		.setName('membercount')
		.setDescription('Provides the number of members in a server.')
	public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		let guild = interaction.guild as Guild
		await interaction.reply(`This server is ${guild.name} and has ${guild.memberCount} members!`);
	}
};