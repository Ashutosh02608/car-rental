import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"

export default async function ConciergePage() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-[#f4f4f5] pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand-purple/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <header className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
             <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-purple">Priority Assistance</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold uppercase tracking-tight mb-6 font-display">
            DriveNow <span className="text-gradient font-display">Concierge</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-sm font-medium tracking-wide leading-relaxed font-sans">
            Dedicated operational support for our prioritized members. <br />
            Our team is active 24/7 to ensure your fleet experience is flawless.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Direct Support Card */}
           <div className="p-10 glass-panel hover:border-brand-purple/35 transition-all duration-300">
              <div className="w-12 h-12 bg-brand-purple/10 rounded-xl flex items-center justify-center mb-8 border border-brand-purple/20">
                 <svg className="w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                 </svg>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wide mb-4 text-white font-display">Active Threads</h3>
              <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed mb-8 font-sans">
                 Access your secure communication nodes for active and pending reservations.
              </p>
              <Link 
                href="/dashboard"
                className="inline-block py-3.5 px-6 bg-white text-black font-black uppercase text-[10px] tracking-wider rounded-xl hover:bg-gradient-to-r hover:from-brand-indigo hover:to-brand-purple hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.03)]"
              >
                Access Message Logs
              </Link>
           </div>

           {/* Emergency Dispatch Card */}
           <div className="p-10 glass-panel hover:border-red-500/35 transition-all duration-300">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-8 border border-red-500/20">
                 <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wide mb-4 text-white font-display">Rapid Dispatch</h3>
              <p className="text-[11px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed mb-8 font-sans">
                 For immediate roadside assistance or technical unit failure, initiate a priority alert.
              </p>
              <button 
                className="w-full py-3.5 bg-red-500/10 border border-red-500/25 text-red-400 font-black uppercase text-[10px] tracking-wider rounded-xl hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Trigger Priority Alert
              </button>
           </div>
        </div>

        {/* Support Attributes */}
        <div className="mt-16 grid grid-cols-3 gap-1 overflow-hidden rounded-2xl border border-white/5 bg-white/5">
           <SupportStat label="Response Time" value="< 120S" />
           <SupportStat label="Global Coverage" value="ACTIVE" />
           <SupportStat label="Data Encryption" value="AES-256" />
        </div>
      </div>
    </div>
  )
}

function SupportStat({ label, value }) {
  return (
    <div className="bg-[#09090b]/80 p-6 text-center">
       <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2 font-display">{label}</p>
       <p className="text-base font-black italic tracking-tighter text-brand-purple uppercase font-display">{value}</p>
    </div>
  )
}
