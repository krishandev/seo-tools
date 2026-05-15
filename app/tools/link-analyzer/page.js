"use client";

import { useState } from "react";

export default function LinkAnalyzer() {

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const analyzeLinks = async () => {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/link-analyzer",
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
  // BADGE COLORS
  // =========================

  const getTypeColor = (type) => {

    switch (type) {

      case "Dofollow":
        return "bg-green-100 text-green-700";

      case "Nofollow":
        return "bg-red-100 text-red-700";

      case "Sponsored":
        return "bg-yellow-100 text-yellow-700";

      case "UGC":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };

  const getCategoryColor = (
    category
  ) => {

    switch (category) {

      case "Internal":
        return "bg-blue-100 text-blue-700";

      case "External":
        return "bg-gray-200 text-gray-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };


  const copyTableData = (links) => {

  const headers = [
    "URL",
    "Anchor Text",
    "Link Type",
    "Rel"
  ];

  const rows = links.map(
    (link) => [

      link.url,

      link.anchorText,

      link.linkType,

      link.rel

    ].join("\t")
  );

  const finalText = [
    headers.join("\t"),
    ...rows
  ].join("\n");

  navigator.clipboard.writeText(
    finalText
  );

  alert("Table copied!");
};



  return (

    <main className="max-w-7xl mx-auto p-10">

      {/* HEADING */}

      <h1 className="text-5xl font-bold mb-4">

        Link Analyzer Tool

      </h1>

      <p className="text-gray-500 text-lg mb-10">

        Analyze dofollow, nofollow,
        sponsored, internal, and
        external links from any webpage.

      </p>

      {/* INPUT CARD */}

      <div className="bg-white border rounded-3xl p-6 shadow-sm">

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
          onClick={analyzeLinks}
          disabled={loading}
          className={`px-8 py-4 rounded-xl mt-5 text-white transition-all duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >

          {
            loading
              ? "Analyzing..."
              : "Analyze Links"
          }

        </button>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="mt-10 border rounded-2xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

            <p className="font-medium">

              Analyzing website links...

            </p>

          </div>

        </div>

      )}

      {/* RESULT */}

      {/* RESULT */}

{result?.success && (

  <div className="mt-10 space-y-10">

    {/* SUMMARY */}

    <div className="border rounded-2xl p-6 shadow-sm">

      <p className="text-gray-500 mb-2">

        Total Links Found

      </p>

      <p className="text-4xl font-bold">

        {result.totalLinks}

      </p>

    </div>

    {/* ========================= */}
    {/* EXTERNAL LINKS */}
    {/* ========================= */}

    <div className="space-y-4">

      <div className="flex items-center justify-between gap-4 flex-wrap">

        <h2 className="text-3xl font-bold">

          External Links

        </h2>

        <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">

          {
            result.links.filter(
              (link) =>
                link.linkCategory ===
                "External"
            ).length
          }

        </span>

        <button
  onClick={() =>
    copyTableData(
      result.links.filter(
        (link) =>
          link.linkCategory ===
          "External"
      )
    )
  }
  className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition"
>

  Copy Table

</button>


      </div>

      <div className="border rounded-2xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  URL
                </th>

                <th className="text-left p-4">
                  Anchor Text
                </th>

                <th className="text-left p-4">
                  Link Type
                </th>

                <th className="text-left p-4">
                  Rel
                </th>

              </tr>

            </thead>

            <tbody>

              {result.links
                .filter(
                  (link) =>
                    link.linkCategory ===
                    "External"
                )
                .map(
                  (
                    link,
                    index
                  ) => (

                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      <td className="p-4 break-all text-sm">

                        {link.url}

                      </td>

                      <td className="p-4 text-sm">

                        {
                          link.anchorText
                        }

                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            link.linkType
                          )}`}
                        >

                          {
                            link.linkType
                          }

                        </span>

                      </td>

                      <td className="p-4 text-sm">

                        {link.rel}

                      </td>

                    </tr>

                  )
                )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

    {/* ========================= */}
    {/* INTERNAL LINKS */}
    {/* ========================= */}

    <div className="space-y-4">

     <div className="flex items-center justify-between gap-4 flex-wrap">

        <h2 className="text-3xl font-bold">

          Internal Links

        </h2>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">

          {
            result.links.filter(
              (link) =>
                link.linkCategory ===
                "Internal"
            ).length
          }

        </span>

        <button
  onClick={() =>
    copyTableData(
      result.links.filter(
        (link) =>
          link.linkCategory ===
          "External"
      )
    )
  }
  className="bg-black text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-800 transition"
>

  Copy Table

</button>

      </div>

      <div className="border rounded-2xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="text-left p-4">
                  URL
                </th>

                <th className="text-left p-4">
                  Anchor Text
                </th>

                <th className="text-left p-4">
                  Link Type
                </th>

                <th className="text-left p-4">
                  Rel
                </th>

              </tr>

            </thead>

            <tbody>

              {result.links
                .filter(
                  (link) =>
                    link.linkCategory ===
                    "Internal"
                )
                .map(
                  (
                    link,
                    index
                  ) => (

                    <tr
                      key={index}
                      className="border-t hover:bg-gray-50 transition"
                    >

                      <td className="p-4 break-all text-sm">

                        {link.url}

                      </td>

                      <td className="p-4 text-sm">

                        {
                          link.anchorText
                        }

                      </td>

                      <td className="p-4">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(
                            link.linkType
                          )}`}
                        >

                          {
                            link.linkType
                          }

                        </span>

                      </td>

                      <td className="p-4 text-sm">

                        {link.rel}

                      </td>

                    </tr>

                  )
                )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>

)}

    </main>

  );

}