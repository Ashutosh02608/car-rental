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
    <div className="bg-[#0a0a0a] p-8 border border-white/5 rounded-sm relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-8">
          Configure <span className="text-indigo-500">Cycle</span>
        </h3>

        {message && (
          <div className="mb-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-[10px] font-bold uppercase tracking-widest text-center">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Initiation Date</label>
              <input 
                name="startDate"
                type="date" 
                required
                className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-4 py-3 text-white text-xs focus:ring-1 focus:ring-indigo-600 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Termination Date</label>
              <input 
                name="endDate"
                type="date" 
                required
                className="w-full bg-white/[0.03] border border-white/5 rounded-lg px-4 py-3 text-white text-xs focus:ring-1 focus:ring-indigo-600 outline-none transition-all"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              disabled={loading}
              className="w-full py-4 bg-indigo-600 text-white font-black uppercase italic text-[11px] tracking-[0.2em] shadow-[0_0_30px_rgba(79,70,229,0.2)] hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Authorize Reservation'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-[8px] text-white/20 font-bold uppercase tracking-widest text-center leading-relaxed">
          Subject to concierge verification <br /> and identity validation
        </p>
      </div>
      
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/5 blur-3xl"></div>
    </div>
  )
}
