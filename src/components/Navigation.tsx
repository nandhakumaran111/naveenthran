import React from 'react';
import { User, Terminal, Briefcase, GraduationCap, Mail, MessageSquare } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'hero', label: 'Intro', icon: User },
    { id: 'skills', label: 'Skills', icon: Terminal },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'education', label: 'Academics', icon: GraduationCap },
    { id: 'chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="flex h-16 items-center justify-between px-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-lg">
        <button 
          onClick={() => onNavigate('hero')}
          className="flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-white cursor-pointer"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-550 to-purple-650 font-sans text-xs font-bold text-white shadow-sm">
            NM
          </div>
          <span className="hidden sm:inline font-sans tracking-wide">NAVEENTHRAN M</span>
          <span className="sm:hidden font-sans text-xs text-slate-400 font-normal">AI / DS</span>
        </button>

        <nav className="flex items-center gap-1.5 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-350 cursor-pointer ${
                  isActive 
                    ? 'bg-white/10 border border-white/10 text-white font-semibold' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span className="hidden md:inline">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
