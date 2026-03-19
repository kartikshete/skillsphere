import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart, Zap, Target, BookOpen } from 'lucide-react';

const ProgressReport = () => {
    const stats = [
        { label: 'Modules Completed', value: '4/5', icon: BookOpen, color: '#6366f1' },
        { label: 'Intelligence Score', value: '92', icon: Zap, color: '#fbbf24' },
        { label: 'Global Rank', value: '#1,245', icon: TrendingUp, color: '#10b981' },
        { label: 'Learning Streak', value: '7 Days', icon: Target, color: '#f43f5e' }
    ];

    const mastery = [
        { skill: 'Core Conceptualization', level: 85 },
        { skill: 'Practical Application', level: 72 },
        { skill: 'Theoretical Mastery', level: 94 },
        { skill: 'Quick Problem Solving', level: 68 }
    ];

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
            <div className="container">
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '3rem' }}
                >
                    <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Progress Intelligence</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Data-driven insights into your professional evolution.</p>
                </motion.header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card"
                            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                        >
                            <div style={{ background: stat.color + '22', padding: '1rem', borderRadius: '16px' }}>
                                <stat.icon color={stat.color} />
                            </div>
                            <div>
                                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{stat.label}</div>
                                <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>{stat.value}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card"
                    >
                        <h3 style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <BarChart color="var(--primary)" /> Mastery Visualization
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {mastery.map((item, idx) => (
                                <div key={idx}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                                        <span>{item.skill}</span>
                                        <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{item.level}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: 'var(--bg-main)', borderRadius: '10px', overflow: 'hidden' }}>
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${item.level}%` }}
                                            transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                                            style={{ height: '100%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary-glow)' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card"
                        style={{ background: 'linear-gradient(135deg, var(--bg-offset), rgba(99, 102, 241, 0.05))' }}
                    >
                        <h3 style={{ marginBottom: '1rem' }}>Rank Insight</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            You are currently in the <strong>Top 8%</strong> of learners in your field.
                            Complete the next module with a 90%+ diagnostic score to reach <strong>Platinum Rank</strong>.
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
                            <div className="animate-float" style={{
                                width: '150px',
                                height: '150px',
                                borderRadius: '50%',
                                border: '8px solid var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 0 40px var(--primary-glow)'
                            }}>
                                <Award size={64} color="var(--primary)" />
                            </div>
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '1rem', fontWeight: '800', color: 'var(--primary)' }}>
                            GOLD SPECIALIST III
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProgressReport;
