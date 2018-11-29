import { IScraper } from "./IFetcher";
export declare class FetcherBase implements IScraper {
    protected static scraperName: string;
    static ScraperName(): string;
    start(): Promise<void>;
    dispose(): Promise<void>;
}
