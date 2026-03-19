import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp, User } from 'lucide-react';

const Leaderboard = () => {
    const [profile, setProfile] = useState(null);
    const [leaders, setLeaders] = useState([
        { name: 'Sarah Chen', role: 'AI Architect', xp: 15400, rank: 'Diamond', avatar: '#6366f1' },
        { name: 'Michael Ross', role: 'Full Stack Lead', xp: 14200, rank: 'Platinum', avatar: '#f43f5e' },
        { name: 'David Kim', role: 'Data Scientist', xp: 12800, rank: 'Platinum', avatar: '#10b981' },
        { name: 'Emma Wilson', role: 'UX Researcher', xp: 11500, rank: 'Gold', avatar: '#fbbf24' },
        { name: 'James Lee', role: 'DevOps Eng.', xp: 9800, rank: 'Gold', avatar: '#06b6d4' },
    ]);

    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const parsed = JSON.parse(savedProfile);
            // Insert user into leaderboard for demo purposes (sorted by XP)
            const userEntry = {
                name: parsed.name,
                role: parsed.role,
                xp: parsed.xp || 0,
                rank: parsed.rank,
                avatar: 'var(--primary)',
                isUser: true
            };
            setLeaders(prev => [...prev, userEntry].sort((a, b) => b.xp - a.xp));
        }
    }, []);

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <div className="flex-center" style={{ gap: '0.75rem', marginBottom: '1rem', justifyContent: 'center' }}>
                        <Crown size={32} color="#fbbf24" className="animate-float" />
                        <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px' }}>TOP INNOVATORS</span>
                    </div>
                    <h1 className="gradient-text" style={{ fontSize: '3rem' }}>Global Leaderboard</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Compete with the top 1% of global talent.</p>
                </motion.div>

                <div className="stack-md">
                    {leaders.map((leader, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '1.5rem',
                                border: leader.isUser ? '2px solid var(--primary)' : '1px solid var(--glass-border)',
                                background: leader.isUser ? 'rgba(99, 102, 241, 0.1)' : 'var(--glass)',
                                transform: leader.isUser ? 'scale(1.02)' : 'scale(1)'
                            }}
                        >
                            <div style={{
                                fontSize: '1.5rem',
                                fontWeight: '800',
                                color: idx < 3 ? '#fbbf24' : 'var(--text-muted)',
                                width: '50px',
                                textAlign: 'center'
                            }}>
                                #{idx + 1}
                            </div>

                            <div style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: leader.avatar,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '700',
                                margin: '0 1.5rem'
                            }}>
                                {leader.name[0]}
                            </div>

                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {leader.name}
                                    {leader.isUser && <span style={{ fontSize: '0.7rem', background: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '4px', color: 'white' }}>YOU</span>}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{leader.role}</p>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>{leader.xp.toLocaleString()} XP</div>
                                <div style={{ fontSize: '0.8rem', color: idx < 3 ? '#fbbf24' : 'var(--text-muted)' }}>{leader.rank}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Leaderboard;
