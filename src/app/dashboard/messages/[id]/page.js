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
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20">
      <div className="max-w-5xl mx-auto w-full">
        {/* Thread Header */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-indigo-500 transition-colors mb-12">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Return to command center
        </Link>

        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div>
            <div className="flex items-center gap-4 mb-4">
               <span className="h-[1px] w-12 bg-indigo-500"></span>
               <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500">Communication Node</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter mb-4">
              Secure <span className="text-indigo-600">Thread</span>
            </h1>
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest">
              Topic: {reservation.car.brand} {reservation.car.model} / Cycle {new Date(reservation.startDate).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-6">
             <div className="text-right">
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Participants</p>
                <p className="text-xs font-bold text-white/80 uppercase">
                  {isRenter ? 'Owner Concierge' : `Renter: ${reservation.user.email.split('@')[0]}`}
                </p>
             </div>
             <div className="w-12 h-12 bg-white/5 border border-white/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09a10.116 10.116 0 001.283-3.562L7 12V4.41a1 1 0 01.293-.707l2.828-2.828a1 1 0 011.414 0L14.343 3.7a1 1 0 01.293.707V12l-1.077 3.077a10.114 10.114 0 001.283 3.562l.054.09z" />
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

        <div className="mt-8 flex items-center justify-center gap-8 opacity-20 grayscale">
            <span className="text-[8px] font-black uppercase tracking-widest italic">End-to-End Encrypted</span>
            <span className="text-[8px] font-black uppercase tracking-widest italic">Server Logs Isolated</span>
        </div>
      </div>
    </div>
  )
}
