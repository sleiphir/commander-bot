import { CommandFactory } from "./commands/CommandFactory";
import { Client } from "discord.js";
import config from "./config";

const client = new Client();

client.on("ready", () => {
    console.info(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("you", { type: "WATCHING" });
});

client.on("message", async msg => {
    if (msg.content.startsWith(config.app.prefix)) {
        const factory = new CommandFactory();
        const [commandType, ...args] = msg.content.substr(config.app.prefix.length).split(" ");
        const command = factory.createCommand(client, msg, commandType, args);

        if (command) {
            await command.execute();
        }
    }
});

client.login(config.app.token);

