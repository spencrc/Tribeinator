import { REST, Routes } from "discord.js";
import { DISCORD_CLIENT_ID, DISCORD_GUILD_ID, DISCORD_TOKEN } from "./config.js";

const rest: REST = new REST().setToken(DISCORD_TOKEN);

rest.put(Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);