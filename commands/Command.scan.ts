import { Client, Message, MessageEmbed } from "discord.js";
import { IScraper } from "../Scraper/IScraper";
import scrapers from "../Scraper/scrapers";
import { AbstractCommand, CommandType } from "./AbstractCommand";
import config from "../config";

export class ScanCommand extends AbstractCommand<CommandType.scan> {

    private scrapers: IScraper[];

    constructor (client: Client, message: Message, args?: string[]) {
        super(client, message, args);

        this.middlewares = [
            this.args?.length >= 1,
            (this.args[this.args.length - 2] === "|" && !isNaN(Number(this.args[this.args.length - 1]))) || this.args[this.args.length - 2] !== "|"
        ];

        this.scrapers = scrapers;
    }

    async getScrapersResult (manga: string, scan: number): Promise<string[]> {
        const promises: Promise<string>[] = [];

        this.scrapers.forEach(scraper => {
            promises.push(scraper.getScan(manga, scan).then(url => {
                const str = url ? `${scraper.lang}\u3000**${scraper.name}**\n ${url}\n` : null;

                return str;
            }));
        });

        return Promise.all(promises);
    }

    async execute (): Promise<void> {
        if (!this.canExecute()) {
            this.message.reply(new MessageEmbed().setDescription(`invalid input: ${this.args}\n\`${config.app.prefix}scan [manga] | [scan]\``));

            return;
        }

        const [manga, scan] = this.parse();
        const results = await this.getScrapersResult(manga, scan);

        this.sendResults(results, scan);
    }

    parse (): [string, number] {
        let scan: number = null;
        let manga: string = null;

        if (this.args[this.args.length - 2] === "|" && !isNaN(Number(this.args[this.args.length - 1]))) {
            scan = Number(this.args.pop());
            this.args.pop();
        }

        manga = this.args.join(" ");


        return [manga, scan];
    }

    sendResults (results: string[], scan: number): void {
        if (results.some(result => result !== null)) {
            this.message.reply(
                new MessageEmbed()
                    .setDescription(results.join("\n"))
            );
        } else {
            this.message.reply(
                new MessageEmbed()
                    .setDescription(`Nothing found for '${this.args.join(" ")}' ${scan ? `scan '${scan}'` : ""}`)
            );
        }
    }

}
