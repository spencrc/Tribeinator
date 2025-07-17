import { client } from './client.js';
import { migrate } from "./database/migration.js";

// Migrate PostgreSQL tables to local database
await migrate();

// Start Discord bot by loading all commands and events, then login using your client's token
await client.start();