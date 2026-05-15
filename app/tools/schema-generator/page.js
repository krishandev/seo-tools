"use client";

import { useState } from "react";

export default function SchemaGenerator() {

  const [schemaType, setSchemaType] =
    useState("LocalBusiness");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [formData, setFormData] =
    useState({

      // Local Business

      businessName: "",
      website: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      logo: "",

      // Organization

      organizationName: "",
      socialLinks: "",

      // FAQ

      faqs: [
        {
          question: "",
          answer: "",
        },
      ],

      // Service

      serviceName: "",
      serviceType: "",
      provider: "",
      areaServed: "",

    });

  // =========================
  // HANDLE INPUT
  // =========================

  const handleChange = (
    e
  ) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  // =========================
  // FAQ HANDLER
  // =========================

  const handleFaqChange = (
    index,
    field,
    value
  ) => {

    const updatedFaqs =
      [...formData.faqs];

    updatedFaqs[index][field] =
      value;

    setFormData({

      ...formData,

      faqs: updatedFaqs,

    });

  };

  const addFaq = () => {

    setFormData({

      ...formData,

      faqs: [
        ...formData.faqs,
        {
          question: "",
          answer: "",
        },
      ],

    });

  };

  const removeFaq = (
    index
  ) => {

    const updatedFaqs =
      formData.faqs.filter(
        (_, i) => i !== index
      );

    setFormData({

      ...formData,

      faqs: updatedFaqs,

    });

  };

  // =========================
  // GENERATE SCHEMA
  // =========================

  const generateSchema =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/schema-generator",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                schemaType,
                formData: {
                  ...formData,

                  socialLinks:
                    formData.socialLinks
                      .split(",")
                      .map(
                        (link) =>
                          link.trim()
                      ),
                },
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
  // COPY SCHEMA
  // =========================

  const copySchema = () => {

    navigator.clipboard.writeText(
      result.schema
    );

    alert("Schema copied!");

  };

  // =========================
  // DOWNLOAD SCHEMA
  // =========================

  const downloadSchema =
    () => {

      const blob =
        new Blob(
          [result.schema],
          {
            type:
              "application/json",
          }
        );

      const url =
        URL.createObjectURL(
          blob
        );

      const a =
        document.createElement(
          "a"
        );

      a.href = url;

      a.download =
        "schema.json";

      a.click();

      URL.revokeObjectURL(
        url
      );

    };

  return (

    <main className="max-w-6xl mx-auto p-10">

      {/* HEADING */}

      <h1 className="text-5xl font-bold mb-4">

        Schema Generator

      </h1>

      <p className="text-gray-500 text-lg mb-10">

        Generate valid JSON-LD
        schema markup for SEO.

      </p>

      {/* FORM CARD */}

      <div className="border rounded-3xl p-6 shadow-sm bg-white space-y-6">

        {/* SCHEMA TYPE */}

        <div>

          <label className="block mb-2 font-medium">

            Schema Type

          </label>

          <select
            value={schemaType}
            onChange={(e) =>
              setSchemaType(
                e.target.value
              )
            }
            className="w-full border p-4 rounded-xl"
          >

            <option value="LocalBusiness">
              Local Business
            </option>

            <option value="Organization">
              Organization
            </option>

            <option value="FAQ">
              FAQ
            </option>

            <option value="Service">
              Service
            </option>

          </select>

        </div>

        {/* ========================= */}
        {/* LOCAL BUSINESS */}
        {/* ========================= */}

        {schemaType ===
          "LocalBusiness" && (

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="businessName"
              placeholder="Business Name"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="website"
              placeholder="Website"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="logo"
              placeholder="Logo URL"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="country"
              placeholder="Country"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

          </div>

        )}

        {/* ========================= */}
        {/* ORGANIZATION */}
        {/* ========================= */}

        {schemaType ===
          "Organization" && (

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="organizationName"
              placeholder="Organization Name"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="website"
              placeholder="Website"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="logo"
              placeholder="Logo URL"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="socialLinks"
              placeholder="Social Links (comma separated)"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl md:col-span-2"
            />

          </div>

        )}

        {/* ========================= */}
        {/* FAQ */}
        {/* ========================= */}

        {schemaType ===
          "FAQ" && (

          <div className="space-y-5">

            {formData.faqs.map(
              (
                faq,
                index
              ) => (

                <div
                  key={index}
                  className="border rounded-2xl p-5 space-y-4"
                >

                  <input
                    type="text"
                    placeholder="Question"
                    value={
                      faq.question
                    }
                    onChange={(
                      e
                    ) =>
                      handleFaqChange(
                        index,
                        "question",
                        e.target
                          .value
                      )
                    }
                    className="w-full border p-4 rounded-xl"
                  />

                  <textarea
                    placeholder="Answer"
                    value={
                      faq.answer
                    }
                    onChange={(
                      e
                    ) =>
                      handleFaqChange(
                        index,
                        "answer",
                        e.target
                          .value
                      )
                    }
                    className="w-full border p-4 rounded-xl h-32"
                  />

                  <button
                    onClick={() =>
                      removeFaq(
                        index
                      )
                    }
                    className="bg-red-100 text-red-600 px-4 py-2 rounded-xl"
                  >

                    Remove FAQ

                  </button>

                </div>

              )
            )}

            <button
              onClick={addFaq}
              className="bg-black text-white px-6 py-3 rounded-xl"
            >

              Add FAQ

            </button>

          </div>

        )}

        {/* ========================= */}
        {/* SERVICE */}
        {/* ========================= */}

        {schemaType ===
          "Service" && (

          <div className="grid md:grid-cols-2 gap-5">

            <input
              type="text"
              name="serviceName"
              placeholder="Service Name"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="serviceType"
              placeholder="Service Type"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="provider"
              placeholder="Provider"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="areaServed"
              placeholder="Area Served"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl"
            />

            <input
              type="text"
              name="website"
              placeholder="Website"
              onChange={
                handleChange
              }
              className="border p-4 rounded-xl md:col-span-2"
            />

          </div>

        )}

        {/* BUTTON */}

        <button
          onClick={generateSchema}
          disabled={loading}
          className={`px-8 py-4 rounded-xl text-white transition-all duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >

          {
            loading
              ? "Generating..."
              : "Generate Schema"
          }

        </button>

      </div>

      {/* RESULT */}

      {result?.success && (

        <div className="mt-10 border rounded-3xl overflow-hidden shadow-sm">

          {/* HEADER */}

          <div className="bg-gray-100 p-5 flex flex-wrap gap-4 justify-between items-center">

            <h2 className="text-2xl font-bold">

              Generated JSON-LD

            </h2>

            <div className="flex gap-3">

              <button
                onClick={
                  copySchema
                }
                className="bg-black text-white px-5 py-2 rounded-xl hover:bg-gray-800"
              >

                Copy

              </button>

              <button
                onClick={
                  downloadSchema
                }
                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
              >

                Download JSON

              </button>

            </div>

          </div>

          {/* CODE BLOCK */}

          <div className="bg-black text-green-400 font-mono text-sm overflow-x-auto p-6">

            <pre>

              {JSON.stringify(
                JSON.parse(
                  result.schema
                ),
                null,
                2
              )}

            </pre>

          </div>

        </div>

      )}

    </main>

  );

}