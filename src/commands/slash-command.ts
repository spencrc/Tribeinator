import type { 
    SlashCommandBuilder, 
    ContextMenuCommandBuilder, 
    SlashCommandSubcommandsOnlyBuilder, 
    ChatInputCommandInteraction 
} from "discord.js";

export interface SlashCommand {
    data: SlashCommandBuilder | ContextMenuCommandBuilder | SlashCommandSubcommandsOnlyBuilder
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void
}