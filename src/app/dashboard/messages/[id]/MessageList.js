'use client'

import { useState, useEffect, useRef } from 'react'
import { sendMessage } from '@/lib/actions/message'

export default function MessageList({ reservationId, initialMessages, currentUserId }) {
  const [messages, setMessages] = useState(initialMessages)
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (e) => {
    e.preventDefault()
    const content = e.target.content.value
    if (!content.trim()) return

    setLoading(true)
    const result = await sendMessage(reservationId, content)
    setLoading(false)

    if (result.success) {
      setMessages([...messages, result.message])
      e.target.reset()
    }
  }

  return (
    <div className="flex flex-col h-[550px] glass-panel border border-white/5 rounded-2xl overflow-hidden bg-zinc-950/60 shadow-2xl relative">
      {/* Thread Container */}
      <div 
        ref={scrollRef}
        className="flex-1 p-6 overflow-y-auto space-y-4 scrollbar-hide"
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
             <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 italic font-display">Secure Thread Initialized</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender === currentUserId
            return (
              <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-4.5 rounded-2xl ${
                  isMe 
                    ? 'bg-gradient-to-r from-brand-indigo to-brand-purple text-white rounded-br-none shadow-[0_4px_15px_rgba(99,102,241,0.1)]' 
                    : 'bg-white/5 text-zinc-300 rounded-bl-none border border-white/5'
                }`}>
                  <p className="text-xs font-medium leading-relaxed tracking-wide font-sans">{msg.content}</p>
                  <p className={`text-[7px] mt-2 font-black uppercase tracking-widest font-mono ${isMe ? 'text-white/60' : 'text-zinc-600'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/[0.01] border-t border-white/5">
        <form onSubmit={handleSend} className="relative">
          <input 
            name="content"
            autoComplete="off"
            required
            placeholder="TYPE MESSAGE / TRANSMIT SECURELY"
            className="w-full bg-[#050505] border border-white/5 rounded-xl px-5 py-4 pr-24 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 transition-all placeholder:text-zinc-700 font-display"
          />
          <button 
            type="submit"
            disabled={loading}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-brand-indigo to-brand-purple text-[9px] font-black uppercase tracking-widest rounded-lg hover:shadow-[0_0_15px_rgba(99,102,241,0.35)] transition-all disabled:opacity-50 text-white font-display cursor-pointer"
          >
            {loading ? 'Transmitting' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
