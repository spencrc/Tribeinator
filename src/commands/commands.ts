import type { 
    Message,
    SlashCommandBuilder, 
    ContextMenuCommandBuilder, 
    SlashCommandSubcommandsOnlyBuilder, 
    ChatInputCommandInteraction,
    SlashCommandOptionsOnlyBuilder,
    AutocompleteInteraction
} from "discord.js";

export interface MessageCommand {
    name: string
    description: string
    execute: (message: Message, args: string[]) => Promise<void> | void;
}

export interface SlashCommand {
    data: SlashCommandBuilder | ContextMenuCommandBuilder | SlashCommandSubcommandsOnlyBuilder | SlashCommandOptionsOnlyBuilder
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void> | void
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void
}