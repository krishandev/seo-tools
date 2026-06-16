import Link from "next/link";

export default function ToolsSection() {

const tools=[

{
title:"Broken Link Checker",
description:"Find broken URLs and technical SEO issues.",
url:"/tools/broken-link-checker",
icon:"🔗"
},

{
title:"Domain Age Checker",
description:"Check domain registration age and history.",
url:"/tools/domain-age-checker",
icon:"🌐"
},

{
title:"Link Analyzer",
description:"Analyze internal and external links.",
url:"/tools/link-analyzer",
icon:"📊"
},

{
title:"Schema Generator",
description:"Generate structured data markup for SEO.",
url:"/tools/schema-generator",
icon:"⚡"
},

{
title:"Intent Checker",
description:"Detect search intent behind keywords.",
url:"/tools/intent-checker",
icon:"🎯"
},

{
title:"Domain Analyzer",
description:"Perform complete domain SEO audits.",
url:"/tools/domain-analyzer",
icon:"📈"
},

{
title:"Alt Text Checker",
description:"Find missing image alt attributes.",
url:"/tools/alt-text-checker",
icon:"🖼️"
},

{
title:"Readability Checker",
description:"Analyze content readability and SEO quality.",
url:"/tools/readability-checker",
icon:"📄"
},

{
title:"Robots.txt Tester",
description:"Analyze robots.txt and crawl rules.",
url:"/tools/robots-tester",
icon:"🤖"
},

{
title:"EEAT Score Checker",
description:"Analyze Experience, Expertise, Authoritativeness and Trustworthiness signals.",
url:"/tools/eeat-checker",
icon:"🏆"
}


];

return(

<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">

<div className="text-center mb-14">

<h2 className="text-4xl md:text-5xl font-bold">

Free SEO Tools Collection

</h2>

<p className="text-gray-600 mt-5 max-w-3xl mx-auto">
Analyze websites, audit technical SEO, check EEAT signals,
optimize content, validate schema markup, test robots.txt,
and improve search engine rankings with our free SEO tools.
</p>

</div>


<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

{

tools.map(

(tool,index)=>(

<Link

href={tool.url}

key={index}

className="group"

>

<div

className="bg-white border rounded-3xl p-8 shadow-lg

hover:shadow-2xl

hover:-translate-y-2

transition-all duration-300 h-full"

>

<div className="text-5xl">

{tool.icon}

</div>

<h3 className="text-2xl font-bold mt-6">

{tool.title}

</h3>

<p className="text-gray-600 mt-4 leading-7">

{tool.description}

</p>

<div

className="mt-8 inline-flex items-center font-medium"

>

Open Tool →

</div>

</div>

</Link>

)

)

}

</div>


{/* CTA */}

<div className="bg-black rounded-3xl text-white p-14 text-center mt-20">

<h2 className="text-4xl font-bold">

Ready to improve your SEO?

</h2>

<p className="mt-5 text-gray-300">

Start using free SEO tools and optimize your
website today.

</p>

<div className="flex justify-center gap-5 mt-8 flex-wrap">

<Link

href="/tools/eeat-checker"

className="bg-white text-black px-8 py-4 rounded-xl hover:bg-gray-100 transition"

>

🏆 Try EEAT Checker

</Link>

<Link

href="/"

className="border border-white px-8 py-4 rounded-xl"

>

Explore Tools

</Link>

</div>

</div>

</section>

);

}