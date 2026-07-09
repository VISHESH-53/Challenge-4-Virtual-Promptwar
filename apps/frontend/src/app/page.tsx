'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Globe } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 flex flex-col items-center justify-center">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
      
      {/* Particles/Grid illusion */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-4xl px-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
          className="p-4 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md"
        >
          <Globe className="w-16 h-16 text-blue-400" strokeWidth={1.5} />
        </motion.div>

        <div className="space-y-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-fifa-gold uppercase tracking-[0.3em] font-semibold text-sm"
          >
            FIFA World Cup 2026™
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-white"
          >
            Smart Stadium <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-blue-400 animate-shimmer bg-[length:200%_auto]">
              GenAI Command Center
            </span>
          </motion.h1>
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-slate-400 text-lg md:text-xl max-w-2xl text-balance"
        >
          Enterprise-grade operational intelligence powered by real-time analytics, digital twins, and artificial intelligence for all 16 host cities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="pt-8"
        >
          <Link href="/login" className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 ease-in-out rounded-full bg-blue-600 hover:bg-blue-500 hover:shadow-glow-blue overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">
              Enter Command Center
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Decorative blurred orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full mix-blend-screen filter blur-[128px] animate-float" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}
