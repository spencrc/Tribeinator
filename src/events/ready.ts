import { Client, Events, ClientUser } from "discord.js";

export default {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        const user: ClientUser = client.user as ClientUser;
        console.log(`Ready! Logged in as ${user.tag}`);
    }
}