import { Client, Message, MessageEmbed } from "discord.js";
import { AbstractCommand, CommandType } from "./AbstractCommand";
import emojis from "../emojis";

export class PingCommand extends AbstractCommand<CommandType.ping> {

    constructor (client: Client, message: Message, args?: string[]) {
        super(client, message, args);
        this.middlewares = [];
    }

    async execute (): Promise<void> {
        if (!this.canExecute()) { return; }

        const ping = Date.now() - this.message.createdTimestamp;

        const embed = new MessageEmbed()
            .setColor("#ff2200")
            .setTitle(`${emojis.ping}  ${ping.toLocaleString()} ms`)
            .setDescription(`API latency ${this.client.ws.ping} ms`)

        ;

        this.message.reply(embed);
    }

}
