import type { 
    Message,
    SlashCommandBuilder, 
    ContextMenuCommandBuilder, 
    SlashCommandSubcommandsOnlyBuilder, 
    ChatInputCommandInteraction 
} from "discord.js";

export interface MessageCommand {
    name: string
    description: string
    execute: (message: Message, args: string[]) => Promise<void> | void;
}

export interface SlashCommand {
    data: SlashCommandBuilder | ContextMenuCommandBuilder | SlashCommandSubcommandsOnlyBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void
}