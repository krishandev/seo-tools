import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req) {
  try {
    const body = await req.json();

    const { url } = body;

    if (!url) {
      return Response.json({
        success: false,
        message: "URL is required",
      });
    }

    const visitedPages = new Set();

    const checkedLinks = new Set();

    const brokenLinks = [];

    const MAX_PAGES = 10;

    async function crawlPage(pageUrl) {
      // STOP IF LIMIT REACHED
      if (visitedPages.size >= MAX_PAGES) {
        return;
      }

      // SKIP DUPLICATE PAGES
      if (visitedPages.has(pageUrl)) {
        return;
      }

      visitedPages.add(pageUrl);

      console.log(
        `Crawling (${visitedPages.size}/${MAX_PAGES}):`,
        pageUrl
      );

      try {
        const response = await axios.get(pageUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
          },
          timeout: 10000,
          validateStatus: false,
        });

        // SKIP FAILED PAGE
        if (response.status >= 400) {
          return;
        }

        const html =
          typeof response.data === "string"
            ? response.data
            : "";

        const $ = cheerio.load(html);

        const links = $("a").toArray();

        for (const element of links) {
          const href = $(element).attr("href");

          // SKIP INVALID LINKS
          if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:") ||
            href.startsWith("javascript:")
          ) {
            continue;
          }

          try {
            const absoluteUrl = new URL(
              href,
              pageUrl
            ).href;

            const baseDomain =
              new URL(url).hostname;

            const currentDomain =
              new URL(absoluteUrl).hostname;

            // INTERNAL LINKS ONLY
            if (baseDomain !== currentDomain) {
              continue;
            }

            // REMOVE URL HASH
            const cleanUrl =
              absoluteUrl.split("#")[0];

            // SKIP DUPLICATES
            if (checkedLinks.has(cleanUrl)) {
              continue;
            }

            checkedLinks.add(cleanUrl);

            try {
              const linkResponse =
                await axios.get(cleanUrl, {
                  headers: {
                    "User-Agent":
                      "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                  },
                  timeout: 10000,
                  validateStatus: false,
                });

              console.log(
                linkResponse.status,
                cleanUrl
              );

              // DETECT BROKEN LINKS
              if (
                linkResponse.status === 404 ||
                linkResponse.status === 410 ||
                linkResponse.status >= 500
              ) {
                brokenLinks.push({
                  url: cleanUrl,
                  status:
                    linkResponse.status,
                  foundOn: pageUrl,
                });
              }

              // CRAWL NEXT PAGE
              if (
                !visitedPages.has(
                  cleanUrl
                ) &&
                visitedPages.size <
                  MAX_PAGES
              ) {
                await crawlPage(cleanUrl);
              }
            } catch (err) {
              brokenLinks.push({
                url: cleanUrl,
                status: "BROKEN",
                foundOn: pageUrl,
              });
            }
          } catch (err) {
            console.log(
              "Invalid URL:",
              href
            );
          }
        }
      } catch (err) {
        console.log(
          "Failed to crawl:",
          pageUrl
        );
      }
    }

    // START CRAWLING
    await crawlPage(url);

    return Response.json({
      success: true,
      pagesChecked: visitedPages.size,
      brokenLinks,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error.message,
    });
  }
}