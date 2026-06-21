'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { signup } from './actions'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [selectedRole, setSelectedRole] = useState('renter')
  const router = useRouter()

  const handleAuth = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const formData = new FormData(e.currentTarget)
    
    if (isLogin) {
      const email = formData.get('email')
      const password = formData.get('password')

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (result.error) {
        setError(result.error)
        setLoading(false)
      } else {
        router.push('/')
        router.refresh()
      }
    } else {
      console.log('CLIENT: Sending signup for role:', selectedRole)
      formData.append('role', selectedRole)
      const result = await signup(formData)
      if (result.error) {
        setError(result.error)
        setLoading(false)
      } else {
        setMessage(result.success)
        setLoading(false)
      }
    }
  }



  return (
    <div className="flex min-h-screen items-center justify-center bg-[#030303] px-4 overflow-hidden relative pt-20">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30 pointer-events-none"></div>
      <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-20 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group mb-4">
            <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-indigo to-brand-purple rounded-xl rotate-3 group-hover:rotate-12 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.4)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.7)] shine-effect"></div>
              <span className="relative z-10 text-white font-black text-xl italic font-display group-hover:scale-105 transition-all duration-300">D</span>
            </div>
          </Link>
          <h2 className="text-3xl font-extrabold uppercase tracking-tight text-white font-display">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="mt-2 text-zinc-500 text-[9px] font-bold uppercase tracking-[0.3em] font-display">
            {isLogin ? 'Welcome Back / Member Portal' : 'New Account / Fleet Enrollment'}
          </p>
        </div>
        
        <div className="glass-panel p-8 md:p-10 shadow-2xl border border-white/5 bg-zinc-950/85">
          {message && (
            <div className="mb-6 rounded-xl bg-brand-purple/10 p-4 text-[10px] font-bold uppercase tracking-wider text-brand-accent border border-brand-purple/20 animate-pulse text-center font-display">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 rounded-xl bg-red-500/10 p-4 text-[10px] font-bold uppercase tracking-wider text-red-400 border border-red-500/20 text-center font-display">
              {error}
            </div>
          )}

          <form className="space-y-5" id="auth-form" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedRole('renter')}
                  className={`py-3 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                    selectedRole === 'renter' 
                      ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                      : 'bg-white/5 text-zinc-500 border-white/5 hover:border-white/10'
                  }`}
                >
                  I want to Rent
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('owner')}
                  className={`py-3 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                    selectedRole === 'owner' 
                      ? 'bg-gradient-to-r from-brand-indigo to-brand-purple text-white border-transparent shadow-[0_0_15px_rgba(79,70,229,0.2)]' 
                      : 'bg-white/5 text-zinc-500 border-white/5 hover:border-white/10'
                  }`}
                >
                  I own a Car
                </button>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2 ml-1 font-display">
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border-white/5 bg-white/[0.02] px-5 py-3.5 text-white text-sm focus:bg-white/[0.04] focus:ring-1 focus:ring-brand-purple focus:border-transparent transition-all duration-300 outline-none placeholder:text-white/5 font-medium border"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2 ml-1 font-display">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border-white/5 bg-white/[0.02] px-5 py-3.5 text-white text-sm focus:bg-white/[0.04] focus:ring-1 focus:ring-brand-purple focus:border-transparent transition-all duration-300 outline-none placeholder:text-white/5 font-medium border"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-brand-indigo to-brand-purple py-3.5 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:shadow-[0_0_35px_rgba(99,102,241,0.3)] transition-all active:scale-[0.98] disabled:opacity-50 font-display cursor-pointer"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 flex flex-col gap-3">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[9px] font-black uppercase tracking-widest text-zinc-500 hover:text-brand-purple transition-colors text-center py-2 cursor-pointer font-display"
            >
              {isLogin ? 'Create New Account' : 'Already have an account?'}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-700 font-display">
          Encrypted Session / Automotive Excellence Group
        </p>
      </div>
    </div>
  )
}
