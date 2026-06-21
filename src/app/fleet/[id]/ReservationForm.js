'use client'

import { useState } from 'react'
import { createReservation } from '@/lib/actions/reservation'

export default function ReservationForm({ carId, pricePerDay }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const formData = new FormData(e.currentTarget)
    formData.append('carId', carId)
    formData.append('pricePerDay', pricePerDay)

    const result = await createReservation(formData)

    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      setMessage(result.success)
      e.target.reset()
    }
  }

  return (
    <div className="glass-panel border border-white/5 p-8 rounded-2xl bg-zinc-950/65 shadow-2xl relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xl font-extrabold uppercase tracking-tight text-white mb-8 font-display">
          Configure <span className="text-gradient font-display">Cycle</span>
        </h3>

        {message && (
          <div className="mb-6 p-4 bg-brand-purple/10 border border-brand-purple/20 rounded-xl text-brand-purple text-[10px] font-bold uppercase tracking-widest text-center animate-pulse font-display">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-bold uppercase tracking-widest text-center font-display">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/30 mb-2 ml-1 italic">Initiation Date</label>
              <input 
                name="startDate"
                type="date" 
                required
                className="w-full bg-[#070708] border border-white/5 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all cursor-pointer font-display"
              />
            </div>
            <div>
              <label className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/30 mb-2 ml-1 italic">Termination Date</label>
              <input 
                name="endDate"
                type="date" 
                required
                className="w-full bg-[#070708] border border-white/5 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all cursor-pointer font-display"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-brand-indigo to-brand-purple hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] text-white font-black uppercase italic text-[10px] tracking-[0.2em] rounded-xl hover:scale-[1.01] transition-all active:scale-[0.98] disabled:opacity-50 cursor-pointer font-display"
            >
              {loading ? 'Processing...' : 'Authorize Reservation'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-[8px] text-zinc-600 font-bold uppercase tracking-widest text-center leading-relaxed font-sans">
          Subject to concierge verification <br /> and identity validation
        </p>
      </div>
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  )
}
