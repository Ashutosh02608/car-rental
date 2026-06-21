'use client'

import { useState } from 'react'
import { updateUserRole, updateUserVerification, deleteUser } from '@/lib/actions/admin'

export default function UserManagementControl({ user }) {
  const [loading, setLoading] = useState(false)

  const handleAction = async (action, value) => {
    setLoading(true)
    if (action === 'role') await updateUserRole(user._id, value)
    if (action === 'verify') await updateUserVerification(user._id, value)
    if (action === 'delete') {
      if (confirm('TERMINATE ACCOUNT? THIS ACTION IS PERMANENT.')) {
        await deleteUser(user._id)
      }
    }
    setLoading(false)
  }

  return (
    <div className="flex justify-end gap-3 items-center">
       {/* Role Toggle */}
       <select 
         disabled={loading}
         value={user.role}
         onChange={(e) => handleAction('role', e.target.value)}
         className="bg-[#070708] border border-white/5 rounded-xl px-3 py-1.5 text-[9px] font-black uppercase text-white/50 outline-none hover:border-brand-purple/40 hover:text-white transition-all cursor-pointer font-display"
       >
          <option value="renter" className="bg-[#0a0a0a] text-white">Renter</option>
          <option value="owner" className="bg-[#0a0a0a] text-white">Owner</option>
          <option value="admin" className="bg-[#0a0a0a] text-white">Admin</option>
       </select>

       {/* Verification Toggle */}
       <div className="flex gap-1.5">
          {user.verificationStatus !== 'Verified' && (
            <button 
              onClick={() => handleAction('verify', 'Verified')}
              disabled={loading}
              className="px-3 py-1.5 bg-green-500/5 text-green-400 border border-green-500/20 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-green-500/10 hover:border-green-500/40 hover:text-green-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.05)] transition-all duration-300 disabled:opacity-50 font-display"
            >
              Verify
            </button>
          )}
          {user.verificationStatus === 'Verified' && (
            <button 
              onClick={() => handleAction('verify', 'Unverified')}
              disabled={loading}
              className="px-3 py-1.5 bg-white/5 text-white/40 border border-white/5 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 hover:text-white transition-all duration-300 disabled:opacity-50 font-display"
            >
              Revoke
            </button>
          )}
       </div>

       {/* Delete Action */}
       <button 
         onClick={() => handleAction('delete')}
         disabled={loading}
         className="p-2 text-red-500/30 hover:text-red-400 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 rounded-xl transition-all duration-300"
         title="Terminate Identity"
       >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
       </button>
    </div>
  )
}
