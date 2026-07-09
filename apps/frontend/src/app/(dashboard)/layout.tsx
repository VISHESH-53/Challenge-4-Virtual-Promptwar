'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Truck, 
  Leaf, 
  Users, 
  Briefcase, 
  Bot, 
  Settings,
  Bell,
  Search,
  Menu,
  Moon,
  Sun,
  MapPin
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAppStore } from '@/stores/app-store';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Security', href: '/dashboard/security', icon: ShieldAlert },
  { name: 'Logistics', href: '/dashboard/logistics', icon: Truck },
  { name: 'Sustainability', href: '/dashboard/sustainability', icon: Leaf },
  { name: 'Fan Experience', href: '/dashboard/fan', icon: Users },
  { name: 'Executive', href: '/dashboard/executive', icon: Briefcase },
  { name: 'AI Copilot', href: '/dashboard/copilot', icon: Bot },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        aria-label="Sidebar Navigation"
        initial={false}
        animate={{ width: sidebarCollapsed ? '80px' : '260px' }}
        className="hidden md:flex flex-col border-r border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/50 backdrop-blur-xl z-20 shrink-0"
      >
        <div className="h-16 flex items-center px-4 border-b border-slate-200 dark:border-white/10 justify-between shrink-0">
          {!sidebarCollapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-emerald-400"
            >
              FIFA GEN-AI
            </motion.span>
          )}
          <button 
            aria-label={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors mx-auto"
          >
            <Menu className="w-5 h-5 text-slate-500 dark:text-slate-400" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-custom">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.name} href={item.href}>
                <div className={cn(
                  "flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                  isActive 
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 font-medium" 
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-slate-200"
                )}>
                  {isActive && (
                    <motion.div 
                      layoutId="activeNav"
                      className="absolute left-0 top-1 bottom-1 w-1 bg-blue-600 dark:bg-blue-400 rounded-r-full"
                    />
                  )}
                  <item.icon className={cn("w-5 h-5 shrink-0", sidebarCollapsed ? "mx-auto" : "mr-3")} />
                  {!sidebarCollapsed && <span>{item.name}</span>}
                  
                  {/* Tooltip for collapsed state */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                      {item.name}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
        
        <div className="p-4 border-t border-slate-200 dark:border-white/10 shrink-0">
          <div className={cn(
            "flex items-center transition-all",
            sidebarCollapsed ? "justify-center" : "gap-3"
          )}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-emerald-400 p-0.5 shrink-0">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-xs font-bold">OP</span>
              </div>
            </div>
            {!sidebarCollapsed && (
              <div className="flex flex-col truncate">
                <span className="text-sm font-medium truncate">Operator</span>
                <span className="text-xs text-slate-500 truncate">Global Admin</span>
              </div>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-4 lg:px-8 z-10 shrink-0">
          {/* Mobile Menu Toggle (Visible only on small screens) */}
          <button className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-white/10 mr-2">
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-4 flex-1">
            {/* Global Search */}
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input 
                type="text" 
                aria-label="Global Search"
                placeholder="Search commands, venues, incidents... (Cmd+K)" 
                className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-black/50 border dark:border-white/10 focus:border-blue-500 rounded-lg text-sm transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Stadium Selector */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
              <MapPin className="w-4 h-4 text-slate-500" />
              <span className="font-medium">All Stadiums (16)</span>
            </div>

            {/* Theme Toggle */}
            {mounted && (
              <button 
                aria-label="Toggle Theme"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-slate-400" aria-hidden="true" /> : <Moon className="w-5 h-5 text-slate-600" aria-hidden="true" />}
              </button>
            )}

            {/* Notifications */}
            <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors relative">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-950" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main id="main-content" className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 relative" tabIndex={-1}>
           {/* Abstract Background pattern for dashboard area */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent pointer-events-none -z-10" />
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-7xl mx-auto h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>
      
      {/* Mobile Bottom Nav */}
      <div aria-label="Mobile Navigation" role="navigation" className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10 flex items-center justify-around z-50 px-2 pb-safe">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          return (
             <Link key={item.name} href={item.href} className={cn(
               "flex flex-col items-center justify-center w-full h-full space-y-1",
               isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-500"
             )}>
               <item.icon className="w-5 h-5" />
               <span className="text-[10px] font-medium">{item.name.split(' ')[0]}</span>
             </Link>
          )
        })}
      </div>
    </div>
  );
}
