import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import type { SlashCommand } from "../commands.js";

export default class implements SlashCommand {
	public data = new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
	public async execute(interaction: ChatInputCommandInteraction): Promise<void> {
		await interaction.reply('Pong!');
	}
};