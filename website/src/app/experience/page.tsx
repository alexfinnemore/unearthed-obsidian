import Link from "next/link";

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <Link 
            href="/"
            className="text-amber-400 hover:text-amber-300 mb-6 inline-flex items-center"
          >
            ← Back to Home
          </Link>
          
          <h1 className="text-5xl font-bold text-white mb-8">Virtual Walkthrough</h1>
          
          <div className="bg-slate-800/50 rounded-2xl p-12 mb-8">
            <div className="text-6xl mb-6">🚧</div>
            <h2 className="text-3xl font-semibold text-white mb-4">Coming Soon</h2>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              The immersive virtual experience of the Underground Labyrinth is currently in development. 
              This interactive walkthrough will showcase the multi-level exhibition spaces, 
              from the authentic cave conditions to the luxury specimen chambers.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-slate-700/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Planned Features</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• 360° virtual cave exploration</li>
                  <li>• Interactive specimen galleries</li>
                  <li>• Multi-sensory experience preview</li>
                  <li>• Behind-the-scenes curation process</li>
                </ul>
              </div>
              
              <div className="bg-slate-700/30 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-white mb-3">Technology</h3>
                <ul className="text-slate-300 space-y-2">
                  <li>• Three.js 3D environments</li>
                  <li>• WebGL mineral visualizations</li>
                  <li>• Spatial audio integration</li>
                  <li>• Mobile-responsive design</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-slate-400">
            <p className="mb-4">
              In the meantime, explore our comprehensive project documentation to understand 
              the vision and strategy behind this groundbreaking exhibition.
            </p>
            <Link
              href="/docs"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-block"
            >
              View Project Documentation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
