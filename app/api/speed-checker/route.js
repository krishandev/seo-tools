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
          "Website URL is required",

      });

    }

    // =========================
    // VALID URL
    // =========================

    let validUrl = "";

    try {

      validUrl =
        new URL(url).href;

    }

    catch (error) {

      return Response.json({

        success: false,

        message:
          "Invalid URL format",

      });

    }

    // =========================
    // START TIMER
    // =========================

    const startTime =
      Date.now();

    // =========================
    // FETCH WEBSITE
    // =========================

    const response =
      await axios.get(
        validUrl,
        {

          timeout: 15000,

          validateStatus: false,

          headers: {

            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",

          },

        }
      );

    // =========================
    // END TIMER
    // =========================

    const endTime =
      Date.now();

    const responseTime =
      endTime - startTime;

    // =========================
    // LOAD HTML
    // =========================

    const html =
      response.data;

    const $ =
      cheerio.load(html);

    // =========================
    // FORMAT SIZE
    // =========================

    function formatSize(
      bytes
    ) {

      return (
        (
          bytes / 1024
        ).toFixed(2) +
        " KB"
      );

    }

    // =========================
    // BASIC ANALYSIS
    // =========================

    const htmlSize =
      formatSize(

        Buffer.byteLength(
          html,
          "utf8"
        )

      );

    const imageCount =
      $("img").length;

    const jsFiles =
      $("script[src]")
        .length;

    const cssFiles =
      $(
        'link[rel="stylesheet"]'
      ).length;

    const viewportOptimized =
      $(
        'meta[name="viewport"]'
      ).length > 0;

    const https =
      validUrl.startsWith(
        "https://"
      );

    const gzipEnabled =
      response.headers[
        "content-encoding"
      ]?.includes(
        "gzip"
      ) || false;

    const cacheEnabled =
      !!response.headers[
        "cache-control"
      ];

    // =========================
    // DESKTOP SCORE
    // =========================

    function calculateDesktopScore() {

      let score = 100;

      // RESPONSE TIME

      if (
        responseTime > 3000
      ) {

        score -= 25;

      }

      else if (
        responseTime > 1500
      ) {

        score -= 10;

      }

      // IMAGES

      if (
        imageCount > 50
      ) {

        score -= 10;

      }

      // JS FILES

      if (
        jsFiles > 20
      ) {

        score -= 10;

      }

      // CSS FILES

      if (
        cssFiles > 15
      ) {

        score -= 5;

      }

      // HTTPS

      if (!https) {

        score -= 10;

      }

      // GZIP

      if (
        !gzipEnabled
      ) {

        score -= 10;

      }

      // CACHE

      if (
        !cacheEnabled
      ) {

        score -= 5;

      }

      return Math.max(
        score,
        1
      );

    }

    // =========================
    // MOBILE SCORE
    // =========================

    function calculateMobileScore() {

      let score = 100;

      // MOBILE STRICT RESPONSE

      if (
        responseTime > 3000
      ) {

        score -= 35;

      }

      else if (
        responseTime > 1500
      ) {

        score -= 20;

      }

      // IMAGES

      if (
        imageCount > 30
      ) {

        score -= 15;

      }

      // JS FILES

      if (
        jsFiles > 15
      ) {

        score -= 15;

      }

      // CSS FILES

      if (
        cssFiles > 10
      ) {

        score -= 10;

      }

      // VIEWPORT

      if (
        !viewportOptimized
      ) {

        score -= 15;

      }

      // HTTPS

      if (!https) {

        score -= 10;

      }

      // GZIP

      if (
        !gzipEnabled
      ) {

        score -= 10;

      }

      return Math.max(
        score,
        1
      );

    }

    // =========================
    // FINAL SCORES
    // =========================

    const desktopScore =
      calculateDesktopScore();

    const mobileScore =
      calculateMobileScore();

    // =========================
    // DESKTOP RECOMMENDATIONS
    // =========================

    const desktopRecommendations =
      [];

    if (
      !cacheEnabled
    ) {

      desktopRecommendations.push(
        "Enable browser caching for faster repeat visits."
      );

    }

    if (
      cssFiles > 15
    ) {

      desktopRecommendations.push(
        "Reduce CSS file requests and combine stylesheets."
      );

    }

    if (
      responseTime > 3000
    ) {

      desktopRecommendations.push(
        "Improve server response time for desktop users."
      );

    }

    if (
      !gzipEnabled
    ) {

      desktopRecommendations.push(
        "Enable GZIP compression to reduce page size."
      );

    }

    if (
      desktopRecommendations.length === 0
    ) {

      desktopRecommendations.push(
        "Desktop performance looks optimized."
      );

    }

    // =========================
    // MOBILE RECOMMENDATIONS
    // =========================

    const mobileRecommendations =
      [];

    if (
      imageCount > 30
    ) {

      mobileRecommendations.push(
        "Optimize images for smaller mobile screens."
      );

    }

    if (
      jsFiles > 15
    ) {

      mobileRecommendations.push(
        "Reduce JavaScript files for better mobile speed."
      );

    }

    if (
      !viewportOptimized
    ) {

      mobileRecommendations.push(
        "Add mobile viewport meta tag for responsiveness."
      );

    }

    if (
      responseTime > 3000
    ) {

      mobileRecommendations.push(
        "Improve mobile loading speed and server response."
      );

    }

    if (
      !gzipEnabled
    ) {

      mobileRecommendations.push(
        "Enable GZIP compression for faster mobile performance."
      );

    }

    if (
      mobileRecommendations.length === 0
    ) {

      mobileRecommendations.push(
        "Mobile performance looks optimized."
      );

    }

    // =========================
    // RESPONSE
    // =========================

    return Response.json({

      success: true,

      desktop: {

        score:
          desktopScore,

        responseTime,

        recommendations:
          desktopRecommendations,

      },

      mobile: {

        score:
          mobileScore,

        responseTime:
          responseTime + 300,

        recommendations:
          mobileRecommendations,

      },

      htmlSize,

      imageCount,

      jsFiles,

      cssFiles,

      https,

      gzipEnabled,

      cacheEnabled,

      viewportOptimized,

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