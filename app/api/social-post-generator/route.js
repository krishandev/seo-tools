export async function POST(req) {

  try {

    // =========================
    // REQUEST BODY
    // =========================

    const body =
      await req.json();

    const {
      topic,
      platform,
      tone,
      audience,
      cta,
      postLength,
    } = body;

    // =========================
    // VALIDATION
    // =========================

    if (!topic) {

      return Response.json({

        success: false,

        message:
          "Topic is required",

      });

    }

    if (!platform) {

      return Response.json({

        success: false,

        message:
          "Platform is required",

      });

    }

    // =========================
    // RANDOM HELPER
    // =========================

    const randomItem = (
      arr
    ) => {

      return arr[
        Math.floor(
          Math.random() *
          arr.length
        )
      ];

    };

    // =========================
    // HASHTAG GENERATOR
    // =========================

    function generateHashtags(
      topic
    ) {

      const cleaned =
        topic
          .replace(
            /[^a-zA-Z0-9 ]/g,
            ""
          )
          .split(" ")
          .filter(Boolean);

      const hashtags = [];

      cleaned.forEach(
        (word) => {

          hashtags.push(
            `#${word}`
          );

        }
      );

      hashtags.push(
        "#Marketing",
        "#BusinessGrowth",
        "#DigitalMarketing",
        "#SocialMedia",
        "#Branding"
      );

      return [
        ...new Set(
          hashtags
        ),
      ].join(" ");

    }

    // =========================
    // HOOKS
    // =========================

    const hooks = {

      professional: [

        `Looking to improve your ${topic}?`,

        `Professional ${topic} strategies can transform your business.`,

        `Want better results with ${topic}?`

      ],

      friendly: [

        `Let's talk about ${topic}!`,

        `Here’s why ${topic} matters today.`,

        `${topic} can help your business grow 🚀`

      ],

      persuasive: [

        `Don't miss the power of ${topic}.`,

        `${topic} is the key to better business growth.`,

        `Start improving your results with ${topic} today.`

      ],

      casual: [

        `${topic} is changing the game 😎`,

        `Quick thoughts on ${topic}!`,

        `If you’re not using ${topic}, you’re missing out.`

      ],

      motivational: [

        `Success starts with smart ${topic} strategies 💡`,

        `${topic} can take your business to the next level.`,

        `Big growth begins with better ${topic}.`

      ],

    };

    // =========================
    // PLATFORM STYLE
    // =========================

    const platformStyles = {

      Instagram: {
        emoji: true,
        lineBreaks: true,
      },

      Facebook: {
        emoji: true,
        lineBreaks: false,
      },

      LinkedIn: {
        emoji: false,
        lineBreaks: true,
      },

      Twitter: {
        emoji: false,
        lineBreaks: false,
      },

      Threads: {
        emoji: true,
        lineBreaks: true,
      },

    };

    // =========================
    // POST LENGTH
    // =========================

    let bodyText = "";

    if (
      postLength === "short"
    ) {

      bodyText =
        `${topic} can help ${audience || "businesses"} achieve better visibility, engagement, and growth.`;

    }

    else if (
      postLength === "long"
    ) {

      bodyText =
        `${topic} plays a major role in helping ${audience || "businesses"} improve online visibility, build trust, and drive long-term growth. Implementing the right strategies can increase engagement, generate leads, and improve overall business performance.`;

    }

    else {

      bodyText =
        `${topic} helps ${audience || "businesses"} improve visibility, engagement, and business growth through smart digital strategies and consistent efforts.`;

    }

    // =========================
    // GENERATE HOOK
    // =========================

    const selectedTone =
      tone || "professional";

    const hook =
      randomItem(
        hooks[
          selectedTone
        ] || hooks.professional
      );

    // =========================
    // CTA
    // =========================

    const finalCTA =
      cta ||
      "Contact us today!";

    // =========================
    // EMOJIS
    // =========================

    const emoji =
      platformStyles[
        platform
      ]?.emoji

        ? "🚀"

        : "";

    // =========================
    // GENERATE POST
    // =========================

    let post = "";

    if (
      platformStyles[
        platform
      ]?.lineBreaks
    ) {

      post = `${emoji} ${hook}

${bodyText}

👉 ${finalCTA}`;

    }

    else {

      post = `${emoji} ${hook} ${bodyText} 👉 ${finalCTA}`;

    }

    // =========================
    // HASHTAGS
    // =========================

    const hashtags =
      generateHashtags(
        topic
      );

    // =========================
    // RESPONSE
    // =========================

    return Response.json({

      success: true,

      post,

      hashtags,

      platform,

      tone:
        selectedTone,

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