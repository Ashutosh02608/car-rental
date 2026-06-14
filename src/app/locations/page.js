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
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <header className="mb-24 text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
             <span className="h-[1px] w-12 bg-indigo-500"></span>
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500">Global Infrastructure</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">
            Operational <span className="text-indigo-600">Clusters</span>
          </h1>
          <p className="text-white/40 max-w-2xl text-sm font-medium tracking-widest leading-relaxed uppercase">
            Strategic asset hubs deployed across the world&apos;s most influential regions. 
            Direct delivery to any geolocation within our active radius.
          </p>
        </header>

        {/* Global Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
           {clusters.map((cluster) => (
             <LocationCard key={cluster.city} {...cluster} />
           ))}
        </div>

        {/* Expansion Section */}
        <div className="mt-32 p-12 bg-[#0a0a0a] border border-white/5 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8">
           <div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2 text-white">Scale and Deploy</h3>
              <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest leading-relaxed">
                 We are continuously auditing new territories for high-performance fleet deployment.
              </p>
           </div>
           <button className="py-4 px-10 bg-white text-black font-black uppercase italic text-[10px] tracking-[0.3em] rounded-xl hover:bg-indigo-500 hover:text-white transition-all">
              Request Regional Expansion
           </button>
        </div>
      </div>
    </div>
  )
}

function LocationCard({ city, region, status, latency }) {
  return (
    <div className="p-12 bg-[#0a0a0a] border border-white/5 group hover:bg-white/[0.02] transition-colors relative overflow-hidden">
       <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">{region}</span>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></div>
                <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{status}</span>
             </div>
          </div>
          <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 group-hover:text-white transition-colors">{city}</h3>
          <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/5">
             <div>
                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1 italic">Cluster Sync</p>
                <p className="text-xs font-bold text-white/80 uppercase tracking-tighter">{latency}</p>
             </div>
             <div>
                <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1 italic">Units</p>
                <p className="text-xs font-bold text-white/80 uppercase tracking-tighter">50+ Active</p>
             </div>
          </div>
       </div>
       {/* Background Noise/Grid */}
       <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity">
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
