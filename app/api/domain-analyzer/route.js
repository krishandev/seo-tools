import axios from "axios";
import * as cheerio from "cheerio";
import whois from "whois-json";

export async function POST(req) {

  try {

    const body = await req.json();

    let { url } = body;

    if (!url) {

      return Response.json({
        success: false,
        message: "Website URL required"
      });

    }

    // Add protocol if missing

    if (
      !url.startsWith("http://") &&
      !url.startsWith("https://")
    ) {

      url = `https://${url}`;

    }

    const domain =
      new URL(url);

    const hostname =
      domain.hostname;

    // =====================
    // Fetch Website
    // =====================

    const response =
      await axios.get(url, {

        timeout: 15000,

        validateStatus: false,

        headers: {
          "User-Agent":
            "Mozilla/5.0"
        }

      });

    const html =
      response.data;

    const $ =
      cheerio.load(html);

    // =====================
    // META DATA
    // =====================

    const title =
      $("title")
      .text()
      .trim();

    const metaDescription =
      $('meta[name="description"]')
      .attr("content") || "";

    const canonical =
      $('link[rel="canonical"]')
      .attr("href") || null;

    const viewport =
      $('meta[name="viewport"]')
      .attr("content");

    // =====================
    // HEADINGS
    // =====================

    function getHeadings(tag){

      let data=[];

      $(tag).each((i,el)=>{

        data.push(
          $(el)
          .text()
          .trim()
        );

      });

      return data;

    }

    const headings={

      h1:getHeadings("h1"),
      h2:getHeadings("h2"),
      h3:getHeadings("h3"),
      h4:getHeadings("h4"),
      h5:getHeadings("h5"),
      h6:getHeadings("h6")

    };

    // =====================
    // Images
    // =====================

    let missingAlt=[];

    $("img").each((i,el)=>{

      const src=
      $(el).attr("src");

      const alt=
      $(el).attr("alt");

      if(
        !alt ||
        alt.trim()===""
      ){

        missingAlt.push(
          new URL(
            src || "",
            url
          ).href
        );

      }

    });

    // =====================
    // Robots.txt
    // =====================

    let robots={

      exists:false,
      url:null

    };

    try{

      const robotsUrl=
      `${domain.origin}/robots.txt`;

      const res=
      await axios.get(
        robotsUrl
      );

      if(res.status===200){

        robots={

          exists:true,
          url:robotsUrl

        };

      }

    }

    catch(e){}

    // =====================
    // Sitemap
    // =====================

    let sitemap={

      exists:false,
      url:null

    };

    const sitemapLocations=[

      "/sitemap.xml",
      "/sitemap_index.xml",
      "/sitemap-index.xml"

    ];

    for(
      const path
      of sitemapLocations
    ){

      try{

        const sitemapUrl=
        `${domain.origin}${path}`;

        const response=
        await axios.get(
          sitemapUrl
        );

        if(
          response.status===200
        ){

          sitemap={

            exists:true,
            url:sitemapUrl

          };

          break;

        }

      }

      catch(err){}

    }

    // =====================
    // Broken links
    // =====================

    let brokenLinks=[];

    const links=[];

    $("a").each(
      (i,el)=>{

      const href=
      $(el)
      .attr("href");

      if(
        href &&
        href.startsWith("/")
      ){

        links.push(
          new URL(
            href,
            url
          ).href
        );

      }

    });

    const uniqueLinks=
    [...new Set(
      links
    )]
    .slice(0,30);

    for(
      const link
      of uniqueLinks
    ){

      try{

        const check=
        await axios.get(
          link,
          {
            timeout:5000
          }
        );

        if(
          check.status>=400
        ){

          brokenLinks.push(
            link
          );

        }

      }

      catch{

        brokenLinks.push(
          link
        );

      }

    }

    // =====================
    // Schema
    // =====================

    const schemaScripts=
    $('script[type="application/ld+json"]');

    let schemaTypes=[];

    schemaScripts.each(
      (i,el)=>{

      try{

        const json=
        JSON.parse(
          $(el)
          .html()
        );

        if(
          json["@type"]
        ){

          schemaTypes.push(
            json["@type"]
          );

        }

      }

      catch{}

    });

    // =====================
    // OG Tags
    // =====================

    const openGraph=

      $('meta[property^="og:"]')
      .length>0;

    // =====================
    // Twitter
    // =====================

    const twitter=

      $('meta[name^="twitter:"]')
      .length>0;

    // =====================
    // SSL
    // =====================

    const ssl=
    url.startsWith(
      "https://"
    );

    // =====================
    // Google Analytics
    // =====================

    const htmlContent=
    $.html();

    const analytics=

      htmlContent.includes(
        "gtag"
      ) ||

      htmlContent.includes(
        "analytics.js"
      ) ||

      htmlContent.includes(
        "googletagmanager"
      );

    // =====================
    // Favicon
    // =====================

    const favicon=

      $('link[rel*="icon"]')
      .attr("href");

    // =====================
    // Social profiles
    // =====================

    let socialProfiles=[];

    const socialDomains=[

      "facebook.com",
      "instagram.com",
      "linkedin.com",
      "twitter.com",
      "x.com",
      "youtube.com",
      "pinterest.com",
      "tiktok.com"

    ];

    $("a").each((i,el)=>{

      const href=
      $(el).attr(
        "href"
      );

      if(!href) return;

      socialDomains.forEach(
      social=>{

      if(
        href.includes(
          social
        )
      ){

        socialProfiles.push(
          href
        );

      }

      });

    });

    socialProfiles=
    [...new Set(
      socialProfiles
    )];

    // =====================
    // Domain Age
    // =====================

    let domainAge=
    "Unknown";

    try{

      const whoisData=
      await whois(
        hostname
      );

      const created=
      whoisData.creationDate;

      if(created){

        const years=
        Math.floor(

          (
            new Date()-
            new Date(created)
          )

          /

          (365*24*60*60*1000)

        );

        domainAge=
        `${years} Years`;

      }

    }

    catch{}

    // =====================
    // Backlink Score
    // =====================

    // External links

    const externalLinksCount=

      $("a[href^='http']")
      .length;
      

    const backlinkScore=

      Math.min(

      100,

      Math.floor(

      socialProfiles.length*5 +

      externalLinksCount +

      parseInt(
        domainAge
      )*2 || 0

      )

    );

    

    // =====================
    // SEO SCORE
    // =====================

    let seoScore=0;

    if(title) seoScore+=10;
    if(metaDescription) seoScore+=10;
    if(canonical) seoScore+=10;
    if(viewport) seoScore+=10;
    if(ssl) seoScore+=10;
    if(openGraph) seoScore+=10;
    if(twitter) seoScore+=10;
    if(schemaTypes.length) seoScore+=10;
    if(robots.exists) seoScore+=10;
    if(sitemap.exists) seoScore+=10;

    // =====================

    return Response.json({

      success:true,

      seoScore,

      title,

      titleLength:
      title.length,

      metaDescription,

      metaDescriptionLength:
      metaDescription.length,

      headings,

      images:{

        total:
        $("img").length,

        missingAltCount:
        missingAlt.length,

        missingAlt

      },

      robots,

      sitemap,

      canonical,

      brokenLinks:{

        count:
        brokenLinks.length,

        links:
        brokenLinks

      },

      mobileFriendly:
      !!viewport,

      schema:{

        exists:
        schemaTypes.length>0,

        schemaTypes

      },

      openGraph,

      twitter,

      ssl,

      analytics,

      favicon:{

        exists:
        !!favicon,

        url:
        favicon

      },

      domainAge,

      backlinkScore,

      socialProfiles

    });

  }

  catch(error){

    return Response.json({

      success:false,

      message:
      error.message

    });

  }

}



// import axios from "axios";
// import * as cheerio from "cheerio";
// import whois from "whois-json";

// export async function POST(req) {

//   try {

//     // =========================
//     // REQUEST BODY
//     // =========================

//     const body =
//       await req.json();

//     const { url } = body;

//     // =========================
//     // VALIDATION
//     // =========================

//     if (!url) {

//       return Response.json({

//         success: false,

//         message:
//           "URL is required",

//       });

//     }

//     // =========================
//     // FETCH WEBSITE
//     // =========================

//     const response =
//       await axios.get(url, {

//         timeout: 15000,

//         validateStatus: false,

//         headers: {

//           "User-Agent":
//             "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",

//         },

//       });

//     const html =
//       response.data;

//     // =========================
//     // LOAD HTML
//     // =========================

//     const $ =
//       cheerio.load(html);

//     // =========================
//     // BASIC SEO
//     // =========================

//     const title =
//       $("title")
//         .text()
//         .trim();

//     const titleLength =
//       title.length;

//     const metaDescription =
//       $('meta[name="description"]')
//         .attr("content") || "";

//     const metaDescriptionLength =
//       metaDescription.length;

//     const canonical =
//       $('link[rel="canonical"]')
//         .attr("href") || "";

//     const robots =
//       $('meta[name="robots"]')
//         .attr("content") || "";

//     const viewport =
//       $('meta[name="viewport"]')
//         .attr("content") || "";

//     // =========================
//     // HEADINGS
//     // =========================

//     const h1Tags = [];

//     $("h1").each(
//       (index, element) => {

//         h1Tags.push(
//           $(element)
//             .text()
//             .trim()
//         );

//       }
//     );

//     const h2Tags = [];

//     $("h2").each(
//       (index, element) => {

//         h2Tags.push(
//           $(element)
//             .text()
//             .trim()
//         );

//       }
//     );

//     const h1Count =
//       h1Tags.length;

//     const h2Count =
//       h2Tags.length;

//     // =========================
//     // LINKS
//     // =========================

//     const internalLinks =
//       [];

//     const externalLinks =
//       [];

//     const baseHostname =
//       new URL(url)
//         .hostname;

//     $("a").each(
//       (index, element) => {

//         const href =
//           $(element).attr(
//             "href"
//           );

//         if (!href) return;

//         try {

//           const absoluteUrl =
//             new URL(
//               href,
//               url
//             ).href;

//           const hostname =
//             new URL(
//               absoluteUrl
//             ).hostname;

//           if (
//             hostname ===
//             baseHostname
//           ) {

//             internalLinks.push(
//               absoluteUrl
//             );

//           }

//           else {

//             externalLinks.push(
//               absoluteUrl
//             );

//           }

//         }

//         catch (error) {

//           console.log(
//             "Invalid URL"
//           );

//         }

//       }
//     );

//     // =========================
//     // IMAGES
//     // =========================

//     const totalImages =
//       $("img").length;

//     let missingAltCount = 0;

//     $("img").each(
//       (index, element) => {

//         const alt =
//           $(element).attr(
//             "alt"
//           );

//         if (
//           !alt ||
//           alt.trim() === ""
//         ) {

//           missingAltCount++;

//         }

//       }
//     );

//     // =========================
//     // HTTPS
//     // =========================

//     const https =
//       url.startsWith(
//         "https://"
//       );

//     // =========================
//     // OPEN GRAPH
//     // =========================

//     const openGraph =
//       $('meta[property^="og:"]')
//         .length > 0;

//     // =========================
//     // TWITTER CARDS
//     // =========================

//     const twitterCards =
//       $('meta[name^="twitter:"]')
//         .length > 0;

//     // =========================
//     // SCHEMA DETECTION
//     // =========================

//     const schemaDetected =
//       $(
//         'script[type="application/ld+json"]'
//       ).length > 0;

//     // =========================
//     // DOMAIN AGE
//     // =========================

//     let domainAge =
//       "Unknown";

//     try {

//       const domain =
//         new URL(url)
//           .hostname;

//       const whoisData =
//         await whois(
//           domain
//         );

//       const creationDate =
//         whoisData.creationDate ||
//         whoisData.created ||
//         whoisData.createdDate;

//       if (
//         creationDate
//       ) {

//         const created =
//           new Date(
//             creationDate
//           );

//         const today =
//           new Date();

//         const years =
//           today.getFullYear() -
//           created.getFullYear();

//         domainAge =
//           `${years} Years`;

//       }

//     }

//     catch (error) {

//       console.log(
//         "WHOIS Error"
//       );

//     }

//     // =========================
//     // SEO SCORE
//     // =========================

//     function calculateSeoScore() {

//       let score = 0;

//       if (title)
//         score += 10;

//       if (
//         metaDescription
//       )
//         score += 10;

//       if (h1Count > 0)
//         score += 10;

//       if (https)
//         score += 10;

//       if (canonical)
//         score += 10;

//       if (
//         schemaDetected
//       )
//         score += 10;

//       if (viewport)
//         score += 10;

//       if (
//         openGraph
//       )
//         score += 10;

//       if (
//         twitterCards
//       )
//         score += 10;

//       if (
//         missingAltCount === 0
//       )
//         score += 10;

//       return score;

//     }

//     const seoScore =
//       calculateSeoScore();

//     // =========================
//     // RESPONSE
//     // =========================

//     return Response.json({

//       success: true,

//       seoScore,

//       domainAge,

//       title,

//       titleLength,

//       metaDescription,

//       metaDescriptionLength,

//       canonical,

//       robots,

//       viewport,

//       https,

//       h1Count,

//       h2Count,

//       h1Tags,

//       h2Tags,

//       internalLinks:
//         internalLinks.length,

//       externalLinks:
//         externalLinks.length,

//       totalImages,

//       missingAltCount,

//       openGraph,

//       twitterCards,

//       schemaDetected,

//     });

//   }

//   catch (error) {

//     // =========================
//     // ERROR RESPONSE
//     // =========================

//     return Response.json({

//       success: false,

//       message:
//         error.message ||
//         "Something went wrong",

//     });

//   }

// }