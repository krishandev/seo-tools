import whois from "whois-json";

export async function POST(req) {

  try {

    const body = await req.json();

    const { domain } = body;

    // =========================
    // VALIDATION
    // =========================

    if (!domain) {

      return Response.json({
        success: false,
        message: "Domain is required",
      });

    }

    // =========================
    // CLEAN DOMAIN
    // =========================

    const cleanDomain = domain
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "")
      .split("/")[0]
      .trim();

    // =========================
    // FETCH WHOIS DATA
    // =========================

    const whoisData =
      await whois(cleanDomain);

    // =========================
    // EXTRACT DATES
    // =========================

    const createdOnRaw =
      whoisData.creationDate ||
      whoisData.createdDate ||
      whoisData.created ||
      whoisData.registered;

    const updatedOnRaw =
      whoisData.updatedDate ||
      whoisData.updated;

    const expiryDateRaw =
      whoisData.registryExpiryDate ||
      whoisData.expiryDate ||
      whoisData.expires;

    // =========================
    // FORMAT DATES
    // =========================

    const createdOn =
      createdOnRaw
        ? new Date(createdOnRaw)
        : null;

    const updatedOn =
      updatedOnRaw
        ? new Date(updatedOnRaw)
        : null;

    const expiryDate =
      expiryDateRaw
        ? new Date(expiryDateRaw)
        : null;

    // =========================
    // CALCULATE DOMAIN AGE
    // =========================

    let domainAge =
      "Not Available";

    if (createdOn) {

      const now =
        new Date();

      let years =
        now.getFullYear() -
        createdOn.getFullYear();

      let months =
        now.getMonth() -
        createdOn.getMonth();

      if (months < 0) {

        years--;
        months += 12;

      }

      domainAge =
        `${years} Years ${months} Months`;

    }

    // =========================
    // RESPONSE
    // =========================

    return Response.json({

      success: true,

      domain: cleanDomain,

      createdOn,

      updatedOn,

      expiryDate,

      registrar:
        whoisData.registrar ||
        "Not Available",

      domainAge,

    });

  }

  catch (error) {

    return Response.json({

      success: false,

      message:
        error.message ||
        "Something went wrong",

    });

  }

}