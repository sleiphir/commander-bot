import { Client, Message, MessageEmbed } from "discord.js";
import { AbstractCommand, CommandType } from "./AbstractCommand";
import { isNumberArguments, isSecondNumberBiggerThanFirst } from "./middlewares";

export class RandomCommand extends AbstractCommand<CommandType.random> {

    constructor (client: Client, message: Message, args?: string[]) {
        super(client, message, args);
        this.middlewares = [
            isNumberArguments(this.args),
            isSecondNumberBiggerThanFirst(this.args),
            this.args?.length <= 2
        ];
    }

    async execute (): Promise<void> {
        if (!this.canExecute()) {
            this.message.reply(new MessageEmbed().setDescription(`invalid input: ${this.args}`));

            return;
        }

        const max = this.args[1] ?? this.args[0];
        const min = this.args[1] ? this.args[0] : 0;
        const random = Math.round(Number(min) + Math.random() * (Number(max) - Number(min)));

        this.message.reply(
            new MessageEmbed()
                .setColor("#0099ff")
                .setTitle(random.toLocaleString())
                .setDescription(`Number between ${Number(min).toLocaleString()} and ${Number(max).toLocaleString()}.`)
        );
    }

}
