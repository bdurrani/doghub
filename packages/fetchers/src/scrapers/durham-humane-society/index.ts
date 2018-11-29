"use strict";

import puppeteer = require("puppeteer");
import cheerio = require("cheerio");
import { FetcherBase } from "../interfaces/FetcherBase";
import request = require("request-promise-native");

const delay = time => result =>
  new Promise(resolve => setTimeout(() => resolve(result), time));

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
    await page.goto(this.url, { waitUntil: "networkidle2", timeout: 60000 });
    await delay(2000);
    const content = await DurhamSocietyFetcher.frameContent(page);
    await DurhamSocietyFetcher.getDogs(content);
  }

  static async frameContent(page: puppeteer.Page) {
    const html = await page.content();
    const $ = cheerio.load(html);
    const iframe = $("#blockrandom");
    const iframeurl = iframe.attr("src");
    console.log(`iframe url ${iframeurl}`);
    return await request(iframeurl);
  }

  static async getDogs(content: string) {
    const $ = cheerio.load(content);
    const elements = Array.from($("#tblSearchResults td"));
    const res = DurhamSocietyFetcher.extractDog($, elements);
    console.log(JSON.stringify(res));
  }

  static extractDog($: CheerioStatic, dogs: CheerioElement[]) {
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
    // const element = dogs[0];
    // const test = $(element)
    //   .find(".list-animal-sexSN")
    //   .text();
    // console.log(test);
    return result;
  }

  static extractUrlFromJs(href: string) {
    if (href) {
      const startIndex = href.indexOf("'");
      const endIndex = href.indexOf("')");
      return href.substring(startIndex, endIndex);
    }
    return null;
  }

  async dispose() {
    await this.browser.close();
  }
}
