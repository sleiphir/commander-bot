import { LelscansScraper } from "./Scraper.lelscans";
import { ScanvfScraper } from "./Scraper.scan-vf";
import { ScansmangasxyzScraper } from "./Scraper.scansmangasxyz";
import { ScantradScraper } from "./Scraper.scantrad";

const scrapers = [
    new ScantradScraper(),
    new LelscansScraper(),
    new ScansmangasxyzScraper(),
    new ScanvfScraper()
];

export default scrapers;
