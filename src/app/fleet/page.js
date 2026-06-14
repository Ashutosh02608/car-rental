import dbConnect from '@/lib/mongodb'
import Car from '@/models/Car'
import Link from 'next/link'
import FleetDiscoveryEngine from './FleetDiscoveryEngine'

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
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
             <span className="h-[1px] w-12 bg-indigo-500"></span>
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500">Strategic Reserve</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter mb-4">
            The <span className="text-indigo-600">Fleet</span>
          </h1>
          <p className="text-white/40 max-w-2xl text-sm font-medium tracking-wide leading-relaxed">
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
          <div className="py-40 text-center border border-white/5 border-dashed rounded-3xl">
             <p className="text-[11px] font-black uppercase tracking-[0.4em] text-white/20 italic">
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
    <div className="group relative bg-[#0a0a0a] border border-white/5 overflow-hidden transition-all duration-300 hover:border-indigo-500/30">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10 opacity-60"></div>
        <img 
          src={car.imageUrl} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-6 right-6 z-20">
          <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-sm shadow-xl">
            {car.type}
          </span>
        </div>
      </div>

      <div className="p-8 relative z-20">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.3em] mb-1">{car.brand}</p>
            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white group-hover:text-indigo-500 transition-colors">
              {car.model}
            </h3>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black italic tracking-tighter text-white">${car.pricePerDay}</p>
            <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Per Cycle</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-6 mb-8">
          <SpecItem label="HP" value={car.horsepower} />
          <SpecItem label="Top Speed" value={`${car.topSpeed} KM/H`} />
          <SpecItem label="Shift" value={car.transmission === 'Automatic' ? 'AUTO' : 'MAN'} />
        </div>

        <Link 
          href={`/fleet/${car._id}`}
          className="block w-full py-4 bg-white/5 border border-white/10 text-center text-[11px] font-black uppercase tracking-[0.3em] text-white hover:bg-white hover:text-black transition-all duration-200"
        >
          Request Reservation
        </Link>
      </div>

      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/5 rounded-full blur-[80px] group-hover:bg-indigo-600/10 transition-colors duration-300"></div>
    </div>
  )
}

function SpecItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{label}</span>
      <span className="text-xs font-bold text-white/80 tracking-tight">{value}</span>
    </div>
  )
}
