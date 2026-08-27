import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bot, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await register(username, email, password)
      navigate('/chat')
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || 'Registration failed')
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
          <h1 className="text-xl font-semibold text-gray-100">Create your account</h1>
          <p className="text-sm text-gray-500 mt-1">Start chatting with ChatBot AI</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={3}
              className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="yourusername"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-100 focus:outline-none focus:border-accent-500 transition-colors"
              placeholder="At least 6 characters"
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
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-accent-400 hover:text-accent-300 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
