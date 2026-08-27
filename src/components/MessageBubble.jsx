import { useState, useEffect, useRef } from 'react'
import { Bot, User } from 'lucide-react'

function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function MessageBubble({ message, animate = false, onAnimateDone }) {
  const isUser = message.role === 'user'
  const [displayedText, setDisplayedText] = useState(animate ? '' : message.content)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!animate) {
      setDisplayedText(message.content)
      return
    }

    let i = 0
    const fullText = message.content
    // Reveal a few characters per tick - fast enough to feel responsive,
    // slow enough to visibly read as "typing" rather than an instant flash.
    intervalRef.current = setInterval(() => {
      i += 2
      setDisplayedText(fullText.slice(0, i))
      if (i >= fullText.length) {
        clearInterval(intervalRef.current)
        onAnimateDone?.()
      }
    }, 15)

    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message.content, animate])

  const isStillTyping = animate && displayedText.length < message.content.length

  return (
    <div
      className={`flex gap-3 w-full animate-fadeIn ${
        isUser ? 'justify-end' : 'justify-start'
      }`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center mt-1">
          <Bot size={16} className="text-accent-400" />
        </div>
      )}

      <div className={`flex flex-col max-w-[75%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words backdrop-blur-sm border ${
            isUser
              ? 'bg-accent-600/85 border-accent-400/30 text-white rounded-br-sm'
              : 'bg-white/[0.07] border-white/10 text-gray-100 rounded-bl-sm'
          }`}
        >
          {displayedText}
          {isStillTyping && (
            <span className="inline-block w-1.5 h-4 bg-current ml-0.5 align-middle animate-blink" />
          )}
        </div>
        <span className="text-[11px] text-gray-500 mt-1 px-1">
          {formatTime(message.timestamp)}
        </span>
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-700 flex items-center justify-center mt-1">
          <User size={16} className="text-white" />
        </div>
      )}
    </div>
  )
}
