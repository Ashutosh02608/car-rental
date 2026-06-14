import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import Car from "@/models/Car"
import Reservation from "@/models/Reservation"

export default async function AdminDashboard() {
  await dbConnect()
  
  const [totalUsers, totalCars, totalReservations, pendingReservations] = await Promise.all([
    User.countDocuments({}),
    Car.countDocuments({}),
    Reservation.countDocuments({}),
    Reservation.countDocuments({ status: 'Pending' })
  ])

  const revenue = await Reservation.aggregate([
    { $match: { status: 'Confirmed' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } }
  ])

  return (
    <div className="pt-32 px-10 pb-20">
      <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
             <span className="h-[1px] w-12 bg-indigo-500"></span>
             <span className="text-[11px] font-black uppercase tracking-[0.5em] text-indigo-500">Global Telemetry</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black uppercase italic tracking-tighter">
            Platform <span className="text-indigo-600">Analytics</span>
          </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
         <AnalyticsCard title="Authorized Users" value={totalUsers} detail="Member Base" />
         <AnalyticsCard title="Fleet Units" value={totalCars} detail="Operational Assets" />
         <AnalyticsCard title="Confirmed Revenue" value={`$${revenue[0]?.total || 0}`} detail="Escrow Value" />
         <AnalyticsCard title="Pending Review" value={pendingReservations} detail="Queue Depth" color="text-amber-500" />
      </div>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-12 flex items-center justify-center h-96">
         <div className="text-center opacity-20 grayscale">
            <div className="w-20 h-[1px] bg-white mx-auto mb-8"></div>
            <p className="font-black uppercase italic tracking-[0.5em] text-sm">Visual Telemetry Offline</p>
            <p className="text-[10px] mt-4 font-bold uppercase tracking-widest leading-relaxed">
               Waiting for localized <br /> data synchronization
            </p>
         </div>
      </div>
    </div>
  )
}

function AnalyticsCard({ title, value, detail, color = "text-white" }) {
  return (
    <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl hover:border-indigo-500/30 transition-all group">
       <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-8 group-hover:text-indigo-500 transition-colors">{title}</h3>
       <p className={`text-5xl font-black italic tracking-tighter mb-2 ${color}`}>{value}</p>
       <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{detail}</p>
    </div>
  )
}
