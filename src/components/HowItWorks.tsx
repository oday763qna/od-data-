import React from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Cpu, FileSearch, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HowItWorks({ onBack }: { onBack: () => void }) {
  const steps = [
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: "إدخال النص",
      description: "قم بلصق نص العقد أو تفاصيل القرار الذي ترغب في تحليله في منطقة الإدخال المخصصة."
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "المعالجة الذكية",
      description: "يقوم محرك OD المدعوم بالذكاء الاصطناعي بقراءة النص وتحليله منطقياً بناءً على آلاف الأنماط القانونية والمهنية."
    },
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "استخراج الرؤى",
      description: "يتم استخراج نقاط القوة، المخاطر المحتملة، والبنود الغامضة التي قد تحتاج إلى توضيح."
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "الأسئلة الجوهرية",
      description: "يقترح النظام مجموعة من الأسئلة التي يجب عليك طرحها على الطرف الآخر قبل التوقيع أو اتخاذ القرار."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-5xl mx-auto py-12 px-6 space-y-16"
      dir="rtl"
    >
      <div className="text-center space-y-4">
        <h2 className="text-4xl sm:text-5xl font-black text-zinc-900">كيف تعمل منصة OD؟</h2>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
          نحن نستخدم تقنيات متقدمة في معالجة اللغة الطبيعية لتحويل النصوص المعقدة إلى رؤى بسيطة وقابلة للتنفيذ.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <div key={index} className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-zinc-50 font-black text-8xl group-hover:text-zinc-100 transition-colors">
              {index + 1}
            </div>
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 bg-zinc-900 text-white rounded-xl flex items-center justify-center shadow-lg">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold">{step.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-50 rounded-[3rem] p-10 sm:p-16 border border-zinc-200 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold">لماذا تختار OD؟</h3>
            <div className="space-y-4">
              {[
                "تحليل منطقي محايد بعيداً عن العواطف.",
                "توفير الوقت في قراءة البنود الطويلة والمعقدة.",
                "تنبيهات فورية للمخاطر التي قد تغفل عنها.",
                "واجهة سهلة الاستخدام تدعم جميع الأجهزة."
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-zinc-900" />
                  <span className="font-medium text-zinc-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-500">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider">تنبيه هام</span>
            </div>
            <p className="text-zinc-600 leading-relaxed text-sm">
              منصة OD هي أداة مساعدة للتحليل المنطقي وليست بديلاً عن الاستشارة القانونية المتخصصة. نحن نساعدك على فهم "ماذا يوجد في النص" وكيف يؤثر ذلك على قرارك من منظور منطقي وعملي.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-900/20"
        >
          ابدأ التحليل الآن
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}
