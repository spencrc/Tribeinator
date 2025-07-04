import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Client, Collection, Events, GatewayIntentBits, MessageFlags } from "discord.js";
import { DISCORD_TOKEN } from "./config.js";

import type { SlashCommand } from './commands/slash-command.js';
import type { MessageCommand } from './commands/message-command.js';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);

	if (!fs.statSync(commandsPath).isDirectory()) continue;

    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

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