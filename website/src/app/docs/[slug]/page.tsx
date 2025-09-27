import Link from "next/link";
import { getDocBySlug, getAllDocs, markdownToHtml } from "@/lib/docs";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default async function DocPage({ params }: PageProps) {
  const doc = getDocBySlug(params.slug);

  if (!doc) {
    notFound();
  }

  const htmlContent = await markdownToHtml(doc.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/docs"
              className="text-amber-400 hover:text-amber-300 mb-6 inline-flex items-center"
            >
              ← Back to Documentation
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {doc.title}
            </h1>
          </div>

          <article className="bg-slate-800/30 rounded-2xl p-8 md:p-12">
            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white prose-headings:font-bold
                prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
                prose-p:text-slate-300 prose-p:leading-relaxed
                prose-strong:text-white prose-strong:font-semibold
                prose-ul:text-slate-300 prose-ol:text-slate-300
                prose-li:text-slate-300 prose-li:mb-2
                prose-a:text-amber-400 prose-a:no-underline hover:prose-a:text-amber-300
                prose-code:text-amber-300 prose-code:bg-slate-700/50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-blockquote:border-l-amber-500 prose-blockquote:text-slate-300 prose-blockquote:italic
                prose-hr:border-slate-600"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </article>

          <div className="mt-8 flex justify-between">
            <Link
              href="/docs"
              className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              ← All Documentation
            </Link>
            <Link
              href="/"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
