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

client.query(`SELECT * FROM users WHERE location='Ottawa'`, (err, result) =>{
    if (!err) {
        const user = result.rows[0];
        const firstname: string = user.firstname;
        const lastname: string = user.lastname;
        const location: string = user.location;
        console.log(`The user ${firstname} ${lastname} is from ${location}!`);
    } else {
        console.error(err.message);
    }
    client.end();
})