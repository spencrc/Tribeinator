import { REST, Routes } from "discord.js";
import { DISCORD_CLIENT_ID, DISCORD_GUILD_ID, DISCORD_TOKEN } from "./config.js";
import { fileURLToPath, pathToFileURL } from 'node:url';
import fs from "node:fs";
import path from "node:path";

import type { SlashCommand, MessageCommand } from './commands/commands.js';

const commands: SlashCommand[] = [];
const __filename: string = fileURLToPath(import.meta.url); //gets this file's name
const __dirname: string = path.dirname(__filename); //gets this file's directory name
const foldersPath: string = path.join(__dirname, "commands");
const commandFolders: string[] = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath: string = path.join(foldersPath, folder);

    if (!fs.statSync(commandsPath).isDirectory()) continue; //ensures that commandsPath is really a directory, not a ".js" file

    const commandFiles: string[] = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); //gets all files, and ensures they end with ".js"

    for (const file of commandFiles) {
        const filePath: string = path.join(commandsPath, file);
        const commandClass = (await import( pathToFileURL(filePath).href ))
            .default
        const command = new commandClass();
        
        commands.push(command.data.toJSON());
    }
}

const rest: REST = new REST().setToken(DISCORD_TOKEN);

(async () => {
	try {
		console.log(`Started refreshing application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		await rest.put(
			Routes.applicationGuildCommands(DISCORD_CLIENT_ID, DISCORD_GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();