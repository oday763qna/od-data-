/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Lightbulb, 
  TrendingUp,
  Loader2,
  AlertCircle,
  ArrowLeft,
  ClipboardList,
  RefreshCw,
  Info,
  Menu,
  X
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { analyzeText } from './services/geminiService';
import PrivacyPolicy from './components/PrivacyPolicy';
import HowItWorks from './components/HowItWorks';
import WelcomePage from './components/WelcomePage';
import AboutUs from './components/AboutUs';

type View = 'welcome' | 'main' | 'privacy' | 'how-it-works' | 'about';

export default function App() {
  const [view, setView] = useState<View>('welcome');
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [parsedSections, setParsedSections] = useState<{ id: string; title: string; icon: string }[]>([]);
  const resultRef = useRef<HTMLDivElement>(null);

  const parseAnalysis = (text: string) => {
    const sections = [
      { id: 'summary', title: 'ملخص', icon: '📌' },
      { id: 'strengths', title: 'نقاط القوة', icon: '⭐' },
      { id: 'risks', title: 'المخاطر المحتملة', icon: '⚠️' },
      { id: 'notes', title: 'ملاحظات هامة', icon: '💡' },
      { id: 'questions', title: 'أسئلة قبل القرار', icon: '❓' },
      { id: 'evaluation', title: 'التقييم النهائي', icon: '📊' },
    ];
    
    // Filter sections that actually appear in the text
    return sections.filter(s => text.includes(s.title) || text.includes(s.icon));
  };

  const handleAnalyze = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    setParsedSections([]);

    try {
      const result = await analyzeText(input);
      if (result) {
        setAnalysis(result);
        setParsedSections(parseAnalysis(result));
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        throw new Error("لم يتم إنشاء التحليل. يرجى المحاولة مرة أخرى.");
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (title: string) => {
    const elements = document.querySelectorAll('h1, h2, h3, strong, p');
    for (const el of Array.from(elements)) {
      if (el.textContent?.includes(title)) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Highlight effect
        (el as HTMLElement).style.backgroundColor = '#fef3c7';
        setTimeout(() => {
          (el as HTMLElement).style.backgroundColor = 'transparent';
        }, 2000);
        break;
      }
    }
  };

  const handleReset = () => {
    setInput('');
    setAnalysis(null);
    setError(null);
    setView('main');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-zinc-200 flex flex-col" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-200 px-4 sm:px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => setView('main')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-zinc-900 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-zinc-200">
              <span className="text-white font-bold text-xl sm:text-2xl tracking-tighter">OD</span>
            </div>
            <div className="text-right">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">منصة OD للتحليل</h1>
              <p className="text-[9px] sm:text-[10px] text-zinc-400 font-bold uppercase tracking-[0.2em]">Objective Decision Analysis</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-500">
            <button onClick={() => setView('how-it-works')} className={`hover:text-zinc-900 transition-colors ${view === 'how-it-works' ? 'text-zinc-900' : ''}`}>كيف يعمل؟</button>
            <button onClick={() => setView('privacy')} className={`hover:text-zinc-900 transition-colors ${view === 'privacy' ? 'text-zinc-900' : ''}`}>الخصوصية</button>
            <button onClick={() => setView('about')} className={`hover:text-zinc-900 transition-colors ${view === 'about' ? 'text-zinc-900' : ''}`}>من نحن</button>
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-zinc-100 transition-colors text-zinc-900 border border-transparent hover:border-zinc-200"
            >
              <RefreshCw className="w-4 h-4" />
              إعادة تعيين
            </button>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-zinc-100 mt-4 py-4 flex flex-col gap-4"
            >
              <button 
                onClick={() => { setView('how-it-works'); setIsMenuOpen(false); }}
                className="px-4 py-2 text-right font-semibold text-zinc-600 hover:bg-zinc-50 rounded-lg"
              >
                كيف يعمل؟
              </button>
              <button 
                onClick={() => { setView('privacy'); setIsMenuOpen(false); }}
                className="px-4 py-2 text-right font-semibold text-zinc-600 hover:bg-zinc-50 rounded-lg"
              >
                الخصوصية
              </button>
              <button 
                onClick={() => { setView('about'); setIsMenuOpen(false); }}
                className="px-4 py-2 text-right font-semibold text-zinc-600 hover:bg-zinc-50 rounded-lg"
              >
                من نحن
              </button>
              <button 
                onClick={() => { handleReset(); setIsMenuOpen(false); }}
                className="px-4 py-2 text-right font-semibold text-zinc-900 hover:bg-zinc-50 rounded-lg flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                إعادة تعيين
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {view === 'welcome' && (
            <WelcomePage 
              key="welcome" 
              onStart={() => setView('main')} 
              onHowItWorks={() => setView('how-it-works')} 
            />
          )}

          {view === 'main' && (
            <motion.div 
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12 sm:space-y-16"
            >
              {/* Hero Section */}
              <section className="text-center space-y-6 max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4"
                >
                  <Info className="w-3 h-3" />
                  تحليل ذكي مدعوم بالذكاء الاصطناعي
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-[1.1]"
                >
                  حلل قراراتك <br className="hidden sm:block" />
                  بكل <span className="text-zinc-400">احترافية.</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg sm:text-xl text-zinc-500 font-medium leading-relaxed"
                >
                  قم بتحليل العقود، عروض العمل، أو المقترحات المالية. احصل على تحليل منطقي للمخاطر، نقاط القوة، والأسئلة الجوهرية.
                </motion.p>
              </section>

              {/* Input Section */}
              <motion.section 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl shadow-zinc-200/50 border border-zinc-200 overflow-hidden"
              >
                <div className="p-6 sm:p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/30">
                  <div className="flex items-center gap-3 text-zinc-900 font-bold">
                    <ClipboardList className="w-5 h-5 text-zinc-400" />
                    <span>نص القرار أو العقد</span>
                  </div>
                  <div className="px-3 py-1 bg-white border border-zinc-200 rounded-lg text-[10px] font-mono text-zinc-400">
                    {input.length} حرف
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="الصق نص العقد، تفاصيل عرض العمل، أو سياق القرار هنا..."
                    className="w-full h-64 sm:h-80 p-4 sm:p-6 bg-zinc-50/50 rounded-2xl sm:rounded-3xl border border-zinc-200 focus:ring-4 focus:ring-zinc-900/5 focus:border-zinc-900 transition-all outline-none resize-none text-base sm:text-lg text-zinc-800 placeholder:text-zinc-300 leading-relaxed"
                  />
                  <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
                    <div className="grid grid-cols-2 sm:flex items-center gap-6 text-[10px] sm:text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4 text-zinc-300" />
                        ليس استشارة قانونية
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-zinc-300" />
                        تحليل منطقي محايد
                      </div>
                    </div>
                    <button
                      onClick={handleAnalyze}
                      disabled={isLoading || !input.trim()}
                      className="w-full lg:w-auto px-10 sm:px-12 py-4 sm:py-5 bg-zinc-900 text-white rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-zinc-900/20 active:scale-[0.98]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          جاري التحليل...
                        </>
                      ) : (
                        <>
                          ابدأ التحليل
                          <ArrowLeft className="w-6 h-6" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.section>

              {/* Error State */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-6 bg-red-50 border border-red-100 rounded-2xl sm:rounded-3xl flex items-center gap-4 text-red-700"
                  >
                    <AlertCircle className="w-6 h-6 flex-shrink-0" />
                    <p className="font-bold text-sm sm:text-base">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results Section */}
              <div ref={resultRef}>
                <AnimatePresence>
                  {analysis && (
                    <motion.section 
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-12"
                    >
                      <div className="flex items-center gap-6">
                        <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-zinc-300 whitespace-nowrap">نتائج التحليل المنطقي</h3>
                        <div className="h-px flex-1 bg-zinc-200" />
                      </div>

                      <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 items-start">
                        {/* Persistent Sidebar Navigator */}
                        <div className="xl:col-span-1 space-y-6 order-2 xl:order-1 sticky top-28">
                          <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm space-y-6">
                            <div className="flex items-center gap-2 text-zinc-400">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-[10px] font-black uppercase tracking-widest">ملاح التحليل</span>
                            </div>
                            
                            <div className="space-y-2">
                              {parsedSections.map((section) => (
                                <button
                                  key={section.id}
                                  onClick={() => scrollToSection(section.title)}
                                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 text-right transition-all group"
                                >
                                  <span className="text-lg group-hover:scale-125 transition-transform">{section.icon}</span>
                                  <span className="text-sm font-bold text-zinc-600 group-hover:text-zinc-900">{section.title}</span>
                                </button>
                              ))}
                            </div>

                            <div className="pt-6 border-t border-zinc-100">
                              <div className="bg-zinc-900 text-white p-6 rounded-2xl space-y-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">الحالة</span>
                                  <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">مكتمل</span>
                                </div>
                                <p className="text-xs leading-relaxed text-zinc-400 font-medium">
                                  تم تحليل كافة البنود المنطقية المتاحة في النص المدخل.
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm space-y-4">
                            <h4 className="text-sm font-black flex items-center gap-2 text-zinc-900">
                              <Lightbulb className="w-5 h-5 text-amber-500" />
                              نصيحة سريعة
                            </h4>
                            <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                              استخدم الروابط أعلاه للتنقل بسرعة بين أقسام التحليل المختلفة.
                            </p>
                          </div>
                        </div>

                        {/* Main Content */}
                        <div className="xl:col-span-3 space-y-8 order-1 xl:order-2">
                          <div className="bg-white p-6 sm:p-10 lg:p-12 rounded-[2rem] sm:rounded-[2.5rem] border border-zinc-200 shadow-xl shadow-zinc-200/30 prose prose-zinc max-w-none">
                            <div className="markdown-body">
                              <ReactMarkdown>{analysis}</ReactMarkdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.section>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {view === 'privacy' && (
            <PrivacyPolicy key="privacy" onBack={() => setView('main')} />
          )}

          {view === 'how-it-works' && (
            <HowItWorks key="how-it-works" onBack={() => setView('main')} />
          )}

          {view === 'about' && (
            <AboutUs key="about" onBack={() => setView('main')} />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 mt-auto py-12 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4 opacity-40">
            <div className="w-8 h-8 bg-zinc-900 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xs">OD</span>
            </div>
            <span className="text-sm font-black tracking-tighter">Objective Decision</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-xs text-zinc-400 font-medium text-center md:text-right">
              © {new Date().getFullYear()} جميع الحقوق محفوظة لمنصة OD للتحليل.
            </p>
            <div className="flex items-center gap-6 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
              <button onClick={() => setView('main')} className="hover:text-zinc-900 transition-colors">الرئيسية</button>
              <button onClick={() => setView('how-it-works')} className="hover:text-zinc-900 transition-colors">كيف يعمل؟</button>
              <button onClick={() => setView('privacy')} className="hover:text-zinc-900 transition-colors">الخصوصية</button>
              <button onClick={() => setView('about')} className="hover:text-zinc-900 transition-colors">من نحن</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
