import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scale, HelpCircle, ArrowRight, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

interface LegalClause {
  article: string;
  source: string;
  relevance: number; // confidence score %
  formalClause: string;
  simpleExplanation: string;
}

export default function JudicialBotDemo() {
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);
  const [resReport, setResReport] = useState<LegalClause | null>(null);

  const topics = [
    {
      id: 'labor',
      label: 'Labor Leases & Hours Act',
      query: 'What counts as formal maximum hours and overtime entitlements under labor laws?',
      clause: {
        article: 'Article 43 - Working Standard Code',
        source: 'National Labor Act, Sec 2-A',
        relevance: 96,
        formalClause: 'Except as otherwise provided herein, no employer shall require or permit an employee to work more than forty-eight (48) hours in any aggregate workweek, unless compensation for excess terms is computed at not less than one and one-half (1.5x) times the regular rate.',
        simpleExplanation: 'Standard working shifts should not exceed 48 hours per week. Any additional hours must be compensated at an overtime rate that is at least 1.5 times your regular hourly pay.'
      }
    },
    {
      id: 'contract',
      label: 'Contract Breach Remedies',
      query: 'What conditions exist to terminate a lease or digital contract upon non-compliance?',
      clause: {
        article: 'Article 112 - Clause of Rescission',
        source: 'Unilateral Agreements & Obligations Act',
        relevance: 92,
        formalClause: 'A party may demand reciprocal rescission of obligations where a material breach prevents execution of primary conditions, subject to notice requirements and restitution of gains to status quo ante.',
        simpleExplanation: 'If one party fails to do what they promised, the other can legally end the contract and demand that things be returned to their original state, provided formal notice was given first.'
      }
    },
    {
      id: 'consumer',
      label: 'Digital Consumer Protection',
      query: 'How are online buyers protected from misleading specifications or faulty items?',
      clause: {
        article: 'Article 18 - E-Commerce Guarantee Rights',
        source: 'Consumer Protection Framework (2019)',
        relevance: 98,
        formalClause: 'Digital retail channels holding online sales platforms are strictly liable for product conformity. Consumers maintain a statutory cooling-off period of fourteen (14) days to cancel and refund non-conforming items.',
        simpleExplanation: 'When you buy things online, the seller must deliver exactly what was advertised. Under consumer rights, you have a 14-day statutory period to return non-conforming goods for a full refund.'
      }
    }
  ];

  const handleSelectTopic = (id: string) => {
    const topic = topics.find(t => t.id === id);
    if (!topic) return;
    
    setSelectedTopic(topic.label);
    setIsSearching(true);
    setResReport(null);

    // Simulate database lookup & RAG clause retrieval
    setTimeout(() => {
      setResReport(topic.clause);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl text-slate-100 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 px-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-mono text-[9px] font-semibold tracking-wider uppercase">
              KNOWLEDGE RECOVERY ENGINE
            </span>
            <span className="inline-block text-[9px] bg-indigo-500/10 border border-indigo-550/20 text-indigo-300 font-semibold px-2 py-0.5 rounded-full">
              RAG Vector Match
            </span>
          </div>
          <h3 className="font-sans text-lg font-medium text-white flex items-center gap-2">
            <Scale className="h-5 w-5 text-indigo-400" />
            Judicial Reference Query Parser
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Demonstrates specialized semantic retrieval, matching formal legal documents against layman queries.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Topics listing */}
        <div className="lg:col-span-5 space-y-3">
          <label className="block text-[10px] font-bold text-slate-450 font-mono uppercase tracking-widest">
            Select Legal Inquiry Scenario
          </label>
          <div className="flex flex-col gap-2">
            {topics.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTopic(t.id)}
                className={`flex flex-col text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  selectedTopic === t.label
                    ? 'bg-white/10 border-indigo-400 border-l-4 text-white'
                    : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-xs text-white">
                  <Scale className="h-3.5 w-3.5 text-indigo-400" />
                  <span>{t.label}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-2">
                  "{t.query}"
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Query response workspace */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          {isSearching ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12">
              <div className="w-5 h-5 border-2 border-indigo-450 border-t-indigo-400 rounded-full animate-spin mb-3" />
              <p className="text-xs font-semibold text-slate-350">Retrieving Statutory Context...</p>
              <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase">Query vector embedding lookup &amp; RAG scan</p>
            </div>
          ) : resReport ? (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              {/* RAG statistics metadata */}
              <div className="flex items-center justify-between p-2.5 bg-white/5 border border-white/5 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-indigo-400" />
                  <span className="text-[10px] font-semibold text-slate-400">Retrieval Accuracy Index</span>
                </div>
                <span className="text-[10px] font-bold font-mono text-indigo-300 bg-indigo-500/25 border border-indigo-500/30 px-2 py-0.5 rounded-md">
                  {resReport.relevance}% Cosine Link
                </span>
              </div>

              {/* Formal clause board */}
              <div className="border border-white/10 rounded-xl overflow-hidden shadow-md">
                <div className="bg-slate-900 text-slate-100 px-4 py-2.5 flex items-center justify-between text-[11px] font-medium font-mono">
                  <span className="flex items-center gap-1.5 text-indigo-300">
                    <BookOpen className="h-3.5 w-3.5 text-slate-300" />
                    {resReport.article}
                  </span>
                  <span className="text-[10px] text-slate-400">{resReport.source}</span>
                </div>
                <div className="p-4 bg-white/5 text-xs italic text-slate-300 leading-relaxed font-mono">
                  "{resReport.formalClause}"
                </div>
              </div>

              {/* Translation simplified */}
              <div className="p-4 bg-gradient-to-r from-indigo-950/40 to-indigo-900/10 border border-indigo-500/20 rounded-xl">
                <h4 className="text-xs font-bold text-indigo-350 flex items-center gap-2 mb-2 font-sans">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  Simplified Translation / Judicial Guidance:
                </h4>
                <p className="text-xs text-slate-250 leading-relaxed">
                  {resReport.simpleExplanation}
                </p>
              </div>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-8 text-center bg-white/5">
              <Scale className="h-8 w-8 text-slate-500 mb-2.5 animate-pulse" />
              <p className="text-xs font-semibold text-slate-350">RAG Simulator Ready</p>
              <p className="text-[11px] text-slate-400 max-w-xs mt-1">
                Select one of the legal inquire scenarios on the left. The system will retrieve relevant legal code articles and translate them into friendly guidelines.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
