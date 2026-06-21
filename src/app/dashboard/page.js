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
import { redirect } from "next/navigation"

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
    <div className="flex flex-col min-h-screen bg-[#030303] text-white pt-32 px-6 relative pb-20 overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <header className="mb-12 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
               <span className="h-[1px] w-8 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
               <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">
                 {userRole === 'owner' ? 'Fleet Commander' : 'Member Command Center'}
               </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold uppercase tracking-tight font-display">
              Welcome, <span className="text-gradient font-display">{user?.name || user?.email?.split('@')[0]}</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <Link 
              href="/dashboard/settings"
              className="inline-flex items-center justify-center gap-3 px-6 py-2.5 glass-panel border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:border-brand-purple/30 transition-all duration-300 font-display"
            >
              Identity Configuration
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {userRole === 'owner' ? (
                  <DashboardCard title="Active Fleet Units" value={dashboardData.ownedCars.length} detail="Operational Assets" />
                ) : (
                  <DashboardCard title="Active Reservations" value={dashboardData.reservations.length} detail="Lifetime Activity" />
                )}
             </div>

             <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden bg-zinc-950/60">
                <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-[#09090b]/80">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-purple font-display">
                     {userRole === 'owner' ? 'Inbound Operations Manifest' : 'Fleet Operations Log'}
                   </h3>
                   <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Real-time Updates</span>
                </div>
                
                {dashboardData.reservations.length > 0 ? (
                  <div className="divide-y divide-white/5">
                    {dashboardData.reservations.map((res) => (
                      <div key={res._id.toString()} className="p-6 md:p-8 flex flex-col sm:flex-row justify-between items-center gap-6 group hover:bg-white/[0.01] transition-colors duration-300 relative">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-brand-purple/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                        <div className="flex items-center gap-6">
                           <div className="w-20 h-12 bg-zinc-900 rounded-lg overflow-hidden border border-white/5 grayscale group-hover:grayscale-0 transition-all duration-500 relative">
                              <img src={res.car?.imageUrl || '/images/hero-car.png'} alt={res.car?.model || 'Decommissioned Unit'} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-display">{res.car?.brand || 'Platform Unit'}</p>
                              <h4 className="text-lg font-bold uppercase tracking-tight text-white font-display group-hover:text-brand-purple transition-colors duration-300">{res.car?.model || 'DECOMMISSIONED'}</h4>
                              {userRole === 'owner' && (
                                <p className="text-[9px] text-brand-purple/70 font-medium mt-1 font-sans">Renter: {res.user?.email}</p>
                              )}
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-8 text-center sm:text-left items-center relative z-10">
                           <div className="w-24">
                              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1 font-display">Status</p>
                              <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full font-display border ${
                                res.status === 'Pending' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' : 
                                res.status === 'Confirmed' ? 'bg-green-500/5 text-green-400 border-green-500/10' :
                                'bg-red-500/5 text-red-400 border-red-500/10'
                              }`}>
                                {res.status}
                              </span>
                           </div>
                           <div className="w-32">
                              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1.5 font-display">Cycle</p>
                              <p className="text-[10px] font-bold text-zinc-300 tracking-tight">
                                {new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}
                              </p>
                           </div>
                           <div className="w-20">
                              <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest mb-1.5 font-display">Total</p>
                              <p className="text-sm font-black text-brand-purple tracking-tight font-display">${res.totalPrice}</p>
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
                               className="px-4 py-2 bg-white/5 border border-white/5 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-white/10 hover:border-brand-purple/20 transition-all flex items-center gap-2 font-display"
                             >
                                <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                   className="px-4 py-2 bg-gradient-to-r from-brand-indigo to-brand-purple text-[9px] font-black uppercase tracking-widest rounded-xl hover:shadow-[0_0_15px_rgba(99,102,241,0.35)] transition-all text-white font-display"
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
                    <span className="text-zinc-600 font-bold uppercase tracking-widest text-xs font-display">No Operations Logged</span>
                  </div>
                )}
             </div>
          </div>

          <div className="space-y-6 bg-transparent">
             <div className="p-8 glass-panel bg-zinc-950/60 border border-white/5 rounded-2xl">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-8 font-display">Role Attributes</h3>
                <div className="space-y-4 mb-8">
                   <ProfileItem label="Identity Status" value={user?.verificationStatus || 'Unverified'} 
                     color={
                       user?.verificationStatus === 'Verified' ? 'text-green-500' : 
                       user?.verificationStatus === 'Pending' ? 'text-amber-500' : 
                       'text-red-500/50'
                     } 
                   />
                   <ProfileItem label="Assigned Role" value={userRole.toUpperCase()} color="text-brand-purple" />
                </div>
                
                <Link 
                  href="/dashboard/settings"
                  className="block w-full py-3 bg-white/5 border border-white/5 text-center text-[9px] font-black uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/10 transition-all rounded-xl font-display"
                >
                  Manage Attributes
                </Link>
             </div>
             
             {userRole === 'owner' ? (
                <Link href="/dashboard/fleet" className="block w-full py-4.5 bg-white text-black font-black uppercase text-xs tracking-wider rounded-2xl hover:bg-gradient-to-r hover:from-brand-indigo hover:to-brand-purple hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.03)] text-center font-display cursor-pointer">
                   Manage My Fleet
                </Link>
             ) : (
                <Link href="/fleet" className="block w-full py-4.5 bg-white text-black font-black uppercase text-xs tracking-wider rounded-2xl hover:bg-gradient-to-r hover:from-brand-indigo hover:to-brand-purple hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.03)] text-center font-display cursor-pointer">
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
    <div className="group p-8 glass-panel glass-panel-hover overflow-hidden rounded-2xl bg-zinc-950/60 shadow-lg relative border border-white/5 hover:border-brand-purple/20 transition-all duration-300">
       <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
       <h3 className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-8 group-hover:text-brand-purple transition-colors font-display">{title}</h3>
       <p className="text-5xl font-black italic tracking-tighter mb-2 font-display transition-transform duration-300 group-hover:translate-x-1">{value}</p>
       <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest font-sans">{detail}</p>
    </div>
  )
}

function ProfileItem({ label, value, color = "text-zinc-400" }) {
  return (
    <div className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
       <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500 font-display">{label}</span>
       <span className={`text-[10px] font-bold uppercase tracking-wider font-display ${color}`}>{value}</span>
    </div>
  )
}
