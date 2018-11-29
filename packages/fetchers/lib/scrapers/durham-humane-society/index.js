"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const FetcherBase_1 = require("../interfaces/FetcherBase");
const request = require("request-promise-native");
const delay = time => result => new Promise(resolve => setTimeout(() => resolve(result), time));
class DurhamSocietyFetcher extends FetcherBase_1.FetcherBase {
    constructor() {
        super();
        this.url = "http://www.hsdr.org/dogs";
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield puppeteer.launch({
                headless: true
            });
            const page = yield this.browser.newPage();
            yield page.goto(this.url, { waitUntil: "networkidle2", timeout: 60000 });
            yield delay(2000);
            const content = yield DurhamSocietyFetcher.frameContent(page);
            yield DurhamSocietyFetcher.getDogs(content);
        });
    }
    static frameContent(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield page.content();
            const $ = cheerio.load(html);
            const iframe = $("#blockrandom");
            const iframeurl = iframe.attr("src");
            console.log(`iframe url ${iframeurl}`);
            return yield request(iframeurl);
        });
    }
    static getDogs(content) {
        return __awaiter(this, void 0, void 0, function* () {
            const $ = cheerio.load(content);
            const elements = Array.from($("#tblSearchResults td"));
            const res = DurhamSocietyFetcher.extractDog($, elements);
            console.log(JSON.stringify(res));
        });
    }
    static extractDog($, dogs) {
        const result = dogs.map(dog => {
            const name = $(dog)
                .find(".list-animal-name a")
                .text()
                .trim();
            const gender = $(dog)
                .find(".list-animal-sexSN")
                .text();
            const age = $(dog)
                .find(".list-animal-age")
                .text();
            let url = $(dog)
                .find(".list-animal-name a")
                .attr("href");
            url = DurhamSocietyFetcher.extractUrlFromJs(url);
            return {
                name,
                gender,
                age,
                url
            };
        });
        return result;
    }
    static extractUrlFromJs(href) {
        if (href) {
            const startIndex = href.indexOf("'");
            const endIndex = href.indexOf("')");
            return href.substring(startIndex, endIndex);
        }
        return null;
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.browser.close();
        });
    }
}
DurhamSocietyFetcher.scraperName = "hsdr";
exports.DurhamSocietyFetcher = DurhamSocietyFetcher;
//# sourceMappingURL=index.js.map