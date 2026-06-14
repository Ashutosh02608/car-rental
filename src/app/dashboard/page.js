import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/mongodb"
import Reservation from "@/models/Reservation"
import User from "@/models/User"
import Car from "@/models/Car"
import Review from "@/models/Review"
import "@/models/Car"
import "@/models/User"
import Link from 'next/link'
import ReservationStatusControl from "@/app/admin/reservations/ReservationStatusControl"
import ReviewAction from "./ReviewAction"

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }
  const userRole = session?.user?.role || 'renter'
  const userId = session?.user?.id

  await dbConnect()

  const user = await User.findById(userId)

  let dashboardData = {
    reservations: [],
    ownedCars: [],
    totalRevenue: 0,
    reviewedReservationIds: []
  }

  if (userRole === 'owner') {
    // Owner: See reservations on their cars
    dashboardData.ownedCars = await Car.find({ owner: userId })
    const ownedCarIds = dashboardData.ownedCars.map(car => car._id)
    dashboardData.reservations = await Reservation.find({ car: { $in: ownedCarIds } })
      .populate('user')
      .populate('car')
      .sort({ createdAt: -1 })

    dashboardData.totalRevenue = dashboardData.reservations
      .filter(res => res.status === 'Confirmed')
      .reduce((sum, res) => sum + res.totalPrice, 0)

  } else {
    // Renter: See their own reservations
    dashboardData.reservations = await Reservation.find({ user: userId })
      .populate('car')
      .sort({ createdAt: -1 })

    const userReviews = await Review.find({ user: userId })
    dashboardData.reviewedReservationIds = userReviews.map(r => r.reservation.toString())
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pt-32 px-6">
      <div className="max-w-7xl mx-auto w-full relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>

        <header className="mb-12 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
               <span className="h-[1px] w-8 bg-indigo-500"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">
                 {userRole === 'owner' ? 'Fleet Commander' : 'Member Command Center'}
               </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter">
              Welcome, {user?.name || user?.email?.split('@')[0]}
            </h1>
          </div>
          
          <div className="flex gap-4">
            <Link 
              href="/dashboard/settings"
              className="inline-flex items-center justify-center gap-3 px-8 py-3 bg-white/[0.03] border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/[0.08] transition-all group"
            >
              Identity Configuration
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
          <div className="lg:col-span-2 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {userRole === 'owner' ? (
                  <DashboardCard title="Active Fleet Units" value={dashboardData.ownedCars.length} detail="Operational Assets" />
                ) : (
                  <DashboardCard title="Active Reservations" value={dashboardData.reservations.length} detail="Lifetime Activity" />
                )}
             </div>

             <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                <div className="p-8 border-b border-white/5 flex justify-between items-center">
                   <h3 className="text-xs font-black uppercase tracking-[0.3em] text-indigo-500">
                     {userRole === 'owner' ? 'Inbound Operations Manifest' : 'Fleet Operations Log'}
                   </h3>
                   <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Real-time Telemetry</span>
                </div>
                
                {dashboardData.reservations.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {dashboardData.reservations.map((res) => (
                      <div key={res._id.toString()} className="p-8 flex flex-col sm:flex-row justify-between items-center gap-6 group hover:bg-white/[0.01] transition-colors">
                        <div className="flex items-center gap-6">
                           <div className="w-20 h-12 bg-zinc-900 rounded-lg overflow-hidden border border-white/5 grayscale group-hover:grayscale-0 transition-all">
                              <img src={res.car.imageUrl} alt={res.car.model} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{res.car.brand}</p>
                              <h4 className="text-lg font-black uppercase italic tracking-tighter text-white">{res.car.model}</h4>
                              {userRole === 'owner' && (
                                <p className="text-[9px] text-indigo-500/50 font-bold uppercase mt-1 italic">Renter: {res.user?.email}</p>
                              )}
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-8 text-center sm:text-left items-center">
                           <div className="w-24">
                              <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Status</p>
                              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                                res.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 
                                res.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' :
                                'bg-red-500/10 text-red-500'
                              }`}>
                                {res.status}
                              </span>
                           </div>
                           <div className="w-32">
                              <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Cycle</p>
                              <p className="text-[10px] font-bold text-white/70 uppercase tracking-tighter">
                                {new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}
                              </p>
                           </div>
                           <div className="w-20">
                              <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Total</p>
                              <p className="text-[11px] font-black text-indigo-500 tracking-tighter">${res.totalPrice}</p>
                           </div>
                           
                           <div className="flex gap-2">
                             {userRole === 'renter' && (res.status === 'Confirmed' || res.status === 'Completed') && (
                               <ReviewAction 
                                 reservationId={res._id.toString()} 
                                 isReviewed={dashboardData.reviewedReservationIds.includes(res._id.toString())} 
                               />
                             )}

                             <Link 
                               href={`/dashboard/messages/${res._id}`}
                               className="px-4 py-2 bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-white/10 transition-all flex items-center gap-2"
                             >
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                                Message
                             </Link>
                             
                             {userRole === 'owner' ? (
                               <div className="flex justify-end">
                                 <ReservationStatusControl id={res._id.toString()} currentStatus={res.status} />
                               </div>
                             ) : (
                               res.status === 'Pending' && (
                                 <Link 
                                   href={`/checkout/${res._id}`}
                                   className="px-4 py-2 bg-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-500 transition-all"
                                 >
                                   Pay Now
                                 </Link>
                               )
                             )}
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center">
                    <span className="text-white/20 font-black uppercase italic tracking-widest text-sm italic">No Operations Logged</span>
                  </div>
                )}
             </div>
          </div>

          <div className="space-y-6">
             <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-8">Role Attributes</h3>
                <div className="space-y-4 mb-8">
                   <ProfileItem label="Identity Status" value={user?.verificationStatus || 'Unverified'} 
                     color={
                       user?.verificationStatus === 'Verified' ? 'text-green-500' : 
                       user?.verificationStatus === 'Pending' ? 'text-amber-500' : 
                       'text-red-500/50'
                     } 
                   />
                   <ProfileItem label="Assigned Role" value={userRole.toUpperCase()} color="text-indigo-500" />
                </div>
                
                <Link 
                  href="/dashboard/settings"
                  className="block w-full py-3 bg-white/5 border border-white/5 text-center text-[9px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white hover:bg-white/10 transition-all rounded-lg"
                >
                  Manage Attributes
                </Link>
             </div>
             
             {userRole === 'owner' ? (
                <Link href="/dashboard/fleet" className="block w-full py-5 bg-white text-black font-black uppercase italic text-xs tracking-[0.2em] rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] text-center">
                   Manage My Fleet
                </Link>
             ) : (

                <Link href="/fleet" className="block w-full py-5 bg-white text-black font-black uppercase italic text-xs tracking-[0.2em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] text-center">
                   Access New Unit
                </Link>
             )}
          </div>
        </div>
      </div>
    </div>
  )
}

function DashboardCard({ title, value, detail }) {
  return (
    <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:bg-white/[0.02] transition-colors group">
       <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8 group-hover:text-indigo-500 transition-colors">{title}</h3>
       <p className="text-5xl font-black italic tracking-tighter mb-2">{value}</p>
       <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{detail}</p>
    </div>
  )
}

function ProfileItem({ label, value, color = "text-white/60" }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
       <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">{label}</span>
       <span className={`text-[10px] font-black uppercase tracking-wider ${color}`}>{value}</span>
    </div>
  )
}
