import emojis from "../emojis";
import { AbstractScraper } from "./AbstractScraper";

export class ScansmangasxyzScraper extends AbstractScraper {

    constructor () {
        super();
        this.name = "scansmangasxyz";
        this.URL = "https://scansmangas.xyz/scan-[manga]-[scan]";
        this.lastScanURL = "https://scansmangas.xyz/manga/[manga]";
        this.joinChar = "-";
        this.lang = emojis.flags.fr;
    }

    protected async getLastScan (): Promise<number> {
        const $ = await this.fetchHTML(this.lastScanURL.replace("[manga]", this.manga));

        if ($ === null) { return null; }

        const { data } = ($("chapter")[0].children[0] as any);

        return Number(data.split(" ").pop());
    }

    protected async checkURL (): Promise<boolean> {
        const $ = await this.fetchHTML(
            this.URL
                .replace("[manga]", this.manga)
                .replace("[scan]", this.scan.toString())
        );

        if ($ === null) { return false; }

        const info = ($("#wrap > center > h1")?.children[0] as any)?.data ?? null;

        if (!info) {
            const data = ($(".headpost > h1")[0]?.children[0] as any)?.data.split(" ") ?? null;

            data.pop();
            const scan = data.pop();

            return this.scan === Number(scan);
        }

        return info !== "introuvable";
    }

}
