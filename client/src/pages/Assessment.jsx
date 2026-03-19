import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Brain, Briefcase, Rocket } from 'lucide-react';

const Assessment = (props) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        experience: 'Beginner',
        interests: [],
        learningStyle: 'Visual',
        goals: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const nextStep = () => setStep(prev => prev + 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/generate-path', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profile: formData, diagnostic: {}, language: props.language })
            });
            const data = await response.json();
            localStorage.setItem('userPath', JSON.stringify(data));
            localStorage.setItem('userProfile', JSON.stringify(formData));
            navigate('/dashboard');
        } catch (error) {
            console.error('Error generating path:', error);
            alert('Failed to connect to AI engine. Make sure the server is running on port 5000.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-center" style={{ minHeight: '100vh', paddingTop: '80px' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '600px', padding: '3rem' }}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex-center" style={{ gap: '0.5rem', marginBottom: '1rem', justifyContent: 'flex-start' }}>
                                <Brain color="#6366f1" size={24} />
                                <span style={{ color: '#6366f1', fontWeight: '600' }}>Initial Setup</span>
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Let's build your profile.</h2>
                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#94a3b8' }}>Professional Role / Focus</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Full Stack Developer"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem' }}
                                />
                            </div>
                            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Next <ChevronRight size={20} />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex-center" style={{ gap: '0.5rem', marginBottom: '1rem', justifyContent: 'flex-start' }}>
                                <Briefcase color="#6366f1" size={24} />
                                <span style={{ color: '#6366f1', fontWeight: '600' }}>Context & Experience</span>
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Your current standing?</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                {['Beginner', 'Intermediate', 'Advanced', 'Expert'].map(exp => (
                                    <button
                                        key={exp}
                                        onClick={() => setFormData({ ...formData, experience: exp })}
                                        style={{
                                            padding: '1rem',
                                            borderRadius: '12px',
                                            background: formData.experience === exp ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                                            border: `1px solid ${formData.experience === exp ? '#6366f1' : 'var(--glass-border)'}`,
                                            color: '#fff',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {exp}
                                    </button>
                                ))}
                            </div>
                            <button onClick={nextStep} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                Almost there <ChevronRight size={20} />
                            </button>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="flex-center" style={{ gap: '0.5rem', marginBottom: '1rem', justifyContent: 'flex-start' }}>
                                <Rocket color="#6366f1" size={24} />
                                <span style={{ color: '#6366f1', fontWeight: '600' }}>Final Optimization</span>
                            </div>
                            <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Your ultimate goal?</h2>
                            <div style={{ marginBottom: '2rem' }}>
                                <textarea
                                    placeholder="e.g. I want to build a SaaS startup in 6 months."
                                    rows="4"
                                    value={formData.goals}
                                    onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '12px', color: '#fff', fontSize: '1rem', resize: 'none' }}
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}
                            >
                                {loading ? 'Consulting Engine...' : 'Generate My Path'}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Assessment;
