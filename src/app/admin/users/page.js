import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import UserManagementControl from "./UserManagementControl"

export const dynamic = 'force-dynamic'

export default async function AdminUsers() {
  await dbConnect()
  const users = await User.find({}).sort({ createdAt: -1 })

  return (
    <div className="pt-32 px-6 lg:px-10 pb-20 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-1/3 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full">
        <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
               <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">Personnel Registry</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold uppercase tracking-tight font-display">
              Authorized <span className="text-gradient font-display">Members</span>
            </h1>
        </header>

        <div className="glass-panel border border-white/5 rounded-2xl overflow-hidden bg-zinc-950/65 shadow-2xl">
           <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead className="border-b border-white/5 bg-[#09090b]/80">
                    <tr>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-zinc-500 font-display">Identity</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-zinc-500 font-display">Operational Status</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-zinc-500 font-display">Role</th>
                       <th className="p-6 text-[9px] font-black uppercase tracking-widest text-zinc-500 font-display text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5">
                    {users.map((user) => (
                      <tr key={user._id.toString()} className="hover:bg-white/[0.01] transition-colors duration-300 group">
                         <td className="p-6">
                            <p className="text-sm font-bold text-white font-sans">{user.name || 'UNINITIALIZED'}</p>
                            <p className="text-[10px] text-zinc-500 uppercase mt-0.5 font-sans tracking-wide">{user.email}</p>
                         </td>
                         <td className="p-6">
                            <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full font-display border ${
                               user.verificationStatus === 'Verified' ? 'bg-green-500/5 text-green-400 border-green-500/10' :
                               user.verificationStatus === 'Pending' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' :
                               'bg-white/5 text-zinc-500 border-white/5'
                            }`}>
                               {user.verificationStatus}
                            </span>
                         </td>
                         <td className="p-6">
                            <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full font-display border ${
                               user.role === 'admin' ? 'bg-gradient-to-r from-brand-indigo/20 to-brand-purple/20 text-white border-brand-purple/20' : 
                               user.role === 'owner' ? 'bg-brand-purple/10 text-brand-purple border border-brand-purple/20' :
                               'bg-white/5 text-zinc-400 border-white/5'
                            }`}>
                               {user.role}
                            </span>
                         </td>
                         <td className="p-6 text-right">
                            <UserManagementControl user={JSON.parse(JSON.stringify(user))} />
                          </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  )
}

