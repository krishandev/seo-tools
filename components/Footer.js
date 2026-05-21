import Link from "next/link";

export default function Footer() {

const currentYear=
new Date().getFullYear();

return(

<footer className="bg-black text-white mt-20">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">


{/* TOP */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-10">


{/* BRAND */}

<div>

<h2 className="text-3xl font-bold mb-4">

Free SEO Tools

</h2>

<p className="text-gray-400 leading-7">

Free SEO tools for website analysis, technical SEO,
content optimization, readability checks, robots.txt
testing, and other search engine optimization tasks.

</p>

</div>



{/* QUICK LINKS */}

<div>

<h3 className="text-xl font-semibold mb-5">

Quick Links

</h3>

<ul className="space-y-3">

<li>

<Link
href="/"
className="text-gray-400 hover:text-white transition"
>

Home

</Link>

</li>


<li>

<Link
href="/tools/broken-link-checker"
className="text-gray-400 hover:text-white transition"
>

SEO Tools

</Link>

</li>


<li>

<a
href="https://wa.me/917053051182"
target="_blank"
className="text-gray-400 hover:text-white transition"
>

WhatsApp

</a>

</li>

</ul>

</div>



{/* SEO TOOLS */}

<div>

<h3 className="text-xl font-semibold mb-5">

SEO Tools

</h3>

<ul className="space-y-3">

<li>

<Link
href="/tools/broken-link-checker"
className="text-gray-400 hover:text-white transition"
>

Broken Link Checker

</Link>

</li>


<li>

<Link
href="/tools/domain-analyzer"
className="text-gray-400 hover:text-white transition"
>

Domain Analyzer

</Link>

</li>


<li>

<Link
href="/tools/readability-checker"
className="text-gray-400 hover:text-white transition"
>

Readability Checker

</Link>

</li>


<li>

<Link
href="/tools/robots-tester"
className="text-gray-400 hover:text-white transition"
>

Robots Tester

</Link>

</li>

</ul>

</div>



{/* CONTACT */}

<div>

<h3 className="text-xl font-semibold mb-5">

Contact

</h3>

<p className="text-gray-400 mb-6">

Need help with SEO tools?

</p>

<a

href="https://wa.me/917053051182"

target="_blank"

className="inline-block bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition"

>

Chat on WhatsApp

</a>

</div>

</div>



{/* BOTTOM */}

<div className="border-t border-gray-800 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

<p className="text-gray-500 text-sm">

© {currentYear} Free SEO Tools. All rights reserved.

</p>


<div className="flex gap-6">

<Link
href="#"
className="text-gray-500 hover:text-white text-sm transition"
>

Privacy Policy

</Link>


<Link
href="#"
className="text-gray-500 hover:text-white text-sm transition"
>

Terms & Conditions

</Link>

</div>

</div>

</div>

</footer>

);

}