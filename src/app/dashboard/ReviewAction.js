'use client'

import { useState } from 'react'
import ReviewForm from '@/components/ReviewForm'

export default function ReviewAction({ reservationId, isReviewed }) {
  const [showForm, setShowForm] = useState(false)

  if (isReviewed) {
    return (
      <span className="px-4 py-2 bg-green-500/10 text-green-500 text-[9px] font-black uppercase tracking-widest rounded-lg flex items-center gap-2">
         <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
         </svg>
         Reviewed
      </span>
    )
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setShowForm(!showForm)}
        className="px-4 py-2 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-2"
      >
         <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.783.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
         </svg>
         {showForm ? 'Cancel' : 'Review'}
      </button>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
           <div className="w-full max-w-lg">
              <ReviewForm reservationId={reservationId} />
              <button 
                onClick={() => setShowForm(false)}
                className="mt-4 w-full py-3 text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors"
              >
                Close Portal
              </button>
           </div>
        </div>
      )}
    </div>
  )
}
