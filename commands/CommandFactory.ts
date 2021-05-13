import { Client, Message } from "discord.js";
import { AbstractCommand, CommandType } from "./AbstractCommand";
import { AnimeCommand } from "./Command.anime";
import { KanyeCommand } from "./Command.kanye";
import { PingCommand } from "./Command.ping";
import { RandomCommand } from "./Command.random";
import { SayCommand } from "./Command.say";
import { ScanCommand } from "./Command.scan";

export class CommandFactory {

    // eslint-disable-next-line complexity
    createCommand (client: Client, message: Message, input: string, args: string[]): AbstractCommand<typeof CommandType> {
        const commandType = input as keyof typeof CommandType ?? null;
        let command: AbstractCommand<typeof commandType>;

        switch(commandType) {
        case "ping":
            command = new PingCommand(client, message, args);
            break;
        case "say":
            command = new SayCommand(client, message, args);
            break;
        case "random":
            command = new RandomCommand(client, message, args);
            break;
        case "kanye":
            command = new KanyeCommand(client, message, args);
            break;
        case "anime":
            command = new AnimeCommand(client, message, args);
            break;
        case "scan":
            command = new ScanCommand(client, message, args);
            break;
        default:
            command = null;
        }

        return command;
    }

}
