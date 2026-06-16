import axios from "axios";
import * as cheerio from "cheerio";

export async function POST(req) {

try {

const { url } = await req.json();

if (!url) {

return Response.json({

success: false,

message: "URL required"

});

}


// =====================
// URL NORMALIZATION
// =====================

let websiteUrl = url.trim();

if (
!websiteUrl.startsWith("http://") &&
!websiteUrl.startsWith("https://")
) {

websiteUrl = `https://${websiteUrl}`;

}


// =====================
// FETCH WEBSITE
// =====================

const response = await axios.get(

websiteUrl,

{

timeout: 15000,

headers: {

"User-Agent":
"Mozilla/5.0"

}

}

);

const html = response.data;

const $ = cheerio.load(html);


// =====================
// BASIC INFO
// =====================

const title =
$("title").text().trim();

const metaDescription =
$('meta[name="description"]').attr("content") || "";


// =====================
// TRUST SCORE
// =====================

const hasSSL =
websiteUrl.startsWith("https://");

const links = [];

$("a").each((i, el) => {

const href = $(el).attr("href");

if (href) {

links.push(
href.toLowerCase()
);

}

});

const aboutPage =
links.some(link =>
link.includes("about")
);

const contactPage =
links.some(link =>
link.includes("contact")
);

const privacyPage =
links.some(link =>
link.includes("privacy")
);

const termsPage =
links.some(link =>
link.includes("terms") ||
link.includes("condition")
);

let trustScore = 0;

if (hasSSL) trustScore += 20;
if (aboutPage) trustScore += 20;
if (contactPage) trustScore += 20;
if (privacyPage) trustScore += 20;
if (termsPage) trustScore += 20;


// =====================
// EXPERTISE SCORE
// =====================

const hasAuthorMeta =
$('meta[name="author"]').length > 0;

const hasSchema =
$('script[type="application/ld+json"]').length > 0;

const hasFAQSchema =
html.includes("FAQPage");

const hasOrganizationSchema =
html.includes("Organization");

let expertiseScore = 0;

if (hasAuthorMeta)
expertiseScore += 25;

if (hasSchema)
expertiseScore += 25;

if (hasFAQSchema)
expertiseScore += 25;

if (hasOrganizationSchema)
expertiseScore += 25;


// =====================
// AUTHORITY SCORE
// =====================

const socialPlatforms = [

"facebook.com",
"linkedin.com",
"twitter.com",
"x.com",
"instagram.com",
"youtube.com",
"pinterest.com"

];

const socialProfilesFound = [];

socialPlatforms.forEach(platform => {

if (html.includes(platform)) {

socialProfilesFound.push(platform);

}

});

let authorityScore = 0;

if (socialProfilesFound.length >= 1)
authorityScore += 30;

if (socialProfilesFound.length >= 3)
authorityScore += 30;

if (hasOrganizationSchema)
authorityScore += 20;

if (aboutPage)
authorityScore += 20;


// =====================
// EXPERIENCE SCORE
// =====================

const hasTestimonials =
html.toLowerCase().includes("testimonial");

const hasReviews =
html.toLowerCase().includes("review");

const hasCaseStudies =
html.toLowerCase().includes("case study");

const hasPortfolio =
html.toLowerCase().includes("portfolio");

let experienceScore = 0;

if (hasTestimonials)
experienceScore += 25;

if (hasReviews)
experienceScore += 25;

if (hasCaseStudies)
experienceScore += 25;

if (hasPortfolio)
experienceScore += 25;


// =====================
// FINAL EEAT SCORE
// =====================

const eeatScore = Math.round(

(

trustScore +

expertiseScore +

authorityScore +

experienceScore

) / 4

);


// =====================
// GRADE
// =====================

let grade = "Poor";

if (eeatScore >= 80) {

grade = "Excellent";

}

else if (eeatScore >= 60) {

grade = "Good";

}

else if (eeatScore >= 40) {

grade = "Average";

}


// =====================
// RECOMMENDATIONS
// =====================

const recommendations = [];

if (!aboutPage) {

recommendations.push(
"Create an About Us page"
);

}

if (!privacyPage) {

recommendations.push(
"Add a Privacy Policy page"
);

}

if (!termsPage) {

recommendations.push(
"Add Terms & Conditions page"
);

}

if (!hasAuthorMeta) {

recommendations.push(
"Add author information"
);

}

if (!hasSchema) {

recommendations.push(
"Implement structured data schema"
);

}

if (!hasFAQSchema) {

recommendations.push(
"Add FAQ schema"
);

}

if (!hasOrganizationSchema) {

recommendations.push(
"Add Organization schema"
);

}

if (socialProfilesFound.length === 0) {

recommendations.push(
"Link social media profiles"
);

}


// =====================
// RESPONSE
// =====================

return Response.json({

success: true,

title,

metaDescription,

eeatScore,

grade,


trust: {

score: trustScore,

checks: {

ssl: hasSSL,

aboutPage,

contactPage,

privacyPage,

termsPage

}

},


expertise: {

score: expertiseScore,

checks: {

hasAuthorMeta,

hasSchema,

hasFAQSchema,

hasOrganizationSchema

}

},


authority: {

score: authorityScore,

socialProfilesFound

},


experience: {

score: experienceScore,

checks: {

hasTestimonials,

hasReviews,

hasCaseStudies,

hasPortfolio

}

},

recommendations

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