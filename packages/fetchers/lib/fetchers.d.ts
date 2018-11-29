import { FetcherBase } from "./scrapers/interfaces/FetcherBase";
export declare class ScraperFactory {
    constructor();
    createScraper(name: string): FetcherBase;
}
