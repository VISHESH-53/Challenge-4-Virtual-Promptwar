'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Frontend Error:', error);
  }, [error]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card flex max-w-md flex-col items-center space-y-6 rounded-2xl p-8 shadow-2xl border-rose-500/20"
      >
        <div className="rounded-full bg-rose-500/10 p-4">
          <AlertTriangle className="h-12 w-12 text-rose-500" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            System Fault Detected
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The command center encountered an unexpected rendering error. 
            Our monitoring systems have logged the fault.
          </p>
        </div>

        <button
          onClick={() => reset()}
          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition-all hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          <RefreshCcw className="h-4 w-4 transition-transform group-hover:rotate-180" />
          Reinitialize Subsystem
        </button>
      </motion.div>
    </div>
  );
}
