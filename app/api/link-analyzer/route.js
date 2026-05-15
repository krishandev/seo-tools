import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req) {

  try {

    // =========================
    // REQUEST BODY
    // =========================

    const body =
      await req.json();

    const { url } = body;

    // =========================
    // VALIDATION
    // =========================

    if (!url) {

      return Response.json({

        success: false,

        message:
          "URL is required",

      });

    }

    // =========================
    // FETCH WEBSITE HTML
    // =========================

    const response =
      await axios.get(url, {

        timeout: 15000,

        validateStatus: false,

        headers: {

          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",

        },

      });

    const html =
      response.data;

    // =========================
    // LOAD HTML
    // =========================

    const $ =
      cheerio.load(html);

    // =========================
    // EXTRACT LINKS
    // =========================

    const links = [];

    const uniqueLinks =
      new Set();

    const baseHostname =
      new URL(url).hostname;

    $("a").each(
      (index, element) => {

        const href =
          $(element).attr("href");

        const anchorText =
          $(element)
            .text()
            .trim();

        const rel =
          $(element)
            .attr("rel") || "";

        // =========================
        // SKIP INVALID LINKS
        // =========================

        if (
          !href ||
          href.startsWith("javascript:") ||
          href.startsWith("mailto:") ||
          href.startsWith("tel:")
        ) {
          return;
        }

        try {

          // =========================
          // ABSOLUTE URL
          // =========================

          const absoluteUrl =
            new URL(
              href,
              url
            ).href;

          // =========================
          // SKIP DUPLICATES
          // =========================

          if (
            uniqueLinks.has(
              absoluteUrl
            )
          ) {
            return;
          }

          uniqueLinks.add(
            absoluteUrl
          );

          // =========================
          // INTERNAL / EXTERNAL
          // =========================

          const currentHostname =
            new URL(
              absoluteUrl
            ).hostname;

          const linkCategory =
            currentHostname ===
            baseHostname

              ? "Internal"

              : "External";

          // =========================
          // LINK TYPE
          // =========================

          let linkType =
            "Dofollow";

          const relLower =
            rel.toLowerCase();

          if (
            relLower.includes(
              "nofollow"
            )
          ) {

            linkType =
              "Nofollow";

          }

          else if (
            relLower.includes(
              "sponsored"
            )
          ) {

            linkType =
              "Sponsored";

          }

          else if (
            relLower.includes(
              "ugc"
            )
          ) {

            linkType =
              "UGC";

          }

          // =========================
          // PUSH LINK
          // =========================

          links.push({

            url: absoluteUrl,

            anchorText:
              anchorText ||
              "No Anchor Text",

            linkType,

            linkCategory,

            rel:
              rel ||
              "None",

          });

        }

        catch (error) {

          console.log(
            "Invalid URL:",
            href
          );

        }

      }
    );

    // =========================
    // RESPONSE
    // =========================

    return Response.json({

      success: true,

      totalLinks:
        links.length,

      links,

    });

  }

  catch (error) {

    // =========================
    // ERROR RESPONSE
    // =========================

    return Response.json({

      success: false,

      message:
        error.message ||
        "Something went wrong",

    });

  }

}