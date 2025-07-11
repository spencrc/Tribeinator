import { REST, Routes } from "discord.js";
import { DISCORD_CLIENT_ID, DISCORD_TOKEN } from "./config.js";
import { client } from "./client.js";

// Loads all commands
client.load();

const rest: REST = new REST().setToken(DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing application (/) commands.`);

		// The put method is used to fully refresh all commands globally with the current set
		await rest.put(
			Routes.applicationCommands(DISCORD_CLIENT_ID),
			{ body: client.commands },
		);

		console.log(`Successfully reloaded application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();