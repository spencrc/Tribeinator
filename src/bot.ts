import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import { DISCORD_TOKEN, pgClient } from "./config.js";

import type { SlashCommand, MessageCommand } from './commands/commands.js';

interface DiscordClient extends Client {
    commands: Collection<string, SlashCommand>
    msgCommands: Collection<string, MessageCommand>
}

const client: DiscordClient = Object.assign(
	new Client(
    {
        intents: [GatewayIntentBits.Guilds]
    }),
	{
		commands: new Collection<string, SlashCommand>(),
		msgCommands: new Collection<string, MessageCommand>()
	}
)

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
        
		client.commands.set(command.data.name, command);
    }
}

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
	pgClient.connect();
});

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}
});

// Log in to Discord with your client's token
client.login(DISCORD_TOKEN);