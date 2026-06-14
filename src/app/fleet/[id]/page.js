import dbConnect from '@/lib/mongodb'
import Car from '@/models/Car'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReservationForm from './ReservationForm'
import { getCarReviews } from '@/lib/actions/review'

export const dynamic = 'force-dynamic'

export default async function CarDetailPage({ params }) {
  const { id } = await params
  
  await dbConnect()
  const car = await Car.findById(id)

  if (!car) {
    notFound()
  }

  const { reviews = [] } = await getCarReviews(id)
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background Neon Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <Link href="/fleet" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-indigo-500 transition-colors mb-12">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Return to fleet
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Image & Technical Specs */}
          <div className="lg:col-span-8 space-y-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600/20 to-transparent blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <div className="relative aspect-video rounded-sm overflow-hidden border border-white/5">
                <img 
                  src={car.imageUrl} 
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
              <TechnicalSpec label="Horsepower" value={`${car.horsepower} HP`} />
              <TechnicalSpec label="Max Velocity" value={`${car.topSpeed} KM/H`} />
              <TechnicalSpec label="Transmission" value={car.transmission.toUpperCase()} />
              <TechnicalSpec label="Propulsion" value={car.type.toUpperCase()} />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Machine <span className="text-indigo-500">Summary</span></h2>
              <p className="text-white/40 font-medium leading-relaxed tracking-wide max-w-3xl">
                The {car.brand} {car.model} is a masterpiece of precision engineering. From its high-revving power unit to its carbon-composite aerodynamics, every attribute is calibrated for the ultimate driving experience. Available now for prioritized members.
              </p>
            </div>
          </div>

          {/* Right: Booking Panel */}
          <div className="lg:col-span-4 space-y-8 sticky top-32">
            <div className="mb-8">
              <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-[0.4em] mb-2 block">{car.brand}</span>
              <h1 className="text-5xl font-black uppercase italic tracking-tighter mb-4">{car.model}</h1>
              <div className="flex items-center gap-4">
                 <div className="flex items-end gap-2">
                   <span className="text-4xl font-black italic text-white">${car.pricePerDay}</span>
                   <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] pb-1">Per 24H Cycle</span>
                 </div>
                 {averageRating && (
                   <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                      <span className="text-indigo-500 text-lg font-black italic">★ {averageRating}</span>
                      <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">({reviews.length} Units)</span>
                   </div>
                 )}
              </div>
            </div>

            <ReservationForm carId={car._id.toString()} pricePerDay={car.pricePerDay} />
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-32 border-t border-white/5 pt-20">
           <header className="mb-16 text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                 <span className="h-[1px] w-8 bg-indigo-500"></span>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Social Proof</span>
              </div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">Community <span className="text-indigo-500">Feedback</span></h2>
           </header>

           {reviews.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review) => (
                  <div key={review._id.toString()} className="p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl relative overflow-hidden group">
                     <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1">{review.user?.name || 'Authorized Member'}</p>
                           <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.3em] italic">Identity Verified</p>
                        </div>
                        <span className="text-indigo-500 font-black italic">★ {review.rating}</span>
                     </div>
                     <p className="text-sm font-medium text-white/40 leading-relaxed italic relative z-10 group-hover:text-white/60 transition-colors">
                        &quot;{review.comment}&quot;
                     </p>
                     <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-600/5 rounded-full blur-3xl"></div>
                  </div>
                ))}
             </div>
           ) : (
             <div className="h-48 flex items-center justify-center border border-white/5 border-dashed rounded-3xl">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 italic text-center leading-loose">
                   No technical testimonials logged <br /> for this specific unit yet.
                </p>
             </div>
           )}
        </section>
      </div>
    </div>
  )
}

function TechnicalSpec({ label, value }) {
  return (
    <div className="bg-[#0a0a0a] p-8 border border-white/5 text-center">
      <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-white/20 mb-3">{label}</span>
      <span className="text-lg font-black italic tracking-tighter text-white uppercase">{value}</span>
    </div>
  )
}
