import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import UserDropdown from './UserDropdown'

export default async function Navbar() {
  const session = await getServerSession(authOptions)
  const user = session?.user

  return (
    <nav className="fixed w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-12">
            <Link href="/" className="group flex items-center gap-3">
              {/* Previous Logo commented out */}
              {/* New Animated snappier Logo */}
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-indigo-600 rounded-xl rotate-3 group-hover:rotate-[12deg] group-hover:scale-110 transition-all duration-300 ease-out shadow-[0_0_30px_rgba(79,70,229,0.5)]"></div>
                <div className="absolute inset-0 bg-white/10 rounded-xl -rotate-6 group-hover:rotate-[-15deg] transition-all duration-500 ease-out blur-[1px]"></div>
                <div className="relative z-10 font-black text-2xl italic text-white tracking-tighter animate-[pulse_1.5s_infinite_ease-in-out]">
                  D
                </div>
              </div>

              <span className="text-xl font-black tracking-tighter text-white uppercase italic relative group-hover:text-indigo-400 transition-colors duration-200">
                DriveNow
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-indigo-500 group-hover:w-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(79,70,229,1)]"></span>
              </span>
            </Link>
            
            <div className="hidden lg:flex items-center gap-10">
              <Link 
                href="/fleet" 
                className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors relative group"
              >
                Fleet
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
              </Link>

              {['Experience', 'Concierge', 'Locations'].map((item) => (
                <Link 
                  key={item}
                  href={`/${item.toLowerCase()}`} 
                  className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-indigo-500 group-hover:w-full transition-all duration-300 ease-out"></span>
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
                  className="bg-white text-black text-[13px] font-black uppercase tracking-widest px-8 py-3 rounded-full hover:bg-indigo-500 hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] active:scale-95"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
