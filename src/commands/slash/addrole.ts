import { ChatInputCommandInteraction, Guild, GuildMember, MessageFlags, PermissionFlagsBits, Role, SlashCommandBuilder } from 'discord.js';
import { pgClient } from '../../config.js';
import type { SlashCommand } from "../commands.js";

export default class implements SlashCommand {
	public data = new SlashCommandBuilder()
		.setName('addgiveablerole')
		.setDescription('Add a role to the server list of self-grantable roles.')
		.addStringOption(option =>
			option.setName('role')
				.setDescription('The role name')
				.setRequired(true)
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles);
    public async execute(interaction: ChatInputCommandInteraction): Promise<void> { //TODO: currently does the same thing as /giverole, should insert role into db!
		const role_name = interaction.options.getString('role');
		const guild: Guild = interaction.guild as Guild;
		const member: GuildMember = interaction.member as GuildMember;
		const role = guild.roles.cache.find(role => role.name === role_name);

		if (role != undefined) {
			pgClient.query(`INSERT INTO guild_roles(guild_id, role_name) VALUES ($1, $2);`, [+guild.id, role_name], async (err, result) =>{
				if (!err) {
					await interaction.reply({
						content: `Found the ${role_name} role and added it to the list, <@${member.id}>!`,
						flags: MessageFlags.Ephemeral
					});
				} else {
					await interaction.reply({
						content: `Sorry <@${member.id}>! Couldn't find the ${role_name} role or it was a duplicate!`,
						flags: MessageFlags.Ephemeral
						});
				}
			});
			return;
		}
		await interaction.reply({
			content: `Sorry <@${member.id}>! Couldn't find the ${role_name} role!`,
			flags: MessageFlags.Ephemeral
		});
	}
};