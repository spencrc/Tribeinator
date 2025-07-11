import { Client, Collection, GatewayIntentBits } from "discord.js"
import { SlashCommand } from "./classes/slash-command.js"

interface DiscordClient extends Client {
    commands: Collection<string, SlashCommand>
    //msgCommands: Collection<string, MessageCommand>
}

export const client: DiscordClient = Object.assign(
	new Client(
    {
        intents: [GatewayIntentBits.Guilds]
    }),
	{
		commands: new Collection<string, SlashCommand>(),
		//msgCommands: new Collection<string, MessageCommand>()
	}
)