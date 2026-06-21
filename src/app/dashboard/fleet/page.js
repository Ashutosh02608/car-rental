import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Car from "@/models/Car"
import FleetManagerControl from "@/components/FleetManagerControl"
import { redirect } from "next/navigation"
import Link from "next/link"

export const dynamic = 'force-dynamic'

export default async function OwnerFleetPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'owner') {
    redirect('/dashboard')
  }

  await dbConnect()
  const cars = await Car.find({ owner: session.user.id }).sort({ createdAt: -1 })

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors mb-12 font-display">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Return to commander
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
             <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">Personal Strategic Reserve</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold uppercase tracking-tight mb-4 font-display">
            My <span className="text-gradient font-display">Assets</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-sm font-medium tracking-wide leading-relaxed font-sans">
            Manage your personal collection of high-performance units. 
            Commission new assets or monitor the status of your current deployments.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Add New Asset */}
           <div className="lg:col-span-4">
              <div className="glass-panel border border-white/5 p-8 rounded-2xl bg-zinc-950/65 shadow-2xl sticky top-32">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-8 font-display">Commission New Asset</h3>
                 <FleetManagerControl />
              </div>
           </div>

           {/* Asset List */}
           <div className="lg:col-span-8 space-y-4">
              <div className="glass-panel border border-white/5 rounded-xl overflow-hidden text-[9px] font-black uppercase tracking-widest text-zinc-500 p-4 flex justify-between px-8 bg-zinc-950/40 font-display">
                 <span>Operational Unit</span>
                 <span>Specifications</span>
              </div>
              
              {cars.length > 0 ? (
                cars.map((car) => (
                  <div key={car._id.toString()} className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-6 group shadow-md border border-white/5 hover:border-brand-purple/20 transition-all duration-300 relative">
                     {/* Hover glow */}
                     <div className="absolute top-0 right-0 w-20 h-20 bg-brand-purple/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                     <div className="flex items-center gap-6">
                        <div className="w-24 h-14 bg-zinc-900 rounded-lg overflow-hidden border border-white/5 relative">
                           <img src={car.imageUrl} alt={car.model} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                        </div>
                        <div>
                           <p className="text-[9px] font-bold text-brand-purple uppercase tracking-widest font-display">{car.brand}</p>
                           <h4 className="text-xl font-bold uppercase tracking-tight text-white font-display group-hover:text-brand-purple transition-colors duration-300">{car.model}</h4>
                           <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest mt-1 font-sans">${car.pricePerDay} / Cycle</p>
                        </div>
                     </div>
                     
                     <div className="flex gap-8 text-center sm:text-right">
                        <div>
                           <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1.5 font-display">Auth Status</p>
                           <span className="text-[9px] font-black text-green-400 uppercase font-display border border-green-500/10 px-2.5 py-0.5 rounded-md bg-green-500/5">Active</span>
                        </div>
                        <div>
                           <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1.5 font-display">Propulsion</p>
                           <span className="text-[9px] font-black text-zinc-400 uppercase font-display border border-white/5 px-2.5 py-0.5 rounded-md bg-white/5">{car.type}</span>
                        </div>
                     </div>
                  </div>
                ))
              ) : (
                <div className="py-32 text-center glass-panel border border-white/5 bg-zinc-950/20">
                   <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 font-display leading-relaxed">
                      Zero assets currently deployed <br /> to the strategic reserve.
                   </p>
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}

