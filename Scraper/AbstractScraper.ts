import axios, { AxiosRequestConfig } from "axios";
import * as cheerio from "cheerio";
import { IScraper } from "./IScraper";

export abstract class AbstractScraper implements IScraper {

    name: string;

    URL: string;

    lastScanURL: string;

    manga: string;

    scan: number;

    lang: string;

    // character used to join all the words of the title of the manga
    joinChar: string;

    // public abstract getScan (manga: string, scan: number): Promise<string>;
    async getScan (manga: string, scan: number): Promise<string> {
        this.manga = manga
            .toLowerCase()
            .split(" ")
            .join(this.joinChar);
        this.scan = !scan ? await this.getLastScan() : scan;

        if (!this.scan) { return null; }

        if (await this.checkURL()) {
            return this.URL
                .replace("[manga]", this.manga)
                .replace("[scan]", this.scan.toString());
        }

        return null;
    }

    protected async fetchHTML (url: string, options?: AxiosRequestConfig): Promise<cheerio.Root> {
        try {
            const html = await axios.get(url, options);

            return cheerio.load(html.data);
        } catch {
            return null;
        }
    }

    protected abstract getLastScan(): Promise<number>;

    protected abstract checkURL(): Promise<boolean>;

}
