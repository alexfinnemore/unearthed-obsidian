import Link from "next/link";
import { getAllDocs } from "@/lib/docs";

export default function DocsPage() {
  const docs = getAllDocs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-16">
        <div className="mb-12">
          <Link 
            href="/"
            className="text-amber-400 hover:text-amber-300 mb-6 inline-flex items-center"
          >
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-white mb-6">Project Documentation</h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Comprehensive planning and strategy documents for the Unearthed Exhibition - 
            an immersive mineral art experience.
          </p>
        </div>

        <div className="grid gap-6">
          {docs.map((doc) => (
            <Link
              key={doc.slug}
              href={`/docs/${doc.slug}`}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-white mb-4 group-hover:text-amber-400 transition-colors">
                    {doc.title}
                  </h2>
                  <p className="text-slate-400 leading-relaxed">
                    {doc.excerpt}
                  </p>
                </div>
                <div className="ml-6 text-slate-500 group-hover:text-slate-400 transition-colors">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
