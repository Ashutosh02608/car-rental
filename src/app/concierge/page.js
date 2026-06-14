import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import Link from "next/link"

export default async function ConciergePage() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <header className="mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
             <span className="h-[1px] w-12 bg-indigo-500"></span>
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500">Priority Assistance</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter mb-6">
            DriveNow <span className="text-indigo-600">Concierge</span>
          </h1>
          <p className="text-white/40 max-w-2xl mx-auto text-sm font-medium tracking-wide leading-relaxed uppercase">
            Dedicated operational support for our prioritized members. <br />
            Our team is active 24/7 to ensure your fleet experience is flawless.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Direct Support Card */}
           <div className="p-10 bg-[#0a0a0a] border border-white/5 rounded-3xl group hover:border-indigo-500/30 transition-all">
              <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center mb-8">
                 <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                 </svg>
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 text-white">Active Threads</h3>
              <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest leading-relaxed mb-8">
                 Access your secure communication nodes for active and pending reservations.
              </p>
              <Link 
                href="/dashboard"
                className="inline-block py-4 px-8 bg-white text-black font-black uppercase italic text-[10px] tracking-[0.2em] rounded-xl hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                Access Message Logs
              </Link>
           </div>

           {/* Emergency Dispatch Card */}
           <div className="p-10 bg-[#0a0a0a] border border-white/5 rounded-3xl group hover:border-indigo-500/30 transition-all">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-8">
                 <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-4 text-white">Rapid Dispatch</h3>
              <p className="text-[11px] text-white/30 font-bold uppercase tracking-widest leading-relaxed mb-8">
                 For immediate roadside assistance or technical unit failure, initiate a priority alert.
              </p>
              <button 
                className="w-full py-4 bg-white/5 border border-white/10 text-white font-black uppercase italic text-[10px] tracking-[0.2em] rounded-xl hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 transition-all"
              >
                Trigger Priority Alert
              </button>
           </div>
        </div>

        {/* Support Attributes */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-1 overflow-hidden rounded-3xl border border-white/5 bg-white/5">
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
    <div className="bg-[#0a0a0a] p-8 text-center border-white/5">
       <p className="text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mb-2">{label}</p>
       <p className="text-lg font-black italic tracking-tighter text-indigo-500 uppercase">{value}</p>
    </div>
  )
}
