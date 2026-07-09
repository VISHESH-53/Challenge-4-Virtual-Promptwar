export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-950">
      {/* Left side - Branding (Hidden on mobile) */}
      <div className="hidden md:flex flex-1 relative bg-slate-900 items-center justify-center overflow-hidden border-r border-white/5">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-950" />
        
        <div className="relative z-20 text-center px-12">
          <h2 className="text-fifa-gold tracking-widest uppercase text-sm font-bold mb-4">FIFA World Cup 2026™</h2>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Operational <br /> Intelligence
          </h1>
          <p className="text-slate-400 text-lg max-w-md mx-auto text-balance">
            Real-time monitoring, AI-driven insights, and command capabilities across all 16 host cities.
          </p>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-1/4 -left-20 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-emerald-600/20 rounded-full blur-3xl" />
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative z-10 w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
