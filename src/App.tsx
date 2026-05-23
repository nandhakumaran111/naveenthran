import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, Mail, Phone, MapPin, Download, Sparkles, Send, 
  Terminal, ShieldCheck, Cpu, Code2, Plus, 
  Briefcase, GraduationCap, Copy, Check, MessageSquare, 
  BookOpen, Trophy, ArrowUpRight, ArrowRight, Layers
} from 'lucide-react';
import Navigation from './components/Navigation';
import ResumeChat from './components/ResumeChat';
import SkillGrid from './components/SkillGrid';
import MentalHealthDemo from './components/MentalHealthDemo';
import JudicialBotDemo from './components/JudicialBotDemo';
import { PERSONAL_INFO, PROJECTS_DATA, SKILLS_DATA, EDUCATION_DATA } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [activeProjectTab, setActiveProjectTab] = useState<'mental-health' | 'judicial-bot'>('mental-health');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleScrollTo = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-50 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Mesh Gradient Background Elements for Frosted Glass effect */}
      <div className="absolute top-[-5%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[135px] pointer-events-none"></div>
      <div className="absolute top-[35%] right-[10%] w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[5%] w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[130px] pointer-events-none"></div>

      {/* Navigation */}
      <Navigation activeSection={activeSection} onNavigate={handleScrollTo} />

      {/* Main Container */}
      <main className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-12 space-y-24">
        
        {/* Intro Hero Section */}
        <section id="hero" className="pt-8 md:pt-16 space-y-10 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Bio Column */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
              <div className="self-start inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Specializing in AI &amp; Intelligent Data Systems
              </div>

              <h1 className="text-4xl sm:text-6xl font-extralight leading-[1.1] text-white tracking-tight">
                Crafting <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">intelligent</span><br/>digital systems.
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Hi, I am <strong className="text-white font-semibold">Naveenthran M</strong>, a dedicated B.Tech student in Artificial Intelligence and Data Science. I focus on natural language extraction models, interactive legal assistants, and scalable ML analytical workflows.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => handleScrollTo('chat')}
                  className="px-6 py-3 bg-white text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2 hover:bg-slate-100 cursor-pointer shadow-lg transition-all"
                >
                  <MessageSquare className="h-4 w-4" />
                  Ask My AI Assistant
                </button>
                <button 
                  onClick={() => handleScrollTo('projects')}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl text-xs hover:bg-white/10 cursor-pointer backdrop-blur-sm transition-all"
                >
                  Explore Simulators
                </button>
              </div>

              {/* Profile micro-details list */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-white/5">
                <div>
                  <span className="text-[10px] font-mono text-slate-450 uppercase tracking-widest block">Institution</span>
                  <span className="text-xs font-semibold text-slate-200 mt-1 block leading-tight">DSEC Autonomous</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-450 uppercase tracking-widest block">Current Standings</span>
                  <span className="text-xs font-semibold text-slate-200 mt-1 block leading-tight">3rd Year Student</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-450 uppercase tracking-widest block">Primary Track</span>
                  <span className="text-xs font-semibold text-slate-200 mt-1 block leading-tight">NLP &amp; Data Science</span>
                </div>
              </div>
            </div>

            {/* Resume Fast-Card Column */}
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-40 transition-all duration-500"></div>
                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                  
                  {/* Name Tag */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold tracking-tight text-white">{PERSONAL_INFO.name}</h2>
                      <p className="text-xs text-blue-300 font-medium font-mono mt-1">{PERSONAL_INFO.title}</p>
                    </div>
                    <span className="p-1.5 px-2.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-[9px] font-mono font-bold tracking-wider">
                      CGPA {PERSONAL_INFO.cgpa}
                    </span>
                  </div>

                  <hr className="border-white/5" />

                  {/* Summary */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">Profile summary</span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      "{PERSONAL_INFO.summary}"
                    </p>
                  </div>

                  <hr className="border-white/5" />

                  {/* Micro list info */}
                  <div className="space-y-3.5 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-slate-305">
                        <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                        <span>{PERSONAL_INFO.address}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">Location</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-slate-305 overflow-hidden">
                        <Mail className="h-4 w-4 text-purple-400 shrink-0" />
                        <span className="truncate">{PERSONAL_INFO.email}</span>
                      </div>
                      <button 
                        onClick={copyEmail}
                        className="p-1 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded cursor-pointer transition-all shrink-0"
                        title="Copy Email Address"
                      >
                        {copiedEmail ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5 text-slate-305">
                        <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{PERSONAL_INFO.phone}</span>
                      </div>
                      <button 
                        onClick={copyPhone}
                        className="p-1 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded cursor-pointer transition-all shrink-0"
                        title="Copy Phone Number"
                      >
                        {copiedPhone ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>

                  {/* Card bottom tag */}
                  <div className="pt-2">
                    <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between">
                      <span className="text-[10px] font-semibold text-slate-400">Current Affiliation</span>
                      <span className="text-[10px] text-slate-205 font-medium max-w-[60%] truncate text-right">Dhanalakshmi Srinivasan College</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Technical Competencies Section */}
        <section id="skills" className="scroll-mt-24 space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              STRUCTURE &amp; SYNTAX
            </span>
            <h2 className="text-3xl font-light tracking-tight text-white mt-1">
              Technical <span className="font-semibold italic">Skill Matrix</span>
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Applied extensively across multiple analytical models. Click through to inspect framework blueprints.
            </p>
          </div>

          <SkillGrid skills={SKILLS_DATA} />
        </section>

        {/* Interactive Simulators / Projects Section */}
        <section id="projects" className="scroll-mt-24 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
                ACTIVE REPOSITORIES + SIMULATORS
              </span>
              <h2 className="text-3xl font-light tracking-tight text-white mt-1">
                Portfolio <span className="font-semibold italic">Project Workspace</span>
              </h2>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Naveen has built systems addressing mental health diagnostic linguistic patterns and judicial guidance support. Launch their live simulators below.
              </p>
            </div>

            {/* Simulators selection tabs */}
            <div className="flex gap-1.5 bg-white/5 border border-white/10 p-1 rounded-xl self-start">
              <button
                onClick={() => setActiveProjectTab('mental-health')}
                className={`text-xs font-medium px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  activeProjectTab === 'mental-health'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Mental Health NLP Simulator
              </button>
              <button
                onClick={() => setActiveProjectTab('judicial-bot')}
                className={`text-xs font-medium px-4 py-2 rounded-lg transition-all cursor-pointer ${
                  activeProjectTab === 'judicial-bot'
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Judicial Chat Bot Tab
              </button>
            </div>
          </div>

          {/* Render Active Simulator */}
          <div className="relative">
            {activeProjectTab === 'mental-health' ? (
              <div className="space-y-6">
                {/* Project Specs Metadata */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-white">{PROJECTS_DATA[0].title}</h3>
                    <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-md">
                      {PROJECTS_DATA[0].status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {PROJECTS_DATA[0].description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {PROJECTS_DATA[0].tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] text-slate-300 font-mono bg-white/5 border border-white/5 px-2.5 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Workspace interactive simulator */}
                <MentalHealthDemo />
              </div>
            ) : (
              <div className="space-y-6">
                {/* Project Specs Metadata */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="text-xl font-bold text-white">{PROJECTS_DATA[1].title}</h3>
                    <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-md">
                      {PROJECTS_DATA[1].status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {PROJECTS_DATA[1].description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {PROJECTS_DATA[1].tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] text-slate-300 font-mono bg-white/5 border border-white/5 px-2.5 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live Workspace interactive simulator */}
                <JudicialBotDemo />
              </div>
            )}
          </div>
        </section>

        {/* Academics & Certifications Section */}
        <section id="education" className="scroll-mt-24 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Academic Path */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase">
                  ACADEMIC CHRONICLE
                </span>
                <h2 className="text-3xl font-light tracking-tight text-white mt-1">
                  Educational <span className="font-semibold italic">Milestones</span>
                </h2>
              </div>

              {/* Education timeline cards */}
              <div className="relative border-l border-white/10 pl-6 space-y-8 ml-2 py-2">
                {EDUCATION_DATA.map((edu, idx) => (
                  <div key={idx} className="relative group">
                    {/* timeline node bead indicator */}
                    <div className="absolute -left-[31px] top-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#020617] border-2 border-indigo-400 text-white shadow-sm z-10 transition-transform group-hover:scale-110">
                      <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping group-hover:block" />
                    </div>

                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-2.5 hover:bg-white/10 transition-all">
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-slate-450 uppercase font-mono">{edu.period}</span>
                          <h3 className="text-sm font-bold text-white mt-1.5 leading-tight">{edu.institution}</h3>
                          <p className="text-xs text-blue-300 font-semibold font-mono mt-0.5">{edu.degree}</p>
                        </div>
                        <span className="inline-block text-[10px] font-bold bg-white/10 text-white px-2.5 py-1 rounded-md tracking-wider">
                          {edu.metric}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {edu.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Certifications Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase font-semibold">
                  AUDITED MERITS
                </span>
                <h3 className="text-2xl font-light tracking-tight text-white mt-1">
                  Certifications <span className="font-semibold italic">&amp; Feats</span>
                </h3>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/15 border border-purple-500/20 text-purple-300">
                    <Layers className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-purple-305 block">Technical Assessment</span>
                    <h4 className="text-sm font-bold text-white mt-1.5">Cloud Computing concepts certification</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">
                      Formal validation covering Cloud VMs setup, containerized services deployment pipelines, microservices modularity, and high-contrast security access matrices.
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 text-[10px] font-mono text-slate-450 uppercase border-t border-white/5">
                    <span>Credential verified</span>
                    <span className="text-emerald-400 font-bold">Active Concept</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-2.5">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-amber-400 shrink-0" />
                    Additional Pursuits
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-2 pl-1 font-medium leading-relaxed">
                    <li>&bull; Active explorer of Large Language Models (LLM) fine-tuning.</li>
                    <li>&bull; Deeply curious about cognitive neuroscience &amp; clinical text NLP matching.</li>
                    <li>&bull; Technical contributor of college-level algorithm design workgroups.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* AI Chat Bot Assistant workspace Section */}
        <section id="chat" className="scroll-mt-24 space-y-8">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-indigo-400 uppercase">
              INTERACTIVE RECRUITER ASSISTANT
            </span>
            <h2 className="text-3xl font-light tracking-tight text-white mt-1">
              Ask Naveen AI <span className="font-semibold italic">Agent</span>
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Have burning questions about Naveen's availability? Type standard questions regarding skills, academic CGPA status, or contact preferences; our custom AI agent evaluates and clarifies questions in real time.
            </p>
          </div>

          <ResumeChat />
        </section>

        {/* Contact panel Section */}
        <section id="contact" className="scroll-mt-24 space-y-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950/40 via-purple-950/20 to-slate-900 border border-white/15 p-8 sm:p-12 text-center">
            
            {/* decorative mesh items inside contact card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 max-w-xl mx-auto space-y-6">
              <span className="inline-block p-1 px-3.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-indigo-300 font-bold uppercase tracking-widest leading-none">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extralight tracking-tight text-white">
                Let's develop the <span className="italic font-medium">next big</span> system together.
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Naveen is currently looking for summer internships, AI collaborative research opportunities, and data scientist associate roles. Reach out and start a thread.
              </p>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                <a 
                  href="mailto:naveenthran5@gmail.com" 
                  className="w-full sm:w-auto px-6 py-3 bg-white text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-slate-100 cursor-pointer shadow-lg transition-all"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Direct Email</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
                <a 
                  href="tel:+916374728340" 
                  className="w-full sm:w-auto px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 hover:bg-white/10 cursor-pointer backdrop-blur-sm transition-all"
                >
                  <Phone className="h-4 w-4 text-emerald-400" />
                  <span>Call +91 6374728340</span>
                </a>
              </div>

              {/* Declaration footer block */}
              <div className="pt-8 border-t border-white/5">
                <span className="text-[10px] font-mono text-slate-500 block">RESUME STATUTORY DECLARATION</span>
                <p className="text-[11px] text-slate-400 italic mt-1.5">
                  "I hereby declare that all the information provided above is true and correct to the best of my knowledge."
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Aesthetic Footer */}
      <footer className="border-t border-white/5 bg-slate-950/20 backdrop-blur-md mt-16 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-550 font-sans text-xs">
          <div>
            <p>&copy; 2026 Naveenthran M. All rights reserved.</p>
            <p className="text-[10px] text-slate-500 mt-1">B.Tech Artificial Intelligence and Data Science Student</p>
          </div>
          <div className="flex gap-6 mt-1 sm:mt-0 font-semibold text-slate-400">
            <span className="hover:text-blue-400 transition-colors">Trichy, TN</span>
            <span className="hover:text-amber-400 transition-colors">CGPA 7.79</span>
            <span className="hover:text-purple-400 transition-colors">DSEC Academic Project</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
