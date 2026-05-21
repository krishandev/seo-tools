"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {

const [menuOpen,setMenuOpen]=
useState(false);

return(

<header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="flex items-center justify-between h-16">


{/* LOGO */}

<Link
href="/"
className="text-2xl font-bold text-black"
>

Free SEO Tools

</Link>


{/* DESKTOP MENU */}

<nav className="hidden md:flex items-center gap-8">

<Link
href="/"
className="text-gray-700 hover:text-black transition"
>
Home
</Link>


{/* TOOLS */}

<div className="relative group">

<button className="text-gray-700 hover:text-black transition flex items-center gap-1">

Tools

<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
strokeWidth={1.5}
stroke="currentColor"
className="w-4 h-4"
>
<path
strokeLinecap="round"
strokeLinejoin="round"
d="M19.5 8.25l-7.5 7.5-7.5-7.5"
/>
</svg>

</button>


<div className="absolute left-0 mt-3 w-64 bg-white border rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">

<div className="p-3 flex flex-col">


{[
["Broken Link Checker","/tools/broken-link-checker"],
["Domain Age Checker","/tools/domain-age-checker"],
["Link Analyzer","/tools/link-analyzer"],
["Schema Generator","/tools/schema-generator"],
["Intent Checker","/tools/intent-checker"],
["Domain Analyzer","/tools/domain-analyzer"],
["Alt Text Checker","/tools/alt-text-checker"],
["Readability Checker","/tools/readability-checker"],
["Robots Tester","/tools/robots-tester"]

].map((tool,index)=>(

<Link
key={index}
href={tool[1]}
className="px-4 py-3 rounded-xl hover:bg-gray-100 transition"
>

{tool[0]}

</Link>

))}

</div>

</div>

</div>


<Link
href="/tools/domain-analyzer"
className="text-gray-700 hover:text-black transition"
>
Domain Analyzer
</Link>

</nav>


{/* CTA */}

<div className="hidden md:block">

<a

href="https://wa.me/917053051182"

target="_blank"

className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800 transition"

>

Chat on WhatsApp

</a>

</div>


{/* MOBILE BUTTON */}

<button

className="md:hidden"

onClick={()=>

setMenuOpen(

!menuOpen

)

}

>

☰

</button>

</div>


{/* MOBILE MENU */}

{

menuOpen && (

<div className="md:hidden py-5 border-t">

<div className="flex flex-col gap-4">

<Link
href="/"
className="text-gray-700"
>
Home
</Link>


<p className="font-bold">

Tools

</p>


{[
["Broken Link Checker","/tools/broken-link-checker"],
["Domain Age Checker","/tools/domain-age-checker"],
["Link Analyzer","/tools/link-analyzer"],
["Schema Generator","/tools/schema-generator"],
["Intent Checker","/tools/intent-checker"],
["Domain Analyzer","/tools/domain-analyzer"],
["Alt Text Checker","/tools/alt-text-checker"],
["Readability Checker","/tools/readability-checker"],
["Robots Tester","/tools/robots-tester"]

].map((tool,index)=>(

<Link
key={index}
href={tool[1]}
className="pl-2 text-gray-700"
>

{tool[0]}

</Link>

))}


<a

href="https://wa.me/917053051182"

target="_blank"

className="mt-2 bg-black text-white px-5 py-3 rounded-xl text-center"

>

Chat on WhatsApp

</a>

</div>

</div>

)

}

</div>

</header>

);

}