import { ChatInputCommandInteraction, Guild, GuildMember, MessageFlags, Role, SlashCommandBuilder } from 'discord.js';
import { pgClient } from '../../config.js';
import type { SlashCommand } from "../commands.js";

export default class implements SlashCommand {
	public data = new SlashCommandBuilder()
		.setName('getrole')
		.setDescription('Allows you to give yourself a role from a list determined by the server!')
		.addStringOption(option =>
			option.setName('role')
				.setDescription('The role name')
				.setRequired(true)
		)
	public execute(interaction: ChatInputCommandInteraction): void {
		const role_name = interaction.options.getString('role');
		const member: GuildMember = interaction.member as GuildMember;
		const guild: Guild = interaction.guild as Guild;
		pgClient.query(`SELECT role_name FROM guild_roles WHERE guild_id=$1 AND role_name=$2;`, [+guild.id, role_name], async (err, result) =>{
			const rowCount: number = result.rowCount as number;
			if (!err && rowCount > 0) {
				const role: Role = guild.roles.cache.find(role => role.name === role_name) as Role;
				member.roles.add(role);
				await interaction.reply({
					content: `Found the ${role_name} role and gave it to <@${member.id}>!`,
					flags: MessageFlags.Ephemeral
				});
			} else {
				await interaction.reply({
					content: `Sorry <@${member.id}>! Couldn't find the ${role_name} role!`,
					flags: MessageFlags.Ephemeral
				});
			}
		});
	}
};