'use client'

import { useState } from 'react'
import { createCar } from '@/lib/actions/admin'

export default function FleetManagerControl() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const result = await createCar(formData)
    setLoading(false)
    if (result.success) {
      setMessage(result.success)
      e.target.reset()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {message && (
        <p className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest text-center rounded-lg">
          {message}
        </p>
      )}

      <AdminInput name="brand" label="Manufacturer" placeholder="e.g. Lamborghini" />
      <AdminInput name="model" label="Designation" placeholder="e.g. Revuelto" />
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[8px] font-black uppercase tracking-widest text-white/20 mb-2 ml-1 italic">Type</label>
          <select name="type" className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-4 py-3 text-white text-xs outline-none focus:ring-1 focus:ring-indigo-600 transition-all">
             <option value="Sport" className="bg-[#0a0a0a] text-white">Sport</option>
             <option value="Luxury" className="bg-[#0a0a0a] text-white">Luxury</option>
             <option value="SUV" className="bg-[#0a0a0a] text-white">SUV</option>
             <option value="Electric" className="bg-[#0a0a0a] text-white">Electric</option>
          </select>
        </div>
        <AdminInput name="pricePerDay" label="Daily Rate" placeholder="2500" type="number" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <AdminInput name="horsepower" label="HP Output" placeholder="1001" type="number" />
        <AdminInput name="topSpeed" label="Velocity Max" placeholder="350" type="number" />
      </div>

      <AdminInput name="imageUrl" label="Imagery Source" placeholder="https://images..." />

      <div className="pt-4">
        <button 
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white font-black uppercase italic text-[10px] tracking-[0.2em] rounded-xl hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Authorize Unit Deployment'}
        </button>
      </div>
    </form>
  )
}

function AdminInput({ name, label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-[8px] font-black uppercase tracking-widest text-white/20 mb-2 ml-1 italic">{label}</label>
      <input 
        name={name}
        type={type} 
        required
        placeholder={placeholder}
        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-white text-xs outline-none focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-white/5"
      />
    </div>
  )
}
