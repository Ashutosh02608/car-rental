'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function AdminSidebar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/admin', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { href: '/admin/reservations', label: 'Reservations', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { href: '/admin/fleet', label: 'Fleet Mgmt', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
    { href: '/admin/users', label: 'User Registry', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-zinc-950/40 backdrop-blur-xl pt-32 px-6 flex-col gap-8 hidden lg:flex">
         <div className="flex items-center gap-3 mb-2">
            <span className="h-[1px] w-8 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">Command Deck</span>
         </div>
         
         <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all duration-300 font-display ${
                    isActive 
                      ? 'bg-gradient-to-r from-brand-purple/10 to-brand-cyan/5 border border-brand-purple/20 text-white shadow-[0_0_15px_rgba(139,92,246,0.05)]' 
                      : 'border border-transparent text-zinc-500 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <svg className={`w-4 h-4 transition-colors ${isActive ? 'text-brand-purple' : 'text-zinc-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                  </svg>
                  {link.label}
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-cyan shadow-[0_0_8px_#06b6d4]"></span>}
                </Link>
              )
            })}
         </nav>
      </aside>

      {/* Mobile Top Sub-Navbar */}
      <div className="lg:hidden w-full bg-[#030303]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col justify-between z-40 relative pt-32">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-6 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">Oversight Deck</span>
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 border border-white/5 rounded-lg text-zinc-400 hover:text-white hover:border-white/10 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link 
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.15em] rounded-xl transition-all duration-300 font-display ${
                    isActive 
                      ? 'bg-gradient-to-r from-brand-purple/10 to-brand-cyan/5 border border-brand-purple/20 text-white' 
                      : 'border border-transparent text-zinc-500 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <svg className={`w-4 h-4 ${isActive ? 'text-brand-purple' : 'text-zinc-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                  </svg>
                  {link.label}
                  {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </>
  )
}
