import { pool } from "./pool.js";

const createGuildRolesTable = async (): Promise<void> => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS "guild_roles" (
            guild_id BIGINT,
            role_name TEXT UNIQUE,
            PRIMARY KEY (guild_id, role_name)
        );
    `)
}

const createGuildLevelsTable = async (): Promise<void> => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS "guild_levels" (
            guild_id BIGINT,
            user_id BIGINT,
            xp INTEGER,
            level INTEGER,
            PRIMARY KEY (guild_id, user_id)
        );
    `)
}

export const migrate = async (): Promise<void> => {
    try {
        await pool.query(`BEGIN`);

        await createGuildRolesTable();
        await createGuildLevelsTable();

        await pool.query(`COMMIT`);
        console.log("Successfully migrated database!");
    } catch (error) {
        console.error("Error creating tables: ", error); //prints the error in the console
        process.exit(1); //terminates the program
    }
}