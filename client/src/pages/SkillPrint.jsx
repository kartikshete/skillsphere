import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Sparkles, Code, CheckCircle, Clock, Star, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const SkillPrint = ({ language }) => {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState('Intermediate');
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateTasks = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        setTasks(null);
        try {
            const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            const resp = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `Generate a SkillPrint — a set of 5 practical project tasks/mini-assignments for the topic "${topic}" at ${difficulty} level. 
          
          For each task provide:
          1. **Task Title**
          2. **Description** (2-3 lines)
          3. **Skills Practiced**
          4. **Estimated Time**
          5. **Difficulty Rating** (⭐ to ⭐⭐⭐⭐⭐)
          
          Also add a "🏆 Bonus Challenge" at the end that combines all 5 tasks into one capstone project.
          
          Format everything in clean Markdown.`,
                    profile,
                    language
                })
            });
            const data = await resp.json();
            setTasks(data.reply);
        } catch (e) {
            setTasks('⚠️ Failed to connect. Make sure backend is running on port 5000.');
        }
        setLoading(false);
    };

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '900px' }}>

                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div className="flex-center" style={{ justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                        <Fingerprint size={32} color="var(--primary)" className="animate-float" />
                        <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>AI-Powered</span>
                    </div>
                    <h1 className="gradient-text" style={{ fontSize: '3rem' }}>SkillPrint</h1>
                    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Generate personalized project tasks & assignments for any topic.</p>
                </motion.div>

                {/* Input Section */}
                <div className="glass-card" style={{ marginBottom: '2rem' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>What do you want to practice?</label>
                        <input
                            value={topic}
                            onChange={e => setTopic(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && generateTasks()}
                            placeholder="e.g. React Hooks, Data Structures, Machine Learning, Accounting..."
                            style={{
                                width: '100%', padding: '1rem', background: 'var(--bg-main)',
                                border: '1px solid var(--glass-border)', borderRadius: '12px',
                                color: 'var(--text-main)', fontSize: '1rem', fontFamily: 'Outfit'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'block', marginBottom: '0.5rem' }}>Difficulty Level</label>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDifficulty(d)}
                                        style={{
                                            padding: '0.6rem 1rem', borderRadius: '10px', cursor: 'pointer',
                                            background: difficulty === d ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                                            border: `1px solid ${difficulty === d ? 'var(--primary)' : 'var(--glass-border)'}`,
                                            color: difficulty === d ? 'var(--primary)' : 'var(--text-muted)',
                                            fontFamily: 'Outfit', fontWeight: '600', fontSize: '0.85rem'
                                        }}
                                    >
                                        {d}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button onClick={generateTasks} disabled={loading || !topic.trim()} className="btn-primary" style={{ padding: '0.8rem 1.5rem', borderRadius: '12px' }}>
                            <Sparkles size={18} /> {loading ? 'Generating...' : 'Generate Tasks'}
                        </button>
                    </div>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="flex-center" style={{ flexDirection: 'column', gap: '1rem', padding: '3rem' }}>
                        <div className="animate-float"><Code size={48} color="var(--primary)" /></div>
                        <p style={{ color: 'var(--text-muted)' }}>Crafting your SkillPrint...</p>
                    </div>
                )}

                {/* Results */}
                <AnimatePresence>
                    {tasks && !loading && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
                            <div className="lesson-content">
                                <ReactMarkdown>{tasks}</ReactMarkdown>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default SkillPrint;
