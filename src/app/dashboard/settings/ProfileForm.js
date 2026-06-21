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
    <div className="glass-panel border border-white/5 p-8 rounded-2xl bg-zinc-950/65 shadow-2xl relative overflow-hidden">
      {message && (
        <div className="mb-8 p-4 bg-brand-purple/10 border border-brand-purple/20 rounded-xl text-brand-purple text-[10px] font-bold uppercase tracking-widest text-center animate-pulse font-display">
          {message}
        </div>
      )}

      {error && (
        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[10px] font-bold uppercase tracking-widest text-center font-display">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="md:col-span-2">
            <label className="block text-[8px] font-black uppercase tracking-[0.3em] text-white/20 mb-3 ml-1 italic">Email (Read-only)</label>
            <div className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-5 py-4 text-white/30 text-xs cursor-not-allowed font-medium">
              {user.email}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <button 
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-white text-black hover:bg-gradient-to-r hover:from-brand-indigo hover:to-brand-purple hover:text-white font-black uppercase text-xs tracking-wider rounded-xl hover:scale-[1.01] transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.02)] cursor-pointer font-display"
          >
            {loading ? 'Synchronizing...' : 'Synchronize Identity'}
          </button>
        </div>
      </form>
      
      {/* Subtle Background Accent */}
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-purple/5 rounded-full blur-3xl pointer-events-none"></div>
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
        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-5 py-4 text-white text-xs outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-white/10 font-medium"
      />
    </div>
  )
}
