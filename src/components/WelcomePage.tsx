import React from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Target, 
  MessageSquareQuote, 
  CheckCircle2,
  FileText,
  Briefcase,
  Scale
} from 'lucide-react';

interface WelcomePageProps {
  onStart: () => void;
  onHowItWorks: () => void;
}

export default function WelcomePage({ onStart, onHowItWorks }: WelcomePageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-6 space-y-16"
      dir="rtl"
    >
      {/* Hero Section */}
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] mb-4 shadow-xl shadow-zinc-200"
        >
          <Zap className="w-3 h-3 text-amber-400 fill-amber-400" />
          المنصة العربية الأولى والفضل
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl sm:text-7xl font-black tracking-tight text-zinc-900 leading-[1.1]"
        >
          مستقبلك يبدأ بقرار <br />
          <span className="text-zinc-400">مدروس ومنطقي.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl sm:text-2xl text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed"
        >
          مرحباً بك في **OD**، أفضل منصة عربية مدعومة بالذكاء الاصطناعي لتحليل العقود والقرارات المصيرية بكل حيادية واحترافية.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-12 py-5 bg-zinc-900 text-white rounded-2xl font-bold text-xl flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all shadow-2xl shadow-zinc-900/20 active:scale-95"
          >
            ابدأ التحليل الآن
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={onHowItWorks}
            className="w-full sm:w-auto px-12 py-5 bg-white text-zinc-900 border border-zinc-200 rounded-2xl font-bold text-xl hover:bg-zinc-50 transition-all active:scale-95"
          >
            اكتشف المميزات
          </button>
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
        <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6">
            <Scale className="w-7 h-7 text-zinc-900" />
          </div>
          <h3 className="text-2xl font-bold mb-3">تحليل العقود</h3>
          <p className="text-zinc-500 leading-relaxed font-medium">
            سواء كان عقد إيجار، توظيف، أو شراكة، نقوم بتفكيك البنود المعقدة وتوضيح التزاماتك وحقوقك.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6">
            <Briefcase className="w-7 h-7 text-zinc-900" />
          </div>
          <h3 className="text-2xl font-bold mb-3">عروض العمل</h3>
          <p className="text-zinc-500 leading-relaxed font-medium">
            نحلل عروض العمل والمزايا الوظيفية لنخبرك إذا كان العرض يتناسب مع طموحاتك ويخلو من الثغرات.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-14 h-14 bg-zinc-50 rounded-2xl flex items-center justify-center mb-6">
            <ShieldCheck className="w-7 h-7 text-zinc-900" />
          </div>
          <h3 className="text-2xl font-bold mb-3">خصوصية مطلقة</h3>
          <p className="text-zinc-500 leading-relaxed font-medium">
            بياناتك وعقودك مشفرة بالكامل ولا يتم تخزينها. نحن نضمن لك بيئة آمنة تماماً لتحليلاتك الحساسة.
          </p>
        </div>
      </div>

      {/* Social Proof / Trust */}
      <div className="w-full max-w-4xl mx-auto bg-zinc-50 rounded-[3rem] p-10 border border-zinc-200 flex flex-col items-center gap-8">
        <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-[0.3em]">
          <Target className="w-4 h-4" />
          لماذا نحن الأفضل؟
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {[
            { label: "دقة منطقية", value: "99%" },
            { label: "لغة عربية", value: "100%" },
            { label: "سرية تامة", value: "مضمونة" },
            { label: "تحليل فوري", value: "ثوانٍ" }
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="text-3xl font-black text-zinc-900">{stat.value}</div>
              <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Style Quote */}
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <MessageSquareQuote className="w-10 h-10 text-zinc-200 mx-auto" />
        <p className="text-2xl font-medium text-zinc-700 leading-relaxed italic">
          "هدفنا هو تمكين الفرد العربي من فهم ما يوقعه، وحمايته من الثغرات القانونية والمنطقية في عالم يزداد تعقيداً."
        </p>
        <div className="flex items-center justify-center gap-2 text-sm font-bold text-zinc-400">
          <CheckCircle2 className="w-4 h-4 text-zinc-900" />
          فريق تطوير OD
        </div>
      </div>
    </motion.div>
  );
}
