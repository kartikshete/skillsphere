const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config();

// User's Verified Keys
const OPENAI_KEY = process.env.OPENAI_API_KEY;

// Hardcoded Gemini Keys
const GEMINI_KEYS = [
    process.env.GEMINI_API_KEY
].filter(Boolean);

function log(msg) {
    console.log(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

async function fetchOpenTDB(topic) {
    try {
        let category = 9; // General
        const t = topic.toLowerCase();
        // Improved Mapping
        const techKeywords = ['computer', 'code', 'react', 'js', 'javascript', 'cpp', 'c++', 'java', 'python', 'html', 'css', 'programming', 'web', 'data', 'algorithm'];
        const scienceKeywords = ['science', 'physics', 'gravity', 'space', 'biology', 'chemistry'];

        if (techKeywords.some(k => t.includes(k))) category = 18; // Computers
        if (scienceKeywords.some(k => t.includes(k))) category = 17; // Science
        if (t.includes('math')) category = 19;

        const url = `https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.results) {
            return JSON.stringify(data.results.map(item => {
                const decode = (str) => str.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, '&');
                const all = [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5);
                return {
                    question: decode(item.question),
                    options: all.map(decode),
                    correctIndex: all.indexOf(item.correct_answer),
                    explanation: `Correct: ${decode(item.correct_answer)}`
                };
            }));
        }
    } catch (e) { }
    return null;
}

// MAIN AI FUNCTION
async function callAI(prompt, language = 'English', history = []) {
    // 1. Try Gemini FIRST (Since OpenAI seems dead/quota-limited)
    // Gemini is free and usually reliable.
    log('🤖 Calling Gemini 1.5 Flash...');
    for (const apiKey of GEMINI_KEYS) {
        try {
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

            // Construct Prompt for Gemini to force JSON
            const finalPrompt = `${prompt} \n\n IMPORTANT: Output strictly JSON array. No markdown.`;

            const result = await model.generateContent(finalPrompt);
            const text = result.response.text();

            // Validate JSON
            if (text.includes('[') && text.includes(']')) {
                log('✅ Gemini Success!');
                return text;
            }
        } catch (e) {
            log(`⚠️ Gemini Key Failed: ${e.message}`);
        }
    }

    // 2. Try OpenAI (Backup)
    try {
        log('🤖 Calling OpenAI...');
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7
            })
        });
        const data = await res.json();
        if (res.ok) {
            return data.choices[0].message.content;
        }
    } catch (e) {
        log(`⚠️ OpenAI Failed: ${e.message}`);
    }

    // 3. OpenTDB Fallback
    log('⚠️ Using OpenTDB Fallback');
    const tdb = await fetchOpenTDB(prompt);
    if (tdb) return tdb;

    return JSON.stringify([{
        question: "Service Unavailable",
        options: ["Try Later", "Check Net", "Reset", "Error"],
        correctIndex: 0,
        explanation: "All AI services failed."
    }]);
}

module.exports = { callAI };
