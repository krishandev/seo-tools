"use client";

import { useState } from "react";

export default function ResponsiveChecker() {

  const [url, setUrl] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const [selectedDevice, setSelectedDevice] =
    useState(null);

  const [rotated, setRotated] =
    useState(false);

  const [zoom, setZoom] =
    useState(1);

  // =========================
  // CHECK RESPONSIVE
  // =========================

  const checkResponsive =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/responsive-checker",
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

        if (
          data?.devices?.length > 0
        ) {

          setSelectedDevice(
            data.devices[0]
          );

        }

      }

      catch (error) {

        console.log(error);

      }

      finally {

        setLoading(false);

      }

    };

  // =========================
  // DEVICE SIZE
  // =========================

  const getWidth =
    () => {

      if (!selectedDevice)
        return 0;

      return rotated

        ? selectedDevice.height

        : selectedDevice.width;

    };

  const getHeight =
    () => {

      if (!selectedDevice)
        return 0;

      return rotated

        ? selectedDevice.width

        : selectedDevice.height;

    };

  // =========================
  // COPY URL
  // =========================

  const copyUrl =
    () => {

      navigator.clipboard.writeText(
        result?.url
      );

      alert(
        "URL Copied!"
      );

    };

  // =========================
  // FULLSCREEN
  // =========================

  const openFullscreen =
    () => {

      window.open(
        result?.url,
        "_blank"
      );

    };

  return (

    <main className="max-w-7xl mx-auto p-10">

      {/* HEADING */}

      <h1 className="text-5xl font-bold mb-4">

        Website Responsive Checker

      </h1>

      <p className="text-gray-500 text-lg mb-10">

        Preview websites in mobile, tablet, and desktop screen sizes.

      </p>

      {/* INPUT CARD */}

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
              checkResponsive
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
                ? "Loading Preview..."
                : "Check Responsiveness"
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

              Loading responsive preview...

            </p>

          </div>

        </div>

      )}

      {/* RESULT */}

      {result?.success &&
        selectedDevice && (

          <div className="mt-10 space-y-6">

            {/* TOOLBAR */}

            <div className="bg-black text-white rounded-3xl p-5 flex flex-wrap items-center justify-between gap-4">

              {/* DEVICE BUTTONS */}

              <div className="flex flex-wrap gap-3">

                {result?.devices?.map(
                  (
                    device,
                    index
                  ) => (

                    <button
                      key={index}
                      onClick={() => {

                        setSelectedDevice(
                          device
                        );

                        setRotated(
                          false
                        );

                      }}
                      className={`px-5 py-3 rounded-xl transition-all duration-300 ${
                        selectedDevice?.name ===
                        device.name

                          ? "bg-white text-black"

                          : "bg-gray-800 hover:bg-gray-700"
                      }`}
                    >

                      {device.name}

                    </button>

                  )
                )}

              </div>

              {/* CONTROLS */}

              <div className="flex flex-wrap gap-3">

                {/* ROTATE */}

                <button
                  onClick={() =>
                    setRotated(
                      !rotated
                    )
                  }
                  className="bg-gray-800 hover:bg-gray-700 px-5 py-3 rounded-xl transition-all duration-300"
                >

                  Rotate

                </button>

                {/* ZOOM */}

                <button
                  onClick={() =>
                    setZoom(
                      0.5
                    )
                  }
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl"
                >

                  50%

                </button>

                <button
                  onClick={() =>
                    setZoom(
                      0.75
                    )
                  }
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl"
                >

                  75%

                </button>

                <button
                  onClick={() =>
                    setZoom(
                      1
                    )
                  }
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-xl"
                >

                  100%

                </button>

                {/* COPY */}

                <button
                  onClick={
                    copyUrl
                  }
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl"
                >

                  Copy URL

                </button>

                {/* FULLSCREEN */}

                <button
                  onClick={
                    openFullscreen
                  }
                  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl"
                >

                  Fullscreen

                </button>

              </div>

            </div>

            {/* DEVICE INFO */}

            <div className="border rounded-3xl p-6 shadow-sm bg-white">

              <div className="grid md:grid-cols-4 gap-5">

                <div>

                  <p className="text-gray-500 mb-2">

                    Device

                  </p>

                  <h3 className="text-2xl font-bold">

                    {
                      selectedDevice?.name
                    }

                  </h3>

                </div>

                <div>

                  <p className="text-gray-500 mb-2">

                    Width

                  </p>

                  <h3 className="text-2xl font-bold">

                    {getWidth()}px

                  </h3>

                </div>

                <div>

                  <p className="text-gray-500 mb-2">

                    Height

                  </p>

                  <h3 className="text-2xl font-bold">

                    {getHeight()}px

                  </h3>

                </div>

                <div>

                  <p className="text-gray-500 mb-2">

                    Orientation

                  </p>

                  <h3 className="text-2xl font-bold">

                    {
                      rotated

                        ? "Landscape"

                        : "Portrait"
                    }

                  </h3>

                </div>

              </div>

            </div>

            {/* PREVIEW */}

            <div className="bg-gray-900 rounded-3xl p-10 overflow-auto">

              <div className="flex justify-center transition-all duration-300">

                <div
                  className="bg-black rounded-[40px] p-4 shadow-2xl transition-all duration-300"
                  style={{

                    width:
                      `${getWidth() * zoom + 40}px`,

                  }}
                >

                  {/* DEVICE TOP */}

                  <div className="flex justify-center mb-3">

                    <div className="w-24 h-2 bg-gray-700 rounded-full"></div>

                  </div>

                  {/* IFRAME */}

                  <iframe
                    src={
                      result?.url
                    }
                    title="Responsive Preview"
                    className="bg-white rounded-[30px] border-0 transition-all duration-300"
                    style={{

                      width:
                        `${getWidth()}px`,

                      height:
                        `${getHeight()}px`,

                      transform:
                        `scale(${zoom})`,

                      transformOrigin:
                        "top left",

                    }}
                  />

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

              No Preview Yet

            </h3>

            <p className="text-gray-500">

              Enter a website URL to test responsiveness on multiple devices.

            </p>

          </div>

        )}

    </main>

  );

}