import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { DISCORD_TOKEN } from "./config.js";
import { client } from './client.js';
import { migrate } from "./database/migration.js";

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
        const command = (await import( pathToFileURL(filePath).href ))
			.default;
        
		client.commands.set(command.data.name, command);
    }
}

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath);

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = (await import ( pathToFileURL(filePath).href ))
		.default;
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Migrate PostgreSQL tables to local database
migrate();

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);