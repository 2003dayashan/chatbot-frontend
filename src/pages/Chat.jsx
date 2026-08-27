import { useState, useEffect, useCallback } from 'react'
import { Menu } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'
import MessageInput from '../components/MessageInput'
import { useAuth } from '../context/AuthContext'
import { sendMessage, getHistory, getConversation, deleteConversation as apiDeleteConversation } from '../services/api'

export default function Chat() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [conversations, setConversations] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [messages, setMessages] = useState([])
  const [isSending, setIsSending] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [newestMessageId, setNewestMessageId] = useState(null)
  const [error, setError] = useState('')

  const loadHistory = useCallback(async () => {
    try {
      const res = await getHistory()
      setConversations(res.data)
    } catch (err) {
      console.error('Failed to load history', err)
    }
  }, [])

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  const handleNewChat = () => {
    setActiveId(null)
    setMessages([])
    setError('')
    setSidebarOpen(false)
  }

  const handleSelectConversation = async (id) => {
    setSidebarOpen(false)
    if (id === activeId) return
    try {
      const res = await getConversation(id)
      const conv = res.data
      setActiveId(conv.id)
      setMessages(
        conv.messages.map((m, idx) => ({
          id: `${conv.id}-${idx}`,
          role: m.role,
          content: m.content,
          timestamp: m.timestamp,
        }))
      )
    } catch (err) {
      console.error('Failed to load conversation', err)
    }
  }

  const handleDeleteConversation = async (id) => {
    try {
      await apiDeleteConversation(id)
      setConversations((prev) => prev.filter((c) => c.id !== id))
      if (id === activeId) {
        handleNewChat()
      }
    } catch (err) {
      console.error('Failed to delete conversation', err)
    }
  }

  const handleSend = async (text) => {
    setError('')
    const userMsg = {
      id: `local-${Date.now()}-user`,
      role: 'user',
      content: text,
      timestamp: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsSending(true)

    try {
      const res = await sendMessage({ message: text, conversationId: activeId })
      const { conversationId, reply, timestamp } = res.data

      const aiMsgId = `local-${Date.now()}-ai`
      setMessages((prev) => [
        ...prev,
        { id: aiMsgId, role: 'model', content: reply, timestamp },
      ])
      setNewestMessageId(aiMsgId)

      if (!activeId) {
        setActiveId(conversationId)
      }
      // Refresh sidebar so title/ordering reflect the latest message
      loadHistory()
    } catch (err) {
      console.error('Failed to send message', err)
      setError(
        err.response?.data?.message || 'Failed to get a response. Please try again.'
      )
    } finally {
      setIsSending(false)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="h-screen w-full flex items-center justify-center p-0 md:p-6 relative">
      <div className="w-full h-full md:max-w-[1400px] md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50 flex bg-dark-900/30 backdrop-blur-2xl">
        <Sidebar
          conversations={conversations}
          activeId={activeId}
          onSelect={handleSelectConversation}
          onNew={handleNewChat}
          onDelete={handleDeleteConversation}
          user={user}
          onLogout={handleLogout}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <header className="flex items-center gap-3 px-4 py-3 border-b border-white/10 md:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 text-gray-400 hover:text-white"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <span className="text-sm font-medium text-gray-200 truncate">
              {conversations.find((c) => c.id === activeId)?.title || 'New chat'}
            </span>
          </header>

          <ChatWindow
            messages={messages}
            isSending={isSending}
            newestMessageId={newestMessageId}
            onAnimateDone={() => setNewestMessageId(null)}
          />

          {error && (
            <p className="text-center text-sm text-red-400 pb-2">{error}</p>
          )}

          <MessageInput onSend={handleSend} disabled={isSending} />
        </div>
      </div>
    </div>
  )
}
