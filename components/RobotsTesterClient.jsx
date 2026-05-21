"use client";

import { useState } from "react";

export default function RobotsTesterClient() {

const [url,setUrl]=useState("");
const [loading,setLoading]=useState(false);
const [result,setResult]=useState(null);
const [error,setError]=useState("");
const [showRaw,setShowRaw]=useState(false);


// =======================
// API
// =======================

async function analyzeRobots(){

if(!url.trim()){

setError("Website URL required");

return;

}

try{

setLoading(true);

setError("");

setResult(null);

const response=

await fetch(

"/api/robots-tester",

{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

url

})

}

);

const data=

await response.json();

if(!data.success){

setError(data.message);

return;

}

setResult(data);

}

catch(error){

console.log(error);

setError(

"Something went wrong"

);

}

finally{

setLoading(false);

}

}



// =======================
// COPY REPORT
// =======================

function copyReport(){

if(!result)return;

const report=`

Robots URL:
${result.robotsUrl}

User Agents:
${result.userAgents.join(", ")}

Allow Rules:
${result.allowRules.join(", ")}

Disallow Rules:
${result.disallowRules.join(", ")}

Sitemaps:
${result.sitemaps.join(", ")}

SEO Score:
${result.seoScore.score}/100

`;

navigator.clipboard.writeText(
report
);

alert(
"Report copied successfully"
);

}


// =======================
// CLEAR
// =======================

function clear(){

setUrl("");
setResult(null);
setError("");

}


// =======================
// SCORE COLORS
// =======================

function scoreColor(score){

if(score>=80)
return "bg-green-500";

if(score>=50)
return "bg-yellow-500";

return "bg-red-500";

}


// =======================

return(

<main className="max-w-7xl mx-auto px-6 py-10">

{/* HEADER */}

<div className="mb-10">

<h1 className="text-5xl font-bold">

Robots.txt Tester

</h1>

<p className="text-gray-500 mt-3">

Analyze robots.txt, crawl rules,
blocked pages, XML sitemap and technical SEO settings.

</p>

</div>



{/* INPUT */}

<div className="bg-white rounded-3xl p-6 shadow">

<input

type="text"

value={url}

onChange={(e)=>setUrl(e.target.value)}

placeholder="Enter website URL"

className="w-full border rounded-xl p-4"

>


</input>


<div className="flex gap-4 mt-6 flex-wrap">

<button

onClick={analyzeRobots}

disabled={loading}

className={`px-6 py-4 rounded-xl text-white

${loading

? "bg-gray-400"

: "bg-black hover:bg-gray-800"

}

`}

>

{

loading

?

"Analyzing..."

:

"Analyze Robots"

}

</button>


<button

onClick={clear}

className="border px-6 py-4 rounded-xl"

>

Clear

</button>


<button

onClick={copyReport}

className="border px-6 py-4 rounded-xl"

>

Copy Report

</button>

</div>


{

error && (

<div className="mt-5 bg-red-100 text-red-600 rounded-xl p-4">

{error}

</div>

)

}

</div>



{/* LOADING */}

{

loading && (

<div className="mt-10 bg-white rounded-3xl p-10 shadow">

<div className="flex items-center gap-5">

<div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"/>

<p>

Analyzing robots.txt...

</p>

</div>

</div>

)

}



{/* EMPTY */}

{

!loading && !result && (

<div className="bg-gray-50 rounded-3xl p-16 mt-10 text-center">

<div className="text-7xl">

🤖

</div>

<h2 className="text-2xl font-bold mt-5">

Enter website URL to analyze robots.txt

</h2>

</div>

)

}



{/* RESULTS */}

{

result?.success && (

<div className="space-y-8 mt-10">


{/* DASHBOARD */}

<div className="grid md:grid-cols-2 lg:grid-cols-6 gap-5">

<DashboardCard
title="Robots"
value={result.exists ? "Found":"Missing"}
/>

<DashboardCard
title="Rules"
value={result.totalRules}
/>

<DashboardCard
title="Blocked"
value={result.blockedCount}
/>

<DashboardCard
title="Sitemaps"
value={result.sitemaps.length}
/>

<DashboardCard
title="Delay"
value={result.crawlDelay || "N/A"}
/>

<DashboardCard
title="SEO Score"
value={`${result.seoScore.score}/100`}
/>

</div>


{/* SEO SCORE */}

<Section title="SEO Score">

<p className="text-gray-500">

{result.seoScore.status}

</p>

<div className="w-full h-6 bg-gray-200 rounded-full mt-5">

<div

className={`h-6 rounded-full ${scoreColor(result.seoScore.score)}`}

style={{

width:

`${result.seoScore.score}%`

}}

></div>

</div>

</Section>



{/* ROBOTS INFO */}

<Section title="Robots Information">

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

<DashboardCard
title="User Agents"
value={result.userAgents.length}
/>

<DashboardCard
title="Allow Rules"
value={result.allowRules.length}
/>

<DashboardCard
title="Disallow Rules"
value={result.disallowRules.length}
/>

<DashboardCard
title="Wildcards"
value={result.wildcards.length}
/>

<DashboardCard
title="Content Size"
value={`${result.content.length} chars`}
/>

</div>

</Section>



{/* USER AGENTS */}

<Section title="User Agents">

<div className="flex gap-3 flex-wrap">

{

result.userAgents.map(

(item,index)=>(

<Badge
key={index}
text={item}
/>

)

)

}

</div>

</Section>



{/* ALLOW */}

<Section title="Allow Rules">

<div className="space-y-3 max-h-[300px] overflow-y-auto">

{

result.allowRules.map(

(item,index)=>(

<div

key={index}

className="bg-green-100 text-green-700 p-3 rounded-xl"

>

{item}

</div>

)

)

}

</div>

</Section>



{/* DISALLOW */}

<Section title="Disallow Rules">

<div className="space-y-3 max-h-[300px] overflow-y-auto">

{

result.disallowRules.map(

(item,index)=>(

<div

key={index}

className="bg-red-100 text-red-700 p-3 rounded-xl"

>

{item}

</div>

)

)

}

</div>

</Section>



{/* SITEMAPS */}

<Section title="Sitemaps">

{

result.sitemaps.map(

(item,index)=>(

<a

key={index}

href={item}

target="_blank"

className="block text-blue-600 underline mb-3"

>

{item}

</a>

)

)

}

</Section>



{/* RAW ROBOTS */}

<Section title="Raw Robots.txt">

<button

onClick={()=>setShowRaw(!showRaw)}

className="border px-4 py-2 rounded-xl"

>

{

showRaw

?

"Hide"

:

"Show"

}

</button>

{

showRaw && (

<pre className="mt-5 bg-gray-100 p-5 rounded-xl overflow-auto text-sm">

{result.content}

</pre>

)

}

</Section>



{/* WARNINGS */}

<Section title="Warnings">

{

result.warnings.map(

(item,index)=>(

<div

key={index}

className="bg-yellow-100 text-yellow-700 p-4 rounded-xl mb-3"

>

⚠ {item}

</div>

)

)

}

</Section>



{/* RECOMMENDATIONS */}

<Section title="Recommendations">

{

result.recommendations.map(

(item,index)=>(

<RecommendationCard

key={index}

priority={item.priority}

message={item.message}

/>

)

)

}

</Section>

</div>

)

}

</main>

);

}



// ======================

function DashboardCard({

title,
value

}){

return(

<div className="bg-white rounded-3xl shadow p-6">

<p className="text-gray-500">

{title}

</p>

<h3 className="text-3xl font-bold mt-3">

{value}

</h3>

</div>

);

}


function Badge({

text

}){

return(

<span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700">

{text}

</span>

);

}


function RecommendationCard({

priority,
message

}){

return(

<div className="border rounded-xl p-5 mb-4">

<span className="font-bold">

{priority}

</span>

<p>

{message}

</p>

</div>

);

}


function Section({

title,
children

}){

return(

<div className="bg-white rounded-3xl shadow p-8">

<h2 className="text-2xl font-bold mb-6">

{title}

</h2>

{children}

</div>

);

}