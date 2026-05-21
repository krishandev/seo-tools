import axios from "axios";

export async function POST(req){

try{

// ========================
// REQUEST BODY
// ========================

const body=
await req.json();

let { url }=
body;


// ========================
// VALIDATION
// ========================

if(!url){

return Response.json({

success:false,

message:
"Valid URL required"

});

}


// add protocol automatically

if(

!url.startsWith("http://") &&

!url.startsWith("https://")

){

url=
`https://${url}`;

}


// validate URL

let parsedUrl;

try{

parsedUrl=
new URL(url);

}

catch{

return Response.json({

success:false,

message:
"Invalid URL"

});

}


const domain=

parsedUrl.origin;

const robotsUrl=

`${domain}/robots.txt`;


// ========================
// FETCH ROBOTS
// ========================

let content="";

let exists=true;

try{

const response=

await axios.get(

robotsUrl,

{

timeout:5000,

headers:{

"User-Agent":
"Mozilla/5.0"

}

}

);

content=
response.data;

}

catch{

exists=false;

}


// robots not found

if(!exists){

return Response.json({

success:true,

exists:false,

robotsUrl,

content:"",

userAgents:[],

allowRules:[],

disallowRules:[],

sitemaps:[],

crawlDelay:null,

wildcards:[],

totalRules:0,

blockedCount:0,

warnings:[

"No robots.txt found"

],

recommendations:[

{

priority:"High",

message:
"Create robots.txt file"

}

],

seoScore:{

score:40,

status:"Poor"

}

});

}


// ========================
// EXTRACT DATA
// ========================

function extract(pattern){

const matches=

[

...content.matchAll(

pattern

)

];

return matches.map(

m=>m[1].trim()

);

}


const userAgents=

extract(

/User-agent:\s*(.*)/gi

);


const allowRules=

extract(

/Allow:\s*(.*)/gi

);


const disallowRules=

extract(

/Disallow:\s*(.*)/gi

);


const sitemaps=

extract(

/Sitemap:\s*(.*)/gi

);


const crawlDelay=

extract(

/Crawl-delay:\s*(.*)/gi

)[0] || null;


const wildcards=

[

...allowRules,

...disallowRules

]

.filter(

item=>

item.includes("*") ||

item.includes("$")

);


// ========================
// COUNTS
// ========================

const totalRules=

allowRules.length +

disallowRules.length;

const blockedCount=

disallowRules.filter(

x=>x!=="/"

).length;


// ========================
// WARNINGS
// ========================

const warnings=[];

if(

!sitemaps.length

){

warnings.push(

"No XML sitemap found"

);

}

if(

blockedCount>10

){

warnings.push(

"Too many blocked URLs"

);

}

if(

crawlDelay &&

Number(crawlDelay)>10

){

warnings.push(

"Crawl delay too high"

);

}

if(

content.trim()===""

){

warnings.push(

"robots.txt is empty"

);

}


// ========================
// RECOMMENDATIONS
// ========================

const recommendations=[];


if(

!sitemaps.length

){

recommendations.push({

priority:"High",

message:
"Add XML sitemap"

});

}


if(

blockedCount>10

){

recommendations.push({

priority:"Medium",

message:
"Review blocked URLs"

});

}


if(

wildcards.length

){

recommendations.push({

priority:"Low",

message:
"Review wildcard rules"

});

}


if(

crawlDelay &&

Number(crawlDelay)>10

){

recommendations.push({

priority:"Medium",

message:
"Reduce crawl delay"

});

}


// ========================
// SEO SCORE
// ========================

let seoScore=100;


if(!exists)
seoScore-=40;

if(!sitemaps.length)
seoScore-=20;

if(blockedCount>10)
seoScore-=15;

if(crawlDelay>10)
seoScore-=10;

if(wildcards.length>5)
seoScore-=10;

seoScore=

Math.max(

0,

seoScore

);


let status="Poor";

if(seoScore>=80){

status="Good";

}

else if(

seoScore>=50

){

status="Average";

}


// ========================
// RESPONSE
// ========================

return Response.json({

success:true,

robotsUrl,

exists,

content,

userAgents,

allowRules,

disallowRules,

sitemaps,

crawlDelay,

wildcards,

totalRules,

blockedCount,

warnings,

recommendations,

seoScore:{

score:
seoScore,

status

}

});

}

catch(error){

return Response.json({

success:false,

message:

error.message ||

"Something went wrong"

});

}

}