import axios from "axios";
import * as cheerio from "cheerio";
import whois from "whois-json";

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
    // FETCH WEBSITE
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
    // BASIC SEO
    // =========================

    const title =
      $("title")
        .text()
        .trim();

    const titleLength =
      title.length;

    const metaDescription =
      $('meta[name="description"]')
        .attr("content") || "";

    const metaDescriptionLength =
      metaDescription.length;

    const canonical =
      $('link[rel="canonical"]')
        .attr("href") || "";

    const robots =
      $('meta[name="robots"]')
        .attr("content") || "";

    const viewport =
      $('meta[name="viewport"]')
        .attr("content") || "";

    // =========================
    // HEADINGS
    // =========================

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

    const h1Count =
      h1Tags.length;

    const h2Count =
      h2Tags.length;

    // =========================
    // LINKS
    // =========================

    const internalLinks =
      [];

    const externalLinks =
      [];

    const baseHostname =
      new URL(url)
        .hostname;

    $("a").each(
      (index, element) => {

        const href =
          $(element).attr(
            "href"
          );

        if (!href) return;

        try {

          const absoluteUrl =
            new URL(
              href,
              url
            ).href;

          const hostname =
            new URL(
              absoluteUrl
            ).hostname;

          if (
            hostname ===
            baseHostname
          ) {

            internalLinks.push(
              absoluteUrl
            );

          }

          else {

            externalLinks.push(
              absoluteUrl
            );

          }

        }

        catch (error) {

          console.log(
            "Invalid URL"
          );

        }

      }
    );

    // =========================
    // IMAGES
    // =========================

    const totalImages =
      $("img").length;

    let missingAltCount = 0;

    $("img").each(
      (index, element) => {

        const alt =
          $(element).attr(
            "alt"
          );

        if (
          !alt ||
          alt.trim() === ""
        ) {

          missingAltCount++;

        }

      }
    );

    // =========================
    // HTTPS
    // =========================

    const https =
      url.startsWith(
        "https://"
      );

    // =========================
    // OPEN GRAPH
    // =========================

    const openGraph =
      $('meta[property^="og:"]')
        .length > 0;

    // =========================
    // TWITTER CARDS
    // =========================

    const twitterCards =
      $('meta[name^="twitter:"]')
        .length > 0;

    // =========================
    // SCHEMA DETECTION
    // =========================

    const schemaDetected =
      $(
        'script[type="application/ld+json"]'
      ).length > 0;

    // =========================
    // DOMAIN AGE
    // =========================

    let domainAge =
      "Unknown";

    try {

      const domain =
        new URL(url)
          .hostname;

      const whoisData =
        await whois(
          domain
        );

      const creationDate =
        whoisData.creationDate ||
        whoisData.created ||
        whoisData.createdDate;

      if (
        creationDate
      ) {

        const created =
          new Date(
            creationDate
          );

        const today =
          new Date();

        const years =
          today.getFullYear() -
          created.getFullYear();

        domainAge =
          `${years} Years`;

      }

    }

    catch (error) {

      console.log(
        "WHOIS Error"
      );

    }

    // =========================
    // SEO SCORE
    // =========================

    function calculateSeoScore() {

      let score = 0;

      if (title)
        score += 10;

      if (
        metaDescription
      )
        score += 10;

      if (h1Count > 0)
        score += 10;

      if (https)
        score += 10;

      if (canonical)
        score += 10;

      if (
        schemaDetected
      )
        score += 10;

      if (viewport)
        score += 10;

      if (
        openGraph
      )
        score += 10;

      if (
        twitterCards
      )
        score += 10;

      if (
        missingAltCount === 0
      )
        score += 10;

      return score;

    }

    const seoScore =
      calculateSeoScore();

    // =========================
    // RESPONSE
    // =========================

    return Response.json({

      success: true,

      seoScore,

      domainAge,

      title,

      titleLength,

      metaDescription,

      metaDescriptionLength,

      canonical,

      robots,

      viewport,

      https,

      h1Count,

      h2Count,

      h1Tags,

      h2Tags,

      internalLinks:
        internalLinks.length,

      externalLinks:
        externalLinks.length,

      totalImages,

      missingAltCount,

      openGraph,

      twitterCards,

      schemaDetected,

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