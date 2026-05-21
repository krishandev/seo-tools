"use client";

import { useState } from "react";

export default function SpeedChecker() {

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  // =========================
  // CHECK SPEED
  // =========================

  const checkSpeed =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/speed-checker",
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
  // SCORE COLORS
  // =========================

  const getScoreColor =
    (score) => {

      if (score >= 80)
        return "bg-green-500";

      if (score >= 50)
        return "bg-yellow-500";

      return "bg-red-500";

    };

  // =========================
  // STATUS BADGES
  // =========================

  const getStatusBadge =
    (status) => {

      return status

        ? "bg-green-100 text-green-700"

        : "bg-red-100 text-red-700";

    };

  // =========================
  // COPY REPORT
  // =========================

  const copyReport =
    () => {

      const report = `

WEBSITE SPEED REPORT

MOBILE SCORE:
${result?.mobile?.score}/100

MOBILE RESPONSE TIME:
${result?.mobile?.responseTime} ms

DESKTOP SCORE:
${result?.desktop?.score}/100

DESKTOP RESPONSE TIME:
${result?.desktop?.responseTime} ms

HTML SIZE:
${result?.htmlSize}

IMAGE COUNT:
${result?.imageCount}

JS FILES:
${result?.jsFiles}

CSS FILES:
${result?.cssFiles}

HTTPS:
${result?.https ? "Enabled" : "Disabled"}

GZIP:
${result?.gzipEnabled ? "Enabled" : "Disabled"}

CACHE:
${result?.cacheEnabled ? "Enabled" : "Disabled"}

VIEWPORT:
${result?.viewportOptimized ? "Optimized" : "Missing"}

MOBILE RECOMMENDATIONS:
${result?.mobile?.recommendations?.join("\n")}

DESKTOP RECOMMENDATIONS:
${result?.desktop?.recommendations?.join("\n")}

`;

      navigator.clipboard.writeText(
        report
      );

      alert(
        "Report Copied!"
      );

    };

  // =========================
  // DOWNLOAD TXT
  // =========================

  const downloadTXT =
    () => {

      const report = `

WEBSITE SPEED REPORT

MOBILE SCORE:
${result?.mobile?.score}/100

MOBILE RESPONSE TIME:
${result?.mobile?.responseTime} ms

DESKTOP SCORE:
${result?.desktop?.score}/100

DESKTOP RESPONSE TIME:
${result?.desktop?.responseTime} ms

HTML SIZE:
${result?.htmlSize}

IMAGE COUNT:
${result?.imageCount}

JS FILES:
${result?.jsFiles}

CSS FILES:
${result?.cssFiles}

HTTPS:
${result?.https ? "Enabled" : "Disabled"}

GZIP:
${result?.gzipEnabled ? "Enabled" : "Disabled"}

CACHE:
${result?.cacheEnabled ? "Enabled" : "Disabled"}

VIEWPORT:
${result?.viewportOptimized ? "Optimized" : "Missing"}

MOBILE RECOMMENDATIONS:
${result?.mobile?.recommendations?.join("\n")}

DESKTOP RECOMMENDATIONS:
${result?.desktop?.recommendations?.join("\n")}

`;

      const blob =
        new Blob(
          [report],
          {
            type:
              "text/plain",
          }
        );

      const downloadUrl =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href =
        downloadUrl;

      a.download =
        "website-speed-report.txt";

      a.click();

      URL.revokeObjectURL(
        downloadUrl
      );

    };

  return (

    <main className="max-w-7xl mx-auto p-10">

      {/* HEADING */}

      <h1 className="text-5xl font-bold mb-4">

        Website Speed Checker

      </h1>

      <p className="text-gray-500 text-lg mb-10">

        Analyze website performance separately for mobile and desktop devices.

      </p>

      {/* INPUT */}

      <div className="border rounded-3xl p-6 shadow-sm bg-white">

        <div className="flex flex-col lg:flex-row gap-4">

          <input
            type="text"
            placeholder="Enter Website URL"
            value={url}
            onChange={(e) =>
              setUrl(
                e.target.value
              )
            }
            className="flex-1 border p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
          />

          <button
            onClick={
              checkSpeed
            }
            disabled={loading}
            className={`px-8 py-4 rounded-xl text-white transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            }`}
          >

            {
              loading
                ? "Analyzing Website Speed..."
                : "Check Website Speed"
            }

          </button>

        </div>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="mt-10 border rounded-3xl p-6 shadow-sm bg-white">

          <div className="flex items-center gap-4">

            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

            <p className="font-medium">

              Running website performance analysis...

            </p>

          </div>

        </div>

      )}

      {/* RESULT */}

      {result?.success && (

        <div className="mt-10 space-y-6">

          {/* HEADER */}

          <div className="flex flex-wrap justify-between items-center gap-4">

            <div>

              <h2 className="text-3xl font-bold">

                Speed Analysis Report

              </h2>

              <p className="text-gray-500 mt-1 break-all">

                {url}

              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={
                  copyReport
                }
                className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
              >

                Copy Report

              </button>

              <button
                onClick={
                  downloadTXT
                }
                className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
              >

                Export TXT

              </button>

            </div>

          </div>

          {/* MOBILE & DESKTOP */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* MOBILE */}

            <div className="border rounded-3xl p-8 shadow-sm bg-white overflow-hidden">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-gray-500 mb-2">

                    Mobile Performance

                  </p>

                  <h3 className="text-5xl font-bold">

                    {
                      result?.mobile?.score
                    }/100

                  </h3>

                </div>

                <div className="text-5xl">

                  📱

                </div>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">

                <div
                  className={`h-5 rounded-full transition-all duration-700 ${getScoreColor(
                    result?.mobile?.score
                  )}`}
                  style={{
                    width:
                      `${result?.mobile?.score}%`,
                  }}
                ></div>

              </div>

              <div className="mt-6 bg-gray-50 rounded-2xl p-5">

                <p className="text-gray-500 mb-2">

                  Response Time

                </p>

                <h4 className="text-3xl font-bold">

                  {
                    result?.mobile?.responseTime
                  } ms

                </h4>

              </div>

            </div>

            {/* DESKTOP */}

            <div className="border rounded-3xl p-8 shadow-sm bg-white overflow-hidden">

              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-gray-500 mb-2">

                    Desktop Performance

                  </p>

                  <h3 className="text-5xl font-bold">

                    {
                      result?.desktop?.score
                    }/100

                  </h3>

                </div>

                <div className="text-5xl">

                  💻

                </div>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-5 overflow-hidden">

                <div
                  className={`h-5 rounded-full transition-all duration-700 ${getScoreColor(
                    result?.desktop?.score
                  )}`}
                  style={{
                    width:
                      `${result?.desktop?.score}%`,
                  }}
                ></div>

              </div>

              <div className="mt-6 bg-gray-50 rounded-2xl p-5">

                <p className="text-gray-500 mb-2">

                  Response Time

                </p>

                <h4 className="text-3xl font-bold">

                  {
                    result?.desktop?.responseTime
                  } ms

                </h4>

              </div>

            </div>

          </div>

          {/* DASHBOARD */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                HTML Size

              </p>

              <h3 className="text-4xl font-bold">

                {
                  result?.htmlSize
                }

              </h3>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                Images

              </p>

              <h3 className="text-4xl font-bold">

                {
                  result?.imageCount
                }

              </h3>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                JS Files

              </p>

              <h3 className="text-4xl font-bold">

                {
                  result?.jsFiles
                }

              </h3>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                CSS Files

              </p>

              <h3 className="text-4xl font-bold">

                {
                  result?.cssFiles
                }

              </h3>

            </div>

          </div>

          {/* TECHNICAL SEO */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

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

                    : "Disabled"
                }

              </span>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-3">

                GZIP Compression

              </p>

              <span
                className={`px-4 py-2 rounded-full font-medium ${getStatusBadge(
                  result?.gzipEnabled
                )}`}
              >

                {
                  result?.gzipEnabled

                    ? "Enabled"

                    : "Disabled"
                }

              </span>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-3">

                Browser Cache

              </p>

              <span
                className={`px-4 py-2 rounded-full font-medium ${getStatusBadge(
                  result?.cacheEnabled
                )}`}
              >

                {
                  result?.cacheEnabled

                    ? "Enabled"

                    : "Disabled"
                }

              </span>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-3">

                Mobile Viewport

              </p>

              <span
                className={`px-4 py-2 rounded-full font-medium ${getStatusBadge(
                  result?.viewportOptimized
                )}`}
              >

                {
                  result?.viewportOptimized

                    ? "Optimized"

                    : "Missing"
                }

              </span>

            </div>

          </div>

          {/* RECOMMENDATIONS */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* MOBILE RECOMMENDATIONS */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <h3 className="text-2xl font-bold mb-6">

                📱 Mobile Recommendations

              </h3>

              <div className="space-y-4">

                {result?.mobile?.recommendations?.map(
                  (
                    recommendation,
                    index
                  ) => (

                    <div
                      key={index}
                      className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3"
                    >

                      <div className="text-yellow-600 text-xl">

                        ⚠️

                      </div>

                      <p className="text-gray-700">

                        {
                          recommendation
                        }

                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* DESKTOP RECOMMENDATIONS */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <h3 className="text-2xl font-bold mb-6">

                💻 Desktop Recommendations

              </h3>

              <div className="space-y-4">

                {result?.desktop?.recommendations?.map(
                  (
                    recommendation,
                    index
                  ) => (

                    <div
                      key={index}
                      className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3"
                    >

                      <div className="text-blue-600 text-xl">

                        ⚡

                      </div>

                      <p className="text-gray-700">

                        {
                          recommendation
                        }

                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>

        </div>

      )}

      {/* EMPTY STATE */}

      {!loading &&
        !result && (

          <div className="mt-10 border rounded-3xl p-10 text-center bg-gray-50">

            <h3 className="text-2xl font-bold mb-3">

              No Speed Report Yet

            </h3>

            <p className="text-gray-500">

              Enter a website URL to analyze mobile and desktop website speed.

            </p>

          </div>

        )}

    </main>

  );

}