import dbConnect from "@/lib/mongodb"
import Reservation from "@/models/Reservation"
import "@/models/User"
import "@/models/Car"
import ReservationStatusControl from "./ReservationStatusControl"

export const dynamic = 'force-dynamic'

export default async function AdminReservations() {
  await dbConnect()
  
  const reservations = await Reservation.find({})
    .populate('user')
    .populate('car')
    .sort({ createdAt: -1 })

  return (
    <div className="pt-32 px-10 pb-20">
      <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
             <span className="h-[1px] w-12 bg-indigo-500"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500">Fleet Operations</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter">
            Reservation <span className="text-indigo-600">Manifest</span>
          </h1>
      </header>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="border-b border-white/5 bg-white/[0.01]">
                  <tr>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Member</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Unit</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Cycle</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Status</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {reservations.map((res) => (
                    <tr key={res._id.toString()} className="hover:bg-white/[0.01] transition-colors group">
                       <td className="p-6">
                          <p className="text-sm font-bold text-white">{res.user?.name || 'N/A'}</p>
                          <p className="text-[10px] text-white/30 uppercase tracking-tight">{res.user?.email}</p>
                       </td>
                       <td className="p-6">
                          <p className="text-sm font-bold text-white uppercase italic">{res.car?.model}</p>
                          <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">{res.car?.brand}</p>
                       </td>
                       <td className="p-6">
                          <p className="text-[10px] font-mono text-white/50">
                             {new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}
                          </p>
                          <p className="text-xs font-black text-white/80 mt-1">${res.totalPrice}</p>
                       </td>
                       <td className="p-6">
                          <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-sm ${
                             res.status === 'Confirmed' ? 'bg-green-500/10 text-green-500' :
                             res.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                             'bg-red-500/10 text-red-500'
                          }`}>
                             {res.status}
                          </span>
                       </td>
                       <td className="p-6 text-right">
                          <ReservationStatusControl id={res._id.toString()} currentStatus={res.status} />
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  )
}
