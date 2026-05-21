export async function POST(req) {

  try {

    // =====================
    // REQUEST BODY
    // =====================

    const body =
      await req.json();

    let {

      keyword,

      count = 10

    } = body;

    // =====================
    // VALIDATION
    // =====================

    if (
      !keyword ||
      keyword.trim() === ""
    ) {

      return Response.json({

        success: false,

        message:
          "Keyword is required"

      });

    }

    keyword =
      keyword.trim();

    count =
      Number(count);

    if (count > 20)
      count = 20;

    // =====================
    // FAQ PATTERNS
    // =====================

    const patterns = [

      "What is {keyword}?",

      "Why is {keyword} important?",

      "How does {keyword} work?",

      "What are the benefits of {keyword}?",

      "How much does {keyword} cost?",

      "Is {keyword} worth it?",

      "How to choose {keyword}?",

      "What mistakes should be avoided in {keyword}?",

      "Who needs {keyword}?",

      "When should you use {keyword}?",

      "What are the advantages of {keyword}?",

      "What are common problems in {keyword}?",

      "What tools are used in {keyword}?",

      "Can beginners use {keyword}?",

      "What are best practices for {keyword}?"

    ];

    // =====================
    // ANSWER GENERATOR
    // =====================

    function generateAnswer(
      question
    ) {

      const lower =
        question.toLowerCase();

      // WHAT IS

      if (
        lower.startsWith(
          "what is"
        )
      ) {

        return `${keyword} refers to strategies, methods, or services used to improve results and achieve specific goals effectively. It helps individuals and businesses improve performance, visibility, and growth.`;

      }

      // WHY

      if (
        lower.startsWith(
          "why"
        )
      ) {

        return `${keyword} is important because it helps improve efficiency, increase results, save time, and create better long-term outcomes for businesses and users.`;

      }

      // HOW

      if (
        lower.startsWith(
          "how does"
        )
      ) {

        return `${keyword} works through a step-by-step process involving planning, implementation, monitoring, and optimization to achieve desired results.`;

      }

      // BENEFITS

      if (
        lower.includes(
          "benefits"
        )
      ) {

        return `Benefits of ${keyword} include increased efficiency, improved visibility, better performance, cost savings, and long-term growth opportunities.`;

      }

      // COST

      if (
        lower.includes(
          "cost"
        )
      ) {

        return `The cost of ${keyword} varies depending on project requirements, complexity, provider, and service level.`;

      }

      // WORTH

      if (
        lower.includes(
          "worth"
        )
      ) {

        return `Yes, ${keyword} can be worth it because it provides long-term benefits, improved results, and greater return on investment.`;

      }

      // CHOOSE

      if (
        lower.includes(
          "choose"
        )
      ) {

        return `When choosing ${keyword}, consider experience, pricing, features, quality, reviews, and business goals.`;

      }

      // MISTAKES

      if (
        lower.includes(
          "mistakes"
        )
      ) {

        return `Common mistakes in ${keyword} include poor planning, ignoring best practices, inconsistent implementation, and lack of monitoring.`;

      }

      // WHO

      if (
        lower.startsWith(
          "who"
        )
      ) {

        return `${keyword} is useful for businesses, professionals, beginners, and organizations looking to improve results and performance.`;

      }

      // WHEN

      if (
        lower.startsWith(
          "when"
        )
      ) {

        return `You should use ${keyword} when you want to improve outcomes, increase efficiency, or solve specific challenges.`;

      }

      // ADVANTAGES

      if (
        lower.includes(
          "advantages"
        )
      ) {

        return `${keyword} offers advantages such as better performance, increased productivity, scalability, and long-term value.`;

      }

      // PROBLEMS

      if (
        lower.includes(
          "problems"
        )
      ) {

        return `Some common problems in ${keyword} include implementation challenges, budget limitations, and lack of expertise.`;

      }

      // TOOLS

      if (
        lower.includes(
          "tools"
        )
      ) {

        return `Popular tools used for ${keyword} depend on the industry and requirements, including software platforms and automation tools.`;

      }

      // BEGINNER

      if (
        lower.includes(
          "beginners"
        )
      ) {

        return `Yes, beginners can use ${keyword} by learning the basics, following guides, and practicing regularly.`;

      }

      // BEST PRACTICES

      return `Best practices for ${keyword} include following industry standards, monitoring performance, and continuously optimizing results.`;

    }

    // =====================
    // FAQ GENERATOR
    // =====================

    const faqs = [];

    for (

      let i = 0;

      i < count;

      i++

    ) {

      const question =

        patterns[i]

        .replace(
          "{keyword}",
          keyword
        );

      const answer =

        generateAnswer(
          question
        );

      faqs.push({

        question,

        answer

      });

    }

    // =====================
    // FAQ SCHEMA
    // =====================

    const schema = {

      "@context":
        "https://schema.org",

      "@type":
        "FAQPage",

      mainEntity:

      faqs.map(

        faq => ({

          "@type":
            "Question",

          name:
            faq.question,

          acceptedAnswer: {

            "@type":
              "Answer",

            text:
              faq.answer

          }

        })

      )

    };

    // =====================
    // SEO SUGGESTIONS
    // =====================

    const seoSuggestions = [

      "Add FAQ schema to improve search visibility",

      "Include primary keyword in first FAQ",

      "Use long-tail keywords in questions",

      "Place FAQs near page bottom",

      "Answer questions clearly and naturally"

    ];

    // =====================
    // RESPONSE
    // =====================

    return Response.json({

      success: true,

      keyword,

      totalFAQs:
        faqs.length,

      faqs,

      schema,

      seoSuggestions

    });

  }

  catch (error) {

    return Response.json({

      success: false,

      message:

        error.message ||

        "Something went wrong"

    });

  }

}