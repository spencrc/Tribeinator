import dotenv from "dotenv";

dotenv.config();

export const DISCORD_TOKEN: string = process.env.DISCORD_TOKEN as string;
export const DISCORD_CLIENT_ID: string = process.env.DISCORD_CLIENT_ID as string;
export const DISCORD_GUILD_ID: string = process.env.DISCORD_GUILD_ID as string;