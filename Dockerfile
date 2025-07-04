# The bot is written in TypeScript, so we need Node. I picked the LTS out of preference, and ensured the image is "alpine" so it's smaller.
FROM node:lts-alpine

# Create app directory.
WORKDIR /app

# Copy and install our bot's packages.
COPY package.json ./
RUN npm install

# Copies the actual bot's code and compiles it.
COPY . .
RUN npm run build

# Runs the bot!
CMD ["npm", "start"]
