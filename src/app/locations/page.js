import Link from "next/link"

export default function LocationsPage() {
  const clusters = [
    { city: 'Dubai', region: 'MENA', status: 'Active', latency: '0.1s' },
    { city: 'Monaco', region: 'EU', status: 'Active', latency: '0.2s' },
    { city: 'Miami', region: 'US', status: 'Active', latency: '0.1s' },
    { city: 'Tokyo', region: 'APAC', status: 'Active', latency: '0.3s' },
    { city: 'London', region: 'UK', status: 'Active', latency: '0.2s' },
    { city: 'Los Angeles', region: 'US', status: 'Active', latency: '0.1s' },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-[#f4f4f5] pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <header className="mb-20 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
             <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-purple">Global Infrastructure</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold uppercase tracking-tight mb-6 leading-none font-display">
            Operational <span className="text-gradient font-display">Clusters</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-sm font-medium tracking-wide leading-relaxed font-sans">
            Strategic asset hubs deployed across the world&apos;s most influential regions. 
            Direct delivery to any geolocation within our active radius.
          </p>
        </header>

        {/* Global Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {clusters.map((cluster) => (
             <LocationCard key={cluster.city} {...cluster} />
           ))}
        </div>

        {/* Expansion Section */}
        <div className="mt-24 p-10 glass-panel flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/5">
           <div>
              <h3 className="text-xl font-bold uppercase tracking-wide mb-2 text-white font-display">Scale and Deploy</h3>
              <p className="text-xs text-zinc-400 font-medium font-sans">
                 We are continuously auditing new territories for high-performance fleet deployment.
              </p>
           </div>
           <button className="py-3.5 px-8 bg-white text-black font-black uppercase text-[10px] tracking-wider rounded-xl hover:bg-gradient-to-r hover:from-brand-indigo hover:to-brand-purple hover:text-white transition-all duration-300">
              Request Regional Expansion
           </button>
        </div>
      </div>
    </div>
  )
}

function LocationCard({ city, region, status, latency }) {
  return (
    <div className="p-10 glass-panel glass-panel-hover flex flex-col justify-between relative overflow-hidden group">
       <div className="relative z-10 w-full">
          <div className="flex justify-between items-start mb-10">
             <span className="text-[9px] font-black uppercase tracking-wider text-brand-purple font-display">{region}</span>
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse"></div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{status}</span>
             </div>
          </div>
          <h3 className="text-3xl font-extrabold uppercase tracking-tight mb-4 group-hover:text-brand-purple transition-colors font-display">{city}</h3>
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/5">
             <div>
                <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1 font-display">Cluster Sync</p>
                <p className="text-xs font-bold text-zinc-300 tracking-tight">{latency}</p>
             </div>
             <div>
                <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1 font-display">Units</p>
                <p className="text-xs font-bold text-zinc-300 tracking-tight">50+ Active</p>
             </div>
          </div>
       </div>
       {/* Background Noise/Grid */}
       <div className="absolute top-0 right-0 w-full h-full opacity-[0.01] pointer-events-none group-hover:opacity-[0.02] transition-opacity">
          <svg width="100%" height="100%">
             <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
             </pattern>
             <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
       </div>
    </div>
  )
}
