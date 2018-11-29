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
const FetcherBase_1 = require("../interfaces/FetcherBase");
class DurhamSocietyFetcher extends FetcherBase_1.FetcherBase {
    constructor() {
        super();
        this.url = "http://www.hsdr.org/dogs";
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield puppeteer.launch({});
            const page = yield this.browser.newPage();
            yield page.goto(this.url);
        });
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