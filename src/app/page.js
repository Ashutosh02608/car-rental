import Link from 'next/link'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      {/* Hero Section - Immersive Split Screen */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Left Side Content */}
        <div className="container mx-auto px-6 relative z-20 pointer-events-none">
          <div className="max-w-4xl pointer-events-auto">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-indigo-500"></span>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500">
                Premium Automotive Experience
              </span>
            </div>
            
            <h1 className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter mb-10 uppercase italic">
              Legacy <br />
              <span className="text-transparent border-t-outline [-webkit-text-stroke:1px_rgba(255,255,255,0.4)]">
                Redefined.
              </span>
            </h1>

            <p className="text-lg text-white/50 max-w-xl mb-12 font-medium leading-relaxed tracking-wide">
              We don&apos;t just rent cars. We provide access to a curated collection of 
              high-performance machinery. Engineering excellence, delivered to your door.
            </p>

            <div className="flex flex-wrap gap-6">
              <Link
                href={user ? "/dashboard" : "/login"}
                className="group relative px-10 py-5 bg-indigo-600 overflow-hidden rounded-sm transition-all duration-200 hover:shadow-[0_0_40px_rgba(79,70,229,0.4)]"
              >
                <div className="relative z-10 flex items-center gap-3">
                  <span className="text-[13px] font-black uppercase tracking-widest">
                    {user ? 'Enter Dashboard' : 'Initiate Membership'}
                  </span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>

              <Link
                href="/fleet"
                className="group px-10 py-5 border border-white/10 hover:border-white/30 rounded-sm transition-all duration-200"
              >
                <span className="text-[13px] font-black uppercase tracking-widest text-white/70 group-hover:text-white">
                  Explore Fleet
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side Visual Component - Abstract Geometric/Glassmorphism */}
        <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block select-none">
          <div className="absolute inset-0 bg-gradient-to-l from-indigo-500/10 to-transparent z-10"></div>
          {/* Decorative Elements */}
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] border border-white/5 rotate-45 backdrop-blur-3xl bg-white/5 rounded-3xl"></div>
          <div className="absolute bottom-[20%] right-[30%] w-[200px] h-[200px] border border-white/5 -rotate-12 backdrop-blur-2xl bg-white/5 rounded-full"></div>
          
          {/* Abstract Speed Lines */}
          <div className="absolute top-0 right-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-[40%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-30"></div>
        </div>

        {/* Floating Stats Bar */}
        <div className="absolute bottom-12 left-0 w-full z-20 pointer-events-none">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap gap-12 lg:gap-24 opacity-40">
              <div className="flex flex-col">
                <span className="text-2xl font-black italic tracking-tighter uppercase">500+</span>
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Units in fleet</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black italic tracking-tighter uppercase">0.2s</span>
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Avg response</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black italic tracking-tighter uppercase">Global</span>
                <span className="text-[9px] uppercase tracking-[0.3em] font-bold">Priority coverage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Features Section - Minimalist & Brutalist */}
      <section className="py-32 bg-[#080808] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            <FeatureBlock 
              number="01"
              title="Curated Precision"
              description="Each vehicle undergoes a 200-point inspection before every single reservation."
            />
            <FeatureBlock 
              number="02"
              title="Identity Auth"
              description="Secure biometric and document verification integrated directly via our mobile gateway."
            />
            <FeatureBlock 
              number="03"
              title="Rapid Dispatch"
              description="Airport and hotel concierge delivery within 60 minutes of your reservation."
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-48 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter mb-12">
              The <span className="text-indigo-500">Intersection</span> of <br />
              Performance and Luxury.
            </h2>
            <div className="relative group cursor-pointer inline-block">
               <div className="absolute -inset-4 bg-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <Link href="/fleet" className="relative text-sm font-black uppercase tracking-[0.5em] text-white/80 border-b-2 border-indigo-500 pb-2">
                 View Current Inventory
               </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-20 border-t border-white/5 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3 opacity-50 grayscale">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-black italic text-sm">D</span>
              </div>
              <span className="text-sm font-black tracking-tighter uppercase italic text-white">DriveNow</span>
            </div>
            <div className="flex gap-10">
              <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors">Cookies</Link>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
              © 2026 DriveNow / Automotive Excellence
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureBlock({ number, title, description }) {
  return (
    <div className="group relative p-12 bg-[#0a0a0a] hover:bg-white/[0.02] transition-colors duration-200 border border-white/5 overflow-hidden">
      <div className="absolute -right-4 -top-8 text-[120px] font-black italic text-white/[0.02] group-hover:text-indigo-500/5 transition-colors duration-200 leading-none select-none">
        {number}
      </div>
      <div className="relative z-10">
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-6 block">
          Attribute {number}
        </span>
        <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-6">
          {title}
        </h3>
        <p className="text-sm text-white/40 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>
  )
}
