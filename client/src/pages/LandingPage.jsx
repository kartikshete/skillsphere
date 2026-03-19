import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Compass, Sparkles, Target, Zap } from 'lucide-react';

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <section className="container flex-center" style={{ flexDirection: 'column', textAlign: 'center', padding: '4rem 0' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span style={{
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: '#818cf8',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '100px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        border: '1px solid rgba(99, 102, 241, 0.2)'
                    }}>
                        Next-Gen Learning Engine 🚀
                    </span>

                    <h1 className="gradient-text" style={{ fontSize: '4.5rem', marginTop: '1.5rem', lineHeight: '1.1' }}>
                        Elevate Your Career <br /> In The SkillSphere
                    </h1>

                    <p style={{ color: '#94a3b8', fontSize: '1.25rem', maxWidth: '600px', margin: '2rem auto' }}>
                        Traditional learning is broken. AI-powered SkillSphere builds a personalized
                        path tailored to your cognitive style, speed, and professional goals.
                    </p>

                    <div className="flex-center" style={{ gap: '1.5rem' }}>
                        <button
                            onClick={() => {
                                const hasPath = localStorage.getItem('userPath');
                                navigate(hasPath ? '/dashboard' : '/assessment');
                            }}
                            className="btn-primary"
                            style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
                        >
                            <Compass size={20} /> {localStorage.getItem('userPath') ? 'Go to Dashboard' : 'Start Diagnostic'}
                        </button>
                        <button className="glass-card" style={{ padding: '0.9rem 2rem', borderRadius: '12px', fontSize: '1.1rem', cursor: 'pointer', color: '#fff' }}>
                            View Demo
                        </button>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '2rem',
                        marginTop: '6rem',
                        width: '100%'
                    }}
                >
                    <div className="glass-card">
                        <Zap color="#6366f1" size={32} style={{ marginBottom: '1rem' }} />
                        <h3>Adaptive Speed</h3>
                        <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>The engine detects when you're soaring or struggling, adjusting content in real-time.</p>
                    </div>
                    <div className="glass-card">
                        <Sparkles color="#6366f1" size={32} style={{ marginBottom: '1rem' }} />
                        <h3>AI Tutor</h3>
                        <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Get instant assistance and context-aware feedback on every module you complete.</p>
                    </div>
                    <div className="glass-card">
                        <Target color="#6366f1" size={32} style={{ marginBottom: '1rem' }} />
                        <h3>Goal Oriented</h3>
                        <p style={{ color: '#94a3b8', marginTop: '0.5rem' }}>Define your dream role and SkillSphere reverse-engineers your perfect learning path.</p>
                    </div>
                </motion.div>
            </section>
        </div>
    );
};

export default LandingPage;
