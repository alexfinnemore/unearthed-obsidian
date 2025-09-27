import Link from "next/link";
import { getAllDocs } from "@/lib/docs";

export default function Home() {
  const docs = getAllDocs();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative container mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight">
              UNEARTHED
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Where Earth Meets Art: An immersive underground labyrinth showcasing nature&apos;s most extraordinary mineral sculptures
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/docs"
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore the Vision
              </Link>
              <Link 
                href="/experience"
                className="border-2 border-slate-400 text-slate-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-400 hover:text-slate-900 transition-all duration-300"
              >
                Virtual Walkthrough
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">The Underground Universe</h2>
              <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                Enter a hidden world where geological forces have crafted masterpieces over millions of years. 
                Our multi-level labyrinth creates authentic cave conditions contrasted with sophisticated luxury chambers, 
                revealing Earth&apos;s most precious crystalline treasures.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400">$40M+</div>
                  <div className="text-slate-300">Collection Value</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-amber-400">200+</div>
                  <div className="text-slate-300">Specimens</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-700/30 p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold text-white mb-4">Experience Zones</h3>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mr-3"></span>
                  The Deep Furnace - Intense geological pressure
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  The Crystal Cavern - Cool cave systems
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                  The Viscous Flow Chamber - Rock transformation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                  The Spectrum Gallery - Crystalline artistry
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Quick Access */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Project Documentation</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docs.slice(0, 6).map((doc) => (
              <Link
                key={doc.slug}
                href={`/docs/${doc.slug}`}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:bg-slate-700/50 hover:border-slate-600 transition-all duration-300 group"
              >
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {doc.excerpt}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/docs"
              className="text-amber-400 hover:text-amber-300 font-semibold text-lg transition-colors"
            >
              View All Documentation →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}