"use client";

import { useState } from "react";


export default function Home() {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [progress, setProgress] = useState(0);
  const [scanComplete, setScanComplete] =
  useState(false);

  const checkLinks = async () => {
  try {
    setLoading(true);

    setProgress(0);

let currentProgress = 0;

const interval = setInterval(() => {
  currentProgress += 5;

  if (currentProgress <= 90) {
    setProgress(currentProgress);
  }
}, 500);

    setScanComplete(false);
    setProgress(0);

    const response = await fetch("/api/broken-links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    const data = await response.json();

    clearInterval(interval);

setProgress(100);

    setLinks(data.brokenLinks || []);
    
    setScanComplete(true);

  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
  setLoading(false);
}, 500);
  }
};

const brokenLinks = links.filter(
  (link) =>
    link.status === "BROKEN" ||
    link.status === 404 ||
    link.status === 410 ||
    link.status >= 500
);


  return (
    <main className="p-10 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">
        Broken Link Checker
      </h1>

      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-3 w-full rounded"
      />

      <button
  onClick={checkLinks}
  disabled={loading}
  className={`px-6 py-3 mt-4 rounded text-white ${
    loading
      ? "bg-gray-500 cursor-not-allowed"
      : "bg-black hover:bg-gray-800"
  }`}
>
  {loading ? "Checking Links..." : "Check Links"}
</button>

{loading && (
  <div className="mt-6">
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium">
        Scanning Website...
      </span>

      <span className="text-sm font-medium">
        {progress.toFixed(0)}%
      </span>
    </div>

    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-black h-4 transition-all duration-300"
        style={{
          width: `${progress}%`,
        }}
      ></div>
    </div>
  </div>
)}

{scanComplete && brokenLinks.length === 0 && (
  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mt-6">
    ✅ No broken links found on this page.
  </div>
)}

      <div className="mt-10">
        {[...links]
  .sort((a, b) => {
    const isBroken = (status) =>
  status === "BROKEN" ||
  status === 404 ||
  status === 410 ||
  status >= 500;

if (isBroken(a.status)) return -1;
if (isBroken(b.status)) return 1;
    return 0;
  })
  .map((link, index) => (
<div
  key={index}
  className={`border rounded p-3 mb-3 ${
    link.status === "BROKEN" ||
    link.status === 404 ||
    link.status === 410 ||
    link.status >= 500
      ? "border-red-500 bg-red-50"
      : "border-gray-300"
  }`}
>
  <p className="font-medium break-all">
    {link.url}
  </p>

  <p
    className={
      link.status === "BROKEN" ||
      link.status === 404 ||
      link.status === 410 ||
      link.status >= 500
        ? "text-red-600 font-bold"
        : "text-green-600"
    }
  >
    {link.status}
  </p>

  <p className="text-sm text-gray-500 mt-1">
    Found on: {link.foundOn}
  </p>
</div>
        )
        
        )}
      </div>
    </main>
  );
}