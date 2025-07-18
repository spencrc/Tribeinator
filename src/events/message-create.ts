import { Events, Message } from 'discord.js';
import { Event } from '../classes/event.js';
import { updateXP } from '../lib/level.js';

export default new Event({
	name: Events.MessageCreate,
	execute: async (message: Message): Promise<void> => {
		if (!message.guild || message.author.bot) return;

		//TODO: add no xp channels (probably needs a settings table...)
		//TODO: add timestamp so spamming isn't possible

		await updateXP(message.guild, message.author, 10);
	}
});
