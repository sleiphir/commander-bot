import emojis from "../emojis";
import { AbstractScraper } from "./AbstractScraper";

export class ScantradScraper extends AbstractScraper {

    constructor () {
        super();
        this.name = "scantrad";
        this.URL = "https://scantrad.net/mangas/[manga]/[scan]";
        this.lastScanURL = "https://scantrad.net/[manga]";
        this.joinChar = "-";
        this.lang = emojis.flags.fr;
    }

    protected async getLastScan (): Promise<number> {
        const $ = await this.fetchHTML(this.lastScanURL.replace("[manga]", this.manga));

        if ($ === null) { return null; }

        return Number(($("#chapitres > .chapitre > .ch-left > .chl-titre > .chl-num")[0]?.children[0] as any)?.data.split(" ").pop());
    }

    protected async checkURL (): Promise<boolean> {
        const $ = await this.fetchHTML(
            this.URL
                .replace("[manga]", this.manga)
                .replace("[scan]", this.scan.toString()),
            { maxRedirects: 0 }
        );

        if ($ === null) { return false; }

        return true;
    }

}
