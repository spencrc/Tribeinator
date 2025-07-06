import dotenv from "dotenv";
import { Client } from "pg";

dotenv.config();

export const DISCORD_TOKEN: string = process.env.DISCORD_TOKEN as string;
export const DISCORD_CLIENT_ID: string = process.env.DISCORD_CLIENT_ID as string;
export const DISCORD_GUILD_ID: string = process.env.DISCORD_GUILD_ID as string;

export const POSTGRES_USER: string = process.env.POSTGRES_USER as string;
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD as string;

export const pgClient = new Client({
    host: "localhost",
    user: POSTGRES_USER,
    port: 5432,
    password: POSTGRES_PASSWORD,
    database: "postgres"
});