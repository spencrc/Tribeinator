import { Client } from "pg";
import { POSTGRES_USER, POSTGRES_PASSWORD } from "./config.js";

const client = new Client({
    host: "localhost",
    user: POSTGRES_USER,
    port: 5432,
    password: POSTGRES_PASSWORD,
    database: "postgres"
});

client.connect();

client.query(`SELECT role_name FROM guild_roles WHERE guild_id=490977006616313867`, (err, result) =>{
    if (!err) {
        const names: string[] = [];
        for (const row of result.rows) {
            const role_name: string = row.role_name;
            names.push(role_name);
        }
        console.log(names);
    } else {
        console.error(err.message);
    }
    client.end();
})

// client.query(
//     `INSERT INTO guild_roles(
//         guild_id, role_name)
//         VALUES (490977006616313867, 'Minecraft'); `, 
//     (err, result)=>{
//         if(!err) console.log("Success!");
//         else console.error(err.message);
//         client.end();
//     }
// );

// client.query(
//     `DELETE FROM guild_roles
//         WHERE role_name = 'Minecraft'
//         AND guild_id = 490977006616313867; `, 
//     (err, result)=>{
//         if(!err) console.log("Success!");
//         else console.error(err.message);
//         client.end();
//     }
// );