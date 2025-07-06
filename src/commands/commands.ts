import type { 
    Message,
    SlashCommandBuilder, 
    ContextMenuCommandBuilder, 
    SlashCommandSubcommandsOnlyBuilder, 
    ChatInputCommandInteraction,
    SlashCommandOptionsOnlyBuilder
} from "discord.js";

export interface MessageCommand {
    name: string
    description: string
    execute: (message: Message, args: string[]) => Promise<void> | void;
}

export interface SlashCommand {
    data: SlashCommandBuilder | ContextMenuCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void
}