export interface IScraper {
    name: string;
    URL: string;
    lastScanURL: string;
    manga: string;
    scan: number;
    lang: string;

    getScan(manga: string, scan: number): Promise<string>;
}
