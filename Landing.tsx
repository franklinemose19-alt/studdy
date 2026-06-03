import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import {
  Mic, Sparkles, GraduationCap, Camera, FlaskConical,
  WifiOff, CalendarDays, Target, Menu, X, Check,
  ChevronRight, Star, Zap, BookOpen, Brain, Play,
  ArrowRight, Twitter, Instagram, Linkedin
} from 'lucide-react'

// ─── Helpers ────────────────────────────────────────────────────────────────

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
}

const stagger = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const staggerChild = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
}

// ─── Counter Hook ────────────────────────────────────────────────────────────

function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return { count, ref }
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Campus', href: '#campus' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-surface-base/90 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1">
          <span className="font-sora font-bold text-xl text-white tracking-tight">STUDIA</span>
          <sup className="text-brand-blue text-xs font-mono ml-0.5">β</sup>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#8B97B5] hover:text-white transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-[#8B97B5] hover:text-white transition-colors px-4 py-2">
            Log in
          </button>
          <button className="text-sm font-medium bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/90 transition-all duration-200 shadow-lg shadow-brand-blue/20">
            Get Started Free
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface-base/95 backdrop-blur-md border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[#8B97B5] hover:text-white py-2 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                <button className="text-sm text-[#8B97B5] py-2 text-left">Log in</button>
                <button className="text-sm font-medium bg-brand-blue text-white px-4 py-3 rounded-lg">
                  Get Started Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ─── HERO MOCKUP ─────────────────────────────────────────────────────────────

function HeroMockup() {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Summary', 'Key Points', 'Quiz']

  return (
    <motion.div
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
      style={{ transform: 'rotate(2deg)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 -z-10 blur-3xl opacity-30 bg-brand-blue rounded-3xl scale-110" />

      <div className="bg-surface-elevated border border-white/10 rounded-2xl overflow-hidden w-full max-w-md shadow-2xl shadow-black/50">
        {/* Card header */}
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-[#8B97B5] font-mono uppercase tracking-wider">BIO 201</p>
            <p className="text-sm font-sora font-semibold text-white mt-0.5">Cell Biology</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-brand-green bg-brand-green/10 border border-brand-green/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
            Ready
          </span>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/5">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActiveTab(i)}
              className={cn(
                'flex-1 text-xs py-3 transition-all duration-200',
                activeTab === i
                  ? 'text-brand-blue border-b-2 border-brand-blue font-medium'
                  : 'text-[#8B97B5] hover:text-white'
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-5">
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="summary"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <p className="text-xs text-[#8B97B5] leading-relaxed">
                  Mitochondria are the primary site of ATP synthesis through oxidative phosphorylation. The inner membrane contains the electron transport chain...
                </p>
                <p className="text-xs text-[#8B97B5] leading-relaxed">
                  The citric acid cycle (Krebs cycle) produces NADH and FADH₂, which feed electrons into the chain to generate a proton gradient...
                </p>
                <div className="mt-3 flex items-center gap-2 text-brand-blue cursor-pointer hover:text-brand-blue/80 transition-colors">
                  <Play size={12} />
                  <span className="text-xs">Listen to narration</span>
                </div>
              </motion.div>
            )}
            {activeTab === 1 && (
              <motion.div
                key="keypoints"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="space-y-2"
              >
                {[
                  'Mitochondria produce ~30 ATP per glucose molecule',
                  'Inner membrane contains cristae — increases surface area',
                  'Proton gradient drives ATP synthase rotation',
                  'Oxygen is the final electron acceptor',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={12} className="text-brand-green mt-0.5 shrink-0" />
                    <span className="text-xs text-[#8B97B5]">{point}</span>
                  </div>
                ))}
              </motion.div>
            )}
            {activeTab === 2 && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              >
                <p className="text-xs font-medium text-white mb-3">Q1. Where does oxidative phosphorylation occur?</p>
                <div className="space-y-2">
                  {['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi apparatus'].map((opt, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all',
                        i === 1
                          ? 'border-brand-blue bg-brand-blue/10 text-white'
                          : 'border-white/5 text-[#8B97B5]'
                      )}
                    >
                      <span className={cn(
                        'w-3 h-3 rounded-full border flex items-center justify-center shrink-0',
                        i === 1 ? 'border-brand-blue bg-brand-blue' : 'border-white/20'
                      )}>
                        {i === 1 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </span>
                      {opt}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer bar */}
        <div className="px-5 py-3 bg-surface-base/50 border-t border-white/5 flex items-center justify-between">
          <span className="text-xs text-[#4A5568] font-mono">12 key points • 10 quiz questions</span>
          <span className="text-xs text-brand-amber">↓ Offline</span>
        </div>
      </div>
    </motion.div>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background grid */}
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
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-surface-base" />
      {/* Blue ambient blob */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl -z-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <motion.div variants={stagger} initial="initial" animate="animate" className="space-y-8">
          {/* Badge */}
          <motion.div variants={staggerChild}>
            <span className="inline-flex items-center gap-2 text-xs font-medium bg-brand-blue/10 text-brand-blue border border-brand-blue/20 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
              ✦ AI-Powered Academic OS
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={staggerChild}
            className="font-sora font-extrabold text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-white"
          >
            Turn Every
            <br />
            Lecture Into{' '}
            <span
              className="text-brand-blue"
              style={{ textShadow: '0 0 40px rgba(79,142,247,0.5)' }}
            >
              Smart
            </span>
            <br />
            Study Material.
          </motion.h1>

          {/* Sub */}
          <motion.p variants={staggerChild} className="text-[#8B97B5] text-lg leading-relaxed max-w-lg">
            Record your lecture. STUDIA transcribes it, summarizes it, builds your revision notes and generates a quiz — automatically. Works offline. Runs on M-Pesa.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={staggerChild} className="flex flex-wrap gap-4">
            <button className="animate-glow-pulse inline-flex items-center gap-2 bg-brand-blue text-white font-medium px-6 py-3.5 rounded-xl text-sm hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/25">
              Start Free — No Card Needed
              <ArrowRight size={16} />
            </button>
            <button className="inline-flex items-center gap-2 text-white border border-white/10 px-6 py-3.5 rounded-xl text-sm hover:bg-white/5 transition-all">
              See How It Works
              <ChevronRight size={16} />
            </button>
          </motion.div>

          {/* Social proof */}
          <motion.div variants={staggerChild} className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['AW', 'BK', 'FM', 'JO'].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue/40 to-brand-blue/10 border-2 border-surface-base flex items-center justify-center text-xs font-medium text-white"
                >
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="text-brand-amber fill-brand-amber" />
                ))}
              </div>
              <p className="text-xs text-[#8B97B5] mt-0.5">
                Trusted by <span className="text-white font-medium">2,400+</span> students across 18 Kenyan universities
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right: mockup */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center lg:justify-end"
        >
          <HeroMockup />
        </motion.div>
      </div>
    </section>
  )
}

// ─── MARQUEE ─────────────────────────────────────────────────────────────────

function Marquee() {
  const unis = [
    'University of Nairobi', 'Kenyatta University', 'Strathmore University',
    'JKUAT', 'Moi University', 'Egerton University', 'Maseno University',
    'USIU Africa', 'KCA University', 'Mt Kenya University', 'Daystar University',
  ]

  return (
    <div className="py-12 border-y border-white/5 overflow-hidden">
      <p className="text-center text-xs text-[#4A5568] uppercase tracking-widest mb-6">
        Used by students at
      </p>
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap gap-12">
          {[...unis, ...unis].map((uni, i) => (
            <span key={i} className="text-sm text-[#4A5568] shrink-0">
              {uni} <span className="text-[#1E2235] mx-6">·</span>
            </span>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-surface-base to-transparent" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-surface-base to-transparent" />
      </div>
    </div>
  )
}

// ─── PROBLEM ─────────────────────────────────────────────────────────────────

function Problem() {
  const problems = [
    {
      emoji: '📋',
      title: 'Messy, incomplete notes',
      desc: "You can't write fast enough. Half the lecture is missed. The rest is unreadable by Sunday.",
    },
    {
      emoji: '😰',
      title: 'Exam panic every semester',
      desc: 'Week before exams: 14 weeks of content, zero structure, no idea where to start.',
    },
    {
      emoji: '💸',
      title: 'Help is too expensive',
      desc: 'Private tutors cost KSh 500/hr. Group chats are chaos. You\'re basically on your own.',
    },
  ]

  return (
    <section id="how-it-works" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <h2 className="font-sora font-bold text-4xl lg:text-5xl text-white">
          Lectures are 2 hours.
          <br />
          <span className="text-[#8B97B5]">Your attention isn't.</span>
        </h2>
        <p className="text-[#8B97B5] mt-4 text-lg max-w-xl mx-auto">
          Most students leave lectures with incomplete notes and zero retention. STUDIA fixes that.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {problems.map((p, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -4, borderColor: 'rgba(79,142,247,0.4)' }}
            className="bg-surface-card border border-white/5 rounded-2xl p-6 transition-all duration-200 cursor-default"
          >
            <div className="text-3xl mb-4">{p.emoji}</div>
            <h3 className="font-sora font-semibold text-white mb-2">{p.title}</h3>
            <p className="text-[#8B97B5] text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── HOW IT WORKS ────────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <Mic size={24} />,
      title: 'Record',
      desc: 'Open STUDIA and hit record before your lecturer starts. Background recording keeps going even when you lock your phone.',
    },
    {
      number: '02',
      icon: <Sparkles size={24} />,
      title: 'AI Processes',
      desc: 'Whisper transcribes your audio. GPT-4 cleans it, builds your summary, key points, revision notes and a quiz — while you sit in class.',
    },
    {
      number: '03',
      icon: <GraduationCap size={24} />,
      title: 'Study Smarter',
      desc: 'Read the summary, take the quiz, listen to narration on the matatu home. Offline. Always.',
    },
  ]

  return (
    <section className="py-24 bg-surface-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="font-sora font-bold text-4xl lg:text-5xl text-white">
            Three steps to exam readiness.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px border-t border-dashed border-white/10" />

          {steps.map((s, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-blue/10 border border-brand-blue/20 rounded-2xl text-brand-blue mb-6">
                {s.icon}
              </div>
              <div className="absolute -top-3 -right-3 font-mono text-xs text-[#1E2235] font-bold">
                {s.number}
              </div>
              <h3 className="font-sora font-semibold text-xl text-white mb-3">{s.title}</h3>
              <p className="text-[#8B97B5] text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp} className="text-center text-xs text-[#4A5568] mt-12 font-mono">
          Average processing time: 3–6 minutes per hour of lecture
        </motion.p>
      </div>
    </section>
  )
}

// ─── FEATURES ────────────────────────────────────────────────────────────────

const features = [
  {
    icon: <Mic size={20} />,
    title: 'SmartCapture AI',
    desc: 'Filters classroom noise, side conversations, and mic crackle. Outputs clean academic text even in a packed lecture hall.',
    wide: true,
    color: 'brand-blue',
  },
  {
    icon: <Camera size={20} />,
    title: 'SnapSolve',
    desc: 'Upload a photo of a past paper. AI extracts every question and generates model answers instantly.',
    wide: false,
    color: 'brand-amber',
  },
  {
    icon: <FlaskConical size={20} />,
    title: 'Auto Quiz',
    desc: 'MCQs, short answers, true/false — generated from your own lectures. Built from what you actually studied.',
    wide: false,
    color: 'brand-green',
  },
  {
    icon: <WifiOff size={20} />,
    title: 'Offline Vault',
    desc: 'Download everything. Study on a matatu, in a blackout, in the village. No data needed once downloaded.',
    wide: false,
    color: 'brand-blue',
  },
  {
    icon: <CalendarDays size={20} />,
    title: 'Semester Planner',
    desc: 'Upload your timetable. AI builds a daily study schedule that prioritizes your weakest units and nearest exams.',
    wide: false,
    color: 'brand-amber',
  },
  {
    icon: <Target size={20} />,
    title: 'Exam Prediction',
    desc: 'After 3+ lectures, STUDIA predicts the most likely exam topics and question types for your unit.',
    wide: true,
    color: 'brand-green',
  },
]

function Features() {
  const colorMap: Record<string, string> = {
    'brand-blue': 'text-brand-blue bg-brand-blue/10 border-brand-blue/20',
    'brand-amber': 'text-brand-amber bg-brand-amber/10 border-brand-amber/20',
    'brand-green': 'text-brand-green bg-brand-green/10 border-brand-green/20',
  }

  return (
    <section id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div {...fadeUp} className="text-center mb-16">
        <h2 className="font-sora font-bold text-4xl lg:text-5xl text-white">
          Everything you need.
          <br />
          <span className="text-[#8B97B5]">Nothing you don't.</span>
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {features.map((f, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ y: -4, borderColor: 'rgba(79,142,247,0.3)' }}
            className={cn(
              'bg-surface-elevated border border-white/5 rounded-2xl p-6 transition-all duration-200 cursor-default',
              f.wide && 'lg:col-span-2'
            )}
          >
            <div className={cn('inline-flex items-center justify-center w-10 h-10 rounded-xl border mb-4', colorMap[f.color])}>
              {f.icon}
            </div>
            <h3 className="font-sora font-semibold text-white mb-2">{f.title}</h3>
            <p className="text-[#8B97B5] text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── FEATURE TABS ────────────────────────────────────────────────────────────

function FeatureTabs() {
  const [active, setActive] = useState(0)

  const tabs = [
    { label: 'Lecture Summary', icon: <BookOpen size={14} /> },
    { label: 'Auto Quiz', icon: <Zap size={14} /> },
    { label: 'SnapSolve', icon: <Camera size={14} /> },
    { label: 'Study Plan', icon: <CalendarDays size={14} /> },
  ]

  const content = [
    // Summary
    <div key="summary" className="bg-surface-elevated rounded-2xl border border-white/5 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[#8B97B5] font-mono uppercase">ECO 301 — Macroeconomics</p>
          <p className="text-sm font-sora font-semibold text-white mt-1">Monetary Policy & Inflation</p>
        </div>
        <span className="text-xs text-brand-green bg-brand-green/10 border border-brand-green/20 px-2 py-1 rounded-full">✓ Ready</span>
      </div>
      <div className="h-px bg-white/5" />
      <div className="space-y-3">
        <h4 className="text-xs font-medium text-white uppercase tracking-wider">AI Summary</h4>
        <p className="text-xs text-[#8B97B5] leading-relaxed">
          Monetary policy refers to the actions taken by a central bank to manage money supply and interest rates. The Central Bank of Kenya uses repo rates and reserve requirements to control inflation...
        </p>
        <p className="text-xs text-[#8B97B5] leading-relaxed">
          The Fisher equation establishes the relationship between nominal interest rates, real interest rates, and expected inflation, forming the basis for CBK policy decisions...
        </p>
      </div>
      <div className="flex items-center gap-4 pt-2">
        <button className="flex items-center gap-1.5 text-xs text-brand-blue hover:text-brand-blue/80 transition-colors">
          <Play size={12} /> Listen
        </button>
        <button className="flex items-center gap-1.5 text-xs text-[#8B97B5] hover:text-white transition-colors">
          <Brain size={12} /> Take Quiz
        </button>
      </div>
    </div>,

    // Quiz
    <div key="quiz" className="bg-surface-elevated rounded-2xl border border-white/5 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-sora font-semibold text-white">ECO 301 Quiz</p>
        <span className="text-xs font-mono text-[#8B97B5]">Q 3 / 10</span>
      </div>
      <div className="h-px bg-white/5" />
      <p className="text-sm text-white">What is the primary tool used by CBK to control inflation?</p>
      <div className="space-y-2">
        {['Open market operations', 'Repo rate adjustments', 'Currency devaluation', 'Tax policy changes'].map((opt, i) => (
          <div key={i} className={cn(
            'flex items-center gap-3 px-3 py-2.5 rounded-xl border text-xs cursor-pointer transition-all',
            i === 1 ? 'border-brand-blue bg-brand-blue/10 text-white' : 'border-white/5 text-[#8B97B5] hover:border-white/15'
          )}>
            <span className={cn(
              'w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0',
              i === 1 ? 'border-brand-blue bg-brand-blue' : 'border-white/20'
            )}>
              {i === 1 && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            </span>
            {opt}
          </div>
        ))}
      </div>
      <div className="bg-brand-green/10 border border-brand-green/20 rounded-xl px-3 py-2.5 flex items-start gap-2">
        <Check size={12} className="text-brand-green mt-0.5 shrink-0" />
        <p className="text-xs text-brand-green">Correct! Repo rates are used to make borrowing more expensive, reducing money supply and inflation.</p>
      </div>
    </div>,

    // SnapSolve
    <div key="snap" className="bg-surface-elevated rounded-2xl border border-white/5 p-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-surface-base rounded-xl border border-white/5 p-3 flex flex-col items-center justify-center gap-2 min-h-[160px]">
          <Camera size={20} className="text-[#4A5568]" />
          <p className="text-xs text-[#4A5568] text-center">Past Paper<br />2023 Final</p>
          <div className="w-full space-y-1.5 mt-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-1.5 bg-white/5 rounded" style={{ width: `${60 + i * 10}%` }} />
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-xs font-medium text-white">Q1 (15 marks)</p>
          <p className="text-xs text-[#8B97B5]">Explain the transmission mechanism of monetary policy in Kenya.</p>
          <div className="h-px bg-white/5" />
          <p className="text-xs text-brand-green font-medium">Model Answer:</p>
          <p className="text-xs text-[#8B97B5] leading-relaxed">
            The CBK adjusts the repo rate → commercial banks reprice loans → investment and consumption change → aggregate demand shifts → inflation is affected...
          </p>
        </div>
      </div>
    </div>,

    // Study Plan
    <div key="plan" className="bg-surface-elevated rounded-2xl border border-white/5 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-sora font-semibold text-white">This Week</p>
        <p className="text-xs text-[#8B97B5] font-mono">Exams in 3 weeks</p>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <div key={i} className={cn(
            'rounded-lg p-1 text-center',
            i === 2 ? 'bg-brand-blue/20 border border-brand-blue/30' : 'bg-surface-base/50'
          )}>
            <p className={cn('text-xs font-mono', i === 2 ? 'text-brand-blue' : 'text-[#4A5568]')}>{d}</p>
            <p className={cn('text-xs mt-0.5', i === 2 ? 'text-white font-medium' : 'text-[#8B97B5]')}>
              {['3h', '2h', '4h', '2h', '3h', '2h', '—'][i]}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[
          { unit: 'ECO 301', task: 'Review monetary policy notes', type: 'review', priority: 'high' },
          { unit: 'BIO 201', task: 'Take cell biology quiz', type: 'quiz', priority: 'high' },
          { unit: 'MAT 201', task: 'Practice integration problems', type: 'practice', priority: 'medium' },
        ].map((t, i) => (
          <div key={i} className="flex items-center gap-3 bg-surface-base/50 rounded-xl px-3 py-2.5">
            <span className={cn('text-xs font-mono w-16 shrink-0', t.priority === 'high' ? 'text-brand-amber' : 'text-[#8B97B5]')}>
              {t.unit}
            </span>
            <span className="text-xs text-[#8B97B5] flex-1 truncate">{t.task}</span>
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full shrink-0',
              t.type === 'quiz' ? 'bg-brand-blue/10 text-brand-blue' :
              t.type === 'review' ? 'bg-brand-green/10 text-brand-green' :
              'bg-brand-amber/10 text-brand-amber'
            )}>
              {t.type}
            </span>
          </div>
        ))}
      </div>
    </div>,
  ]

  return (
    <section className="py-24 bg-surface-card/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="font-sora font-bold text-4xl lg:text-5xl text-white">See it in action.</h2>
        </motion.div>

        {/* Tab bar */}
        <motion.div {...fadeUp} className="flex overflow-x-auto gap-2 mb-8 pb-2">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 shrink-0',
                active === i
                  ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/20'
                  : 'bg-surface-elevated text-[#8B97B5] border border-white/5 hover:text-white'
              )}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {content[active]}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── STATS ───────────────────────────────────────────────────────────────────

function Stats() {
  const { count: students, ref: r1 } = useCounter(2400)
  const { count: unis, ref: r2 } = useCounter(18)
  const { count: lectures, ref: r3 } = useCounter(14000)
  const { count: score, ref: r4 } = useCounter(84)

  const stats = [
    { ref: r1, value: students, suffix: '+', label: 'Active Students' },
    { ref: r2, value: unis, suffix: '', label: 'Universities' },
    { ref: r3, value: lectures, suffix: '+', label: 'Lectures Processed' },
    { ref: r4, value: score, suffix: '%', label: 'Avg Quiz Score Improvement' },
  ]

  return (
    <section className="py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="font-sora font-bold text-4xl text-white">
              <span ref={s.ref}>{s.value.toLocaleString()}</span>{s.suffix}
            </p>
            <p className="text-xs text-[#8B97B5] mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── PRICING ─────────────────────────────────────────────────────────────────

function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'semester'>('monthly')

  const plans = [
    {
      name: 'Free',
      price: 'KSh 0',
      tag: 'Get started',
      features: ['3 lectures lifetime', 'Full AI processing', 'Basic quiz generation', 'Offline access'],
      cta: 'Start Free',
      highlight: false,
      badge: null,
    },
    {
      name: 'Lite',
      price: billing === 'monthly' ? 'KSh 25–45' : 'KSh 25–45',
      tag: 'Per lecture',
      features: ['Pay per lecture', 'Full AI processing', 'Basic quiz generation', 'Offline access per lecture'],
      cta: 'Pay Per Lecture',
      highlight: true,
      badge: 'Most Popular',
    },
    {
      name: 'Plus',
      price: billing === 'monthly' ? 'KSh 250' : 'KSh 1,200',
      tag: billing === 'monthly' ? 'per month' : 'per semester',
      features: ['Unlimited lectures', 'SmartCapture AI', 'Semester planner', 'TTS narration', 'Weak area detection'],
      cta: 'Go Plus',
      highlight: false,
      badge: null,
    },
    {
      name: 'Pro',
      price: billing === 'monthly' ? 'KSh 450' : 'KSh 2,000',
      tag: billing === 'monthly' ? 'per month' : 'per semester',
      features: ['Everything in Plus', 'SnapSolve full AI', 'Exam prediction engine', 'Mock exams + marking', 'Priority AI processing'],
      cta: 'Go Pro',
      highlight: false,
      badge: null,
    },
    {
      name: 'Semester Pass',
      price: 'KSh 800',
      tag: 'per semester',
      features: ['Everything unlocked', 'Unlimited usage', 'Full exam prep engine', 'Priority processing', 'Offline exam packs'],
      cta: 'Best Value',
      highlight: false,
      badge: '🔥 Save 40%',
      amber: true,
    },
  ]

  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div {...fadeUp} className="text-center mb-12">
        <h2 className="font-sora font-bold text-4xl lg:text-5xl text-white">
          Study smarter.
          <br />
          <span className="text-[#8B97B5]">Pay less than a matatu ride.</span>
        </h2>
        <p className="text-[#8B97B5] mt-4">No subscription required to start. Pay only when you're ready.</p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-1 bg-surface-elevated border border-white/5 rounded-xl p-1 mt-6">
          {(['monthly', 'semester'] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize',
                billing === b ? 'bg-brand-blue text-white' : 'text-[#8B97B5] hover:text-white'
              )}
            >
              {b}
              {b === 'semester' && billing !== 'semester' && (
                <span className="ml-2 text-xs text-brand-green">Save 40%</span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {plans.map((p, i) => (
          <motion.div
            key={i}
            {...fadeUp}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={cn(
              'relative bg-surface-elevated rounded-2xl p-5 border flex flex-col transition-all duration-200',
              p.highlight
                ? 'border-brand-blue shadow-xl shadow-brand-blue/20 animate-glow-pulse'
                : (p as any).amber
                ? 'border-brand-amber/30'
                : 'border-white/5'
            )}
          >
            {p.badge && (
              <div className={cn(
                'absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap',
                p.highlight ? 'bg-brand-blue text-white' : 'bg-brand-amber text-surface-base'
              )}>
                {p.badge}
              </div>
            )}
            <div className="mb-4">
              <p className="text-xs text-[#8B97B5] font-mono uppercase tracking-wider">{p.name}</p>
              <p className="font-sora font-bold text-2xl text-white mt-1">{p.price}</p>
              <p className="text-xs text-[#4A5568]">{p.tag}</p>
            </div>
            <ul className="space-y-2 flex-1 mb-5">
              {p.features.map((f, fi) => (
                <li key={fi} className="flex items-start gap-2 text-xs text-[#8B97B5]">
                  <Check size={12} className="text-brand-green mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={cn(
              'w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
              p.highlight
                ? 'bg-brand-blue text-white hover:bg-brand-blue/90'
                : 'bg-surface-base border border-white/10 text-white hover:bg-white/5'
            )}>
              {p.cta}
            </button>
          </motion.div>
        ))}
      </div>

      <motion.p {...fadeUp} className="text-center text-xs text-[#4A5568] mt-8">
        All payments via M-Pesa or card · Subscriptions cancel anytime · KSh prices inclusive of applicable taxes
      </motion.p>
    </section>
  )
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────

function Testimonials() {
  const testimonials = [
    {
      quote: "I recorded 8 lectures in one week. By Sunday I had summaries, notes and quizzes for all of them. I've never felt this prepared before a CAT in my life.",
      name: 'Amina W.',
      course: '3rd Year Pharmacy',
      uni: 'University of Nairobi',
      initials: 'AW',
    },
    {
      quote: "SnapSolve on the KNEC past paper literally gave me model answers for every question. Studied the night before my final. Passed with a B+.",
      name: 'Brian K.',
      course: '2nd Year Engineering',
      uni: 'JKUAT',
      initials: 'BK',
    },
    {
      quote: "KSh 250 a month is cheaper than one photocopy session at the campus print shop. STUDIA Plus is genuinely undefeated.",
      name: 'Faith M.',
      course: '4th Year Business',
      uni: 'Strathmore University',
      initials: 'FM',
    },
  ]

  return (
    <section className="py-24 bg-surface-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="font-sora font-bold text-4xl lg:text-5xl text-white">
            From students who stopped failing.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="bg-surface-elevated border border-white/5 rounded-2xl p-6 border-l-4 border-l-brand-amber transition-all duration-200"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, si) => (
                  <Star key={si} size={12} className="text-brand-amber fill-brand-amber" />
                ))}
              </div>
              <p className="text-sm text-[#8B97B5] leading-relaxed italic mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue/40 to-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-xs font-medium text-white font-sora">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-[#4A5568]">{t.course} · {t.uni}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CAMPUS CTA ───────────────────────────────────────────────────────────────

function CampusCTA() {
  return (
    <section id="campus" className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
      <motion.div
        {...fadeUp}
        className="relative bg-gradient-to-br from-brand-blue/10 via-surface-elevated to-surface-elevated border border-brand-blue/20 rounded-3xl p-10 text-center overflow-hidden"
      >
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(79,142,247,0.2) 0%, transparent 60%), radial-gradient(circle at 70% 50%, rgba(124,58,237,0.15) 0%, transparent 60%)',
        }} />
        <div className="relative">
          <h2 className="font-sora font-bold text-3xl lg:text-4xl text-white mb-4">
            Bring STUDIA to your campus.
          </h2>
          <p className="text-[#8B97B5] max-w-xl mx-auto mb-8">
            We offer campus-wide licenses for universities, student unions, and academic departments. Give every student on your campus an AI study partner.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <button className="bg-brand-blue text-white font-medium px-6 py-3 rounded-xl text-sm hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20">
              Request a Demo
            </button>
            <button className="border border-white/10 text-white px-6 py-3 rounded-xl text-sm hover:bg-white/5 transition-all flex items-center gap-2">
              Learn More <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── FINAL CTA ───────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-32 text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/5 via-transparent to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-3xl" />
      <motion.div {...fadeUp} className="relative max-w-3xl mx-auto px-4 sm:px-6">
        <p className="font-mono text-sm text-[#8B97B5] uppercase tracking-widest mb-4">Don't wait</p>
        <h2 className="font-sora font-extrabold text-5xl lg:text-7xl text-white leading-tight mb-6">
          Your exams are
          <br />
          in{' '}
          <span className="text-brand-blue" style={{ textShadow: '0 0 60px rgba(79,142,247,0.5)' }}>
            12 weeks.
          </span>
        </h2>
        <p className="text-[#8B97B5] text-lg mb-10 max-w-xl mx-auto">
          Every lecture you don't process is a gap in your revision. Start now — it's free.
        </p>
        <button className="animate-glow-pulse inline-flex items-center gap-3 bg-brand-blue text-white font-semibold px-8 py-4 rounded-2xl text-base hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/30">
          <Mic size={18} />
          Record Your First Lecture — Free
          <ArrowRight size={18} />
        </button>
        <p className="text-xs text-[#4A5568] mt-5">
          No credit card. No M-Pesa until you're ready. Works on any phone.
        </p>
      </motion.div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-1">
              <span className="font-sora font-bold text-lg text-white">STUDIA</span>
              <sup className="text-brand-blue text-xs font-mono">β</sup>
            </div>
            <p className="text-xs text-[#8B97B5] leading-relaxed">
              Turn every lecture into smart study material. Made for Kenyan students. Built in Kenya.
            </p>
            <div className="flex items-center gap-3">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-lg border border-white/5 flex items-center justify-center text-[#8B97B5] hover:text-white hover:border-white/15 transition-all">
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-xs font-medium text-white uppercase tracking-wider mb-4">Product</p>
            <ul className="space-y-2.5">
              {['Features', 'Pricing', 'How It Works', 'Changelog', 'Roadmap'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#8B97B5] hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-medium text-white uppercase tracking-wider mb-4">Support</p>
            <ul className="space-y-2.5">
              {['Help Centre', 'Contact Us', 'Report a Bug', 'Terms of Service', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#8B97B5] hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Campus */}
          <div>
            <p className="text-xs font-medium text-white uppercase tracking-wider mb-4">Campus</p>
            <ul className="space-y-2.5">
              {['Campus Licensing', 'For Universities', 'Partner With Us', 'Student Unions'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#8B97B5] hover:text-white transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4A5568]">© 2025 STUDIA. All rights reserved.</p>
          <p className="text-xs text-[#4A5568]">KSh prices inclusive of applicable taxes</p>
        </div>
      </div>
    </footer>
  )
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────

export default function Landing() {
  return (
    <div className="min-h-screen bg-surface-base">
      <Navbar />
      <Hero />
      <Marquee />
      <Problem />
      <HowItWorks />
      <Features />
      <FeatureTabs />
      <Stats />
      <Pricing />
      <Testimonials />
      <CampusCTA />
      <FinalCTA />
      <Footer />
    </div>
  )
}
