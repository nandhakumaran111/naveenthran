export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  status: 'In Development' | 'Prototype Completed' | 'Production Ready';
  type: 'AI / NL' | 'Conversational Bot';
}

export interface Skill {
  name: string;
  category: 'Language' | 'Concept' | 'Platform';
  level: number; // percentage
  description: string;
  codeSnippet?: string;
}
