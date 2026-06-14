'use client'

import { useState } from 'react'
import { updateProfile } from '@/lib/actions/user'

export default function ProfileForm({ user }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError('')

    const formData = new FormData(e.currentTarget)
    const result = await updateProfile(formData)

    setLoading(false)
    if (result.error) {
      setError(result.error)
    } else {
      setMessage(result.success)
    }
  }

  return (
    <div className="bg-[#0a0a0a] p-10 border border-white/5 rounded-2xl relative overflow-hidden">
      {message && (
        <div className="mb-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-indigo-400 text-[10px] font-bold uppercase tracking-widest text-center animate-pulse">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-[10px] font-bold uppercase tracking-widest text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormInput 
            label="Full Name" 
            name="name" 
            defaultValue={user.name} 
            placeholder="John Doe" 
          />
          <FormInput 
            label="Phone Number" 
            name="phoneNumber" 
            defaultValue={user.phoneNumber} 
            placeholder="+1 (555) 000-0000" 
          />
          <div className="md:col-span-2">
            <FormInput 
              label="Driver's License Number" 
              name="licenseNumber" 
              defaultValue={user.licenseNumber} 
              placeholder="DL-XXXX-XXXX-XXXX" 
            />
          </div>
          <div>
            <label className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/20 mb-3 ml-1 italic">Email (Read-only)</label>
            <div className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-5 py-4 text-white/30 text-sm cursor-not-allowed">
              {user.email}
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button 
            type="submit"
            disabled={loading}
            className="px-10 py-4 bg-white text-black font-black uppercase italic text-xs tracking-[0.2em] rounded-xl hover:bg-indigo-500 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
          >
            {loading ? 'Synchronizing...' : 'Synchronize Identity'}
          </button>
        </div>
      </form>
      
      {/* Subtle Background Accent */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-indigo-600/5 blur-3xl pointer-events-none"></div>
    </div>
  )
}

function FormInput({ label, name, defaultValue, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/30 mb-3 ml-1 italic">{label}</label>
      <input 
        name={name}
        type={type} 
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-white text-sm focus:bg-white/[0.05] focus:ring-1 focus:ring-indigo-600 outline-none transition-all placeholder:text-white/5 font-medium"
      />
    </div>
  )
}
