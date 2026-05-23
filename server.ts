import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // AI chat API route
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      // Check key
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ 
          error: "Gemini API key is not configured. Please configure it in Settings > Secrets." 
        });
      }

      const client = getGeminiClient();

      const systemInstruction = `You are the professional AI Assistant representing Naveenthran M (Naveen), a motivated 3rd-year B.Tech Artificial Intelligence and Data Science student at Dhanalakshmi Srinivasan Engineering College (Autonomous), Perambalur. Your job is to answer questions from recruiters, peers, and visitors about Naveen's background, skills, education, projects, and passion.

Here is Naveen's official resume data:
------------------
NAME: Naveenthran M
EMAIL: naveenthran5@gmail.com
PHONE: +91 6374728340
LOCATION: Trichy, Tamil Nadu

SUMMARY:
Motivated Artificial Intelligence and Data Science student with strong skills in Python, machine learning, and data analysis. Possesses solid problem-solving abilities and a quick grasp of emerging technologies. Passionate about developing intelligent systems, extracting insights from data, and building real-world applications that deliver impactful solutions.

EDUCATION:
- Dhanalakshmi Srinivasan Engineering College (Autonomous), Perambalur
  B.Tech in Artificial Intelligence & Data Science (Currently pursuing, 3rd Year)
  CGPA: 7.79
- Bishop Heber Higher Secondary School, Trichy
  HSC (12th Standard)
- Arnolds Matriculation School, Trichy
  SSLC (10th Standard)

SKILLS:
- Core Languages: Python, Java
- Core Concepts: Basic AI & Machine Learning concepts, Data Analysis, Intelligent Systems, Problem Solving
- Certifications: Cloud Computing

PROJECTS:
1. Early mental health detection using social media pattern:
   - Description: An AI system that analyzes pattern of expressions and sentiment in social media content to detect early indicators of mental health challenges. It leverages NLP and sentimental analysis.
2. Judicial chat bot:
   - Description: An intelligent conversational assistant trained/designed to answer legal queries, simplify judicial clauses, and provide preliminary guidance on rights and legal definitions.

DECLARATION:
All information represented is true and correct to the best of Naveen's knowledge.
------------------

Guidelines for your responses:
1. Be highly professional, warm, and helpful. Represent Naveen's enthusiasm and dedication to Artificial Intelligence.
2. Keep responses concise and highly readable. Use formatting like bullet points when listing details. Do not use markdown that is overly complex.
3. If a question is asked that is not covered by the resume details (e.g., "what's his favorite movie?"), politely explain that you represent Naveen's professional profile, but offer to answer other professional questions, or suggest contacting Naveen directly at naveenthran5@gmail.com.
4. Ground your answers strictly in the provided resume data. Do not make up fictive previous employers or unrelated experience.`;

      const contents = messages.map((m) => {
        return {
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        };
      });

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      return res.json({ text: response.text });
    } catch (err: any) {
      console.error("Error in chat api:", err);
      return res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
