import dbConnect from '@/lib/mongodb'
import Car from '@/models/Car'
import Link from 'next/link'
import FleetDiscoveryEngine from './FleetDiscoveryEngine'

export const dynamic = 'force-dynamic'

export default async function FleetPage({ searchParams }) {
  const params = await searchParams
  const { search, type, sort } = params

  await dbConnect()
  
  // Build Query
  let query = { isAvailable: true }
  if (type) query.type = type
  if (search) {
    query.$or = [
      { brand: { $regex: search, $options: 'i' } },
      { model: { $regex: search, $options: 'i' } }
    ]
  }

  // Build Sort
  let sortOption = { createdAt: -1 }
  if (sort === 'price-low') sortOption = { pricePerDay: 1 }
  if (sort === 'price-high') sortOption = { pricePerDay: -1 }
  if (sort === 'hp-high') sortOption = { horsepower: -1 }
  if (sort === 'speed-high') sortOption = { topSpeed: -1 }

  const cars = await Car.find(query).sort(sortOption)

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white pt-32 px-6 pb-20 relative">
      {/* Background glow ambient */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
      
      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
             <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-purple">Strategic Reserve</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold uppercase tracking-tight mb-4 font-display">
            The <span className="text-gradient font-display">Fleet</span>
          </h1>
          <p className="text-zinc-400 max-w-2xl text-sm font-medium tracking-wide leading-relaxed font-sans">
            Select your instrument of performance. Our curated collection represents the 
            pinnacle of automotive engineering and luxury craftsmanship.
          </p>
        </header>

        {/* Discovery Engine (Filters/Search/Sort) */}
        <FleetDiscoveryEngine />

        {/* Grid */}
        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {cars.map((car) => (
              <VehicleCard key={car._id.toString()} car={car} />
            ))}
          </div>
        ) : (
          <div className="py-40 text-center glass-panel border border-white/5 border-dashed">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 italic font-display">
                Zero units match your current discovery parameters.
             </p>
          </div>
        )}
      </div>
    </div>
  )
}

function VehicleCard({ car }) {
  return (
    <div className="group relative glass-panel glass-panel-hover overflow-hidden rounded-2xl">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 to-transparent z-10 opacity-60"></div>
        <img 
          src={car.imageUrl} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-6 right-6 z-20">
          <span className="bg-gradient-to-r from-brand-indigo to-brand-purple text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-lg shadow-xl font-display">
            {car.type}
          </span>
        </div>
      </div>

      <div className="p-8 relative z-20">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.3em] mb-1 font-display">{car.brand}</p>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-white group-hover:text-brand-purple transition-colors font-display">
              {car.model}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold tracking-tight text-white font-display">${car.pricePerDay}</p>
            <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Per Cycle</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-5 mb-8">
          <SpecItem label="HP" value={car.horsepower} />
          <SpecItem label="Top Speed" value={`${car.topSpeed} KM/H`} />
          <SpecItem label="Shift" value={car.transmission === 'Automatic' ? 'AUTO' : 'MAN'} />
        </div>

        <Link 
          href={`/fleet/${car._id}`}
          className="block w-full py-3.5 bg-gradient-to-r from-brand-indigo/10 to-brand-purple/10 border border-brand-indigo/35 text-center text-[10px] font-black uppercase tracking-[0.2em] text-white hover:from-brand-indigo hover:to-brand-purple rounded-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(99,102,241,0.25)] hover:text-white"
        >
          Request Reservation
        </Link>
      </div>

      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-brand-purple/5 rounded-full blur-[80px] group-hover:bg-brand-purple/10 transition-colors duration-300"></div>
    </div>
  )
}

function SpecItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-1 font-display">{label}</span>
      <span className="text-xs font-bold text-zinc-200 tracking-tight">{value}</span>
    </div>
  )
}
