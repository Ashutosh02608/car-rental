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
    <div className="pt-32 px-6 lg:px-10 pb-20 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full">
        <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
               <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">Fleet Operations</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold uppercase tracking-tight font-display">
              Reservation <span className="text-gradient font-display">Manifest</span>
            </h1>
        </header>

        <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden bg-zinc-950/65 shadow-2xl">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead className="border-b border-white/5 bg-[#09090b]/80">
                    <tr>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-zinc-500 font-display">Member</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-zinc-500 font-display">Unit</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-zinc-500 font-display">Cycle</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-zinc-500 font-display">Status</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-zinc-500 font-display text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {reservations.map((res) => (
                      <tr key={res._id.toString()} className="hover:bg-white/[0.01] transition-colors duration-300 group">
                         <td className="p-6">
                            <p className="text-sm font-bold text-white font-sans">{res.user?.name || 'UNINITIALIZED'}</p>
                            <p className="text-[10px] text-zinc-500 uppercase mt-0.5 font-sans tracking-wide">{res.user?.email}</p>
                         </td>
                         <td className="p-6">
                            <p className="text-sm font-bold text-white uppercase font-display group-hover:text-brand-purple transition-colors duration-300">{res.car?.model || 'N/A'}</p>
                            <p className="text-[9px] text-brand-purple font-black uppercase tracking-widest font-display">{res.car?.brand}</p>
                         </td>
                         <td className="p-6">
                            <p className="text-[10px] font-mono text-zinc-400">
                               {new Date(res.startDate).toLocaleDateString()} - {new Date(res.endDate).toLocaleDateString()}
                            </p>
                            <p className="text-xs font-extrabold text-white mt-1 font-display">${res.totalPrice}</p>
                         </td>
                         <td className="p-6">
                            <span className={`text-[9px] font-black uppercase px-3.5 py-1 rounded-full font-display border ${
                               res.status === 'Confirmed' ? 'bg-green-500/5 text-green-400 border-green-500/10' :
                               res.status === 'Pending' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' :
                               'bg-red-500/5 text-red-400 border-red-500/10'
                            }`}>
                               {res.status}
                            </span>
                         </td>
                         <td className="p-6 text-right">
                            <ReservationStatusControl id={res._id.toString()} currentStatus={res.status} />
                         </td>
                      </tr>
                    ))}
                    {reservations.length === 0 && (
                      <tr>
                        <td colSpan="5" className="p-12 text-center text-zinc-500 font-bold uppercase tracking-widest text-xs font-display">
                          No Operations Logged
                        </td>
                      </tr>
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  )
}

