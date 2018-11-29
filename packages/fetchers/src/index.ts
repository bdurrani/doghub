import { ScraperFactory } from "./fetchers";

const factory = new ScraperFactory();
const fetcher = factory.createScraper("");

(async () => {
  await fetcher.start();
  await fetcher.dispose();
})();
