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
    <div className="bg-[#0a0a0a] p-10 border border-white/5 rounded-2xl relative overflow-hidden">
       <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-10">Electronic Authorization</h3>
       
       <div className="space-y-8">
          {/* Card Number Mock */}
          <div className="space-y-3">
            <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1 italic">Card Identifier</label>
            <div className="relative group">
               <input 
                 type="text" 
                 readOnly
                 value="4242 - 4242 - 4242 - 4242" 
                 className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-5 text-white/60 text-sm font-mono tracking-[0.3em] outline-none"
               />
               <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                  <div className="w-8 h-5 bg-indigo-500/20 rounded-sm border border-indigo-500/30"></div>
                  <div className="w-8 h-5 bg-white/10 rounded-sm border border-white/20"></div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
             <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1 italic">Expiration</label>
                <input 
                  type="text" 
                  readOnly
                  value="12 / 28" 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-5 text-white/60 text-sm font-mono outline-none"
                />
             </div>
             <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-white/20 ml-1 italic">Security Hash</label>
                <input 
                  type="text" 
                  readOnly
                  value="999" 
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-5 text-white/60 text-sm font-mono outline-none"
                />
             </div>
          </div>

          <div className="pt-6">
             <button 
               onClick={handlePayment}
               disabled={loading || success}
               className={`w-full py-5 text-white font-black uppercase italic text-xs tracking-[0.3em] rounded-xl shadow-[0_0_50px_rgba(79,70,229,0.3)] transition-all active:scale-[0.98] ${
                 success ? 'bg-green-600 shadow-[0_0_50px_rgba(34,197,94,0.3)]' : 'bg-indigo-600 hover:bg-indigo-500'
               }`}
             >
                {loading ? 'Authorizing...' : success ? 'Transaction Complete' : `Execute Total Payment: $${totalPrice}`}
             </button>
          </div>
       </div>

       <div className="mt-10 flex items-center justify-center gap-6 opacity-20 grayscale">
          <span className="text-[8px] font-black uppercase tracking-widest">PCI-DSS Compliant</span>
          <span className="text-[8px] font-black uppercase tracking-widest">AES-256 Encrypted</span>
       </div>

       {/* Success Dialog Overlay */}
       {success && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-6">
            <div className="max-w-md w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden">
               {/* Background Glow */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] pointer-events-none"></div>

               <div className="relative z-10">
                  <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.2)]">
                     <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                     </svg>
                  </div>
                  
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-4">Authorization <span className="text-green-500">Successful</span></h2>
                  <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.3em] mb-10 leading-relaxed">
                     Your reservation cycle has been finalized. <br /> Check your manifest for status updates.
                  </p>
                  
                  <div className="flex flex-col items-center gap-4">
                     <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden mb-2">
                        <div 
                          className="bg-indigo-600 h-full transition-all duration-1000 ease-linear"
                          style={{ width: `${(countdown / 5) * 100}%` }}
                        ></div>
                     </div>
                     <p className="text-[9px] font-black uppercase tracking-widest text-indigo-500 animate-pulse">
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
