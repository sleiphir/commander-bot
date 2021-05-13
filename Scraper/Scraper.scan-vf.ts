import emojis from "../emojis";
import { AbstractScraper } from "./AbstractScraper";

export class ScanvfScraper extends AbstractScraper {

    constructor () {
        super();
        this.name = "scan-vf";
        this.URL = "https://www.scan-vf.net/[manga]/chapitre-[scan]";
        this.lastScanURL = "https://www.scan-vf.net/[manga]";
        this.joinChar = "_";
        this.lang = emojis.flags.fr;
    }

    protected async getLastScan (): Promise<number> {
        const $ = await this.fetchHTML(this.lastScanURL.replace("[manga]", this.manga));

        if ($ === null) { return null; }

        const { data } = ($(".chapters > li > h5 > a")[0].children[0] as any);

        return Number(data.split(" ").pop());
    }

    protected async checkURL (): Promise<boolean> {
        const $ = await this.fetchHTML(
            this.URL
                .replace("[manga]", this.manga)
                .replace("[scan]", this.scan.toString())
        );

        if ($ === null) { return false; }

        const { data } = ($(".page-header > h1 > b")[0]?.children[0] as any);

        if (Number(data.match(/(?<=#)(.*?)(?=:)/g)) === this.scan) {
            return true;
        }

        return false;
    }

}
