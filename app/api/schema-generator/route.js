export async function POST(req) {

  try {

    // =========================
    // REQUEST BODY
    // =========================

    const body =
      await req.json();

    const {
      schemaType,
      formData,
    } = body;

    // =========================
    // VALIDATION
    // =========================

    if (!schemaType) {

      return Response.json({

        success: false,

        message:
          "Schema type is required",

      });

    }

    if (!formData) {

      return Response.json({

        success: false,

        message:
          "Form data is required",

      });

    }

    // =========================
    // SCHEMA VARIABLE
    // =========================

    let schema = {};

    // =========================
    // GENERATE SCHEMA
    // =========================

    switch (schemaType) {

      // =========================
      // LOCAL BUSINESS
      // =========================

      case "LocalBusiness":

        schema = {

          "@context":
            "https://schema.org",

          "@type":
            "LocalBusiness",

          name:
            formData.businessName,

          url:
            formData.website,

          telephone:
            formData.phone,

          image:
            formData.logo,

          logo:
            formData.logo,

          address: {

            "@type":
              "PostalAddress",

            streetAddress:
              formData.address,

            addressLocality:
              formData.city,

            addressRegion:
              formData.state,

            postalCode:
              formData.postalCode,

            addressCountry:
              formData.country,

          },

        };

        break;

      // =========================
      // ORGANIZATION
      // =========================

      case "Organization":

        schema = {

          "@context":
            "https://schema.org",

          "@type":
            "Organization",

          name:
            formData.organizationName,

          url:
            formData.website,

          logo:
            formData.logo,

          sameAs:
            formData.socialLinks || [],

        };

        break;

      // =========================
      // FAQ
      // =========================

      case "FAQ":

        schema = {

          "@context":
            "https://schema.org",

          "@type":
            "FAQPage",

          mainEntity:
            formData.faqs?.map(
              (faq) => ({

                "@type":
                  "Question",

                name:
                  faq.question,

                acceptedAnswer: {

                  "@type":
                    "Answer",

                  text:
                    faq.answer,

                },

              })
            ) || [],

        };

        break;

      // =========================
      // SERVICE
      // =========================

      case "Service":

        schema = {

          "@context":
            "https://schema.org",

          "@type":
            "Service",

          name:
            formData.serviceName,

          serviceType:
            formData.serviceType,

          areaServed:
            formData.areaServed,

          provider: {

            "@type":
              "Organization",

            name:
              formData.provider,

            url:
              formData.website,

          },

        };

        break;

      // =========================
      // DEFAULT
      // =========================

      default:

        return Response.json({

          success: false,

          message:
            "Invalid schema type",

        });

    }

    // =========================
    // RESPONSE
    // =========================

    return Response.json({

      success: true,

      schema:
        JSON.stringify(
          schema,
          null,
          2
        ),

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