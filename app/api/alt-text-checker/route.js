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
    // IMAGE ANALYSIS
    // =========================

    const images = [];

    let totalImages = 0;

    let missingAltCount = 0;

    let emptyAltCount = 0;

    let optimizedAltCount = 0;

    $("img").each(
      (index, element) => {

        totalImages++;

        const src =
          $(element).attr(
            "src"
          ) || "";

        const alt =
          $(element).attr(
            "alt"
          );

        const title =
          $(element).attr(
            "title"
          ) || "";

        const width =
          $(element).attr(
            "width"
          ) || "";

        const height =
          $(element).attr(
            "height"
          ) || "";

        // =========================
        // ABSOLUTE IMAGE URL
        // =========================

        let imageUrl = src;

        try {

          imageUrl =
            new URL(
              src,
              url
            ).href;

        }

        catch (error) {

          console.log(
            "Invalid image URL"
          );

        }

        // =========================
        // ALT STATUS
        // =========================

        let status =
          "Optimized";

        let altText =
          alt || "";

        // Missing Alt

        if (
          typeof alt ===
          "undefined"
        ) {

          status =
            "Missing Alt";

          missingAltCount++;

        }

        // Empty Alt

        else if (
          alt.trim() === ""
        ) {

          status =
            "Empty Alt";

          emptyAltCount++;

        }

        // Optimized Alt

        else if (
          alt.trim().length > 3
        ) {

          status =
            "Optimized";

          optimizedAltCount++;

        }

        // =========================
        // PUSH IMAGE DATA
        // =========================

        images.push({

          imageUrl,

          altText,

          title,

          width,

          height,

          status,

        });

      }
    );

    // =========================
    // SEO SCORE
    // =========================

    function calculateSeoScore() {

      if (
        totalImages === 0
      ) {

        return 0;

      }

      const score =
        Math.round(

          (
            optimizedAltCount /
            totalImages
          ) * 100

        );

      return score;

    }

    const seoScore =
      calculateSeoScore();

    // =========================
    // RECOMMENDATION
    // =========================

    let recommendation =
      "";

    if (
      missingAltCount > 0
    ) {

      recommendation =
        "Add descriptive alt text to improve image SEO and accessibility.";

    }

    else if (
      emptyAltCount > 0
    ) {

      recommendation =
        "Avoid empty alt attributes for important images.";

    }

    else {

      recommendation =
        "Great job! Your images have optimized alt text.";

    }

    // =========================
    // RESPONSE
    // =========================

    return Response.json({

      success: true,

      seoScore,

      totalImages,

      missingAltCount,

      emptyAltCount,

      optimizedAltCount,

      recommendation,

      images,

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