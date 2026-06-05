import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-surface-base flex items-center justify-center px-4">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(rgba(79,142,247,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(79,142,247,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="bg-surface-elevated border border-white/5 rounded-3xl p-8 sm:p-10">
          <div className="mb-8 text-center">
            <a href="/" className="inline-flex items-center gap-1 mb-6">
              <span className="font-sora font-bold text-2xl text-white">STUDIA</span>
              <sup className="text-brand-blue text-xs font-mono">β</sup>
            </a>
            <h1 className="font-sora font-bold text-3xl text-white mb-2">Welcome back</h1>
            <p className="text-[#8B97B5] text-sm">
              Sign in to continue to your study dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-white mb-2">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568] w-4 h-4" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@university.ac.ke"
                  className="w-full bg-surface-base border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-[#4A5568] outline-none focus:border-brand-blue/40 focus:ring-1 focus:ring-brand-blue/20 transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-white mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A5568] w-4 h-4" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-base border border-white/10 rounded-xl pl-10 pr-10 py-3 text-white placeholder-[#4A5568] outline-none focus:border-brand-blue/40 focus:ring-1 focus:ring-brand-blue/20 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4A5568] hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border border-white/10 bg-surface-base cursor-pointer accent-brand-blue"
                />
                <span className="text-[#8B97B5] hover:text-white transition-colors">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-brand-blue hover:text-brand-blue/80 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-brand-blue text-white font-medium py-3 rounded-xl hover:bg-brand-blue/90 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-surface-elevated text-[#4A5568]">or continue with</span>
            </div>
          </div>

          <button className="w-full border border-white/10 rounded-xl py-3 text-white font-medium text-sm hover:bg-white/5 transition-all duration-200 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>

          <p className="text-center text-sm text-[#8B97B5] mt-8">
            Don't have an account?{' '}
            <a href="/signup" className="text-brand-blue hover:text-brand-blue/80 font-medium transition-colors">
              Sign up free
            </a>
          </p>
        </div>

        <p className="text-center text-xs text-[#4A5568] mt-6">
          By signing in, you agree to STUDIA's{' '}
          <a href="#" className="text-[#8B97B5] hover:text-white transition-colors">
            Terms of Service
          </a>
          {' '}and{' '}
          <a href="#" className="text-[#8B97B5] hover:text-white transition-colors">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  )
}
