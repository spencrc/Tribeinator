import { ChatInputCommandInteraction, GuildMember, MessageFlags, Role, SlashCommandBuilder, SlashCommandStringOption } from 'discord.js';
import { pool } from '../../database/pool.js';
import { SlashCommand } from '../../classes/slash-command.js';

const addRoleOption = (option: SlashCommandStringOption) => option.setName('role').setDescription('The role name').setRequired(true);

const addSelfRole = async (interaction: ChatInputCommandInteraction, member: GuildMember, mention: string, role: Role, roleName: string): Promise<void> => {
	await member.roles.add(role);
	await interaction.reply({
		content: `Found the \`${roleName}\` role and gave it to ${mention}.`,
		flags: MessageFlags.Ephemeral
	});
}

const removeSelfRole = async (interaction: ChatInputCommandInteraction, member: GuildMember, mention: string, role: Role, roleName: string): Promise<void> => {
	await member.roles.remove(role);
	await interaction.reply({
		content: `Found the \`${roleName}\` role and removed it from ${mention}.`,
		flags: MessageFlags.Ephemeral
	});
}

export default new SlashCommand ({
	data: new SlashCommandBuilder()
		.setName('selfrole')
		.setDescription('See role choices, add a role, or remove a role')
		.addSubcommand(subcommand =>
			subcommand
				.setName('add')
				.setDescription('Allows you to give yourself a role from the server list')
				.addStringOption(addRoleOption)
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName('remove')
				.setDescription('Remove a role from yourself from the server list')
				.addStringOption(addRoleOption)
		),
	execute: async (interaction: ChatInputCommandInteraction): Promise<void> => {
		if (!interaction.guild) return;
		
		const roleName: string = interaction.options.getString('role') as string;
		const member: GuildMember = interaction.member as GuildMember;
		const guild = interaction.guild;
		const role = guild.roles.cache.find(role => role.name === roleName);
		const mention = `<@${member.id}>`;

		if (!role) {
			await interaction.reply({
				content: `Sorry ${mention}! Couldn't find a role by the name \`${roleName}\`\n-# Role names are case sensitive! Did you forget a capital?`,
				flags: MessageFlags.Ephemeral
			});
			return;
		}

		try {
			const { rowCount } = await pool.query(
				`SELECT role_name FROM guild_roles WHERE guild_id=$1 AND "role_name"=$2;`,
				[+guild.id, roleName]
			);
			
			if (rowCount! === 0) throw new Error('role unexpectingly not in database'); // row count can never be null, it'll be 0 if no roles were selected

			switch (interaction.options.getSubcommand()) {
				case('add'): 
					await addSelfRole(interaction, member, mention, role, roleName);
					break;
				case('remove'):
					await removeSelfRole(interaction, member, mention, role, roleName);
					break;
				case('list'):
					break;
				default:
					console.warn(`Unhandled subcommand!`)
			}
		} catch(error) {
			console.error(error);
			await interaction.reply({
				content: `Sorry ${mention}! Couldn't find the \`${roleName}\` role in the database!`,
				flags: MessageFlags.Ephemeral
			});
		}
	}
});