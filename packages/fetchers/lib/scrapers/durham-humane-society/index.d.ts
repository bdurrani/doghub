import puppeteer = require("puppeteer");
import { FetcherBase } from "../interfaces/FetcherBase";
export declare class DurhamSocietyFetcher extends FetcherBase {
    url: string;
    browser: puppeteer.Browser;
    protected static scraperName: string;
    constructor();
    start(): Promise<void>;
    dispose(): Promise<void>;
}
