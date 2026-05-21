
import Link from "next/link";
import ToolsSection from "@/components/ToolsSection";
import { generateSEO } from "@/lib/seo";
import Schema from "@/components/Schema";


export const metadata = generateSEO({

title:
"Free SEO Tools | Website Analysis & Technical SEO Tools",

description:
"Free SEO tools to analyze websites, fix technical SEO issues, improve rankings, and grow organic traffic.",

path:
"/",

keywords:[

"SEO tools",
"free SEO tools",
"technical SEO",
"broken link checker",
"domain analyzer",
"robots tester",
"readability checker"

]

});

export default function Home() {

  const schema={

"@context":
"https://schema.org",

"@type":
"WebSite",

name:
"Free SEO Tools",

url:
"http://localhost:3000",

description:
"Free SEO tools for website analysis and technical SEO"

};


  return (
    

    <>
    <Schema data={schema}/>
    
    <main className="bg-white text-black">

      {/* Hero Section */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">

        <div className="text-center max-w-4xl mx-auto">

          <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium mb-6">

            🚀 Free SEO Tools Platform

          </div>


          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">

            Free SEO Tools for Better Rankings

          </h1>


          <p className="text-lg md:text-xl text-gray-600 leading-8 mb-10 max-w-3xl mx-auto">

            Powerful SEO tools to analyze websites, fix technical SEO issues,
            improve rankings, and grow organic traffic.

          </p>


        </div>

      </section>


      {/* SEO Tools Section */}

      <ToolsSection />


    </main>

    </>

  );

}