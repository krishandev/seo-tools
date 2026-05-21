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
    // VALID URL CHECK
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
    // DEVICE PRESETS
    // =========================

    const devices = [

      // MOBILE

      {

        name: "Mobile",

        type: "mobile",

        width: 375,

        height: 812,

        orientation:
          "portrait",

        zoom: 1,

        viewportScale: 1,

      },

      // TABLET

      {

        name: "Tablet",

        type: "tablet",

        width: 768,

        height: 1024,

        orientation:
          "portrait",

        zoom: 1,

        viewportScale: 1,

      },

      // DESKTOP

      {

        name: "Desktop",

        type: "desktop",

        width: 1440,

        height: 900,

        orientation:
          "landscape",

        zoom: 1,

        viewportScale: 1,

      },

    ];

    // =========================
    // RESPONSE
    // =========================

    return Response.json({

      success: true,

      url: validUrl,

      devices,

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