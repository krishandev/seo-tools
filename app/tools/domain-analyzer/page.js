"use client";

import { useState } from "react";

export default function DomainAnalyzer() {

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  // =========================
  // ANALYZE DOMAIN
  // =========================

  const analyzeDomain =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/domain-analyzer",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                url,
              }),

            }
          );

        const data =
          await response.json();

        setResult(data);

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  // =========================
  // COPY REPORT
  // =========================

  const copyReport =
    () => {

      const report = `

SEO SCORE:
${result?.seoScore}/100

DOMAIN AGE:
${result?.domainAge}

TITLE:
${result?.title}

TITLE LENGTH:
${result?.titleLength}

META DESCRIPTION:
${result?.metaDescription}

DESCRIPTION LENGTH:
${result?.metaDescriptionLength}

CANONICAL:
${result?.canonical}

ROBOTS:
${result?.robots}

HTTPS:
${result?.https ? "Yes" : "No"}

H1 COUNT:
${result?.h1Count}

H2 COUNT:
${result?.h2Count}

INTERNAL LINKS:
${result?.internalLinks}

EXTERNAL LINKS:
${result?.externalLinks}

TOTAL IMAGES:
${result?.totalImages}

MISSING ALT TAGS:
${result?.missingAltCount}

OPEN GRAPH:
${result?.openGraph ? "Yes" : "No"}

TWITTER CARDS:
${result?.twitterCards ? "Yes" : "No"}

SCHEMA:
${result?.schemaDetected ? "Yes" : "No"}

`;

      navigator.clipboard.writeText(
        report
      );

      alert(
        "SEO Report Copied!"
      );

    };

  // =========================
  // STATUS BADGE
  // =========================

  const getStatusBadge = (
    value
  ) => {

    return value

      ? "bg-green-100 text-green-700"

      : "bg-red-100 text-red-700";

  };

  // =========================
  // SCORE COLOR
  // =========================

  const getScoreColor =
    (score) => {

      if (score >= 80)
        return "bg-green-500";

      if (score >= 50)
        return "bg-yellow-500";

      return "bg-red-500";

    };

  return (

    <main className="max-w-7xl mx-auto p-10">

      {/* HEADING */}

      <h1 className="text-5xl font-bold mb-4">

        Domain Analyzer

      </h1>

      <p className="text-gray-500 text-lg mb-10">

        Analyze your website SEO, technical SEO, links, schema, and metadata.

      </p>

      {/* INPUT CARD */}

      <div className="border rounded-3xl p-6 shadow-sm bg-white">

        <input
          type="text"
          placeholder="Enter Website URL"
          value={url}
          onChange={(e) =>
            setUrl(
              e.target.value
            )
          }
          className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={analyzeDomain}
          disabled={loading}
          className={`mt-6 px-8 py-4 rounded-xl text-white transition-all duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >

          {
            loading
              ? "Analyzing Website..."
              : "Analyze Website"
          }

        </button>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="mt-10 border rounded-3xl p-6 shadow-sm bg-white">

          <div className="flex items-center gap-4">

            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

            <p className="font-medium">

              Running SEO audit...

            </p>

          </div>

        </div>

      )}

      {/* RESULTS */}

      {result?.success && (

        <div className="mt-10 space-y-6">

          {/* HEADER */}

          <div className="flex flex-wrap justify-between items-center gap-4">

            <div>

              <h2 className="text-3xl font-bold">

                SEO Audit Report

              </h2>

              <p className="text-gray-500 mt-1 break-all">

                {url}

              </p>

            </div>

            <button
              onClick={
                copyReport
              }
              className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
            >

              Copy SEO Report

            </button>

          </div>

          {/* SCORE CARD */}

          <div className="border rounded-3xl p-8 shadow-sm bg-white overflow-hidden">

            <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">

              <div>

                <p className="text-gray-500 mb-3">

                  SEO Score

                </p>

                <h3 className="text-6xl font-bold">

                  {result?.seoScore}/100

                </h3>

              </div>

              <div className="w-full lg:w-2/3">

                <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">

                  <div
                    className={`h-6 rounded-full transition-all duration-700 ${getScoreColor(
                      result?.seoScore
                    )}`}
                    style={{
                      width:
                        `${result?.seoScore}%`,
                    }}
                  ></div>

                </div>

              </div>

            </div>

          </div>

          {/* DASHBOARD */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* DOMAIN AGE */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                Domain Age

              </p>

              <h3 className="text-3xl font-bold">

                {result?.domainAge}

              </h3>

            </div>

            {/* HTTPS */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-3">

                HTTPS

              </p>

              <span
                className={`px-4 py-2 rounded-full font-medium ${getStatusBadge(
                  result?.https
                )}`}
              >

                {
                  result?.https
                    ? "Enabled"
                    : "Not Enabled"
                }

              </span>

            </div>

            {/* SCHEMA */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-3">

                Schema Markup

              </p>

              <span
                className={`px-4 py-2 rounded-full font-medium ${getStatusBadge(
                  result?.schemaDetected
                )}`}
              >

                {
                  result?.schemaDetected
                    ? "Detected"
                    : "Not Found"
                }

              </span>

            </div>

            {/* OPEN GRAPH */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-3">

                Open Graph

              </p>

              <span
                className={`px-4 py-2 rounded-full font-medium ${getStatusBadge(
                  result?.openGraph
                )}`}
              >

                {
                  result?.openGraph
                    ? "Detected"
                    : "Not Found"
                }

              </span>

            </div>

            {/* TWITTER */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-3">

                Twitter Cards

              </p>

              <span
                className={`px-4 py-2 rounded-full font-medium ${getStatusBadge(
                  result?.twitterCards
                )}`}
              >

                {
                  result?.twitterCards
                    ? "Detected"
                    : "Not Found"
                }

              </span>

            </div>

            {/* VIEWPORT */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white overflow-hidden">

              <p className="text-gray-500 mb-3">

                Mobile Viewport

              </p>

              <span
                className={`px-4 py-2 rounded-full font-medium ${getStatusBadge(
                  result?.viewport
                )}`}
              >

                {
                  result?.viewport
                    ? "Optimized"
                    : "Missing"
                }

              </span>

            </div>

          </div>

          {/* META SEO */}

          <div className="border rounded-3xl p-6 shadow-sm bg-white overflow-hidden">

            <h3 className="text-2xl font-bold mb-6">

              Meta SEO

            </h3>

            <div className="space-y-5">

              <div>

                <p className="text-gray-500 mb-1">

                  Title

                </p>

                <p className="font-medium break-all">

                  {result?.title}

                </p>

                <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

                  <div
                    className={`h-3 rounded-full ${
                      result?.titleLength >= 50 &&
                      result?.titleLength <= 60
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                    style={{
                      width:
                        `${Math.min(
                          result?.titleLength,
                          100
                        )}%`,
                    }}
                  ></div>

                </div>

                <p className="text-sm text-gray-500 mt-1">

                  {result?.titleLength} Characters

                </p>

              </div>

              <div>

                <p className="text-gray-500 mb-1">

                  Meta Description

                </p>

                <p className="font-medium break-all">

                  {
                    result?.metaDescription
                  }

                </p>

                <div className="w-full bg-gray-200 rounded-full h-3 mt-3">

                  <div
                    className={`h-3 rounded-full ${
                      result?.metaDescriptionLength >=
                        150 &&
                      result?.metaDescriptionLength <=
                        160
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                    style={{
                      width:
                        `${Math.min(
                          result?.metaDescriptionLength,
                          100
                        )}%`,
                    }}
                  ></div>

                </div>

                <p className="text-sm text-gray-500 mt-1">

                  {
                    result?.metaDescriptionLength
                  } Characters

                </p>

              </div>

              <div>

                <p className="text-gray-500 mb-1">

                  Canonical URL

                </p>

                <p className="font-medium break-all">

                  {result?.canonical || "Not Found"}

                </p>

              </div>

              <div>

                <p className="text-gray-500 mb-1">

                  Robots Meta

                </p>

                <p className="font-medium break-all">

                  {result?.robots || "Not Found"}

                </p>

              </div>

            </div>

          </div>

          {/* HEADINGS */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* H1 */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white overflow-hidden">

              <h3 className="text-2xl font-bold mb-5">

                H1 Tags ({result?.h1Count})

              </h3>

              <div className="space-y-3">

                {result?.h1Tags?.map(
                  (
                    tag,
                    index
                  ) => (

                    <div
                      key={index}
                      className="bg-gray-100 p-3 rounded-xl break-all"
                    >

                      {tag}

                    </div>

                  )
                )}

              </div>

            </div>

            {/* H2 */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white overflow-hidden">

              <h3 className="text-2xl font-bold mb-5">

                H2 Tags ({result?.h2Count})

              </h3>

              <div className="space-y-3">

                {result?.h2Tags?.map(
                  (
                    tag,
                    index
                  ) => (

                    <div
                      key={index}
                      className="bg-gray-100 p-3 rounded-xl break-all"
                    >

                      {tag}

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

          {/* LINKS & IMAGES */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                Internal Links

              </p>

              <h3 className="text-4xl font-bold">

                {result?.internalLinks}

              </h3>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                External Links

              </p>

              <h3 className="text-4xl font-bold">

                {result?.externalLinks}

              </h3>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                Total Images

              </p>

              <h3 className="text-4xl font-bold">

                {result?.totalImages}

              </h3>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                Missing Alt Tags

              </p>

              <h3 className="text-4xl font-bold">

                {result?.missingAltCount}

              </h3>

            </div>

          </div>

        </div>

      )}

      {/* EMPTY STATE */}

      {!loading &&
        !result && (

          <div className="mt-10 border rounded-3xl p-10 text-center bg-gray-50">

            <h3 className="text-2xl font-bold mb-3">

              No Analysis Yet

            </h3>

            <p className="text-gray-500">

              Enter a website URL to run a complete SEO audit.

            </p>

          </div>

        )}

    </main>

  );

}