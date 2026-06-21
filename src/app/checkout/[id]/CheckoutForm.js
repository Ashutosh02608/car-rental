'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { payReservation } from '@/lib/actions/reservation'

export default function CheckoutForm({ reservationId, totalPrice }) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  useEffect(() => {
    let timer
    if (success && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    } else if (success && countdown === 0) {
      router.push('/dashboard')
    }
    return () => clearTimeout(timer)
  }, [success, countdown, router])

  const handlePayment = async () => {
    setLoading(true)
    const result = await payReservation(reservationId)
    if (result.success) {
      setSuccess(true)
    } else {
      alert(result.error || 'Transaction failed.')
      setLoading(false)
    }
  }

  return (
    <div className="glass-panel p-8 md:p-10 border border-white/5 rounded-2xl relative overflow-hidden bg-zinc-950/80">
       <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-8 font-display">Electronic Authorization</h3>
       
       <div className="space-y-6">
          {/* Card Number Mock */}
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1 font-display">Card Identifier</label>
            <div className="relative group">
               <input 
                 type="text" 
                 readOnly
                 value="4242 - 4242 - 4242 - 4242" 
                 className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-zinc-400 text-sm font-mono tracking-wider outline-none"
               />
               <div className="absolute right-5 top-1/2 -translate-y-1/2 flex gap-2">
                  <div className="w-8 h-5 bg-brand-indigo/20 rounded-sm border border-brand-indigo/30"></div>
                  <div className="w-8 h-5 bg-white/10 rounded-sm border border-white/20"></div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1 font-display">Expiration</label>
                <input 
                  type="text" 
                  readOnly
                  value="12 / 28" 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-zinc-400 text-sm font-mono outline-none"
                />
             </div>
             <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-zinc-500 ml-1 font-display">Security Hash</label>
                <input 
                  type="text" 
                  readOnly
                  value="999" 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-zinc-400 text-sm font-mono outline-none"
                />
             </div>
          </div>

          <div className="pt-4">
             <button 
               onClick={handlePayment}
               disabled={loading || success}
               className={`w-full py-4 text-white font-black uppercase text-xs tracking-wider rounded-xl shadow-[0_0_30px_rgba(99,102,241,0.15)] transition-all active:scale-[0.98] cursor-pointer font-display ${
                 success ? 'bg-green-600 shadow-[0_0_30px_rgba(34,197,94,0.3)]' : 'bg-gradient-to-r from-brand-indigo to-brand-purple hover:shadow-[0_0_30px_rgba(99,102,241,0.3)]'
               }`}
             >
                {loading ? 'Authorizing...' : success ? 'Transaction Complete' : `Execute Total Payment: $${totalPrice}`}
             </button>
          </div>
       </div>

       <div className="mt-8 flex items-center justify-center gap-6 opacity-30">
          <span className="text-[8px] font-black uppercase tracking-widest font-display text-zinc-400">PCI-DSS Compliant</span>
          <span className="text-[8px] font-black uppercase tracking-widest font-display text-zinc-400">AES-256 Encrypted</span>
       </div>

       {/* Success Dialog Overlay */}
       {success && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-6">
            <div className="max-w-md w-full glass-panel border border-white/10 rounded-3xl p-10 text-center relative overflow-hidden bg-zinc-950/90 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
               {/* Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>

               <div className="relative z-10">
                  <div className="w-18 h-18 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                     <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
                  
                  <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-3 font-display">Authorization <span className="text-green-500">Successful</span></h2>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mb-8 leading-relaxed font-sans">
                     Your reservation cycle has been finalized. <br /> Check your manifest for status updates.
                  </p>
                  
                  <div className="flex flex-col items-center gap-3">
                     <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-2">
                        <div 
                          className="bg-brand-purple h-full transition-all duration-1000 ease-linear"
                          style={{ width: `${(countdown / 5) * 100}%` }}
                        ></div>
                     </div>
                     <p className="text-[9px] font-black uppercase tracking-wider text-brand-purple animate-pulse font-display">
                        Redirecting to command center in {countdown}s
                     </p>
                  </div>
               </div>
            </div>
         </div>
       )}
    </div>
  )
}
