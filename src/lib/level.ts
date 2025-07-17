import type { Guild, User } from "discord.js"
import { pool } from "../database/pool.js"

const retrieveCurrentXP = async(guild: Guild, user: User) => {
    let currentXp = 0;
    try {
        const result = await pool.query(
            `SELECT xp FROM guild_levels WHERE guild_id=$1 AND user_id=$2;`,
            [+guild.id, +user.id],
        );

		if (result.rowCount === 0) { // the user doesn't have an entry in the table! we need to make one for them!
            await pool.query(
                `INSERT INTO guild_levels(guild_id, user_id) VALUES (
                    $1, 
                    $2,
                );`,
                [+guild.id, +user.id]
            );
        } else {
            currentXp = result.rows[0].xp;
        }
    } catch(error) {
        console.error("Database error occured:", error);
    }
    return currentXp;
}

export const updateXP = async (guild: Guild, user: User, xpToGive: number, multiplier: number = 1) => {
    const currentXp = await retrieveCurrentXP(guild, user);
    const newXp = currentXp + xpToGive * multiplier;
    try {
        await pool.query(
            `UPDATE guild_levels SET xp=$1, updated_at=current_timestamp WHERE guild_id=$2 AND user_id=$3;`,
            [newXp, +guild.id, +user.id]
        );
    } catch(error) {
        console.error("Database error occured:", error);
    }
}