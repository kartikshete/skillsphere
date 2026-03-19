# 🎯 SkillSphere (Monorepo)
An intelligent, AI-powered learning and upskilling platform serving users dynamically based on their goals and proficiency.

## 📝 Overview
SkillSphere acts as your personal technical mentor by offering dynamic roadmaps, concept deep-dives, automated evaluations, and a gamified learning experience. From creating a personalized profile to completing AI-driven quizzes and downloading certificates, SkillSphere scales your growth organically.

*Built by THE INNOVATORS (Kartik Shete, Purva Lad, Chanksha Patil, Sunil Kumbhar, Shriram Jagdale)*

## ✨ Key Features
- **Dynamic SkillPrints**: Let AI suggest projects tailored to your level.
- **AI Solver & Mentor**: Supports multiple languages (English, Hindi, Marathi, Hinglish) for doubts.
- **Smart Quizzes**: Dynamic quiz generation using AI with a complete score/XP tracking layout.
- **Leaderboard & XP System**: Start Bronze and grind your way to Diamond!
- **Zero-Dependency DB**: Entire session state perfectly managed in `localStorage` for rapid prototyping.

## 🛠 Tech Stack
- Frontend: `React`, `Vite`, `Tailwind CSS`
- Backend: `Node.js`, `Express.js`, `OpenAI / Gemini Integrations`

## 🚀 Getting Started
Ensure you have set your `GEMINI_API_KEY` and `OPENAI_API_KEY` in the `server/.env` file.

```bash
# Install dependencies for both client and server from root
npm install concurrently -D 
cd client && npm install
cd ../server && npm install

# Run the entire application at once
npm run dev
```

> **Note**: For an in-depth guide on navigation, features, and troubleshooting, read the included [QUICKSTART.md](./QUICKSTART.md).


## 🌐 Deployment

### Vercel / Netlify (Recommended)
1. Push this repository to GitHub.
2. Connect your GitHub account to [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com).
3. Select this project and use the following settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### GitHub Pages
1. Install the gh-pages package: `npm install gh-pages --save-dev`
2. Add deployment scripts to your `package.json`.
3. Run `npm run deploy`.

## 👨‍💻 Developer
**Kartik Shete & Team Innovators**
