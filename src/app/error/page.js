'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function ErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303] text-white px-6 py-12 relative overflow-hidden">
      {/* Background Red Warning Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="text-center glass-panel border border-red-500/10 p-10 rounded-2xl bg-zinc-950/65 shadow-2xl relative max-w-md w-full z-10">
        <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-6 text-red-500">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
           </svg>
        </div>
        <h1 className="text-xl font-extrabold text-red-500 uppercase tracking-wider font-display mb-4">Authentication Error</h1>
        <p className="text-zinc-400 mb-8 font-sans text-xs leading-relaxed uppercase tracking-wider font-medium">
          {error || 'An error occurred during authentication. Please verify credentials or session state.'}
        </p>
        <Link
          href="/login"
          className="inline-block py-3 px-8 bg-gradient-to-r from-brand-indigo to-brand-purple hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.01] transition-all font-display"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )
}

export default function ErrorPage() {
  return (
    <Suspense>
      <ErrorContent />
    </Suspense>
  )
}
