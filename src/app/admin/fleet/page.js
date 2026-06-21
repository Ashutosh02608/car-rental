import dbConnect from "@/lib/mongodb"
import Car from "@/models/Car"
import FleetManagerControl from "@/components/FleetManagerControl"

export default async function AdminFleet() {
  await dbConnect()
  const cars = await Car.find({}).sort({ createdAt: -1 })

  return (
    <div className="pt-32 px-6 lg:px-10 pb-20 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full">
        <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
               <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">Strategic Assets</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold uppercase tracking-tight font-display">
              Fleet <span className="text-gradient font-display">Inventory</span>
            </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           {/* Add New Unit */}
           <div className="lg:col-span-4">
              <div className="glass-panel border border-white/5 p-8 rounded-2xl sticky top-32 bg-zinc-950/65 shadow-2xl">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-8 font-display">Commission New Unit</h3>
                 <FleetManagerControl />
              </div>
           </div>

           {/* Unit List */}
           <div className="lg:col-span-8 space-y-4">
              <div className="glass-panel border border-white/5 rounded-xl overflow-hidden text-[9px] font-black uppercase tracking-widest text-zinc-500 p-4 flex justify-between px-8 bg-zinc-950/40 font-display">
                 <span>Asset Details</span>
                 <span>Operational Status</span>
              </div>
              {cars.map((car) => (
                <VehicleEntry key={car._id.toString()} car={car} />
              ))}
              {cars.length === 0 && (
                <div className="p-12 glass-panel text-center text-zinc-500 font-bold uppercase tracking-widest text-xs font-display">
                  No Vehicles in Inventory
                </div>
              )}
           </div>
        </div>
      </div>
    </div>
  )
}

function VehicleEntry({ car }) {
  return (
    <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex justify-between items-center group shadow-md border border-white/5 hover:border-brand-purple/20 transition-all duration-300 relative">
       {/* Small color splash glow inside card on hover */}
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
       
       <div className="flex items-center gap-8">
          <div className="text-right">
             <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1 font-display">Status</p>
             <span className="text-[9px] font-black text-green-400 uppercase font-display border border-green-500/10 px-2.5 py-0.5 rounded-md bg-green-500/5">Active</span>
          </div>
       </div>
    </div>
  )
}

