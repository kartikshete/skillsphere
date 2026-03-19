const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');
require('dotenv').config({ path: './server/.env' });

async function testAPIs() {
    console.log('Testing APIs...');

    // Test Gemini
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Hello Gemini");
        console.log('✅ Gemini API: Working');
    } catch (e) {
        console.error('❌ Gemini API Failed:', e.message);
    }

    // Test OpenAI
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: "Hello" }],
            model: "gpt-4o-mini",
        });
        console.log('✅ OpenAI API: Working');
    } catch (e) {
        console.error('❌ OpenAI API Failed:', e.message);
    }
}

testAPIs();
