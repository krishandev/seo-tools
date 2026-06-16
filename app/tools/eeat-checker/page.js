"use client";

import { useState } from "react";

export default function Page(){

const [url,setUrl]=useState("");
const [result,setResult]=useState(null);

async function checkEEAT(){

const res=
await fetch("/api/eeat-checker",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({url})

});

const data=
await res.json();

setResult(data);

}

return(

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

<div className="bg-white rounded-3xl shadow-lg border border-gray-200 p-4 sm:p-5 md:p-6 mb-12">

  <div className="flex flex-col md:flex-row gap-4">

    <input
      type="url"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Enter website URL (https://example.com)"
      className="
        w-full
        flex-1
        h-14
        md:h-16
        px-4
        md:px-5
        text-base
        md:text-lg
        rounded-2xl
        border
        border-gray-200
        focus:border-blue-500
        focus:ring-4
        focus:ring-blue-100
        focus:outline-none
        transition-all
      "
    />

    <button
      onClick={checkEEAT}
      className="
        w-full
        md:w-auto
        h-14
        md:h-16
        px-6
        md:px-8
        rounded-2xl
        bg-blue-600
        hover:bg-blue-700
        text-white
        font-semibold
        transition-all
        duration-300
        shadow-md
        hover:shadow-lg
        whitespace-nowrap
      "
    >
      🚀 Analyze EEAT
    </button>

  </div>

</div>


{result?.success && (

<div className="mt-10 space-y-8">

{/* EEAT SCORE */}

<div className="bg-white rounded-3xl shadow-lg p-8">

<div className="flex items-center justify-between">

<div>

<h2 className="text-3xl font-bold">
EEAT Score
</h2>

<p className="text-gray-500 mt-2">
Overall website quality score
</p>

</div>

<div
className={`text-6xl font-bold

${result.eeatScore >= 80
? "text-green-600"
: result.eeatScore >= 60
? "text-blue-600"
: result.eeatScore >= 40
? "text-yellow-600"
: "text-red-600"
}

`}
>

{result.eeatScore}

</div>

</div>

<div className="mt-6">

<div className="w-full h-5 bg-gray-200 rounded-full">

<div

className={`h-5 rounded-full

${result.eeatScore >= 80
? "bg-green-500"
: result.eeatScore >= 60
? "bg-blue-500"
: result.eeatScore >= 40
? "bg-yellow-500"
: "bg-red-500"
}

`}

style={{

width:
`${result.eeatScore}%`

}}

></div>

</div>

</div>

<p className="mt-4 text-lg font-medium">

Grade:

<span className="ml-2">

{result.grade}

</span>

</p>

</div>



{/* SCORE BREAKDOWN */}

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

<ScoreCard
title="Trust"
score={result.trust.score}
/>

<ScoreCard
title="Expertise"
score={result.expertise.score}
/>

<ScoreCard
title="Authority"
score={result.authority.score}
/>

<ScoreCard
title="Experience"
score={result.experience.score}
/>

</div>



{/* TRUST */}

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold mb-6">

Trust Signals

</h2>

<div className="grid md:grid-cols-2 gap-4">

<StatusCard
label="SSL Certificate"
status={result.trust.checks.ssl}
/>

<StatusCard
label="About Page"
status={result.trust.checks.aboutPage}
/>

<StatusCard
label="Contact Page"
status={result.trust.checks.contactPage}
/>

<StatusCard
label="Privacy Policy"
status={result.trust.checks.privacyPage}
/>

<StatusCard
label="Terms & Conditions"
status={result.trust.checks.termsPage}
/>

</div>

</div>



{/* EXPERTISE */}

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold mb-6">

Expertise Signals

</h2>

<div className="grid md:grid-cols-2 gap-4">

<StatusCard
label="Author Meta"
status={result.expertise.checks.hasAuthorMeta}
/>

<StatusCard
label="Schema Found"
status={result.expertise.checks.hasSchema}
/>

<StatusCard
label="FAQ Schema"
status={result.expertise.checks.hasFAQSchema}
/>

<StatusCard
label="Organization Schema"
status={result.expertise.checks.hasOrganizationSchema}
/>

</div>

</div>



{/* SOCIAL PROFILES */}

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold mb-6">

Authority Signals

</h2>

<div className="flex flex-wrap gap-3">

{result.authority.socialProfilesFound.map(

(profile,index)=>(

<span

key={index}

className="px-4 py-2 rounded-full bg-blue-100 text-blue-700"

>

{profile}

</span>

)

)}

</div>

</div>



{/* EXPERIENCE */}

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold mb-6">

Experience Signals

</h2>

<div className="grid md:grid-cols-2 gap-4">

<StatusCard
label="Testimonials"
status={result.experience.checks.hasTestimonials}
/>

<StatusCard
label="Reviews"
status={result.experience.checks.hasReviews}
/>

<StatusCard
label="Case Studies"
status={result.experience.checks.hasCaseStudies}
/>

<StatusCard
label="Portfolio"
status={result.experience.checks.hasPortfolio}
/>

</div>

</div>



{/* RECOMMENDATIONS */}

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold mb-6">

Recommendations

</h2>

<div className="space-y-4">

{result.recommendations.map(

(item,index)=>(

<div

key={index}

className="bg-yellow-50 border border-yellow-200 rounded-xl p-4"

>

⚠ {item}

</div>

)

)}

</div>

</div>



{/* WEBSITE DETAILS */}

<div className="bg-white rounded-3xl shadow-lg p-8">

<h2 className="text-2xl font-bold mb-6">

Website Details

</h2>

<div className="space-y-4">

<div>

<strong>Title:</strong>

<p>{result.title}</p>

</div>

<div>

<strong>Meta Description:</strong>

<p>{result.metaDescription}</p>

</div>

</div>

</div>

</div>

)}



</div>

);

}


function ScoreCard({ title, score }) {

return (

<div className="bg-white rounded-3xl shadow-lg p-6">

<p className="text-gray-500">

{title}

</p>

<h3 className="text-4xl font-bold mt-2">

{score}

</h3>

<div className="w-full h-3 bg-gray-200 rounded-full mt-4">

<div

className="h-3 bg-blue-500 rounded-full"

style={{

width:`${score}%`

}}

></div>

</div>

</div>

);

}



function StatusCard({

label,

status

}){

return(

<div

className={`p-4 rounded-xl border

${status

? "bg-green-50 border-green-200"

: "bg-red-50 border-red-200"

}

`}

>

<div className="font-medium">

{status ? "✅" : "❌"} {label}

</div>

</div>

);

}
