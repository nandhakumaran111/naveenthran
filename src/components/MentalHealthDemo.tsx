import React, { useState } from 'react';
import { motion } from 'motion/react';
import { AlertCircle, BrainCircuit, CheckCircle2, ShieldCheck, HeartPulse, Info, HelpCircle } from 'lucide-react';

interface SentimentReport {
  sentimentScore: number; // 0 to 100
  distressProbability: number; // 0 to 100
  anxietyMarkers: string[];
  engagementDensity: number; // typical posting behavior index
  status: 'optimal' | 'mild' | 'distress';
  highlights: { word: string; category: 'negative' | 'positive' | 'neutral' }[];
}

export default function MentalHealthDemo() {
  const [inputText, setInputText] = useState('Feeling incredibly exhausted and overwhelmed. Hard to sleep, feeling completely isolated these days.');
  const [report, setReport] = useState<SentimentReport | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const presets = [
    {
      label: 'Distress Indicator',
      text: 'Lately I can\'t sleep properly. Everything feels so hollow and lonely, like nobody really understands what I am going through.'
    },
    {
      label: 'Optimal / Balanced',
      text: 'Had an amazing weekend collaborating with the team! Excited about the research breakthroughs we made in machine learning.'
    },
    {
      label: 'Mild Anxiety Marker',
      text: 'So stressed about the upcoming finals and project submissions. Trying to keep up but my anxiety levels are creeping up.'
    }
  ];

  const processText = (textToProcess: string) => {
    setIsProcessing(true);
    setError(null);
    
    setTimeout(() => {
      const lower = textToProcess.toLowerCase();
      
      // Basic dictionaries
      const negativeWords = ['exhausted', 'overwhelmed', 'sleep', 'isolated', 'lonely', 'hollow', 'stressed', 'anxiety', 'sad', 'empty', 'helpless', 'alone'];
      const positiveWords = ['amazing', 'excited', 'breakthroughs', 'collaborating', 'happy', 'productive', 'good', 'success', 'love', 'perfect'];
      
      const words = textToProcess.split(/\s+/);
      const highlights = words.map(w => {
        const cleanWord = w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").toLowerCase();
        if (negativeWords.includes(cleanWord)) {
          return { word: w, category: 'negative' as const };
        } else if (positiveWords.includes(cleanWord)) {
          return { word: w, category: 'positive' as const };
        } else {
          return { word: w, category: 'neutral' as const };
        }
      });

      const negCount = highlights.filter(h => h.category === 'negative').length;
      const posCount = highlights.filter(h => h.category === 'positive').length;

      let score = 50; // default medium
      if (posCount > negCount) score = 70 + (posCount * 5);
      else if (negCount > posCount) score = 40 - (negCount * 12);
      
      score = Math.max(5, Math.min(95, score)); // clamp

      const distressProbability = Math.max(0, Math.min(100, 100 - score));
      
      let status: 'optimal' | 'mild' | 'distress' = 'optimal';
      if (distressProbability > 65) status = 'distress';
      else if (distressProbability > 35) status = 'mild';

      const anxietyMarkers = highlights
        .filter(h => h.category === 'negative')
        .map(h => h.word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""))
        .filter((v, i, self) => self.indexOf(v) === i);

      setReport({
        sentimentScore: score,
        distressProbability,
        anxietyMarkers,
        engagementDensity: score > 60 ? 82 : score < 30 ? 34 : 58,
        status,
        highlights
      });
      setIsProcessing(false);
    }, 900);
  };

  const [error, setError] = useState<string | null>(null);

  const getStatusDetails = (status: 'optimal' | 'mild' | 'distress') => {
    switch (status) {
      case 'distress':
        return {
          bg: 'bg-red-500/10 border-red-500/20 text-red-200',
          headingColor: 'text-red-300',
          badgeBg: 'bg-red-500/20 text-red-205 border border-red-500/30',
          label: 'Linguistic Distress Markers Detected',
          icon: AlertCircle,
          desc: 'Our NLP analyzer flagged significant expression style markers highly correlated with elevated psychological stress / fatigue levels. Recommended approach includes quiet hours, digital detox, or personal touchpoints.'
        };
      case 'mild':
        return {
          bg: 'bg-amber-500/10 border-amber-500/20 text-amber-200',
          headingColor: 'text-amber-300',
          badgeBg: 'bg-amber-500/20 text-amber-205 border border-amber-500/30',
          label: 'Mild Anxiety Indicators',
          icon: HelpCircle,
          desc: 'Moderate level flags typical of academic or timeline stress. Normal coping ranges exist, but early intervention such as structural breaks can alleviate further elevation.'
        };
      case 'optimal':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-200',
          headingColor: 'text-emerald-300',
          badgeBg: 'bg-emerald-500/20 text-emerald-205 border border-emerald-500/30',
          label: 'Balanced Sentiment Expressed',
          icon: CheckCircle2,
          desc: 'Healthy emotional distribution, forward-looking terminology, and resilient structures. Indicates robust active engagement and adaptive coping indicators.'
        };
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl text-slate-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 px-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-[9px] font-semibold tracking-wider whitespace-nowrap">
              PROJECT WORKSPACE
            </span>
            <span className="inline-block text-[9px] bg-emerald-500/10 border border-emerald-550/20 text-emerald-300 font-semibold px-2 py-0.5 rounded-full">
              Full Analyzer Simulation
            </span>
          </div>
          <h3 className="font-sans text-lg font-medium text-white flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-blue-400" />
            Social Media Linguistic Distress Analyzer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Demonstrates sentiment metrics, natural language structures matching, and risk evaluation index vectors.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input box */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-2 font-mono uppercase tracking-widest">
              PRESET SOCIO-EXPRESSIVE PHRASES
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {presets.map((p, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setInputText(p.text);
                    if (report) setReport(null);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-lg border font-medium cursor-pointer transition-all ${
                    inputText === p.text 
                      ? 'bg-white/15 border-white/20 text-white shadow-inner' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 mb-2 font-mono uppercase tracking-widest">
              CUSTOM LINGUISTIC TEXT INPUT
            </label>
            <textarea
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type a simulated social media post expression..."
              className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-xs focus:ring-1 focus:ring-white/20 focus:border-white/20 focus:outline-none leading-relaxed text-slate-200 placeholder:text-slate-500"
            />
          </div>

          <button
            type="button"
            disabled={!inputText.trim() || isProcessing}
            onClick={() => processText(inputText)}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl py-3 text-xs font-semibold hover:opacity-90 cursor-pointer shadow-md transition-all disabled:opacity-50"
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running Sentiment Parser Model...</span>
              </div>
            ) : (
              <>
                <BrainCircuit className="h-4 w-4" />
                <span>Execute NLP Diagnostic Parse</span>
              </>
            )}
          </button>
        </div>

        {/* Results display */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          {report ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Highlight board */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold text-slate-450 block mb-2 font-mono uppercase tracking-widest">
                  Semantic Token Classification
                </span>
                <div className="flex flex-wrap gap-1 leading-relaxed text-xs text-slate-300">
                  {report.highlights.map((h, i) => (
                    <span
                      key={i}
                      className={`inline-block px-1.5 py-0.5 rounded font-mono font-medium ${
                        h.category === 'negative' 
                          ? 'bg-red-500/20 text-red-300 border border-red-500/35' 
                          : h.category === 'positive'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/35'
                          : 'text-slate-300 bg-white/5'
                      }`}
                    >
                      {h.word}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid indices */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 bg-white/5 border border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 block font-mono uppercase tracking-wider">
                    Positive Sentiment %
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-xl font-bold font-mono tracking-tight text-white animate-pulse">
                      {report.sentimentScore}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Score</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-emerald-400 h-full transition-all duration-500" 
                      style={{ width: `${report.sentimentScore}%` }} 
                    />
                  </div>
                </div>

                <div className="p-3.5 bg-white/5 border border-white/5 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 block font-mono uppercase tracking-wider">
                    Distress Probability %
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-xl font-bold font-mono tracking-tight text-white">
                      {report.distressProbability}%
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">Risk Index</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className="bg-blue-400 h-full transition-all duration-500" 
                      style={{ width: `${report.distressProbability}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Distress diagnosis banner */}
              {(() => {
                const details = getStatusDetails(report.status);
                const Icon = details.icon;
                return (
                  <div className={`p-4 rounded-xl border ${details.bg}`}>
                    <div className="flex items-start gap-3">
                      <Icon className="h-5 w-5 shrink-0 mt-0.5 text-inherit" />
                      <div>
                        <span className={`inline-block text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-md ${details.badgeBg}`}>
                          {details.label}
                        </span>
                        <p className="text-xs text-slate-200 font-medium leading-relaxed mt-2">
                          {details.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Disclaimer */}
              <div className="flex items-center gap-2 p-2.5 bg-white/5 text-[10px] text-slate-450 border border-white/5 rounded-lg">
                <ShieldCheck className="h-4 w-4 text-slate-450 shrink-0" />
                <span>
                  <strong>Ethical AI Guard:</strong> This simulator represents a non-clinical evaluation demo of semantic classification sequences, emphasizing structural safety and local protocol limits.
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-white/5">
              <BrainCircuit className="h-8 w-8 text-slate-500 mb-2.5 animate-pulse" />
              <p className="text-xs font-semibold text-slate-350">Ready to Analyze Sentiment Sequence</p>
              <p className="text-[11px] text-slate-400 max-w-xs mt-1">
                Select a preset phrase on the left, or input a custom statement to execute semantic NLP metrics parsing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
