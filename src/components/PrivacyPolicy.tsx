import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, FileLock2, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function PrivacyPolicy({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto py-12 px-6 space-y-12"
      dir="rtl"
    >
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-zinc-100 rounded-2xl mb-4">
          <ShieldCheck className="w-8 h-8 text-zinc-900" />
        </div>
        <h2 className="text-4xl font-black text-zinc-900">سياسة الخصوصية والأمان</h2>
        <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
          نحن ندرك تماماً حساسية العقود والقرارات التي تقوم بتحليلها. خصوصيتك وأمان بياناتك هي أولويتنا القصوى.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center">
            <Lock className="w-6 h-6 text-zinc-900" />
          </div>
          <h3 className="text-xl font-bold">تشفير البيانات</h3>
          <p className="text-zinc-600 leading-relaxed">
            يتم نقل جميع النصوص والبيانات عبر بروتوكولات تشفير آمنة (SSL/TLS). لا يتم تخزين نصوص العقود الخاصة بك في قواعد بياناتنا الدائمة.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center">
            <EyeOff className="w-6 h-6 text-zinc-900" />
          </div>
          <h3 className="text-xl font-bold">سرية التحليل</h3>
          <p className="text-zinc-600 leading-relaxed">
            يتم معالجة النصوص بواسطة نماذج الذكاء الاصطناعي بشكل لحظي. لا نقوم بمراجعة نصوصك يدوياً ولا نستخدمها لتدريب النماذج بشكل عام.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center">
            <Server className="w-6 h-6 text-zinc-900" />
          </div>
          <h3 className="text-xl font-bold">عدم الاحتفاظ بالسجلات</h3>
          <p className="text-zinc-600 leading-relaxed">
            بمجرد إغلاق الجلسة أو إعادة تعيين التحليل، يتم مسح النصوص المدخلة من الذاكرة المؤقتة للنظام لضمان عدم بقاء أي أثر لبياناتك الحساسة.
          </p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm space-y-4">
          <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center">
            <FileLock2 className="w-6 h-6 text-zinc-900" />
          </div>
          <h3 className="text-xl font-bold">التحكم الكامل</h3>
          <p className="text-zinc-600 leading-relaxed">
            أنت تملك بياناتك بالكامل. نحن نوفر لك الأداة للتحليل فقط، ولا ندعي أي ملكية أو حقوق في النصوص التي تقوم بإدخالها.
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 text-white p-10 rounded-[2.5rem] text-center space-y-6">
        <h3 className="text-2xl font-bold">التزامنا تجاهك</h3>
        <p className="text-zinc-400 max-w-xl mx-auto leading-relaxed">
          منصة OD مصممة لتكون ملاذاً آمناً لتحليل القرارات الصعبة. نحن نلتزم بأعلى معايير الأمان الرقمي لضمان بقاء أسرارك المهنية والشخصية طي الكتمان.
        </p>
        <button 
          onClick={onBack}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-zinc-900 rounded-2xl font-bold hover:bg-zinc-100 transition-all"
        >
          العودة للمحلل
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
