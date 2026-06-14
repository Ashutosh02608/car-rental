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

  const handleMagicLink = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    const form = document.getElementById('auth-form')
    const formData = new FormData(form)
    const email = formData.get('email')

    if (!email) {
      setError('Please enter an email address first.')
      setLoading(false)
      return
    }

    const result = await signIn('email', {
      email,
      redirect: false,
    })

    setLoading(false)

    if (result.error) {
      setError(result.error)
    } else {
      setMessage('Access token transmitted. Check your inbox.')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505] px-4 overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-50 pointer-events-none"></div>
      <div className="absolute top-0 left-[20%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-30 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center rotate-3 group-hover:rotate-12 transition-transform duration-300 shadow-[0_0_30px_rgba(79,70,229,0.5)]">
              <span className="text-white font-black text-2xl italic">D</span>
            </div>
          </Link>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </h2>
          <p className="mt-2 text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
            {isLogin ? 'Welcome Back / Member Portal' : 'New Account / Fleet Enrollment'}
          </p>
        </div>
        
        <div className="bg-[#0a0a0a] p-10 rounded-2xl border border-white/5 shadow-2xl">
          {message && (
            <div className="mb-8 rounded-lg bg-indigo-500/10 p-4 text-[11px] font-bold uppercase tracking-widest text-indigo-400 border border-indigo-500/20 animate-pulse text-center">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-8 rounded-lg bg-red-500/10 p-4 text-[11px] font-bold uppercase tracking-widest text-red-400 border border-red-500/20 text-center">
              {error}
            </div>
          )}

          <form className="space-y-6" id="auth-form" onSubmit={handleAuth}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setSelectedRole('renter')}
                  className={`py-3 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                    selectedRole === 'renter' 
                      ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                      : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'
                  }`}
                >
                  I want to Rent
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('owner')}
                  className={`py-3 px-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                    selectedRole === 'owner' 
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-[0_0_20px_rgba(79,70,229,0.3)]' 
                      : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'
                  }`}
                >
                  I own a Car
                </button>
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="email-address" className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">
                  Email Address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-xl border-white/5 bg-white/[0.03] px-5 py-4 text-white text-sm focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 outline-none placeholder:text-white/10 font-medium border"
                  placeholder="name@example.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-2 ml-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-xl border-white/5 bg-white/[0.03] px-5 py-4 text-white text-sm focus:bg-white/[0.05] focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all duration-300 outline-none placeholder:text-white/10 font-medium border"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-4 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_0_40px_rgba(79,70,229,0.2)] hover:bg-indigo-700 hover:shadow-[0_0_50px_rgba(79,70,229,0.4)] transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 flex flex-col gap-4">
            <button
              onClick={handleMagicLink}
              disabled={loading}
              className="w-full rounded-xl bg-white/5 border border-white/5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 hover:bg-white/[0.08] hover:text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              Email Magic Link
            </button>
            
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-indigo-500 transition-colors text-center py-2"
            >
              {isLogin ? 'Create New Account' : 'Already have an account?'}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-[9px] font-bold uppercase tracking-[0.4em] text-white/10">
          Encrypted Session / Automotive Excellence Group
        </p>
      </div>
    </div>
  )
}
