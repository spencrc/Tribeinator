import { ChatInputCommandInteraction, Guild, GuildMember, MessageFlags, PermissionFlagsBits, Role, SlashCommandBuilder } from 'discord.js';
import { pgClient } from '../../config.js';
import type { SlashCommand } from "../commands.js";

export default class implements SlashCommand {
	public data = new SlashCommandBuilder()
		.setName('removegiveablerole')
		.setDescription('Remove a role from the server list of self-grantable roles.')
		.addStringOption(option =>
			option.setName('role')
				.setDescription('The role name')
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);
    public async execute(interaction: ChatInputCommandInteraction): Promise<void> { 
		const role_name = interaction.options.getString('role');
		const guild: Guild = interaction.guild as Guild;
		const member: GuildMember = interaction.member as GuildMember;
		const role = guild.roles.cache.find(role => role.name === role_name);

		if (role != undefined) {
			pgClient.query(`DELETE FROM guild_roles WHERE guild_id=$1 AND role_name=$2;`, [+guild.id, role_name], async (err, result) =>{
				if (!err) {
					await interaction.reply({
						content: `Found the \`${role_name}\` role and removed it from the list, <@${member.id}>!`,
						flags: MessageFlags.Ephemeral
					});
				} else {
					await interaction.reply({
						content: `Sorry <@${member.id}>! Couldn't find the ${role_name} role!`,
						flags: MessageFlags.Ephemeral
					});
				}
			});
		} else {
			await interaction.reply({
				content: `Sorry <@${member.id}>! Couldn't find the ${role_name} role!`,
				flags: MessageFlags.Ephemeral
			});
		}
	}
};