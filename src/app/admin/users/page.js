import dbConnect from "@/lib/mongodb"
import User from "@/models/User"
import UserManagementControl from "./UserManagementControl"

export const dynamic = 'force-dynamic'

export default async function AdminUsers() {
  await dbConnect()
  const users = await User.find({}).sort({ createdAt: -1 })

  return (
    <div className="pt-32 px-10 pb-20">
      <header className="mb-16">
          <div className="flex items-center gap-4 mb-4">
             <span className="h-[1px] w-12 bg-indigo-500"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Personnel Registry</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter">
            Authorized <span className="text-indigo-600">Members</span>
          </h1>
      </header>

      <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead className="border-b border-white/5 bg-white/[0.01]">
                  <tr>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Identity</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Operational Status</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40">Role</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-white/40 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {users.map((user) => (
                    <tr key={user._id.toString()} className="hover:bg-white/[0.01] transition-colors group">
                       <td className="p-6">
                          <p className="text-sm font-bold text-white">{user.name || 'UNINITIALIZED'}</p>
                          <p className="text-[10px] text-white/30 uppercase tracking-tight">{user.email}</p>
                       </td>
                       <td className="p-6">
                          <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-sm ${
                             user.verificationStatus === 'Verified' ? 'bg-green-500/10 text-green-500' :
                             user.verificationStatus === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                             'bg-white/5 text-white/30'
                          }`}>
                             {user.verificationStatus}
                          </span>
                       </td>
                       <td className="p-6">
                          <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-sm ${
                             user.role === 'admin' ? 'bg-indigo-500 text-white' : 
                             user.role === 'owner' ? 'bg-indigo-500/20 text-indigo-300' :
                             'bg-white/5 text-white/30'
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
  )
}
