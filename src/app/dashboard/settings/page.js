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
    <div className="flex flex-col min-h-screen bg-[#030303] text-white pt-32 px-6 pb-20 overflow-hidden relative">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none z-0"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-brand-cyan/5 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors mb-12 font-display">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          Return to commander
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-4 mb-4">
             <span className="h-[1px] w-12 bg-gradient-to-r from-brand-purple to-brand-cyan"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-purple font-display">Identity Configuration</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-extrabold uppercase tracking-tight mb-4 font-display">
            Profile <span className="text-gradient font-display">Attributes</span>
          </h1>
          <p className="text-zinc-400 text-sm font-medium tracking-wide leading-relaxed font-sans max-w-2xl">
            Manage your secure identification and communication parameters.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-8">
              <ProfileForm user={JSON.parse(JSON.stringify(user))} />
           </div>

           <div className="lg:col-span-4 space-y-6">
              <div className="p-8 glass-panel bg-zinc-950/60 border border-white/5 rounded-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-20 h-20 bg-brand-purple/5 rounded-full blur-xl pointer-events-none"></div>
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6 font-display">Identity Status</h3>
                 <div className="flex items-center gap-4 mb-6">
                    <div className={`w-3.5 h-3.5 rounded-full ${
                      user.verificationStatus === 'Verified' ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 
                      user.verificationStatus === 'Pending' ? 'bg-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' :
                      'bg-red-500/20'
                    }`}></div>
                    <span className="text-lg font-black uppercase tracking-wider font-display">{user.verificationStatus}</span>
                 </div>
                 <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-wider font-sans font-bold">
                    {user.verificationStatus === 'Verified' ? 'Account verified for full access.' : 
                     user.verificationStatus === 'Pending' ? 'Verification currently in progress.' :
                     'Verification required for rental access.'}
                 </p>
              </div>

              <div className="p-8 glass-panel bg-brand-purple/5 border border-brand-purple/10 rounded-2xl">
                 <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-purple mb-4 font-display italic">Security Protocol</h3>
                 <p className="text-[11px] text-zinc-400 leading-relaxed font-sans font-medium">
                    All identity data is encrypted and stored in isolated secure modules. Only verified concierge staff can access document hashes.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
