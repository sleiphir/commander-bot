import axios from "axios";
import { Client, Message, MessageEmbed } from "discord.js";
import { AbstractCommand, CommandType } from "./AbstractCommand";
import animeQuery from "./anime/anime.query";
import Anime from "./anime/anime.type";
import { capitalize } from "../utils";

export class AnimeCommand extends AbstractCommand<CommandType> {

    private animeTitle: string;

    constructor (client: Client, message: Message, args?: string[]) {
        super(client, message, args);
        this.middlewares = [args?.length > 0];
        this.animeTitle = this.args.join(" ");
    }

    async queryAniList (query: string, variables: { search: string, page: number, perPage: number }): Promise<any> {
        const url = "https://graphql.anilist.co";
        const options = {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                query: query,
                variables: variables,
            }),
        };

        const result = await axios.post(url, options.body, { headers: options.headers });

        return result.data.data.Page.media[0];
    }

    async execute (): Promise<void> {
        if (!this.canExecute()) { return; }

        const anime = await this.queryAniList(animeQuery, {
            search: this.animeTitle,
            page: 1,
            perPage: 1,
        });

        if (!anime) {
            this.message.channel.send(
                new MessageEmbed()
                    .setAuthor("Anilist API", "https://anilist.co/img/icons/android-chrome-512x512.png", "https://anilist.co/")
                    .setDescription("Not found")
            );

            return;
        }

        this.message.channel.send(this.createAnimeEmbed(anime));
    }

    // eslint-disable-next-line complexity
    createAnimeEmbed (anime: Anime): MessageEmbed {
        const description = anime.description.length > 200
            ? `${anime.description.substr(0, 250).replace(/<br>/g, "")}...`
            : anime.description.replace(/<br>/g, "");

        if (anime.status === "NOT_YET_RELEASED" || anime.status === "CANCELLED") {
            return new MessageEmbed()
                .setTitle(anime.title.romaji)
                .setAuthor("Anilist API", "https://anilist.co/img/icons/android-chrome-512x512.png", "https://anilist.co/")
                .setDescription(description)
                .setURL(anime.siteUrl)
                .setThumbnail(anime.coverImage.extraLarge)
                .addField("Format", `\`${anime.format}\``, true)
                .addField("Studio", `\`${anime.studios.nodes[0].name}\``, true)
                .addField("Status", `\`${capitalize(anime.status.replace(/_/g, " "))}\``, true)
                .setImage(anime.bannerImage)
                .setTimestamp();
        }

        const startDate = new Date(`${anime.startDate.year}/${anime.startDate.month}/${anime.startDate.day}`);
        const endDate = anime.endDate.year !== null ? new Date(`${anime.endDate.year}/${anime.endDate.month}/${anime.endDate.day}`) : null;
        const episodes = endDate !== null ? anime?.episodes : `${Number(anime?.nextAiringEpisode?.episode) - 1}` ?? 0;
        const dateOptions = {
            year: "numeric" as const, month: "short" as const, day: "numeric" as const,
        };
        const dates = endDate
            ? `${startDate.toLocaleDateString("en-US", dateOptions)} - ${endDate.toLocaleDateString("en-US", dateOptions)}`
            : `since ${startDate.toLocaleDateString("en-US", dateOptions)}`;
        const platform = anime?.streamingEpisodes[0]?.site !== undefined
            ? `[${anime?.streamingEpisodes[0]?.site}](${anime?.streamingEpisodes[0]?.url})`
            : "`not available`";

        return new MessageEmbed()
            .setTitle(anime.title.romaji)
            .setAuthor("Anilist API", "https://anilist.co/img/icons/android-chrome-512x512.png", "https://anilist.co/")
            .setDescription(description)
            .setURL(anime.siteUrl)
            .setThumbnail(anime.coverImage.extraLarge)
            .addField("Format", `\`${anime.format}\``, true)
            .addField("Studio", `\`${anime.studios.nodes[0].name}\``, true)
            .addField("Available on", platform, true)
            .addField("Episodes", `\`${episodes}\``, true)
            .addField("Season", `\`${capitalize(anime.season)} ${anime.seasonYear}\``, true)
            .addField("Mean Score", `\`${anime.meanScore}%\``, true)
            .addField(endDate ? "Aired" : "Airing", `\`${dates}\``)
            .setImage(anime.bannerImage)
            .setTimestamp();
    }

}

