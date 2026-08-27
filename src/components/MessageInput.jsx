import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

export default function MessageInput({ onSend, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [value])

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="w-full px-3 pb-4 pt-2 md:px-6 md:pb-6">
      <div className="max-w-3xl mx-auto flex items-end gap-2 bg-white/[0.05] backdrop-blur-xl border border-white/10 rounded-2xl px-3 py-2 focus-within:border-accent-500 transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          placeholder="Message ChatBot AI..."
          disabled={disabled}
          className="flex-1 resize-none bg-transparent text-gray-100 placeholder-gray-500 text-sm py-1.5 max-h-40 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          aria-label="Send message"
          className="flex-shrink-0 w-8 h-8 rounded-full bg-accent-600 hover:bg-accent-500 disabled:bg-white/10 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <Send size={15} className="text-white" />
        </button>
      </div>
      <p className="text-center text-[11px] text-gray-600 mt-2">
        AI responses may be inaccurate. Verify important information.
      </p>
    </div>
  )
}
