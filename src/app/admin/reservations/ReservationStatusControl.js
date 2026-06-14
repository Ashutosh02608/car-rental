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
    <div className="flex justify-end gap-2">
       {currentStatus !== 'Confirmed' && (
         <button 
           onClick={() => handleUpdate('Confirmed')}
           disabled={loading}
           className="px-3 py-1.5 bg-green-500/10 text-green-500 text-[8px] font-black uppercase tracking-widest rounded-sm hover:bg-green-500 hover:text-white transition-all disabled:opacity-50"
         >
           Confirm
         </button>
       )}
       {currentStatus !== 'Cancelled' && (
         <button 
           onClick={() => handleUpdate('Cancelled')}
           disabled={loading}
           className="px-3 py-1.5 bg-red-500/10 text-red-500 text-[8px] font-black uppercase tracking-widest rounded-sm hover:bg-red-500 hover:text-white transition-all disabled:opacity-50"
         >
           Cancel
         </button>
       )}
    </div>
  )
}
