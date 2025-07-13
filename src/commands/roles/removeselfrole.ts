import { ChatInputCommandInteraction, Guild, GuildMember, MessageFlags, Role, SlashCommandBuilder } from 'discord.js';
import { pool } from '../../database/pool.js';
import { SlashCommand } from '../../classes/slash-command.js';

export default new SlashCommand ({
	data: new SlashCommandBuilder()
		.setName('removeselfrole')
		.setDescription('Allows you to remove a role from yourself, from a list determined by the server!')
		.addStringOption(option =>
			option.setName('role')
				.setDescription('The role name')
				.setRequired(true)
		),
	execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		if (!interaction.guild) return;

		const role_name = interaction.options.getString('role', true); // 'role' is a required option! thus, it cannot be null
		const member: GuildMember = interaction.member as GuildMember;
		const guild = interaction.guild;
		const role = guild.roles.cache.find(role => role.name === role_name);
		const mention = `<@${member.id}>`;

		if (!role) {
			await interaction.reply({
				content: `Sorry ${mention}! Couldn't find a role by the name \`${role_name}\`!\n-# Role names are case sensitive! Did you forget a capital?`,
				flags: MessageFlags.Ephemeral
			});
			return;
		}

		if (!member.roles.cache.has(role.id)) {
			await interaction.reply({
				content: `Sorry ${mention}! You don't have the \`${role_name}\` role!`,
				flags: MessageFlags.Ephemeral
			});
			return;
		}

		try {
			const { rowCount } = await pool.query(
				`SELECT role_name FROM guild_roles WHERE guild_id=$1 AND "role_name"=$2;`,
				[+guild.id, role_name]
			);

			if (rowCount! === 0) throw new Error('role unexpectingly not in database'); // row count can never be null, it'll be 0 if no roles were selected

			member.roles.remove(role);
			await interaction.reply({
				content: `Found the \`${role_name}\` role and removed it from ${mention}!`,
				flags: MessageFlags.Ephemeral
			});
		} catch (error) {
			console.error("Database error occured:", error);
			await interaction.reply({
				content: `Sorry ${mention}! Couldn't find the \`${role_name}\` role in the database!`,
				flags: MessageFlags.Ephemeral
			});
		}
	}
});