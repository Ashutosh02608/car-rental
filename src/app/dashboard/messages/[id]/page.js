import dbConnect from "@/lib/mongodb"
import Reservation from "@/models/Reservation"
import Message from "@/models/Message"
import "@/models/Car"
import "@/models/User"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { notFound, redirect } from "next/navigation"
import MessageList from "./MessageList"
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function MessagePage({ params }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  await dbConnect()
  const reservation = await Reservation.findById(id).populate('user car')
  if (!reservation) notFound()

  // Authorization check
  const isRenter = reservation.user._id.toString() === session.user.id
  const isOwner = reservation.car.owner.toString() === session.user.id

  if (!isRenter && !isOwner) {
    redirect('/dashboard')
  }

  const initialMessages = await Message.find({ reservation: id }).sort({ createdAt: 1 })

  return (
    <div className="flex flex-col min-h-screen bg-[#030303] text-white pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Thread Header */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors mb-12 font-display">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Return to commander
        </Link>

        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">Communication Node</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold uppercase tracking-tight mb-4 font-display">
              Secure <span className="text-gradient font-display">Thread</span>
            </h1>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest font-sans">
              Topic: {reservation.car?.brand} {reservation.car?.model} / Cycle {new Date(reservation.startDate).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1.5 font-display">Participants</p>
                <p className="text-xs font-bold text-zinc-300 uppercase font-sans">
                  {isRenter ? 'Owner Concierge' : `Renter: ${reservation.user.email.split('@')[0]}`}
                </p>
             </div>
             <div className="w-12 h-12 bg-zinc-950/60 border border-white/5 rounded-xl flex items-center justify-center text-brand-purple shadow-lg">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
             </div>
          </div>
        </header>

        {/* Messaging Interface */}
        <MessageList 
          reservationId={id} 
          initialMessages={JSON.parse(JSON.stringify(initialMessages))} 
          currentUserId={session.user.id} 
        />

        <div className="mt-8 flex items-center justify-center gap-8 opacity-10">
            <span className="text-[8px] font-black uppercase tracking-widest italic font-display">End-to-End Encrypted</span>
            <span className="text-[8px] font-black uppercase tracking-widest italic font-display">Server Logs Isolated</span>
        </div>
      </div>
    </div>
  )
}
