# 🎯 SkillSphere - Quick Start Guide

## 🚀 Access the Application

**Frontend**: http://localhost:5176/
**Backend**: http://localhost:5000/

---

## 📍 Complete Navigation Map

| Page | URL | Purpose |
|------|-----|---------|
| 🏠 Landing | `/` | Hero page with project intro |
| 📝 Assessment | `/assessment` | 3-step profile builder |
| 📊 Dashboard | `/dashboard` | Main learning hub |
| 🤖 AI Solver | `/chatbot` | Doubt solving (all streams) |
| ❓ Quiz | `/quiz` | Generate quizzes on any topic |
| 🔖 SkillPrint | `/skillprint` | Project task generator |
| 🏆 Leaderboard | `/leaderboard` | Global rankings |
| 📈 Stats | `/progress` | Progress analytics |
| 👤 Profile | `/profile` | Edit your identity |
| 📜 Certificate | `/certificate` | Download credential |
| 📖 About | `/about` | Team & project info |

---

## 🎮 Quick Test Flow

### 1. **First Time Setup**
```
1. Go to http://localhost:5176/
2. Click "Start Diagnostic"
3. Fill out:
   - Role: "Full Stack Developer"
   - Experience: "Intermediate"
   - Goal: "Build a SaaS startup"
4. Click "Generate My Path"
5. Wait 3-5 seconds → Redirects to Dashboard
```

### 2. **Test AI Chatbot**
```
1. Click "AI Solver" in navbar
2. Type: "Explain React hooks in Hindi"
3. AI responds in Hindi (Devanagari)
4. Click bookmark icon to save as note
5. Click "Saved Notes" to view
```

### 3. **Test Quiz Generator**
```
1. Click "Quiz" in navbar
2. Enter topic: "JavaScript Closures"
3. Click "Generate Quiz"
4. Answer 5 questions
5. See score + XP earned
```

### 4. **Test SkillPrint**
```
1. Click "SkillPrint" in navbar
2. Enter: "React Hooks"
3. Select: "Advanced"
4. Click "Generate Tasks"
5. Get 5 project assignments
```

---

## 🌐 Language Testing

Change language from navbar dropdown:
- **English**: Standard technical content
- **Hindi**: Devanagari script responses
- **Marathi**: Marathi script responses
- **Hinglish**: Mixed Hindi-English in Latin

All AI responses (lessons, quizzes, chat) adapt automatically.

---

## 🔧 Troubleshooting

### Issue: Blank page or broken UI
**Fix**: Check browser console. Most likely missing CSS variables.
**Solution**: Refresh page (Cmd+R / Ctrl+R)

### Issue: "Failed to connect" in chatbot
**Fix**: Backend not running
**Solution**: Check terminal - server should show "SkillSphere Server running on port 5000"

### Issue: AI not responding
**Fix**: API keys missing or invalid
**Solution**: Check `server/.env` file has valid GEMINI_API_KEY and OPENAI_API_KEY

### Issue: Quiz not generating
**Fix**: OpenAI API issue
**Solution**: Check server logs for error messages

---

## 💾 Data Storage

All data stored in **localStorage**:
- `userPath`: AI-generated learning path
- `userProfile`: Name, role, XP, level
- `skillsphere_notes`: Saved chatbot responses
- `theme`: Dark/light mode preference
- `language`: Selected language

**Clear data**: Open browser DevTools → Application → Local Storage → Delete

---

## 🎨 Theme Toggle

Click Sun/Moon icon in navbar to switch between:
- 🌙 **Dark Mode**: Deep navy backgrounds (default)
- ☀️ **Light Mode**: Clean white/gray palette

---

## 🏆 XP & Ranking System

**Earn XP by:**
- Completing quizzes: 100 XP per correct answer
- Finishing modules: 500 XP bonus

**Ranks:**
- 0-1000 XP: Bronze
- 1000-3000 XP: Silver
- 3000-7000 XP: Gold
- 7000-15000 XP: Platinum
- 15000+ XP: Diamond

---

## 📱 Responsive Design

Optimized for:
- Desktop: 1920x1080+
- Laptop: 1366x768+
- Tablet: 768x1024
- Mobile: 375x667 (basic support)

---

## 🔥 Pro Tips

1. **Use AI Solver for everything**: It knows ALL streams (Science, Commerce, Arts, Engineering, Medical)
2. **Save important responses**: Click bookmark icon on AI messages
3. **Practice with Quiz Generator**: Generate unlimited quizzes on any topic
4. **Track your progress**: Check `/progress` to see skill mastery bars
5. **Download certificate**: Complete your path → `/certificate` → Download PNG

---

## 🚨 Known Limitations

1. **No user authentication**: Data stored locally (clears on browser reset)
2. **No database**: All state in localStorage
3. **API rate limits**: OpenAI/Gemini may throttle requests
4. **Mobile UX**: Optimized for desktop first

---

## 📞 Support

If something breaks:
1. Check browser console (F12)
2. Check server terminal logs
3. Restart servers: `Ctrl+C` → `npm run dev`
4. Clear localStorage and try again

---

**Built by THE INNOVATORS**  
Kartik Shete • Purva Lad • Chanksha Patil • Sunil Kumbhar • Shriram Jagdale
