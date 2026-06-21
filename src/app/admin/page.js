import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Car from "@/models/Car"
import Reservation from "@/models/Reservation"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  await dbConnect()
  
  const [totalUsers, totalCars, totalReservations, pendingReservations] = await Promise.all([
    User.countDocuments({}),
    Car.countDocuments({}),
    Reservation.countDocuments({}),
    Reservation.countDocuments({ status: 'Pending' })
  ])

  const revenue = await Reservation.aggregate([
    { $match: { status: 'Confirmed' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } }
  ])

  const revenueAmount = revenue[0]?.total || 0

  return (
    <div className="pt-32 px-6 lg:px-10 pb-20 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full">
        <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
               <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">System Operations</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold uppercase tracking-tight font-display">
              Platform <span className="text-gradient font-display">Telemetry</span>
            </h1>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           <AnalyticsCard title="Authorized Users" value={totalUsers} detail="Total Member Base" />
           <AnalyticsCard title="Fleet Units" value={totalCars} detail="Operational Assets" />
           <AnalyticsCard title="Confirmed Revenue" value={`$${revenueAmount.toLocaleString()}`} detail="Gross Platform Escrow" />
           <AnalyticsCard title="Pending Review" value={pendingReservations} detail="Manifest Queue Depth" color="text-amber-400" />
        </div>

        {/* Dynamic Telemetry Chart */}
        <div className="glass-panel border border-white/5 rounded-2xl p-8 lg:p-10 bg-zinc-950/65 shadow-2xl relative overflow-hidden">
           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10 pb-6 border-b border-white/5">
              <div>
                 <h3 className="text-xs font-black uppercase tracking-wider text-white font-display">Activity & Escrow Volume</h3>
                 <p className="text-[9px] text-zinc-500 uppercase tracking-widest mt-1">Real-time analytical trends</p>
              </div>
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-purple shadow-[0_0_8px_#8b5cf6]"></span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 font-display">Escrow Trend</span>
                 </div>
                 <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_8px_#06b6d4]"></span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 font-display">Reservations</span>
                 </div>
              </div>
           </div>

           <div className="w-full h-80 relative">
              <svg viewBox="0 0 800 300" className="w-full h-full" preserveAspectRatio="none">
                 <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                       <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="cyanGrad" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.15" />
                       <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                    </linearGradient>
                    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                       <feGaussianBlur stdDeviation="6" result="blur" />
                       <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                       </feMerge>
                    </filter>
                 </defs>

                 {/* Y Axis Grid lines */}
                 <line x1="40" y1="50" x2="780" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                 <line x1="40" y1="125" x2="780" y2="125" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                 <line x1="40" y1="200" x2="780" y2="200" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                 <line x1="40" y1="275" x2="780" y2="275" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                 {/* X Axis Grid lines */}
                 <line x1="140" y1="50" x2="140" y2="275" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                 <line x1="240" y1="50" x2="240" y2="275" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                 <line x1="340" y1="50" x2="340" y2="275" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                 <line x1="440" y1="50" x2="440" y2="275" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                 <line x1="540" y1="50" x2="540" y2="275" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                 <line x1="640" y1="50" x2="640" y2="275" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                 <line x1="740" y1="50" x2="740" y2="275" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

                 {/* Escrow Trend Fill & Line */}
                 <path d="M 40 275 L 40 220 Q 140 200, 240 240 T 440 120 T 640 150 T 780 70 L 780 275 Z" fill="url(#areaGrad)" />
                 <path d="M 40 220 Q 140 200, 240 240 T 440 120 T 640 150 T 780 70" fill="none" stroke="#8b5cf6" strokeWidth="2.5" filter="url(#glow)" strokeLinecap="round" />

                 {/* Reservations Count Fill & Line */}
                 <path d="M 40 275 L 40 250 Q 140 230, 240 210 T 440 180 T 640 120 T 780 90 L 780 275 Z" fill="url(#cyanGrad)" />
                 <path d="M 40 250 Q 140 230, 240 210 T 440 180 T 640 120 T 780 90" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.8" strokeDasharray="4 2" />

                 {/* Simulated Nodes */}
                 <circle cx="240" cy="240" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" className="hover:scale-150 transition-transform duration-200" />
                 <circle cx="440" cy="120" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
                 <circle cx="640" cy="150" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />
                 <circle cx="780" cy="70" r="4.5" fill="#8b5cf6" stroke="#fff" strokeWidth="1.5" />

                 {/* Subtitles & Labels */}
                 <text x="35" y="293" className="fill-zinc-600 text-[8px] font-black uppercase tracking-widest font-display">NOV</text>
                 <text x="135" y="293" className="fill-zinc-600 text-[8px] font-black uppercase tracking-widest font-display">DEC</text>
                 <text x="235" y="293" className="fill-zinc-600 text-[8px] font-black uppercase tracking-widest font-display">JAN</text>
                 <text x="335" y="293" className="fill-zinc-600 text-[8px] font-black uppercase tracking-widest font-display">FEB</text>
                 <text x="435" y="293" className="fill-zinc-600 text-[8px] font-black uppercase tracking-widest font-display">MAR</text>
                 <text x="535" y="293" className="fill-zinc-600 text-[8px] font-black uppercase tracking-widest font-display">APR</text>
                 <text x="635" y="293" className="fill-zinc-600 text-[8px] font-black uppercase tracking-widest font-display">MAY</text>
                 <text x="735" y="293" className="fill-zinc-600 text-[8px] font-black uppercase tracking-widest font-display">JUN</text>

                 <text x="15" y="55" className="fill-zinc-700 text-[8px] font-black font-mono">100%</text>
                 <text x="15" y="130" className="fill-zinc-700 text-[8px] font-black font-mono">50%</text>
                 <text x="15" y="205" className="fill-zinc-700 text-[8px] font-black font-mono">25%</text>
                 <text x="15" y="278" className="fill-zinc-700 text-[8px] font-black font-mono">0%</text>
              </svg>
           </div>
        </div>
      </div>
    </div>
  )
}

function AnalyticsCard({ title, value, detail, color = "text-white" }) {
  return (
    <div className="group p-8 glass-panel glass-panel-hover overflow-hidden rounded-2xl bg-zinc-950/60 shadow-lg relative border border-white/5 hover:border-brand-purple/20 transition-all duration-300">
       {/* Small color splash glow inside card on hover */}
       <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
       <h3 className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-8 group-hover:text-brand-purple transition-colors font-display">{title}</h3>
       <p className={`text-5xl font-black italic tracking-tighter mb-2 font-display transition-transform duration-300 group-hover:translate-x-1 ${color}`}>{value}</p>
       <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-sans">{detail}</p>
    </div>
  )
}

