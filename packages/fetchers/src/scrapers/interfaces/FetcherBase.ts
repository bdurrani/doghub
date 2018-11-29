import { IScraper } from "./IFetcher";
export class FetcherBase implements IScraper {
  protected static scraperName: string;
  public static ScraperName(): string {
    throw new Error("no scraper defined");
  }

  public async start() {
    throw new Error("needs to be implemented");
  }

  public async dispose() {
    throw new Error("needs to be implemented");
  }
}
