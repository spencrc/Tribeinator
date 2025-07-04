import type { 
    Message,
} from "discord.js";

export interface MessageCommand {
    name: string
    description: string
    execute: (message: Message, args: string[]) => Promise<void> | void;
}