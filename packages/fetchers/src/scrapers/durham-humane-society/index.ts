"use strict";

import puppeteer = require("puppeteer");
import { FetcherBase } from "../interfaces/FetcherBase";

export class DurhamSocietyFetcher extends FetcherBase {
  url: string;
  browser: puppeteer.Browser;
  protected static scraperName = "hsdr";

  constructor() {
    super();
    this.url = "http://www.hsdr.org/dogs";
  }

  async start() {
    this.browser = await puppeteer.launch({
      headless: false
    });
    const page = await this.browser.newPage();
    await page.goto(this.url);
  }

  async dispose() {
    await this.browser.close();
  }
}
