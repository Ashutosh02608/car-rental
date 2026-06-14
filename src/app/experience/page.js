import Link from "next/link"

export default function ExperiencePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background Decor - Immersive Glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,_rgba(79,70,229,0.1),_transparent_50%)] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <header className="mb-24 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
             <span className="h-[1px] w-12 bg-indigo-500"></span>
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500">The Membership Cycle</span>
          </div>
          <h1 className="text-5xl lg:text-8xl font-black uppercase italic tracking-tighter mb-8 leading-[0.9]">
            Beyond <br />
            <span className="text-indigo-600">Transportation.</span>
          </h1>
          <p className="text-white/40 text-sm font-medium tracking-widest leading-relaxed uppercase">
            DriveNow is an exclusive ecosystem designed for those who value 
            technical precision and engineering excellence. Experience the manifest.
          </p>
        </header>

        {/* Experience Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-1 items-stretch bg-white/5 border border-white/5">
           <ExperiencePillar 
             number="01"
             title="Precision Logistics"
             description="Every unit is delivered via professional enclosed transport to your specific geolocation. Seamless synchronization with your itinerary."
             className="lg:col-span-4"
           />
           <ExperiencePillar 
             number="02"
             title="Curated Track Days"
             description="Member-exclusive access to private circuit events and high-performance driver coaching sessions across our global clusters."
             className="lg:col-span-4"
           />
           <ExperiencePillar 
             number="03"
             title="The Owner Network"
             description="Connect with a peer-to-peer registry of verified collectors. Gain access to limited-run units not available to the public."
             className="lg:col-span-4"
           />
        </div>

        {/* Full-width Immersive Section */}
        <section className="mt-32 p-16 lg:p-24 bg-[#0a0a0a] border border-white/5 rounded-[40px] relative overflow-hidden group">
           <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter mb-8">
                Your <span className="text-indigo-500">Privileged</span> <br /> Access Awaits.
              </h2>
              <p className="text-white/50 text-lg font-medium leading-relaxed mb-12">
                Join our verified member registry to unlock the full potential of the DriveNow fleet. Priority booking, dedicated concierge, and full insurance coverage.
              </p>
              <Link 
                href="/login"
                className="inline-flex items-center gap-4 py-5 px-10 bg-indigo-600 text-white font-black uppercase italic text-xs tracking-[0.3em] rounded-sm hover:shadow-[0_0_50px_rgba(79,70,229,0.4)] transition-all active:scale-95"
              >
                Initiate Membership
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
           </div>
           
           {/* Decor */}
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-600/10 to-transparent group-hover:from-indigo-600/20 transition-colors duration-700"></div>
           <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
        </section>
      </div>
    </div>
  )
}

function ExperiencePillar({ number, title, description, className = "" }) {
  return (
    <div className={`p-12 lg:p-16 bg-[#0a0a0a] hover:bg-white/[0.02] transition-colors flex flex-col justify-between group ${className}`}>
       <div className="mb-16">
          <span className="text-6xl lg:text-8xl font-black italic text-white/5 group-hover:text-indigo-500/10 transition-colors select-none">{number}</span>
       </div>
       <div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 group-hover:text-indigo-500 transition-colors">{title}</h3>
          <p className="text-sm text-white/30 font-medium leading-relaxed uppercase tracking-wider">{description}</p>
       </div>
    </div>
  )
}
