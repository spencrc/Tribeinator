# Tribeinator
[![discord.js](https://img.shields.io/github/package-json/dependency-version/KevinNovak/Discord-Bot-TypeScript-Template/discord.js)](https://discord.js.org/)

## Commands

This bot is currently a work-in-progress, but has the following commands implemented thus far:

- `/ping`: replies with "Pong!"
- `/membercount`: replies with the server's name and how many members it has.
- `/addgiveablerole`: add a role to the server list of self-grantable roles.
- `/removegiveablerole`: remove a role from the server list of self-grantable roles.
- `/selfrole`: allows you to give yourself a role from a list determined by the server!
- `/removeselfrole`: allows you to remove a role from yourself, from a list determined by the server!

## Setup
1. Install Node.js. Instructions on how to install Node on your system: [Downloading and Installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
2. Install Docker. Download (with operating system options) is at the bottom of this page: [Docker Desktop](https://docs.docker.com/desktop/)
3. Create a `.env` file inside the project's folder, and have it contain the following:

    ```
    DISCORD_TOKEN=token
    DISCORD_CLIENT_ID=client_id
    DISCORD_GUILD_ID=guild_id

    POSTGRES_HOST=hostname
    POSTGRES_USER=username
    POSTGRES_PASSWORD=password

    PGADMIN_DEFAULT_EMAIL=admin@admin.com
    PGADMIN_DEFAULT_PASSWORD=password
    ```
4. Create a Discord application on the [Discord Developer Portal](https://discord.com/developers/applications/).
5. Get your token, client id and guild id.
    - For your token: Navigate to the "Bot" page under Settings, and click "Reset Token" under "TOKEN". Keep it on hand (and safe)! We will need it shortly.
    - For your client id: Navigate to the "General Information" page under Settings, and it will be under "APPLICATION ID". We will also need it shortly!
    - For your guild id: Navigate to the server you want to use as a testing ground, and right click its name. Then, click "Copy Server ID".
6. Replace `token`, `client_id`, and `guild_id` in the `.env` file with the token, client id, and guild id you retrieved.
7. Install packages by running `npm i` in the project's folder.
8. Add your bot to your server. Instructions are here: [Adding your bot to servers](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)
9. Register the slash commands in your guild by running `npm run deploy`.

## Start Scripts

You can run the bot in a few different ways:

1. Development Mode
    - Run `npm run dev`.
    - This will automatically restart the bot every time you update its code.
2. Normal Mode
    - Run `docker compose --profile db up -d`.
    - This will start the PostgreSQL which the bot relies on.
    - Run `npm run build`.
    - This will build the `dist` folder (containing the transpiled JavaScript files) from the `src` folder.
    - Run `npm start`.
    - This will start the bot itself!
3. Containerized Normal Mode
    - Run `bash docker-start.sh`.
    - This will build a Docker image, and then start the Discord bot in a Docker container!
