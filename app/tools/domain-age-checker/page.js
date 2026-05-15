"use client";

import { useState } from "react";

export default function DomainAgeChecker() {

  const [domain, setDomain] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const checkDomain = async () => {

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/domain-age",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              domain,
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

  return (

    <main className="max-w-5xl mx-auto p-10">

      <h1 className="text-5xl font-bold mb-4">

        Domain Age Checker

      </h1>

      <p className="text-gray-500 mb-10 text-lg">

        Check domain registration date,
        expiry date, registrar details,
        and domain age instantly.

      </p>

      {/* INPUT CARD */}

      <div className="bg-white border rounded-3xl p-6 shadow-sm">

        <input
          type="text"
          placeholder="Enter Domain Name"
          value={domain}
          onChange={(e) =>
            setDomain(
              e.target.value
            )
          }
          className="w-full border p-4 rounded-xl outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={checkDomain}
          disabled={loading}
          className={`px-8 py-4 rounded-xl mt-5 text-white transition-all ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >

          {
            loading
              ? "Checking..."
              : "Check Domain Age"
          }

        </button>

      </div>

      {/* RESULT */}

      {result?.success && (

        <div className="mt-10 space-y-5">

          {/* DOMAIN */}

          <div className="border rounded-2xl p-6 shadow-sm">

            <p className="text-gray-500 mb-2">

              Domain

            </p>

            <p className="font-semibold text-xl break-all">

              {result.domain}

            </p>

          </div>

          {/* GRID */}

          <div className="grid md:grid-cols-2 gap-5">

            {/* CREATED */}

            <div className="border rounded-2xl p-6 shadow-sm">

              <p className="text-gray-500 mb-2">

                Created On

              </p>

              <p className="font-semibold">

                {
                  result.createdOn
                    ? new Date(
                        result.createdOn
                      ).toDateString()
                    : "Not Available"
                }

              </p>

            </div>

            {/* UPDATED */}

            <div className="border rounded-2xl p-6 shadow-sm">

              <p className="text-gray-500 mb-2">

                Updated On

              </p>

              <p className="font-semibold">

                {
                  result.updatedOn
                    ? new Date(
                        result.updatedOn
                      ).toDateString()
                    : "Not Available"
                }

              </p>

            </div>

            {/* EXPIRY */}

            <div className="border rounded-2xl p-6 shadow-sm">

              <p className="text-gray-500 mb-2">

                Expiry Date

              </p>

              <p className="font-semibold">

                {
                  result.expiryDate
                    ? new Date(
                        result.expiryDate
                      ).toDateString()
                    : "Not Available"
                }

              </p>

            </div>

            {/* REGISTRAR */}

            <div className="border rounded-2xl p-6 shadow-sm">

              <p className="text-gray-500 mb-2">

                Registrar

              </p>

              <p className="font-semibold break-all">

                {result.registrar}

              </p>

            </div>

            {/* DOMAIN AGE */}

            <div className="border rounded-2xl p-6 shadow-sm md:col-span-2">

              <p className="text-gray-500 mb-2">

                Domain Age

              </p>

              <p className="font-semibold text-2xl">

                {result.domainAge}

              </p>

            </div>

          </div>

        </div>

      )}

    </main>

  );

}