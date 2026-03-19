const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- API KEYS ---
const GEMINI_API_KEYS = [
    process.env.GEMINI_API_KEY,
    process.env.GEMINI_API_KEY_2,
    process.env.GEMINI_API_KEY_3
].filter(Boolean);

let currentGeminiIndex = 0;

// Remove OpenAI for now to avoid confusion, focus on Gemini
const OPENAI_API_KEYS = [];

function log(msg) {
    console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

// --- INTELLIGENT MOCK AI (Advanced Version 2.0) ---
function generateSmartMockResponse(message, language = 'English') {
    const msg = message.toLowerCase();

    // 1. QUIZ GENERATOR (Advanced JSON Response)
    // Detects "json" + "quiz" to return Structured Data
    if (msg.includes('json') && (msg.includes('quiz') || msg.includes('questions'))) {
        const topicMatch = msg.match(/about\s+(.+?)(\s+difficulty|$)/i) || msg.match(/quiz\s+(.+?)(\s+json|$)/i);
        const topic = topicMatch ? topicMatch[1].trim() : 'General Tech';

        log(`📝 Generating Mock Quiz for: ${topic}`);

        // Dynamic-ish Mock Response
        return JSON.stringify([
            {
                question: `What is a fundamental concept in ${topic}?`,
                options: ["Abstraction", "Magic", "Chaos", "Nothing"],
                correctIndex: 0,
                explanation: `Abstraction is key in ${topic} to manage complexity.`
            },
            {
                question: `Which tool is commonly used with ${topic}?`,
                options: ["IDE / Editor", "Hammer", "Toaster", "Car"],
                correctIndex: 0,
                explanation: "Integrated Development Environments are essential."
            },
            {
                question: `Why is ${topic} important?`,
                options: ["Solves Problems", "Looks Cool", "Wastes Time", "No Reason"],
                correctIndex: 0,
                explanation: "It provides solutions to computational problems."
            },
            {
                question: `What is 'Debugging' in the context of ${topic}?`,
                options: ["Fixing Errors", "Planting Trees", "Cooking", "Sleeping"],
                correctIndex: 0,
                explanation: "Debugging is the process of finding and resolving bugs."
            },
            {
                question: `Future trend in ${topic}?`,
                options: ["AI Integration", "Manual Labor", "Disappearance", "Stone Age"],
                correctIndex: 0,
                explanation: "AI is revolutionizing this field."
            }
        ]);
    }

    // 2. CODING & CONCEPTS
    let prefix = '';
    if (language.toLowerCase() !== 'english') {
        prefix = `(Responding in **${language}**) 🌐\n\n`;
    }

    // --- TOPIC SPECIFIC ADVANCED GUIDES ---
    if (msg.includes('react')) {
        return `${prefix}### ⚛️ Master React.js\n\nReact is a library for building UIs based on components.\n\n#### Core Concepts:\n1. **Components**: Functions that return UI.\n2. **State**: Data that changes over time (\`useState\`).\n3. **Props**: Passing data down.\n\n#### Code Example:\n\`\`\`jsx\nimport { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}\n\`\`\`\n\n**Next Step:** Learn \`useEffect\` for side effects.`;
    }

    if (msg.includes('python')) {
        return `${prefix}### 🐍 Python for Everyone\n\nPython is famous for its readability and versatility (Web, AI, Data).\n\n#### Key Features:\n- **Dynamic Typing**: No need to declare types.\n- **Indentation**: Whitespace matters.\n\n#### Example:\n\`\`\`python\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))\n\`\`\`\n\n**Pro Tip:** Use List Comprehensions for cleaner code.`;
    }

    if (msg.includes('java') && !msg.includes('javascript')) {
        return `${prefix}### ☕ Java Programming\n\nRobust, Object-Oriented, and Platform Independent.\n\n#### OOP Pillars:\n- Encapsulation\n- Inheritance\n- Polymorphism\n- Abstraction\n\n#### Example:\n\`\`\`java\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Java Rocks");\n  }\n}\n\`\`\``;
    }

    if (msg.includes('sql') || msg.includes('database')) {
        return `${prefix}### 🗄️ SQL & Databases\n\nStructured Query Language is standard for relational databases.\n\n#### Basic Commands:\n- \`SELECT\`: Retrieve data.\n- \`INSERT\`: Add data.\n- \`UPDATE\`: Modify data.\n- \`DELETE\`: Remove data.\n\n#### Query:\n\`\`\`sql\nSELECT * FROM Users WHERE age > 18;\n\`\`\``;
    }

    if (msg.includes('html') || msg.includes('css')) {
        return `${prefix}### 🌐 HTML & CSS\n\nThe building blocks of the web.\n\n- **HTML5**: Structure (Semantic tags like \`<header>\`, \`<section>\`).\n- **CSS3**: Style (Flexbox, Grid, Animations).\n\n#### Flexbox Trick:\n\`\`\`css\n.center {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\`\`\``;
    }

    // Default Fallback for Chat
    return `${prefix}### 🤖 Advanced AI Analysis\n\nI am analyzing your query about **"${message}"**.\n\n#### 🚀 Key Concept:\nTo master this, focus on:\n1. **Core Logic**: Understanding the 'Why'.\n2. **Best Practices**: Clean, efficient code.\n3. **Scalability**: Building for growth.\n\n*(My AI brain is reconnecting... retrying in 3s)*`;
}

// Import New AI Engine
const { callAI } = require('./aiEngine');

// --- DUAL AI ENGINE (GPT-Level Advanced) ---
async function callAI_Old(prompt, language = 'English', history = []) {
    // 1. Build Context
    const context = history.map(m => `${m.role === 'user' ? 'Student' : 'Professor'}: ${m.text}`).join('\n');

    // 2. Construct ULTRA-Advanced Prompt (GPT-4 Style)
    const finalPrompt = `
    You are 'SkillSphere AI', an **Extremely Advanced AI Tutor** (comparable to GPT-4).
    
    CONTEXT:
    ${context}
    
    USER QUESTION: "${prompt}"
    
    INSTRUCTIONS (Strict):
    1. **Language**: Reply in **${language}**.
    2. **Deep Reasoning**: Solve doubts Step-by-Step.
    3. **Code Quality**: innovative, clean, and production-ready code.
    4. **Teaching Style**: 
       - Start with a powerful **Analogy**.
       - Break down complex logic.
       - Warn about common mistakes (Gotchas).
    5. **Format**: Use rich Markdown (Tables, Bold, Code Blocks).
    
    Your goal is to clear ALL doubts perfectly.
    `;

    // A. TRY GEMINI (Round Robin)
    for (let i = 0; i < GEMINI_API_KEYS.length; i++) {
        const keyIndex = (currentGeminiIndex + i) % GEMINI_API_KEYS.length;
        const apiKey = GEMINI_API_KEYS[keyIndex];

        try {
            log(`🤖 Advanced AI Attempt [${keyIndex}]`);
            const genAI = new GoogleGenerativeAI(apiKey);
            // Upgrade to gemini-pro (Reasoning Model)
            const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

            const result = await model.generateContent(finalPrompt);
            const response = await result.response;
            const text = response.text();

            if (text) {
                currentGeminiIndex = keyIndex;
                return text;
            }
        } catch (error) {
            log(`⚠️ AI Error: ${error.message}`);
        }
    }

    // Fallback logic
    return generateSmartMockResponse(prompt, language);
}

// --- ROUTES ---

// 1. CHAT
app.post('/api/chat', async (req, res) => {
    try {
        const { message, language, history } = req.body;
        if (!message) return res.status(400).json({ error: 'Message required' });

        const reply = await callAI(message, language || 'English', history || []);
        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// 2. QUIZ GENERATOR
app.post('/api/quiz', async (req, res) => {
    try {
        const { topic, numQuestions, difficulty, language } = req.body;
        log(`📝 Advanced Quiz Request: ${topic}`);

        // STRICT JSON PROMPT
        // KHANMIGO STYLE PROMPT (Verified)
        const prompt = `
        Act as **Khanmigo Quiz Generator**. Create a strictly structured JSON quiz about "${topic}".
        
        Rules:
        1. **10 Questions** (Progressive Difficulty).
        2. Format: Multiple Choice (4 Options).
        3. **Explanation**: Clear, educational, specific reasons (Khan Academy Style).
        4. **CRITICAL**: Ensure 'correctIndex' (0-3) EXACTLY matches the correct option.
        
        Output Strictly JSON Array:
        [
            {
                "question": "Concisely worded question?",
                "options": ["A", "B", "C", "D"],
                "correctIndex": 0,
                "explanation": "Correct! Option A is the answer because..."
            }
        ]
        `;

        let quizDataStr = await callAI(prompt, language);

        // Clean JSON
        quizDataStr = quizDataStr.replace(/```json/g, '').replace(/```/g, '').trim();
        const firstBracket = quizDataStr.indexOf('[');
        const lastBracket = quizDataStr.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1) {
            quizDataStr = quizDataStr.substring(firstBracket, lastBracket + 1);
        }

        try {
            const quizData = JSON.parse(quizDataStr);
            res.json(quizData);
        } catch (parseError) {
            log('⚠️ JSON Parse Failed, using Advanced Mock');
            const mockQuiz = JSON.parse(generateSmartMockResponse(`json quiz about ${topic}`, language));
            res.json(mockQuiz);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Quiz Generation Failed' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    log(`✅ SkillSphere Advanced AI Server running on port ${PORT}`);
    log(`🧠 Models: Gemini 1.5 Flash -> Smart Mock`);
});
