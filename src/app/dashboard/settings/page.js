import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from 'next/navigation'
import ProfileForm from './ProfileForm'
import Link from 'next/link'

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  await dbConnect()
  const user = await User.findById(session.user.id)

  return (
    <div className="flex flex-col min-h-screen bg-[#050505] text-white pt-32 px-6 pb-20">
      <div className="max-w-4xl mx-auto w-full relative">
        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-600/5 blur-[100px] pointer-events-none"></div>

        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-indigo-500 transition-colors mb-12 relative z-10">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Return to command center
        </Link>

        <header className="mb-16 relative z-10">
          <div className="flex items-center gap-4 mb-4">
             <span className="h-[1px] w-8 bg-indigo-500"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Identity Configuration</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-black uppercase italic tracking-tighter">
            Profile <span className="text-indigo-500">Attributes</span>
          </h1>
          <p className="mt-4 text-white/40 text-sm font-medium tracking-wide">
            Manage your secure identification and communication parameters.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
           <div className="lg:col-span-8">
              <ProfileForm user={JSON.parse(JSON.stringify(user))} />
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="p-8 bg-[#0a0a0a] border border-white/5 rounded-2xl">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6">Identity Status</h3>
                 <div className="flex items-center gap-4 mb-6">
                    <div className={`w-3 h-3 rounded-full ${
                      user.verificationStatus === 'Verified' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 
                      user.verificationStatus === 'Pending' ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' :
                      'bg-red-500/20'
                    }`}></div>
                    <span className="text-lg font-black uppercase italic tracking-tighter">{user.verificationStatus}</span>
                 </div>
                 <p className="text-[10px] text-white/30 leading-relaxed uppercase tracking-widest font-bold">
                    {user.verificationStatus === 'Verified' ? 'Account verified for full access.' : 
                     user.verificationStatus === 'Pending' ? 'Verification currently in progress.' :
                     'Verification required for rental access.'}
                 </p>
              </div>

              <div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-2xl">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-4 italic">Security Note</h3>
                 <p className="text-[11px] text-indigo-200/50 leading-relaxed font-medium">
                    All identity data is encrypted and stored in isolated secure modules. Only verified concierge staff can access document hashes.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
