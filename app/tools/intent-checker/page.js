"use client";

import { useState } from "react";

export default function IntentChecker() {

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  // =========================
  // CHECK INTENT
  // =========================

  const checkIntent =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/intent-checker",
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
  // INTENT COLORS
  // =========================

  const getIntentColor = (
    intent
  ) => {

    switch (intent) {

      case "Informational":
        return "bg-blue-100 text-blue-700";

      case "Commercial":
        return "bg-green-100 text-green-700";

      case "Transactional":
        return "bg-red-100 text-red-700";

      case "Navigational":
        return "bg-purple-100 text-purple-700";

      case "Local":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };

  // =========================
  // COPY ANALYSIS
  // =========================

  const copyAnalysis =
    () => {

      const text = `
Title:
${result?.title}

Primary Intent:
${result?.primaryIntent}

Secondary Intent:
${result?.secondaryIntent}

Confidence:
${result?.confidence}%

Signals:
${result?.signals?.join(", ")}
`;

      navigator.clipboard.writeText(
        text
      );

      alert(
        "Analysis copied!"
      );

    };

  return (

    <main className="max-w-6xl mx-auto p-10">

      {/* HEADING */}

      <h1 className="text-5xl font-bold mb-4">

        Web Page Intent Checker

      </h1>

      <p className="text-gray-500 text-lg mb-10">

        Analyze webpage content and detect search intent signals.

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
          onClick={checkIntent}
          disabled={loading}
          className={`mt-6 px-8 py-4 rounded-xl text-white transition-all duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >

          {
            loading
              ? "Analyzing..."
              : "Analyze Intent"
          }

        </button>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="mt-10 border rounded-3xl p-6 shadow-sm bg-white">

          <div className="flex items-center gap-4">

            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

            <p className="font-medium">

              Analyzing webpage intent...

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

                Intent Analysis

              </h2>

              <p className="text-gray-500 mt-1 break-all">

                {url}

              </p>

            </div>

            <button
              onClick={
                copyAnalysis
              }
              className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
            >

              Copy Analysis

            </button>

          </div>

          {/* GRID */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* PAGE TITLE */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white overflow-hidden">

              <p className="text-gray-500 mb-3">

                Page Title

              </p>

              <h3 className="text-2xl font-bold break-all">

                {result?.title}

              </h3>

            </div>

            {/* CONFIDENCE */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white overflow-hidden">

              <p className="text-gray-500 mb-3">

                Confidence Score

              </p>

              <div className="flex items-center justify-between mb-4">

                <h3 className="text-4xl font-bold">

                  {result?.confidence}%

                </h3>

                <span className="text-green-600 font-medium">

                  SEO Match

                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{
                    width:
                      `${result?.confidence}%`,
                  }}
                ></div>

              </div>

            </div>

          </div>

          {/* PRIMARY & SECONDARY */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* PRIMARY */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-4">

                Primary Intent

              </p>

              <span
                className={`px-5 py-3 rounded-full text-lg font-medium ${getIntentColor(
                  result?.primaryIntent
                )}`}
              >

                {
                  result?.primaryIntent
                }

              </span>

            </div>

            {/* SECONDARY */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <p className="text-gray-500 mb-4">

                Secondary Intent

              </p>

              <span
                className={`px-5 py-3 rounded-full text-lg font-medium ${getIntentColor(
                  result?.secondaryIntent
                )}`}
              >

                {
                  result?.secondaryIntent
                }

              </span>

            </div>

          </div>

          {/* SIGNALS */}

          <div className="border rounded-3xl p-6 shadow-sm bg-white">

            <h3 className="text-2xl font-bold mb-5">

              Detected Intent Signals

            </h3>

            <div className="flex flex-wrap gap-3">

              {result?.signals?.map(
                (
                  signal,
                  index
                ) => (

                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                  >

                    {signal}

                  </span>

                )
              )}

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

              Enter a webpage URL to analyze content intent.

            </p>

          </div>

        )}

    </main>

  );

}