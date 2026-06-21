import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import UserDropdown from './UserDropdown'

export default async function Navbar() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 pt-6">
      <nav className="max-w-[1400px] mx-auto glass-panel bg-zinc-950/70 backdrop-blur-xl border border-white/5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.7)]">
        <div className="px-6 md:px-8">
          <div className="flex justify-between h-16 md:h-18 items-center">
            <div className="flex items-center gap-12">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo to-brand-purple rounded-lg rotate-3 group-hover:rotate-[12deg] group-hover:scale-110 transition-all duration-300 ease-out shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] shine-effect"></div>
                  <div className="absolute inset-0 bg-white/10 rounded-lg -rotate-6 group-hover:rotate-[-15deg] transition-all duration-500 ease-out blur-[1px]"></div>
                  <div className="relative z-10 font-black text-xl italic text-white tracking-tighter group-hover:scale-105 transition-all duration-300">
                    D
                  </div>
                </div>

                <span className="text-lg md:text-xl font-black tracking-tighter text-white uppercase italic relative group-hover:text-brand-purple transition-colors duration-200">
                  DriveNow
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-brand-indigo to-brand-purple group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(79,70,229,1)]"></span>
                </span>
              </Link>
              
              <div className="hidden lg:flex items-center gap-10">
                <Link 
                  href="/fleet" 
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors relative group"
                >
                  Fleet
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-indigo to-brand-purple group-hover:w-full transition-all duration-300"></span>
                </Link>

                {['Concierge', 'Locations'].map((item) => (
                  <Link 
                    key={item}
                    href={`/${item.toLowerCase()}`} 
                    className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-200 relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-indigo to-brand-purple group-hover:w-full transition-all duration-300 ease-out"></span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-6">
              {user ? (
                <UserDropdown user={user} />
              ) : (
                <div className="flex items-center gap-6">
                  <Link 
                    href="/login" 
                    className="bg-white text-black text-[11px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full hover:bg-gradient-to-r hover:from-brand-indigo hover:to-brand-purple hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-95"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
