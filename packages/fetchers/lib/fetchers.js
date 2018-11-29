"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scrapers_1 = require("./scrapers");
class ScraperFactory {
    constructor() { }
    createScraper(name) {
        return new scrapers_1.DurhamSocietyFetcher();
        if (!name) {
            return null;
        }
        if (name === scrapers_1.DurhamSocietyFetcher.ScraperName()) {
            return new scrapers_1.DurhamSocietyFetcher();
        }
        return null;
    }
}
exports.ScraperFactory = ScraperFactory;
//# sourceMappingURL=fetchers.js.map