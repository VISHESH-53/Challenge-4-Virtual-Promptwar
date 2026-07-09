'use client';

import { motion } from 'framer-motion';

export default function CrowdChart() {
  return (
    <div className="absolute inset-0 p-8 flex items-end gap-2 opacity-80">
      {[40, 70, 45, 90, 65, 80, 55, 75, 40, 60, 85, 50].map((h, i) => (
        <motion.div 
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 1, delay: i * 0.05 }}
          className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm"
        />
      ))}
    </div>
  );
}
