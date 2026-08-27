import { Plus, MessageSquare, Trash2, LogOut, X } from 'lucide-react'

export default function Sidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  user,
  onLogout,
  isOpen,
  onClose,
}) {
  const handleDelete = (e, id) => {
    e.stopPropagation()
    if (window.confirm('Delete this conversation? This cannot be undone.')) {
      onDelete(id)
    }
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-72 bg-dark-900/70 md:bg-white/[0.04] backdrop-blur-xl border-r border-white/10 flex flex-col transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="flex items-center justify-between p-3">
          <button
            onClick={onNew}
            className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] text-gray-100 text-sm hover:bg-white/10 transition-colors"
          >
            <Plus size={16} />
            New Chat
          </button>
          <button
            onClick={onClose}
            className="md:hidden ml-2 p-2 text-gray-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {conversations.length === 0 && (
            <p className="text-xs text-gray-600 px-3 py-4 text-center">
              No conversations yet
            </p>
          )}
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv.id)}
              className={`group w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-left truncate transition-colors ${
                activeId === conv.id
                  ? 'bg-white/10 text-white'
                  : 'text-gray-300 hover:bg-white/[0.06]'
              }`}
            >
              <MessageSquare size={15} className="flex-shrink-0 text-gray-500" />
              <span className="flex-1 truncate">{conv.title || 'New conversation'}</span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => handleDelete(e, conv.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-white/10 text-gray-500 hover:text-red-400 transition-opacity flex-shrink-0"
                aria-label="Delete conversation"
              >
                <Trash2 size={14} />
              </span>
            </button>
          ))}
        </div>

        <div className="border-t border-white/10 p-3">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-accent-600 flex items-center justify-center text-sm font-medium text-white flex-shrink-0">
              {user?.username?.charAt(0).toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-100 truncate">{user?.username}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              onClick={onLogout}
              aria-label="Log out"
              className="p-2 text-gray-500 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
