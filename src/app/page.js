import Link from 'next/link'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-[#f4f4f5] overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute top-[20%] left-0 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden z-10">
        <div className="max-w-[1400px] mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Side Content */}
          <div className="lg:col-span-6 relative z-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-purple">
                Premium Automotive Experience
              </span>
            </div>
            
            <h1 className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-extrabold leading-[0.9] tracking-tight mb-8 uppercase font-display">
              Legacy <br />
              <span className="text-gradient">
                Redefined.
              </span>
            </h1>

            <p className="text-base text-zinc-400 max-w-lg mb-10 leading-relaxed font-sans">
              We don&apos;t just rent cars. We provide access to a curated collection of 
              high-performance machinery. Engineering excellence, delivered directly to your doorstep.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={user ? "/dashboard" : "/login"}
                className="group relative px-8 py-4 bg-gradient-to-r from-brand-indigo to-brand-purple rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] active:scale-95 text-white"
              >
                <div className="relative z-10 flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider">
                    {user ? 'Enter Dashboard' : 'Initiate Membership'}
                  </span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>

              <Link
                href="/fleet"
                className="group px-8 py-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/10 rounded-xl transition-all duration-300"
              >
                <span className="text-xs font-black uppercase tracking-wider text-zinc-300 group-hover:text-white">
                  Explore Fleet
                </span>
              </Link>
            </div>
          </div>

          {/* Right Side Visual Component - Hypercar Showcase */}
          <div className="lg:col-span-6 relative w-full h-[350px] lg:h-[500px] select-none z-20 flex justify-center items-center">
            {/* Elegant glass container for the hypercar */}
            <div className="relative w-full h-full glass-panel overflow-hidden border border-white/10 hover:border-brand-purple/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)] transition-all duration-500 flex justify-center items-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo/10 to-transparent z-10"></div>
              <img 
                src="/images/hero-car.png" 
                alt="DriveNow Luxury Hypercar" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:rotate-1 absolute inset-0"
              />
              
              {/* Coming Soon Frosted Shadow Overlay */}
              <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 flex items-center justify-center backdrop-blur-[3px]">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[9px] uppercase font-black tracking-[0.4em] text-brand-purple block mb-2 font-display">Status: Under Commission</span>
                  <h3 className="text-2xl font-black uppercase tracking-[0.2em] text-white font-display">Coming Soon</h3>
                  <div className="w-8 h-[1px] bg-brand-cyan mx-auto mt-3 shadow-[0_0_8px_#06b6d4]"></div>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6 z-30 glass-panel bg-zinc-950/75 border-white/5 p-5 flex justify-between items-center backdrop-blur-md">
                <div>
                  <span className="text-[9px] uppercase font-black tracking-widest text-brand-cyan">Active Reserve</span>
                  <h4 className="text-base font-black uppercase tracking-wide text-white">Project SF90</h4>
                </div>
                <div className="text-right">
                  <span className="text-[8px] uppercase font-bold text-zinc-400 block tracking-widest">Rate</span>
                  <span className="text-lg font-black text-brand-purple italic">$2,500/Day</span>
                </div>
              </div>
            </div>
            
            {/* Decorative speed lines */}
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-30 z-0"></div>
            <div className="absolute bottom-0 left-12 w-[1px] h-3/4 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20 z-0"></div>
          </div>
        </div>

        {/* Floating Stats Bar */}
        <div className="absolute bottom-8 left-0 w-full z-20 pointer-events-none">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-wrap gap-10 opacity-60">
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white uppercase font-display">500+</span>
                <span className="text-[8px] uppercase tracking-widest font-black text-brand-cyan">Units in fleet</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white uppercase font-display">0.2s</span>
                <span className="text-[8px] uppercase tracking-widest font-black text-brand-cyan">Avg response</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white uppercase font-display">Global</span>
                <span className="text-[8px] uppercase tracking-widest font-black text-brand-cyan">Priority coverage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features Section - Minimalist & Brutalist */}
      <section className="py-24 bg-[#050507] border-y border-white/5 relative">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureBlock 
              number="01"
              title="Curated Precision"
              description="Each vehicle undergoes an exhaustive 200-point diagnostic inspection prior to every single reservation."
            />
            <FeatureBlock 
              number="02"
              title="Identity Auth"
              description="Secure cryptographic identity and biometric document verification integrated directly via our client gateway."
            />
            <FeatureBlock 
              number="03"
              title="Rapid Dispatch"
              description="Seamless airport and hotel concierge delivery within 60 minutes of reservation confirmation."
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-36 relative overflow-hidden">
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-indigo/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight mb-8 font-display">
              The Intersection of <br />
              <span className="text-gradient">Performance</span> and <span className="text-gradient">Luxury.</span>
            </h2>
            <div className="relative group cursor-pointer inline-block mt-4">
              <div className="absolute -inset-4 bg-brand-purple/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <Link href="/fleet" className="relative text-xs font-black uppercase tracking-[0.4em] text-white/95 border-b-2 border-brand-purple pb-2 hover:text-white transition-colors duration-200">
                Explore Current Inventory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-16 border-t border-white/5 bg-[#030303] relative z-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gradient-to-tr from-brand-indigo to-brand-purple rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.3)]">
                <span className="text-white font-black italic text-xs">D</span>
              </div>
              <span className="text-sm font-black tracking-tighter uppercase italic text-white font-display">DriveNow</span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors duration-200">Privacy</Link>
              <Link href="#" className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors duration-200">Terms</Link>
              <Link href="#" className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors duration-200">Cookies</Link>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-zinc-600">
              © 2026 DriveNow / Automotive Excellence Group
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureBlock({ number, title, description }) {
  return (
    <div className="group relative p-10 glass-panel glass-panel-hover overflow-hidden">
      <div className="absolute -right-4 -top-8 text-[110px] font-black italic text-white/[0.01] group-hover:text-brand-purple/5 transition-colors duration-300 leading-none select-none">
        {number}
      </div>
      <div className="relative z-10">
        <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-purple mb-4 block font-display">
          Attribute {number}
        </span>
        <h3 className="text-xl font-bold uppercase tracking-wide text-white mb-4 font-display">
          {title}
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  )
}

