import { Client, Message } from "discord.js";
import { AbstractCommand, CommandType } from "./AbstractCommand";
import axios from "axios";

export class KanyeCommand extends AbstractCommand<CommandType.ping> {

    constructor (client: Client, message: Message, args?: string[]) {
        super(client, message, args);
        this.middlewares = [];
    }

    async execute (): Promise<void> {
        if (!this.canExecute()) { return; }

        const quote = await (await axios.get("https://api.kanye.rest")).data.quote;

        this.message.channel.send(`Kanye said, _${quote}_`);
    }

}
