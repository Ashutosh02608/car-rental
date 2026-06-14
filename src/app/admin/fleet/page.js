import dbConnect from "@/lib/mongodb"
import Car from "@/models/Car"
import FleetManagerControl from "@/components/FleetManagerControl"

export default async function AdminFleet() {
  await dbConnect()
  const cars = await Car.find({}).sort({ createdAt: -1 })

  return (
    <div className="pt-32 px-10 pb-20">
      <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
             <span className="h-[1px] w-12 bg-indigo-500"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500">Strategic Assets</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter">
            Fleet <span className="text-indigo-600">Inventory</span>
          </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         {/* Add New Unit */}
         <div className="lg:col-span-4">
            <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl sticky top-32">
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8 italic">Commission New Unit</h3>
               <FleetManagerControl />
            </div>
         </div>

         {/* Unit List */}
         <div className="lg:col-span-8 space-y-4">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden text-[10px] font-black uppercase tracking-widest text-white/20 p-4 mb-4 flex justify-between px-8">
               <span>Asset Details</span>
               <span>Operational Status</span>
            </div>
            {cars.map((car) => (
              <VehicleEntry key={car._id.toString()} car={car} />
            ))}
         </div>
      </div>
    </div>
  )
}

function VehicleEntry({ car }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl flex justify-between items-center group hover:border-indigo-500/30 transition-all">
       <div className="flex items-center gap-6">
          <div className="w-24 h-14 bg-zinc-900 rounded-lg overflow-hidden border border-white/5">
             <img src={car.imageUrl} alt={car.model} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
          </div>
          <div>
             <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{car.brand}</p>
             <h4 className="text-xl font-black uppercase italic tracking-tighter text-white">{car.model}</h4>
             <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-1">${car.pricePerDay} / Cycle</p>
          </div>
       </div>
       
       <div className="flex items-center gap-8">
          <div className="text-right">
             <p className="text-[8px] font-black text-white/20 uppercase tracking-widest mb-1">Authorization</p>
             <span className="text-[10px] font-black text-green-500 uppercase">Active</span>
          </div>
          {/* We'll add a delete button in the client component if needed, or keep it simple */}
       </div>
    </div>
  )
}
