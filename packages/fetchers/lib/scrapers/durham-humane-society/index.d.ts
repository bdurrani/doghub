/// <reference types="cheerio" />
import puppeteer = require("puppeteer");
import { FetcherBase } from "../interfaces/FetcherBase";
export declare class DurhamSocietyFetcher extends FetcherBase {
    url: string;
    browser: puppeteer.Browser;
    protected static scraperName: string;
    constructor();
    start(): Promise<void>;
    static frameContent(page: puppeteer.Page): Promise<any>;
    static getDogs(content: string): Promise<void>;
    static extractDog($: CheerioStatic, dogs: CheerioElement[]): {
        name: string;
        gender: string;
        age: string;
        url: string;
    }[];
    static extractUrlFromJs(href: string): string;
    dispose(): Promise<void>;
}
