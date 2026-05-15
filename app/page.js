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

      

    </main>
  );
}