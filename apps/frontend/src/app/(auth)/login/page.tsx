'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Shield, ArrowRight, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 relative overflow-hidden"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-blue-500/30 rounded-tl-xl m-1" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-blue-500/30 rounded-br-xl m-1" />

        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-blue-500/10 rounded-xl mb-4 ring-1 ring-blue-500/20">
            <Shield className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Secure Access</h1>
          <p className="text-slate-400 text-sm mt-2 text-center">
            Authenticate to access the FIFA 2026 Command Center
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300" htmlFor="email">
              Official Email
            </label>
            <input
              {...register('email')}
              id="email"
              type="email"
              placeholder="operator@fifa.org"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white placeholder:text-slate-500"
            />
            {errors.email && (
              <p className="text-rose-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300" htmlFor="password">
                Passcode
              </label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Forgot?
              </a>
            </div>
            <input
              {...register('password')}
              id="password"
              type="password"
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-white"
            />
            {errors.password && (
              <p className="text-rose-400 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-all hover:shadow-glow-blue disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Initialize Session
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-slate-500">
          <p>Protected by Enterprise Zero Trust Architecture</p>
          <p>UNAUTHORIZED ACCESS IS PROHIBITED</p>
        </div>
      </motion.div>
    </div>
  );
}
