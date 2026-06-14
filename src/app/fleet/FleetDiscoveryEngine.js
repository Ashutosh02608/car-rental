'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'

export default function FleetDiscoveryEngine() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get('search') || '')

  const updateParams = (updates) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value)
      else params.delete(key)
    })
    
    startTransition(() => {
      router.push(`/fleet?${params.toString()}`, { scroll: false })
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    updateParams({ search })
  }

  return (
    <div className="space-y-8 mb-16 relative z-30">
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Search Input */}
          <div className="lg:col-span-5">
             <form onSubmit={handleSearch} className="relative">
                <input 
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="SEARCH MANIFEST / E.G. FERRARI"
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-6 py-4 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-white/10"
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-indigo-500 transition-colors">
                   <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                </button>
             </form>
          </div>

          {/* Type Selection */}
          <div className="lg:col-span-4">
             <select 
               value={searchParams.get('type') || 'All'}
               onChange={(e) => updateParams({ type: e.target.value === 'All' ? null : e.target.value })}
               className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-6 py-4 text-[9px] font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-indigo-600 transition-all cursor-pointer appearance-none"
             >
                <option value="All" className="bg-[#0a0a0a] text-white">Filter: All Units</option>
                <option value="Sport" className="bg-[#0a0a0a] text-white">Filter: Sport</option>
                <option value="Luxury" className="bg-[#0a0a0a] text-white">Filter: Luxury</option>
                <option value="SUV" className="bg-[#0a0a0a] text-white">Filter: SUV</option>
                <option value="Electric" className="bg-[#0a0a0a] text-white">Filter: Electric</option>
             </select>
          </div>

          {/* Sort Selection */}
          <div className="lg:col-span-3">
             <select 
               value={searchParams.get('sort') || 'newest'}
               onChange={(e) => updateParams({ sort: e.target.value })}
               className="w-full bg-[#0a0a0a] border border-white/5 rounded-xl px-6 py-4 text-[9px] font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-indigo-600 transition-all cursor-pointer appearance-none"
             >
                <option value="newest" className="bg-[#0a0a0a] text-white">Sort: Newest Units</option>
                <option value="price-low" className="bg-[#0a0a0a] text-white">Sort: Rate (Low to High)</option>
                <option value="price-high" className="bg-[#0a0a0a] text-white">Sort: Rate (High to Low)</option>
                <option value="hp-high" className="bg-[#0a0a0a] text-white">Sort: Power Output (HP)</option>
                <option value="speed-high" className="bg-[#0a0a0a] text-white">Sort: Max Velocity</option>
             </select>
          </div>
       </div>

       {isPending && (
         <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-indigo-500/50 overflow-hidden">
            <div className="w-1/3 h-full bg-indigo-500 animate-[loading_1s_infinite_linear]"></div>
         </div>
       )}
    </div>
  )
}
