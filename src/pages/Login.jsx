import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bot, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/chat')
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid username or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl shadow-black/50 px-8 py-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-full bg-accent-600 flex items-center justify-center mb-3">
            <Bot size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-100">Welcome back</h1>
          <p className="text-sm text-gray-500 mt-1">Log in to continue to ChatBot AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="yourusername"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-950/40 border border-red-900 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-500 disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            Log In
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-accent-400 hover:text-accent-300 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
