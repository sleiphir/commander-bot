import { Client, Message } from "discord.js";
import { AbstractCommand, CommandType } from "./AbstractCommand";
import { isAdmin } from "./middlewares";

export class SayCommand extends AbstractCommand<CommandType.say> {

    constructor (protected client: Client, protected message: Message, protected args?: string[]) {
        super(client, message, args);
        this.middlewares = [isAdmin(this.member), args?.length > 0];
    }

    async execute (): Promise<void> {
        if (!this.canExecute()) { return; }

        this.message.reply(this.args.join(" "));
    }

}
