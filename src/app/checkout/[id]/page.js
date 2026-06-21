import dbConnect from '@/lib/mongodb'
import Reservation from '@/models/Reservation'
import '@/models/Car'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import CheckoutForm from './CheckoutForm'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export default async function CheckoutPage({ params }) {
  const { id } = await params
  
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect(`/login?callbackUrl=/checkout/${id}`)
  }

  await dbConnect()
  const reservation = await Reservation.findById(id).populate('car')

  if (!reservation) {
    notFound()
  }

  if (reservation.user.toString() !== session.user.id) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-brand-purple/5 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
             <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">Secure Gateway</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold uppercase tracking-tight font-display">
            Authorize <span className="text-gradient font-display">Transaction</span>
          </h1>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Functional Payment Simulation */}
          <div className="lg:col-span-7 space-y-8">
            <CheckoutForm reservationId={id} totalPrice={reservation.totalPrice} />
            
            <p className="text-[9px] text-zinc-500 font-bold leading-relaxed uppercase tracking-wider px-4 font-sans">
              By authorizing this transaction, you agree to the DriveNow performance contract and temporary liability waiver. Funds will be held in prioritized escrow.
            </p>
          </div>

          {/* Right: Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel border border-white/5 overflow-hidden shadow-2xl text-left bg-zinc-950/80 rounded-2xl">
               <div className="aspect-video relative">
                  <img src={reservation.car.imageUrl} alt={reservation.car.model} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 to-transparent"></div>
                  <div className="absolute bottom-6 left-8">
                     <p className="text-[9px] font-bold text-brand-purple uppercase tracking-widest mb-1 font-display">{reservation.car.brand}</p>
                     <h4 className="text-2xl font-bold uppercase tracking-tight text-white font-display">{reservation.car.model}</h4>
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
                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 font-display">Total Authorization</p>
                        <p className="text-4xl font-black italic tracking-tighter text-white font-display">${reservation.totalPrice}</p>
                     </div>
                     <span className="text-[10px] font-black text-brand-purple uppercase tracking-widest border border-brand-purple/20 px-3 py-1 rounded-lg">USD</span>
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
    <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest font-sans">
       <span className="text-zinc-500">{label}</span>
       <span className="text-zinc-300">{value}</span>
    </div>
  )
}
