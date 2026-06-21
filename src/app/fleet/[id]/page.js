import dbConnect from '@/lib/mongodb'
import Car from '@/models/Car'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import ReservationForm from './ReservationForm'
import { getCarReviews } from '@/lib/actions/review'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export default async function CarDetailPage({ params }) {
  const { id } = await params
  
  // Require login to request a reservation
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/login?callbackUrl=/fleet/${id}`)
  }

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
    <div className="flex flex-col min-h-screen bg-[#030303] text-[#f4f4f5] pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background Neon Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-[1400px] mx-auto w-full relative z-10">
        <Link href="/fleet" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors mb-12 font-display">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Return to fleet
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: Image & Technical Specs */}
          <div className="lg:col-span-8 space-y-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-brand-purple/20 to-transparent blur opacity-25 group-hover:opacity-40 transition-opacity rounded-2xl"></div>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/5 glass-panel shadow-2xl">
                <img 
                  src={car.imageUrl} 
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <TechnicalSpec label="Horsepower" value={`${car.horsepower} HP`} />
              <TechnicalSpec label="Max Velocity" value={`${car.topSpeed} KM/H`} />
              <TechnicalSpec label="Transmission" value={car.transmission.toUpperCase()} />
              <TechnicalSpec label="Propulsion" value={car.type.toUpperCase()} />
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight font-display">Machine <span className="text-gradient font-display">Summary</span></h2>
              <p className="text-zinc-400 font-medium leading-relaxed tracking-wide max-w-3xl font-sans">
                The {car.brand} {car.model} is a masterpiece of precision engineering. From its high-revving power unit to its carbon-composite aerodynamics, every attribute is calibrated for the ultimate driving experience. Available now for prioritized members.
              </p>
            </div>
          </div>

          {/* Right: Booking Panel */}
          <div className="lg:col-span-4 space-y-8 sticky top-32">
            <div className="mb-8">
              <span className="text-[10px] font-bold text-brand-purple uppercase tracking-[0.3em] mb-2 block font-display">{car.brand}</span>
              <h1 className="text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-4 font-display leading-none">{car.model}</h1>
              <div className="flex items-center gap-4 mt-4">
                 <div className="flex items-end gap-2">
                    <span className="text-3xl font-black italic text-white font-display">${car.pricePerDay}</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] pb-1 font-display">Per Cycle</span>
                 </div>
                 {averageRating && (
                   <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                      <span className="text-brand-purple text-lg font-black italic font-display">★ {averageRating}</span>
                      <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-sans">({reviews.length} Logs)</span>
                   </div>
                 )}
              </div>
            </div>

            <ReservationForm carId={car._id.toString()} pricePerDay={car.pricePerDay} />
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-28 border-t border-white/5 pt-20">
            <header className="mb-16 text-center lg:text-left">
               <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                  <span className="h-[1px] w-8 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-purple font-display">Social Proof</span>
               </div>
               <h2 className="text-4xl font-extrabold uppercase tracking-tight font-display">Community <span className="text-gradient font-display">Feedback</span></h2>
            </header>

            {reviews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {reviews.map((review) => (
                   <div key={review._id.toString()} className="p-8 glass-panel border border-white/5 rounded-2xl relative overflow-hidden group shadow-md hover:border-brand-purple/20 transition-all duration-300">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      
                      <div className="flex justify-between items-start mb-6 relative z-10">
                         <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-white/60 mb-1 font-display">{review.user?.name || 'Authorized Member'}</p>
                            <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-[0.3em] italic font-sans">Identity Verified</p>
                         </div>
                         <span className="text-brand-purple font-black italic font-display">★ {review.rating}</span>
                      </div>
                      <p className="text-sm font-medium text-zinc-400 leading-relaxed italic relative z-10 group-hover:text-zinc-200 transition-colors font-sans">
                         &quot;{review.comment}&quot;
                      </p>
                   </div>
                 ))}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center border border-white/5 border-dashed rounded-3xl glass-panel bg-zinc-950/20">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 italic text-center leading-loose font-display">
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
    <div className="glass-panel p-6 border border-white/5 text-center bg-zinc-950/60 shadow-md">
      <span className="block text-[8px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-3 font-display">{label}</span>
      <span className="text-lg font-black italic tracking-tighter text-white uppercase font-display">{value}</span>
    </div>
  )
}
