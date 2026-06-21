'use client'

import { useState } from 'react'
import { updateReservationStatus } from '@/lib/actions/admin'

export default function ReservationStatusControl({ id, currentStatus }) {
  const [loading, setLoading] = useState(false)

  const handleUpdate = async (status) => {
    setLoading(true)
    await updateReservationStatus(id, status)
    setLoading(false)
  }

  return (
    <div className="flex justify-end gap-2.5">
       {currentStatus !== 'Confirmed' && (
         <button 
           onClick={() => handleUpdate('Confirmed')}
           disabled={loading}
           className="px-4 py-2 bg-green-500/5 text-green-400 border border-green-500/20 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-green-500/10 hover:border-green-500/40 hover:text-green-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.05)] transition-all duration-300 disabled:opacity-50 font-display"
         >
           Confirm
         </button>
       )}
       {currentStatus !== 'Cancelled' && (
         <button 
           onClick={() => handleUpdate('Cancelled')}
           disabled={loading}
           className="px-4 py-2 bg-red-500/5 text-red-400 border border-red-500/20 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.05)] transition-all duration-300 disabled:opacity-50 font-display"
         >
           Cancel
         </button>
       )}
    </div>
  )
}
