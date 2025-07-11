import dotenv from "dotenv";

dotenv.config();

export const DISCORD_TOKEN: string = process.env.DISCORD_TOKEN as string;
export const DISCORD_CLIENT_ID: string = process.env.DISCORD_CLIENT_ID as string;

export const POSTGRES_HOST: string = process.env.POSTGRES_HOST as string;
export const POSTGRES_USER: string = process.env.POSTGRES_USER as string;
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD as string;