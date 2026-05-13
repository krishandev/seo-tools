import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Fast Scanning",
      description:
        "Scan websites quickly and detect SEO issues instantly.",
    },
    {
      title: "SEO Friendly Reports",
      description:
        "Get detailed reports to improve rankings and user experience.",
    },
    {
      title: "Unlimited Usage",
      description:
        "Use all SEO tools without restrictions or signup.",
    },
    {
      title: "Mobile Responsive",
      description:
        "Fully optimized SEO tools for desktop, tablet, and mobile.",
    },
    {
      title: "Free SEO Tools",
      description:
        "Access powerful SEO utilities completely free.",
    },
    {
      title: "No Signup Required",
      description:
        "Start using tools instantly without creating an account.",
    },
  ];

  const faqs = [
    {
      question: "What is a broken link checker?",
      answer:
        "A broken link checker scans websites and detects invalid, dead, or 404 links affecting SEO and user experience.",
    },
    {
      question: "Why are broken links bad for SEO?",
      answer:
        "Broken links negatively impact user experience, website crawling, and search engine rankings.",
    },
    {
      question: "Is this tool free?",
      answer:
        "Yes, all SEO tools on LinkGuard are completely free to use.",
    },
    {
      question: "How does broken link checking work?",
      answer:
        "The tool crawls website pages, checks URLs, and detects pages returning 404 or server errors.",
    },
    {
      question: "Can I scan large websites?",
      answer:
        "Yes, you can scan websites with multiple pages and identify technical SEO issues.",
    },
  ];

  return (
    <main className="bg-white text-black">

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-4xl mx-auto">

          <div className="inline-flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-2 text-sm font-medium mb-6">
            🚀 Free SEO Tools Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            Free SEO Tools for Better Rankings
          </h1>

          <p className="text-lg md:text-xl text-gray-600 leading-8 mb-10 max-w-3xl mx-auto">
            Powerful SEO tools to analyze websites, fix technical SEO issues,
            improve rankings, and grow organic traffic.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

            <Link
              href="/tools/broken-link-checker"
              className="bg-black text-white px-8 py-4 rounded-2xl hover:bg-gray-800 transition-all duration-300 font-medium"
            >
              Start Using Tools
            </Link>

            <Link
              href="/tools/broken-link-checker"
              className="border border-gray-300 px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 font-medium"
            >
              Broken Link Checker
            </Link>

          </div>
        </div>
      </section>

      {/* Featured Tool Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <div>

              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm mb-6">
                ⭐ Featured SEO Tool
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Broken Link Checker
              </h2>

              <p className="text-gray-300 text-lg leading-8 mb-8">
                Scan websites, detect broken links, fix 404 pages, and improve
                technical SEO performance with our professional link checker.
              </p>

              <div className="space-y-4 mb-8">

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <p>Find 404 and broken links instantly</p>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <p>Scan internal website pages</p>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <p>Improve technical SEO performance</p>
                </div>

                <div className="flex items-center gap-3">
                  <span>✅</span>
                  <p>Unlimited free scans</p>
                </div>

              </div>

              <Link
                href="/tools/broken-link-checker"
                className="inline-flex items-center bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-300"
              >
                Open Tool
              </Link>

            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10">

              <div className="space-y-4">

                <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4">
                  <p className="font-medium text-red-200">
                    Broken Link Found
                  </p>

                  <p className="text-sm text-red-100 break-all mt-2">
                    https://example.com/broken-page
                  </p>
                </div>

                <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4">
                  <p className="font-medium text-green-200">
                    Working Link
                  </p>

                  <p className="text-sm text-green-100 break-all mt-2">
                    https://example.com/about-us
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-sm text-gray-300 mb-2">
                    Scan Progress
                  </p>

                  <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
                    <div className="bg-white h-4 w-3/4 rounded-full"></div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        <div className="text-center mb-16">

          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful SEO Features
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-8">
            Everything you need to improve technical SEO and optimize website
            performance.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >

              <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center text-2xl mb-6">
                ⚡
              </div>

              <h3 className="text-2xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </section>

    </main>
  );
}