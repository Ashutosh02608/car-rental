'use client'

import { useState } from 'react'
import { createReview } from '@/lib/actions/review'

export default function ReviewForm({ reservationId }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [rating, setRating] = useState(5)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const formData = new FormData(e.currentTarget)
    formData.append('reservationId', reservationId)
    formData.append('rating', rating)

    const result = await createReview(formData)
    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      setMessage(result.success)
      e.target.reset()
    }
  }

  return (
    <div className="p-8 bg-[#050505] border border-white/5 rounded-xl">
      <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-6 italic">Post-Operation Summary</h3>
      
      {message && <p className="mb-4 text-[10px] font-bold text-green-500 uppercase tracking-widest">{message}</p>}
      {error && <p className="mb-4 text-[10px] font-bold text-red-500 uppercase tracking-widest">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
           <label className="block text-[8px] font-black uppercase tracking-[0.2em] text-white/20 mb-3 ml-1 italic">Experience Rating</label>
           <div className="flex gap-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button 
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`w-10 h-10 rounded-lg font-black text-xs transition-all border ${
                    rating === num ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'
                  }`}
                >
                  {num}
                </button>
              ))}
           </div>
        </div>

        <div>
           <label className="block text-[8px] font-black uppercase tracking-[0.2em] text-white/20 mb-3 ml-1 italic">Technical Feedback</label>
           <textarea 
             name="comment"
             required
             placeholder="DESCRIBE UNIT PERFORMANCE / CONCIERGE QUALITY"
             className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-white text-xs outline-none focus:ring-1 focus:ring-indigo-600 transition-all min-h-[100px] placeholder:text-white/5"
           />
        </div>

        <button 
          disabled={loading}
          className="w-full py-4 bg-white text-black font-black uppercase italic text-[9px] tracking-[0.3em] rounded-lg hover:bg-indigo-600 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? 'Transmitting...' : 'Log Review to Manifest'}
        </button>
      </form>
    </div>
  )
}
