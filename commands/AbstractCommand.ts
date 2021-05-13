import { Client, GuildMember, Message, User } from "discord.js";

export enum CommandType {
    ping,
    say,
    random,
    kanye,
    anime,
    scan
}

export abstract class AbstractCommand<CommandType> {

    protected middlewares: boolean[]

    protected author: User;

    protected member: GuildMember;

    constructor (protected client: Client, protected message: Message, protected args?: string[]) {
        this.author = this.message.author;
        this.member = this.message.member;
        this.args = args;
    }

    abstract execute(): Promise<void>;

    canExecute (): boolean {
        if (this.middlewares.length === 0) { return true; }

        return this.middlewares.reduce((acc, curr) => acc && curr);
    }

}
