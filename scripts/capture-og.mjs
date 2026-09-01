import { chromium } from "playwright";
import fs from "node:fs";

fs.mkdirSync("public/images/seo", {
  recursive: true,
});

const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
});

const page = await browser.newPage({
  viewport: {
    width: 1200,
    height: 630,
  },
  deviceScaleFactor: 1,
});

await page.goto("http://localhost:3001", {
  waitUntil: "networkidle",
});

await page.addStyleTag({
  content: `
    nextjs-portal {
      display: none !important;
    }
  `,
});

await page.waitForSelector("#hero-cassette");

await page.evaluate(async () => {
  await document.fonts.ready;

  const hero = document.querySelector("#hero-cassette");
  const content = hero?.parentElement;

  if (content) {
    content.style.transform = "scale(0.82)";
    content.style.transformOrigin = "top center";
  }
});

await page.waitForTimeout(300);

await page.evaluate(() => {
  document
    .querySelectorAll("nextjs-portal")
    .forEach((element) => {
      element.remove();
    });
});

await page.screenshot({
  path: "public/images/seo/og-en.png",
  fullPage: false,
});

await browser.close();

console.log("Created public/images/seo/og-en.png");