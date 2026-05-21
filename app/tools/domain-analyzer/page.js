"use client";

import { useState } from "react";

export default function DomainAnalyzer() {

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

    const [error, setError] =
useState("");

async function analyzeWebsite() {

  if (!url) return;

  try {

    setLoading(true);
    setResult(null);

    const response = await fetch(
      "/api/domain-analyzer",
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

    const data =
      await response.json();

    console.log(
      "API RESPONSE:",
      data
    );

    if(!data.success){

      alert(
        data.message ||
        "Error analyzing website"
      );

      return;
    }

    setResult(data);

  }

  catch(error){

    console.log(
      "Frontend Error:",
      error
    );

    alert(
      "Something went wrong"
    );

  }

  finally{

    setLoading(false);

  }

}

  // ======================

  function badge(status) {

    return status

      ? "bg-green-100 text-green-700"

      : "bg-red-100 text-red-700";

  }

  // ======================

  function scoreColor(score) {

    if (score >= 80)
      return "bg-green-500";

    if (score >= 50)
      return "bg-yellow-500";

    return "bg-red-500";

  }

  // ======================

  function copyReport() {

    const report = `

SEO SCORE:
${result?.seoScore}/100

TITLE:
${result?.title}

META DESCRIPTION:
${result?.metaDescription}

DOMAIN AGE:
${result?.domainAge}

BROKEN LINKS:
${result?.brokenLinks?.count}

MISSING ALT:
${result?.images?.missingAltCount}

SSL:
${result?.ssl ? "Yes" : "No"}

SCHEMA:
${result?.schema?.exists ? "Yes" : "No"}

`;

    navigator.clipboard.writeText(
      report
    );

    alert(
      "SEO Report copied"
    );

  }

  return (

    <main className="max-w-7xl mx-auto px-6 py-10">

      {/* Heading */}

      <div className="mb-8">

        <h1 className="text-5xl font-bold">

          Domain Analyzer
        </h1>

        <p className="text-gray-500 mt-3">

          Complete SEO & Technical SEO Audit Tool

        </p>

      </div>

      {/* Input */}

      <div className="bg-white rounded-3xl p-6 shadow">

        <input
          type="text"
          value={url}
          onChange={(e)=>
            setUrl(
              e.target.value
            )
          }
          placeholder="Enter website URL"
          className="w-full border p-4 rounded-xl"
        />

        <button

          onClick={
            analyzeWebsite
          }
          

          disabled={
            loading
          }

          className={`mt-6 px-8 py-4 rounded-xl text-white

          ${
            loading
            ?

            "bg-gray-500"

            :

            "bg-black hover:bg-gray-800"
          }`}

        >

          {
error && (

<p className="text-red-500 mt-4">

{error}

</p>

)
}

          {

            loading

            ?

            "Analyzing..."

            :

            "Analyze Website"

          }

        </button>

      </div>

      {/* Loading */}

      {

        loading &&

        <div className="mt-8 bg-white p-8 rounded-3xl shadow">

          <div className="flex gap-4">

            <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"/>

            <p>

              Running SEO audit...

            </p>

          </div>

        </div>

      }

      {/* Result */}

      {

        result?.success && (

          <div className="mt-10 space-y-6">

            {/* Header */}

            <div className="flex justify-between flex-wrap gap-5">

              <div>

                <h2 className="text-3xl font-bold">

                  SEO Audit Report

                </h2>

                <p className="text-gray-500">

                  {url}

                </p>

              </div>

              <button

                onClick={
                  copyReport
                }

                className="bg-black text-white px-6 py-3 rounded-xl"

              >

                Copy Report

              </button>

            </div>

            {/* Score */}

            <div className="bg-white p-8 rounded-3xl shadow">

              <p className="text-gray-500">

                SEO Score

              </p>

              <h3 className="text-6xl font-bold">

                {result?.seoScore}/100

              </h3>

              <div className="w-full bg-gray-200 rounded-full h-5 mt-5">

                <div

                  className={`h-5 rounded-full ${scoreColor(

                    result?.seoScore

                  )}`}

                  style={{

                    width:

                    `${result?.seoScore}%`

                  }}

                />

              </div>

            </div>

            {/* Overview */}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              <Card
                title="Domain Age"
                value={
                  result?.domainAge
                }
              />

              <Card
                title="Backlink Score"
                value={
                  result?.backlinkScore
                }
              />

              <Card
                title="Missing Alt"
                value={
                  result?.images?.missingAltCount
                }
              />

              <Card
                title="Broken Links"
                value={
                  result?.brokenLinks?.count
                }
              />

            </div>

            {/* Status */}

            <div className="grid lg:grid-cols-3 gap-6">

              <StatusCard
                title="SSL"
                status={
                  result?.ssl
                }
              />

              <StatusCard
                title="Schema"
                status={
                  result?.schema?.exists
                }
              />

              <StatusCard
                title="Open Graph"
                status={
                  result?.openGraph
                }
              />

              <StatusCard
                title="Twitter Cards"
                status={
                  result?.twitter
                }
              />

              <StatusCard
                title="Google Analytics"
                status={
                  result?.analytics
                }
              />

              <StatusCard
                title="Robots.txt"
                status={
                  result?.robots?.exists
                }
              />

            </div>

            {/* Meta */}

            <Section title="Meta SEO">

              <Item
                label="Title"
                value={
                  result?.title
                }
              />

              <Item
                label="Title Length"
                value={
                  result?.titleLength
                }
              />

              <Item
                label="Meta Description"
                value={
                  result?.metaDescription
                }
              />

              <Item
                label="Canonical"
                value={
                  result?.canonical
                }
              />

            </Section>

            {/* Headings */}

            <Section title="Headings">

              {

                Object.entries(

                  result?.headings || {}

                ).map(

                  ([tag,items])=>(

                    <div
                      key={tag}
                      className="mb-5"
                    >

                      <h4 className="font-bold">

                        {tag.toUpperCase()} ({items.length})

                      </h4>

                      {

                        items.map(
                          (item,index)=>(

                            <div
                              key={index}
                              className="bg-gray-100 p-3 rounded mt-2"
                            >

                              {item}

                            </div>

                          )
                        )

                      }

                    </div>

                  )
                )

              }

            </Section>

            {/* Missing Alt */}

            <Section title="Missing Alt Images">

              {

                result?.images?.missingAlt?.map(

                  (img,index)=>(

                    <div
                      key={index}
                      className="bg-red-50 p-3 rounded mb-2 break-all"
                    >

                      {img}

                    </div>

                  )

                )

              }

            </Section>

            {/* Social */}

            <Section title="Social Profiles">

              {

                result?.socialProfiles?.map(

                  (social,index)=>(

                    <a

                      href={social}

                      key={index}

                      target="_blank"

                      className="block text-blue-600 underline mb-3"

                    >

                      {social}

                    </a>

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

// =====================

function Card({

title,
value

}){

return(

<div className="bg-white p-6 rounded-3xl shadow">

<p className="text-gray-500">

{title}

</p>

<h3 className="text-3xl font-bold">

{value}

</h3>

</div>

);

}

// =====================

function StatusCard({

title,
status

}){

return(

<div className="bg-white p-6 rounded-3xl shadow">

<p className="mb-3">

{title}

</p>

<span

className={`px-4 py-2 rounded-full

${

status

?

"bg-green-100 text-green-700"

:

"bg-red-100 text-red-700"

}`}

>

{

status

?

"Found"

:

"Not Found"

}

</span>

</div>

);

}

// =====================

function Section({

title,
children

}){

return(

<div className="bg-white p-8 rounded-3xl shadow">

<h3 className="text-2xl font-bold mb-6">

{title}

</h3>

{children}

</div>

);

}

// =====================

function Item({

label,
value

}){

return(

<div className="mb-4">

<p className="text-gray-500">

{label}

</p>

<p className="font-medium break-all">

{value || "N/A"}

</p>

</div>

);

}