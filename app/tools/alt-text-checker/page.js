"use client";

import { useState } from "react";

export default function AltTextChecker() {

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  // =========================
  // CHECK ALT TEXT
  // =========================

  const checkAltText =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/alt-text-checker",
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

TOTAL IMAGES:
${result?.totalImages}

MISSING ALT:
${result?.missingAltCount}

EMPTY ALT:
${result?.emptyAltCount}

OPTIMIZED ALT:
${result?.optimizedAltCount}

RECOMMENDATION:
${result?.recommendation}

`;

      navigator.clipboard.writeText(
        report
      );

      alert(
        "Report Copied!"
      );

    };

  // =========================
  // DOWNLOAD CSV
  // =========================

  const downloadCSV =
    () => {

      let csv =
        "Image URL,Alt Text,Status,Width,Height\n";

      result?.images?.forEach(
        (image) => {

          csv += `"${image.imageUrl}","${image.altText}","${image.status}","${image.width}","${image.height}"\n`;

        }
      );

      const blob =
        new Blob(
          [csv],
          {
            type:
              "text/csv",
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
        "alt-text-report.csv";

      a.click();

      URL.revokeObjectURL(
        downloadUrl
      );

    };

  // =========================
  // STATUS COLORS
  // =========================

  const getStatusColor =
    (status) => {

      switch (status) {

        case "Optimized":
          return "bg-green-100 text-green-700";

        case "Missing Alt":
          return "bg-red-100 text-red-700";

        case "Empty Alt":
          return "bg-yellow-100 text-yellow-700";

        default:
          return "bg-gray-100 text-gray-700";

      }

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

        Missing Alt Text Checker

      </h1>

      <p className="text-gray-500 text-lg mb-10">

        Analyze website images and detect missing or empty alt attributes.

      </p>

      {/* INPUT */}

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
          onClick={checkAltText}
          disabled={loading}
          className={`mt-6 px-8 py-4 rounded-xl text-white transition-all duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >

          {
            loading
              ? "Checking Images..."
              : "Check Alt Text"
          }

        </button>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="mt-10 border rounded-3xl p-6 shadow-sm bg-white">

          <div className="flex items-center gap-4">

            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

            <p className="font-medium">

              Analyzing images...

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

                Alt Text Analysis

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
                  downloadCSV
                }
                className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
              >

                Export CSV

              </button>

            </div>

          </div>

          {/* SCORE */}

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

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

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

                Missing Alt

              </p>

              <h3 className="text-4xl font-bold text-red-600">

                {
                  result?.missingAltCount
                }

              </h3>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                Empty Alt

              </p>

              <h3 className="text-4xl font-bold text-yellow-600">

                {
                  result?.emptyAltCount
                }

              </h3>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                Optimized Alt

              </p>

              <h3 className="text-4xl font-bold text-green-600">

                {
                  result?.optimizedAltCount
                }

              </h3>

            </div>

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-2">

                SEO Score

              </p>

              <h3 className="text-4xl font-bold">

                {result?.seoScore}

              </h3>

            </div>

          </div>

          {/* RECOMMENDATION */}

          <div className="border rounded-3xl p-6 shadow-sm bg-white">

            <h3 className="text-2xl font-bold mb-4">

              SEO Recommendation

            </h3>

            <p className="text-lg text-gray-700">

              {
                result?.recommendation
              }

            </p>

          </div>

          {/* TABLE */}

          <div className="border rounded-3xl p-6 shadow-sm bg-white overflow-hidden">

            <div className="flex justify-between items-center mb-6">

              <h3 className="text-2xl font-bold">

                Image Analysis

              </h3>

              <span className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium">

                {
                  result?.images?.length
                } Images

              </span>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="border-b">

                    <th className="text-left py-4 px-4">

                      Preview

                    </th>

                    <th className="text-left py-4 px-4">

                      Image URL

                    </th>

                    <th className="text-left py-4 px-4">

                      Alt Text

                    </th>

                    <th className="text-left py-4 px-4">

                      Status

                    </th>

                    <th className="text-left py-4 px-4">

                      Width

                    </th>

                    <th className="text-left py-4 px-4">

                      Height

                    </th>

                  </tr>

                </thead>

                <tbody>

                  {result?.images?.map(
                    (
                      image,
                      index
                    ) => (

                      <tr
                        key={index}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="py-4 px-4">

                          <img
                            src={
                              image.imageUrl
                            }
                            alt=""
                            className="w-16 h-16 object-cover rounded-lg border"
                          />

                        </td>

                        <td className="py-4 px-4 break-all text-sm">

                          {
                            image.imageUrl
                          }

                        </td>

                        <td className="py-4 px-4 break-all text-sm">

                          {
                            image.altText ||
                            "-"
                          }

                        </td>

                        <td className="py-4 px-4">

                          <span
                            className={`px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(
                              image.status
                            )}`}
                          >

                            {
                              image.status
                            }

                          </span>

                        </td>

                        <td className="py-4 px-4">

                          {
                            image.width ||
                            "-"
                          }

                        </td>

                        <td className="py-4 px-4">

                          {
                            image.height ||
                            "-"
                          }

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

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

              Enter a website URL to check image alt text SEO.

            </p>

          </div>

        )}

    </main>

  );

}