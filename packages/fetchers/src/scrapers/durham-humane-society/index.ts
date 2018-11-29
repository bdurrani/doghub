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
      // Launch chromium using a proxy server on port 9876.
      // More on proxying:
      //    https://www.chromium.org/developers/design-documents/network-settings
      // args: ["--proxy-server=127.0.0.1:9876"]
    });
    const page = await this.browser.newPage();
    await page.goto(this.url);
  }

  async dispose() {
    await this.browser.close();
  }
}
