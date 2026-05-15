"use client";

import { useState } from "react";

export default function SocialPostGenerator() {

  const [topic, setTopic] =
    useState("");

  const [platform, setPlatform] =
    useState("Instagram");

  const [tone, setTone] =
    useState("Professional");

  const [audience, setAudience] =
    useState("");

  const [cta, setCta] =
    useState("");

  const [postLength, setPostLength] =
    useState("Medium");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  // =========================
  // GENERATE POST
  // =========================

  const generatePost =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/social-post-generator",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({

                topic,

                platform,

                tone:
                  tone.toLowerCase(),

                audience,

                cta,

                postLength:
                  postLength.toLowerCase(),

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
  // COPY
  // =========================

  const copyText = (
    text
  ) => {

    navigator.clipboard.writeText(
      text
    );

    alert("Copied!");

  };

  return (

    <main className="max-w-6xl mx-auto p-10">

      {/* HEADING */}

      <h1 className="text-5xl font-bold mb-4">

        AI Social Media Post Generator

      </h1>

      <p className="text-gray-500 text-lg mb-10">

        Generate engaging social media posts with hashtags instantly.

      </p>

      {/* FORM */}

      <div className="border rounded-3xl p-6 shadow-sm bg-white">

        <div className="grid md:grid-cols-2 gap-5">

          {/* TOPIC */}

          <div>

            <label className="block mb-2 font-medium">

              Topic / Keywords

            </label>

            <input
              type="text"
              placeholder="Enter topic"
              value={topic}
              onChange={(e) =>
                setTopic(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-xl"
            />

          </div>

          {/* PLATFORM */}

          <div>

            <label className="block mb-2 font-medium">

              Platform

            </label>

            <select
              value={platform}
              onChange={(e) =>
                setPlatform(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-xl"
            >

              <option>
                Facebook
              </option>

              <option>
                Instagram
              </option>

              <option>
                LinkedIn
              </option>

              <option>
                Twitter
              </option>

              <option>
                Threads
              </option>

            </select>

          </div>

          {/* TONE */}

          <div>

            <label className="block mb-2 font-medium">

              Tone

            </label>

            <select
              value={tone}
              onChange={(e) =>
                setTone(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-xl"
            >

              <option>
                Professional
              </option>

              <option>
                Friendly
              </option>

              <option>
                Persuasive
              </option>

              <option>
                Casual
              </option>

              <option>
                Motivational
              </option>

            </select>

          </div>

          {/* AUDIENCE */}

          <div>

            <label className="block mb-2 font-medium">

              Target Audience

            </label>

            <input
              type="text"
              placeholder="Small Business Owners"
              value={audience}
              onChange={(e) =>
                setAudience(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-xl"
            />

          </div>

          {/* CTA */}

          <div>

            <label className="block mb-2 font-medium">

              CTA

            </label>

            <input
              type="text"
              placeholder="Contact us today!"
              value={cta}
              onChange={(e) =>
                setCta(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-xl"
            />

          </div>

          {/* LENGTH */}

          <div>

            <label className="block mb-2 font-medium">

              Post Length

            </label>

            <select
              value={postLength}
              onChange={(e) =>
                setPostLength(
                  e.target.value
                )
              }
              className="w-full border p-4 rounded-xl"
            >

              <option>
                Short
              </option>

              <option>
                Medium
              </option>

              <option>
                Long
              </option>

            </select>

          </div>

        </div>

        {/* BUTTON */}

        <button
          onClick={generatePost}
          disabled={loading}
          className={`mt-8 px-8 py-4 rounded-xl text-white transition-all duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >

          {
            loading
              ? "Generating..."
              : "Generate Post"
          }

        </button>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="mt-10 border rounded-3xl p-6 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>

            <p className="font-medium">

              Generating social media post...

            </p>

          </div>

        </div>

      )}

      {/* RESULT */}

      {result?.success && (

        <div className="mt-10 space-y-6">

          {/* RESULT HEADER */}

          <div className="flex flex-wrap items-center justify-between gap-4">

            <div>

              <h2 className="text-3xl font-bold">

                Generated Post

              </h2>

              <p className="text-gray-500 mt-1">

                {result.platform} • {result.tone}

              </p>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  copyText(
                    result.post
                  )
                }
                className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800"
              >

                Copy Post

              </button>

              <button
                onClick={() =>
                  copyText(
                    result.hashtags
                  )
                }
                className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700"
              >

                Copy Hashtags

              </button>

              <button
                onClick={
                  generatePost
                }
                className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700"
              >

                Regenerate

              </button>

            </div>

          </div>

          {/* POST CARD */}

          <div className="border rounded-3xl shadow-sm p-6 bg-white">

            <div className="whitespace-pre-wrap text-lg leading-8">

              {result.post}

            </div>

          </div>

          {/* HASHTAGS */}

          <div className="border rounded-3xl shadow-sm p-6 bg-white">

            <h3 className="text-2xl font-bold mb-5">

              Hashtags

            </h3>

            <div className="flex flex-wrap gap-3">

              {result.hashtags
                .split(" ")
                .map(
                  (
                    hashtag,
                    index
                  ) => (

                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
                    >

                      {hashtag}

                    </span>

                  )
                )}

            </div>

          </div>

        </div>

      )}

    </main>

  );

}