import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Terminal, Layers, Network, HardDrive, Check, Copy } from 'lucide-react';
import { Skill } from '../types';

interface SkillGridProps {
  skills: Skill[];
}

export default function SkillGrid({ skills }: SkillGridProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(skills[0]);
  const [copied, setCopied] = useState(false);

  const getIcon = (category: string) => {
    switch (category) {
      case 'Language':
        return Code2;
      case 'Concept':
        return Network;
      case 'Platform':
        return HardDrive;
      default:
        return Terminal;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
      {/* Skill List Left */}
      <div className="lg:col-span-5 space-y-3">
        {skills.map((skill) => {
          const Icon = getIcon(skill.category);
          const isSelected = selectedSkill?.name === skill.name;
          return (
            <button
              key={skill.name}
              onClick={() => setSelectedSkill(skill)}
              className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-white/15 border-white/30 text-white shadow-lg'
                  : 'bg-white/5 border-white/5 text-slate-450 hover:border-white/10 hover:bg-white/5 hover:text-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span className="font-sans text-xs font-bold leading-none">{skill.name}</span>
                </div>
                <span className={`font-mono text-xs ${isSelected ? 'text-indigo-300 font-bold' : 'text-slate-400 font-semibold'}`}>
                  {skill.level}%
                </span>
              </div>
              
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2.5 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.5 }}
                  className={`h-full ${isSelected ? 'bg-gradient-to-r from-blue-400 to-indigo-400' : 'bg-slate-700'}`} 
                />
              </div>
              <p className={`text-[11px] leading-relaxed mt-2.5 ${isSelected ? 'text-slate-200' : 'text-slate-400'}`}>
                {skill.description}
              </p>
            </button>
          );
        })}
      </div>

      {/* Code / Details Preview Panel Right */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          {selectedSkill ? (
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col h-full bg-slate-950/80 rounded-2xl overflow-hidden border border-white/15 shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-slate-400 font-semibold uppercase tracking-wider">{selectedSkill.name} Blueprint Snippet</span>
                </div>
                {selectedSkill.codeSnippet && (
                  <button
                    onClick={() => copyToClipboard(selectedSkill.codeSnippet || '')}
                    className="p-1 px-2 hover:bg-white/10 rounded border border-white/10 text-slate-350 hover:text-white transition-all cursor-pointer text-[10px] font-mono flex items-center gap-1"
                  >
                    {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>

              {/* Code Workspace */}
              <div className="flex-1 p-5 font-mono text-xs text-blue-300 overflow-x-auto whitespace-pre leading-relaxed select-all">
                {selectedSkill.codeSnippet ? (
                  <code>{selectedSkill.codeSnippet}</code>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 py-12">
                    <Terminal className="h-8 w-8 text-slate-650 mb-2" />
                    <span>A conceptual core framework operates on internal machine layouts</span>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-5 py-3.5 bg-white/5 border-t border-white/5 text-slate-450 font-sans text-[11px] leading-relaxed flex items-center gap-2">
                <Terminal className="h-4 w-4 text-indigo-400 shrink-0 animate-pulse" />
                <span>
                  <strong>Implementation Context:</strong> Actively applied across portfolio research sequences to structure multi-layered decision pipelines.
                </span>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center border border-dashed border-white/10 bg-white/5 rounded-2xl p-12 text-center h-full">
              <Code2 className="h-8 w-8 text-slate-550 mb-2 animate-pulse" />
              <p className="text-xs font-semibold text-slate-400">Select a skill to inspect</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
