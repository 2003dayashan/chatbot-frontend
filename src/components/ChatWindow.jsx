import { useEffect, useRef } from 'react'
import { Sparkles, Bot } from 'lucide-react'
import MessageBubble from './MessageBubble'

export default function ChatWindow({ messages, isSending, newestMessageId, onAnimateDone }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isSending])

  if (messages.length === 0 && !isSending) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center">
        <div className="w-14 h-14 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center mb-4">
          <Sparkles size={24} className="text-accent-400" />
        </div>
        <h2 className="text-xl font-medium text-gray-100 mb-1">How can I help you today?</h2>
        <p className="text-sm text-gray-500">Ask me anything to start a new conversation.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-0">
      <div className="max-w-3xl mx-auto py-6 space-y-6">
        {messages.map((msg, idx) => (
          <MessageBubble
            key={msg.id ?? idx}
            message={msg}
            animate={msg.id === newestMessageId}
            onAnimateDone={onAnimateDone}
          />
        ))}

        {isSending && (
          <div className="flex gap-3 justify-start animate-fadeIn">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center mt-1">
              <Bot size={16} className="text-accent-400" />
            </div>
            <div className="bg-white/[0.07] backdrop-blur-sm border border-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
