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
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-indigo-500 transition-colors mb-12">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Return to fleet commander
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
             <span className="h-[1px] w-12 bg-indigo-500"></span>
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500">Personal Strategic Reserve</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter mb-4">
            My <span className="text-indigo-600">Assets</span>
          </h1>
          <p className="text-white/40 max-w-2xl text-sm font-medium tracking-wide leading-relaxed">
            Manage your personal collection of high-performance units. 
            Commission new assets or monitor the status of your current deployments.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Add New Asset */}
           <div className="lg:col-span-4">
              <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-3xl sticky top-32">
                 <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500 mb-8 italic">Commission New Asset</h3>
                 <FleetManagerControl />
              </div>
           </div>

           {/* Asset List */}
           <div className="lg:col-span-8 space-y-6">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 flex justify-between px-10 text-[9px] font-black uppercase tracking-[0.3em] text-white/20">
                 <span>Operational Unit</span>
                 <span>Telemetry</span>
              </div>
              
              {cars.length > 0 ? (
                cars.map((car) => (
                  <div key={car._id.toString()} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-8 group hover:border-indigo-500/30 transition-all">
                     <div className="flex items-center gap-8">
                        <div className="w-28 h-16 bg-zinc-900 rounded-xl overflow-hidden border border-white/5">
                           <img src={car.imageUrl} alt={car.model} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">{car.brand}</p>
                           <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">{car.model}</h4>
                           <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-1">${car.pricePerDay} / Daily Cycle</p>
                        </div>
                     </div>
                     
                     <div className="flex gap-12 text-center sm:text-right">
                        <div>
                           <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-2 italic">Auth Status</p>
                           <span className="text-[10px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-sm">Active</span>
                        </div>
                        <div>
                           <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-2 italic">Propulsion</p>
                           <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">{car.type}</span>
                        </div>
                     </div>
                  </div>
                ))
              ) : (
                <div className="py-40 text-center border border-white/5 border-dashed rounded-[40px]">
                   <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/10 italic leading-loose">
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
