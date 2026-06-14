'use client'

import { signOut } from "next-auth/react"

export default function SignOutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: '/login' })}
      className="rounded-full bg-white/5 border border-white/10 px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-white hover:bg-white hover:text-black transition-all duration-300 active:scale-95"
    >
      Sign out
    </button>
  )
}
