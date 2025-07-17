import { ChatInputCommandInteraction, Guild, GuildMember, MessageFlags, PermissionFlagsBits, Role, SlashCommandBuilder } from 'discord.js';
import { pool } from '../../database/pool.js';
import { SlashCommand } from '../../classes/slash-command.js';

export default new SlashCommand ({
	data: new SlashCommandBuilder()
		.setName('removegiveablerole')
		.setDescription('Remove a role from the server list of self-grantable roles.')
		.addStringOption(option =>
			option.setName('role')
				.setDescription('The role name')
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
    execute: async (interaction: ChatInputCommandInteraction): Promise<void> => { 
		if (!interaction.guild) return;

		const role_name = interaction.options.getString('role');
		const guild = interaction.guild;
		const member: GuildMember = interaction.member as GuildMember;
		const role = guild.roles.cache.find(role => role.name === role_name);
		const mention = `<@${member.id}>`;

		if (!role) {
			await interaction.reply({
				content: `Sorry ${mention}! Couldn't find a role by the name \`${role_name}\`!-# Role names are case sensitive! Did you forget a capital?`,
				flags: MessageFlags.Ephemeral
			});
			return;
		}

		try {
			await pool.query(
				`DELETE FROM guild_roles WHERE guild_id=$1 AND "role_name"=$2;`,
				[+guild.id, role_name],
			);

			await interaction.reply({
				content: `Found the \`${role_name}\` role and removed it from the list ${mention}!`,
				flags: MessageFlags.Ephemeral
			});
		} catch(error) {
			console.error("Database error occured:", error);
			await interaction.reply({
				content: `Sorry ${mention}! Couldn't find the \`${role_name}\` role in the database!`,
				flags: MessageFlags.Ephemeral
			});
		}
	}
});