import emojis from "../emojis";
import { AbstractScraper } from "./AbstractScraper";

export class LelscansScraper extends AbstractScraper {

    constructor () {
        super();
        this.name = "lelscans";
        this.URL = "https://lelscans.net/scan-[manga]/[scan]";
        this.lastScanURL = "https://lelscans.net/lecture-en-ligne-[manga].php";
        this.joinChar = "-";
        this.lang = emojis.flags.fr;
    }

    protected async getLastScan (): Promise<number> {
        const $ = await this.fetchHTML(this.lastScanURL.replace("[manga]", this.manga));

        if ($ === null) { return null; }

        return Number(($("#header-image > h2 > div:nth-child(4) > a > span")[0]?.children[0] as any)?.data);
    }

    protected async checkURL (): Promise<boolean> {
        const $ = await this.fetchHTML(
            this.URL
                .replace("[manga]", this.manga)
                .replace("[scan]", this.scan.toString()),
            { maxRedirects: 0 }
        );

        if ($ === null) { return false; }

        const data = ($(".lien-chapitre > span")[0]?.children[0] as any)?.data;

        return Number(data) === this.scan;
    }

}
