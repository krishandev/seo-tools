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
    // FETCH WEBPAGE
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
    // EXTRACT CONTENT
    // =========================

    const title =
      $("title")
        .text()
        .trim();

    const metaDescription =
      $('meta[name="description"]')
        .attr("content") || "";

    const h1Tags = [];

    $("h1").each(
      (index, element) => {

        h1Tags.push(
          $(element)
            .text()
            .trim()
        );

      }
    );

    const h2Tags = [];

    $("h2").each(
      (index, element) => {

        h2Tags.push(
          $(element)
            .text()
            .trim()
        );

      }
    );

    const bodyText =
      $("body")
        .text()
        .replace(/\s+/g, " ")
        .trim();

    // =========================
    // COMBINED CONTENT
    // =========================

    const fullContent = `
      ${title}
      ${metaDescription}
      ${h1Tags.join(" ")}
      ${h2Tags.join(" ")}
      ${bodyText}
    `.toLowerCase();

    // =========================
    // INTENT KEYWORDS
    // =========================

    const intentKeywords = {

      Informational: [

        "how",
        "guide",
        "tips",
        "tutorial",
        "learn",
        "what is",
        "why",

      ],

      Commercial: [

        "best",
        "top",
        "services",
        "agency",
        "company",
        "solutions",
        "review",

      ],

      Transactional: [

        "buy",
        "price",
        "shop",
        "hire",
        "contact",
        "book",
        "discount",

      ],

      Navigational: [

        "login",
        "dashboard",
        "homepage",
        "official",
        "portal",

      ],

      Local: [

        "near me",
        "city",
        "location",
        "local",
        "area",

      ],

    };

    // =========================
    // DETECT INTENT
    // =========================

    function detectIntent() {

      const scores = {};

      const detectedSignals =
        [];

      for (
        const intent in
        intentKeywords
      ) {

        scores[intent] = 0;

        intentKeywords[
          intent
        ].forEach(
          (keyword) => {

            const regex =
              new RegExp(
                keyword,
                "gi"
              );

            const matches =
              fullContent.match(
                regex
              );

            const count =
              matches
                ? matches.length
                : 0;

            if (
              count > 0
            ) {

              scores[
                intent
              ] += count;

              detectedSignals.push(
                keyword
              );

            }

          }
        );

      }

      return {
        scores,
        detectedSignals,
      };

    }

    const {
      scores,
      detectedSignals,
    } = detectIntent();

    // =========================
    // SORT INTENTS
    // =========================

    const sortedIntents =
      Object.entries(
        scores
      ).sort(
        (a, b) =>
          b[1] - a[1]
      );

    const primaryIntent =
      sortedIntents[0][0];

    const primaryScore =
      sortedIntents[0][1];

    const secondaryIntent =
      sortedIntents[1][0];

    // =========================
    // CONFIDENCE SCORE
    // =========================

    const totalScore =
      Object.values(
        scores
      ).reduce(
        (a, b) => a + b,
        0
      );

    const confidence =
      totalScore > 0

        ? Math.round(
            (primaryScore /
              totalScore) *
              100
          )

        : 0;

    // =========================
    // RESPONSE
    // =========================

    return Response.json({

      success: true,

      title,

      primaryIntent,

      secondaryIntent,

      confidence,

      signals: [
        ...new Set(
          detectedSignals
        ),
      ],

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