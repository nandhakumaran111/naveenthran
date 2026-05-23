import { Project, Skill } from './types';

export const PERSONAL_INFO = {
  name: 'NAVEENTHRAN M',
  title: 'Artificial Intelligence & Data Science Student',
  subtitle: 'B.Tech AI & Data Science (Currently pursuing, 3rd Year)',
  email: 'naveenthran5@gmail.com',
  phone: '+91 6374728340',
  address: 'Trichy, Tamil Nadu',
  college: 'Dhanalakshmi Srinivasan Engineering College (Autonomous), Perambalur',
  cgpa: '7.79',
  summary: 'Motivated Artificial Intelligence and Data Science student with strong skills in Python, machine learning, and data analysis. Possesses solid problem-solving abilities and a quick grasp of emerging technologies. Passionate about developing intelligent systems, extracting insights from data, and building real-world applications that deliver impactful solutions.',
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'mental-health',
    title: 'Early Mental Health Detection',
    subtitle: 'Extracting patterns from social media expression',
    description: 'An intelligent framework designed to identify early indicators of psychological distress or mental wellness shifts using natural language processing (NLP). Analyzes linguistic style, emotional keywords, and contextual shifts to classify sentimental markers under secure and anonymized protocols.',
    tech: ['Python', 'Natural Language Processing', 'Machine Learning', 'Sentiment Analysis', 'Vector Embeddings'],
    status: 'Prototype Completed',
    type: 'AI / NL'
  },
  {
    id: 'judicial-bot',
    title: 'Judicial Chat Bot',
    subtitle: 'Conversational assistant for legal queries',
    description: 'A specialized conversational AI system engineered to assist users in understanding basic human rights, consumer acts, and judicial code references. Translates complex, formal legal clauses and definitions into clear, accessible everyday language.',
    tech: ['Python', 'Large Language Models', 'Retrieval Augmented Generation', 'Interactive UI', 'Sentence Matching'],
    status: 'In Development',
    type: 'Conversational Bot'
  }
];

export const SKILLS_DATA: Skill[] = [
  {
    name: 'Python',
    category: 'Language',
    level: 90,
    description: 'Primary language for machine learning, data processing, and scripting. Experienced with core ML packages, file processing, and system automation.',
    codeSnippet: 'def detect_sentiment(text):\n    # Core logic using NLP features\n    tokens = preprocess(text)\n    score = analyze_vector(tokens)\n    return "Distress Marker Detected" if score < 0.3 else "Optimal"'
  },
  {
    name: 'JAVA',
    category: 'Language',
    level: 75,
    description: 'Strong foundation in object-oriented programming, standard libraries, and structural problem solving.',
    codeSnippet: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Building scalable applications.");\n    }\n}'
  },
  {
    name: 'Machine Learning',
    category: 'Concept',
    level: 80,
    description: 'Solid understanding of classification algorithms, regression, vector space representations, cluster evaluation, and text preprocessing.',
    codeSnippet: '# Vector representations modeling ML metrics\nx_train, x_test, y_train, y_test = train_test_split(x, y)\nmodel.fit(x_train, y_train)\nscore = model.score(x_test, y_test)'
  },
  {
    name: 'Cloud Computing',
    category: 'Platform',
    level: 70,
    description: 'Certified concept understander. Knowledgeable in infrastructure provisioning, virtualization, basic cloud database architectures, and SaaS principles.',
    codeSnippet: '{\n  "service": "CloudVM",\n  "specs": "vCPU: 2, RAM: 8GB, OS: Ubuntu 22.04 LTS",\n  "status": "Healthy / Ingress Port 3000 Open"\n}'
  }
];

export const EDUCATION_DATA = [
  {
    institution: 'Dhanalakshmi Srinivasan Engineering College (Autonomous), Perambalur',
    degree: 'B.Tech - Artificial Intelligence & Data Science',
    period: 'Currently Pursuing (3rd Year)',
    detail: 'Core curriculum covering Deep Learning, Neural Networks, Database Administration, Python Programming, and Probability statistics.',
    metric: 'CGPA: 7.79'
  },
  {
    institution: 'Bishop Heber Higher Secondary School, Trichy',
    degree: 'HSC (12th Standard)',
    period: 'Completed',
    detail: 'Focused on Mathematics, Physics, Chemistry, and Computer Science.',
    metric: 'First Class standing'
  },
  {
    institution: 'Arnolds Matriculation School, Trichy',
    degree: 'SSLC (10th Standard)',
    period: 'Completed',
    detail: 'Foundational education with strong achievements in Science and Math.',
    metric: 'Distinction level'
  }
];
