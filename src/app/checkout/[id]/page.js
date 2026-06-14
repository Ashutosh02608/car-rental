import dbConnect from '@/lib/mongodb'
import Reservation from '@/models/Reservation'
import '@/models/Car'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CheckoutForm from './CheckoutForm'

export const dynamic = 'force-dynamic'

export default async function CheckoutPage({ params }) {
  const { id } = await params
  
  await dbConnect()
  const reservation = await Reservation.findById(id).populate('car')

  if (!reservation) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-600/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
             <span className="h-[1px] w-12 bg-indigo-500"></span>
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500">Secure Gateway</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter">
            Authorize <span className="text-indigo-600">Transaction</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left: Functional Payment Simulation */}
          <div className="lg:col-span-7 space-y-10">
            <CheckoutForm reservationId={id} totalPrice={reservation.totalPrice} />
            
            <p className="text-[9px] text-white/20 font-medium leading-relaxed uppercase tracking-widest px-4">
              By authorizing this transaction, you agree to the DriveNow performance contract and temporary liability waiver. Funds will be held in prioritized escrow.
            </p>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl text-left">
               <div className="aspect-video relative">
                  <img src={reservation.car.imageUrl} alt={reservation.car.model} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                  <div className="absolute bottom-6 left-8">
                     <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1">{reservation.car.brand}</p>
                     <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white">{reservation.car.model}</h4>
                  </div>
               </div>

               <div className="p-8 space-y-6">
                  <div className="space-y-4">
                     <SummaryItem label="Reservation Cycle" value={`${new Date(reservation.startDate).toLocaleDateString()} - ${new Date(reservation.endDate).toLocaleDateString()}`} />
                     <SummaryItem label="Daily Rate" value={`$${reservation.car.pricePerDay}`} />
                     <SummaryItem label="Escrow Service Fee" value="$0.00" />
                  </div>

                  <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                     <div>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Total Authorization</p>
                        <p className="text-4xl font-black italic tracking-tighter text-white">${reservation.totalPrice}</p>
                     </div>
                     <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest border border-indigo-500/20 px-3 py-1 rounded-sm">USD</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SummaryItem({ label, value }) {
  return (
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
       <span className="text-white/20">{label}</span>
       <span className="text-white/60">{value}</span>
    </div>
  )
}
