'use client';

import { motion } from 'framer-motion';
import { Users, AlertTriangle, Zap, Activity, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import dynamic from 'next/dynamic';

const CrowdChart = dynamic(() => import('@/components/crowd-chart'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium">Chart Visualization Loading...</div>
});

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

import { useMemo } from 'react';

export default function DashboardOverview() {
  const currentDate = useMemo(() => format(new Date(), 'EEEE, MMMM do, yyyy'), []);

  return (
    <div className="space-y-6 pb-20 md:pb-0">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Global Overview</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{currentDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Systems Nominal
          </span>
          <span className="px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-medium border border-blue-500/20 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> AI Copilot Active
          </span>
        </div>
      </div>

      {/* KPI Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <motion.div variants={item} className="glass-card p-5 card-hover">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Attendance</p>
              <p className="text-3xl font-bold">1.2M</p>
            </div>
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+12%</span>
            <span className="text-slate-500 ml-2">vs yesterday</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card p-5 card-hover relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-bl-full -mr-4 -mt-4 blur-xl" />
          <div className="flex justify-between items-start relative z-10">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Incidents</p>
              <p className="text-3xl font-bold">24</p>
            </div>
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="px-2 py-0.5 rounded text-xs font-medium bg-rose-500/10 text-rose-500 mr-2 border border-rose-500/20">3 Critical</span>
            <span className="text-slate-500">Requires attention</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card p-5 card-hover">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Energy Efficiency</p>
              <p className="text-3xl font-bold">92%</p>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Leaf className="w-5 h-5 text-emerald-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
            <span className="text-emerald-500 font-medium">+2.4%</span>
            <span className="text-slate-500 ml-2">AI optimized</span>
          </div>
        </motion.div>

        <motion.div variants={item} className="glass-card p-5 card-hover">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">System Health</p>
              <p className="text-3xl font-bold">99.9%</p>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-slate-500">All 16 venues reporting</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content Area Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Chart Area placeholder */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg">Cross-Venue Crowd Dynamics</h3>
            <div className="px-3 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-sm">Live Feed</div>
          </div>
          <div className="flex-1 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20 flex items-center justify-center relative overflow-hidden">
             <CrowdChart />
          </div>
        </div>

        {/* AI Insight Feed placeholder */}
        <div className="glass-card rounded-xl p-6 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-500" /> AI Insights
            </h3>
          </div>
          <div className="flex-1 space-y-4">
            {/* Skeleton list items */}
            {useMemo(() => [1, 2, 3, 4], []).map((i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex gap-3">
                 <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                 <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-200 dark:bg-white/10 rounded w-3/4 animate-pulse" />
                    <div className="h-3 bg-slate-200 dark:bg-white/10 rounded w-full animate-pulse" />
                    <div className="h-3 bg-slate-200 dark:bg-white/10 rounded w-1/2 animate-pulse" />
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
