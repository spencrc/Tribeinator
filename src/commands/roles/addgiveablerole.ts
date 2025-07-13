import { ChatInputCommandInteraction, Guild, GuildMember, MessageFlags, PermissionFlagsBits, Role, SlashCommandBuilder } from 'discord.js';
import { pool } from '../../database/pool.js';
import { SlashCommand } from '../../classes/slash-command.js';

export default new SlashCommand ({
	data: new SlashCommandBuilder()
		.setName('addgiveablerole')
		.setDescription('Add a role to the server list of self-grantable roles.')
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
				content: `Sorry ${mention}! Couldn't find a role by the name \`${role_name}\`!\n-# Role names are case sensitive! Did you forget a capital?`,
				flags: MessageFlags.Ephemeral
			});
			return;
		}

		try {
			await pool.query(
				`INSERT INTO guild_roles(guild_id, "role_name") VALUES ($1, $2);`,
				[+guild.id, role_name],
			);

			await interaction.reply({
				content: `Found the \`${role_name}\` role and added it to the list ${mention}!`,
				flags: MessageFlags.Ephemeral
			});
		} catch(error) {
			await interaction.reply({
				content: `Sorry ${mention}! Couldn't find the \`${role_name}\` role in the database or it was a duplicate!`,
				flags: MessageFlags.Ephemeral
			});
		}
	}
});