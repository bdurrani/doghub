import { DurhamSocietyFetcher } from "./scrapers";
import { FetcherBase } from "./scrapers/interfaces/FetcherBase";

export class ScraperFactory {
  constructor() {}

  /**
   * createScraper
   */
  public createScraper(name: string): FetcherBase {
    return new DurhamSocietyFetcher();
    if (!name) {
      return null;
    }

    if (name === DurhamSocietyFetcher.ScraperName()) {
      return new DurhamSocietyFetcher();
    }

    return null;
  }
}
