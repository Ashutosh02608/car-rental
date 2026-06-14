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
    <div className="flex flex-col h-[600px] bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
      {/* Thread Container */}
      <div 
        ref={scrollRef}
        className="flex-1 p-8 overflow-y-auto space-y-6 scrollbar-hide"
      >
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 italic">Secure Thread Initialized</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender === currentUserId
            return (
              <div key={msg._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-5 rounded-2xl ${
                  isMe ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-white/5 text-white/80 rounded-bl-none border border-white/5'
                }`}>
                  <p className="text-sm font-medium leading-relaxed tracking-wide">{msg.content}</p>
                  <p className={`text-[8px] mt-2 font-black uppercase tracking-widest ${isMe ? 'text-white/50' : 'text-white/20'}`}>
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/[0.01] border-t border-white/5">
        <form onSubmit={handleSend} className="relative">
          <input 
            name="content"
            autoComplete="off"
            placeholder="TYPE MESSAGE / TRANSMIT SECURELY"
            className="w-full bg-[#050505] border border-white/5 rounded-xl px-6 py-4 text-xs font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-indigo-600 transition-all placeholder:text-white/10"
          />
          <button 
            disabled={loading}
            className="absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 bg-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-indigo-500 transition-all disabled:opacity-50"
          >
            {loading ? '...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  )
}
