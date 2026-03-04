import React from 'react';
import { motion } from 'motion/react';
import { User, Mail, ArrowRight } from 'lucide-react';

export default function AboutUs({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="max-w-2xl mx-auto py-24 px-6"
      dir="rtl"
    >
      <div className="bg-white rounded-[3rem] border border-zinc-200 shadow-2xl shadow-zinc-200/50 overflow-hidden">
        <div className="p-12 space-y-10 text-center">
          <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mx-auto shadow-xl shadow-zinc-200">
            <User className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">المطور</h2>
            <p className="text-4xl font-black text-zinc-900">oday qutqut</p>
          </div>

          <div className="h-px bg-zinc-100 w-24 mx-auto" />

          <div className="space-y-2">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-400">للتواصل</h2>
            <a 
              href="mailto:oday5qutqut@gmail.com" 
              className="text-2xl font-bold text-zinc-600 hover:text-zinc-900 transition-colors flex items-center justify-center gap-2"
            >
              <Mail className="w-6 h-6" />
              oday5qutqut@gmail.com
            </a>
          </div>

          <div className="pt-8">
            <button 
              onClick={onBack}
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-bold hover:bg-zinc-200 transition-all"
            >
              العودة للرئيسية
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
