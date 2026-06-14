'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { signOut } from "next-auth/react"

export default function UserDropdown({ user }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-4 group focus:outline-none"
      >
        <div className="flex flex-col items-end hidden sm:flex transition-opacity duration-200 group-hover:opacity-80">
          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-0.5">
            {user.role === 'admin' ? 'System Administrator' : user.role === 'owner' ? 'Fleet Commander' : 'Verified Member'}
          </span>
          <span className="text-xs font-medium text-white/70">{user.email}</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-4 w-64 bg-[#0a0a0a] border border-white/5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] py-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-6 py-4 border-b border-white/5 mb-2">
             <p className="text-[9px] font-black uppercase tracking-widest text-white/20 italic mb-1">Authenticated Identity</p>
             <p className="text-xs font-bold text-white truncate">{user.email}</p>
          </div>
          
          <div className="flex flex-col">
            <DropdownLink href="/dashboard" label="Member Dashboard" icon={
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            } />

            {user.role === 'owner' && (
              <DropdownLink href="/dashboard/fleet" label="My Strategic Assets" icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              } />
            )}

            {user.role === 'admin' && (
              <DropdownLink href="/admin" label="Global Oversight" icon={
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              } />
            )}

            <div className="mt-4 pt-4 border-t border-white/5 px-4">
              <button 
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="w-full flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-red-500/60 hover:text-red-500 hover:bg-red-500/5 rounded-xl transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4-4H7m6 4v1h8M7 4h10a2 2 0 012 2v1M7 20H5a2 2 0 01-2-2V6a2 2 0 012-2h2" />
                </svg>
                Sign Out / De-auth
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DropdownLink({ href, label, icon }) {
  return (
    <Link 
      href={href}
      className="flex items-center gap-3 px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/[0.03] transition-all"
    >
      <svg className="w-4 h-4 text-indigo-500/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {icon}
      </svg>
      {label}
    </Link>
  )
}
