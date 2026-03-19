import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Brain, Target, Award, BarChart3, PieChart, Activity, Zap, BookOpen, Clock } from 'lucide-react';

const Analysis = () => {
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState({
        totalXP: 0,
        level: 1,
        quizzesTaken: 0,
        averageScore: 0,
        studyTime: 0,
        streak: 0
    });

    useEffect(() => {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            const data = JSON.parse(saved);
            setProfile(data);
            setStats({
                totalXP: data.xp || 0,
                level: data.level || 1,
                quizzesTaken: Math.floor((data.xp || 0) / 50),
                averageScore: 75 + Math.floor(Math.random() * 20),
                studyTime: Math.floor((data.xp || 0) / 10),
                streak: Math.floor((data.xp || 0) / 100)
            });
        }
    }, []);

    const subjects = [
        { name: 'Programming', progress: 85, color: '#6366f1' },
        { name: 'Mathematics', progress: 70, color: '#06b6d4' },
        { name: 'Science', progress: 60, color: '#22c55e' },
        { name: 'Languages', progress: 45, color: '#f59e0b' }
    ];

    const recentActivity = [
        { title: 'Completed JavaScript Quiz', score: '8/10', time: '2 hours ago', icon: Award, color: '#22c55e' },
        { title: 'Studied React Hooks', duration: '45 min', time: '5 hours ago', icon: BookOpen, color: '#6366f1' },
        { title: 'Earned 100 XP', achievement: 'Level Up!', time: '1 day ago', icon: Zap, color: '#f59e0b' },
        { title: 'Completed Python Quiz', score: '9/10', time: '2 days ago', icon: Award, color: '#22c55e' }
    ];

    const strengths = ['Problem Solving', 'Logical Thinking', 'Quick Learner'];
    const improvements = ['Time Management', 'Advanced Topics', 'Consistency'];

    return (
        <div style={{ minHeight: '100vh', paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ marginBottom: '3rem', textAlign: 'center' }}
                >
                    <div className="flex-center" style={{ justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <BarChart3 size={48} color="var(--primary)" />
                        <h1 className="gradient-text" style={{ fontSize: '3.5rem', margin: 0 }}>
                            Learning Analytics
                        </h1>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                        Track your progress and identify areas for improvement
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                    {[
                        { label: 'Total XP', value: stats.totalXP, icon: Zap, color: '#f59e0b' },
                        { label: 'Current Level', value: stats.level, icon: TrendingUp, color: '#6366f1' },
                        { label: 'Quizzes Taken', value: stats.quizzesTaken, icon: Brain, color: '#06b6d4' },
                        { label: 'Avg Score', value: `${stats.averageScore}%`, icon: Target, color: '#22c55e' },
                        { label: 'Study Time', value: `${stats.studyTime}h`, icon: Clock, color: '#f43f5e' },
                        { label: 'Day Streak', value: stats.streak, icon: Activity, color: '#8b5cf6' }
                    ].map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card"
                            style={{ padding: '2rem', textAlign: 'center' }}
                        >
                            <stat.icon size={40} color={stat.color} style={{ margin: '0 auto 1rem' }} />
                            <div style={{ fontSize: '2.5rem', fontWeight: '800', color: stat.color, marginBottom: '0.5rem' }}>
                                {stat.value}
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Subject Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{ padding: '2.5rem', marginBottom: '2rem' }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <PieChart size={32} color="var(--primary)" />
                        Subject Mastery
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {subjects.map((subject, idx) => (
                            <div key={idx}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span style={{ fontWeight: '600' }}>{subject.name}</span>
                                    <span style={{ color: subject.color, fontWeight: '700' }}>{subject.progress}%</span>
                                </div>
                                <div style={{ height: '12px', background: 'var(--bg-secondary)', borderRadius: '6px', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${subject.progress}%` }}
                                        transition={{ duration: 1, delay: idx * 0.2 }}
                                        style={{ height: '100%', background: subject.color, borderRadius: '6px' }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Two Column Layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    {/* Strengths */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card"
                        style={{ padding: '2rem' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Award size={24} />
                            Your Strengths
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {strengths.map((strength, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(34, 197, 94, 0.1)',
                                        border: '2px solid #22c55e',
                                        borderRadius: '12px',
                                        fontWeight: '600'
                                    }}
                                >
                                    ✅ {strength}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Areas to Improve */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card"
                        style={{ padding: '2rem' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Target size={24} />
                            Focus Areas
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {improvements.map((area, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(245, 158, 11, 0.1)',
                                        border: '2px solid #f59e0b',
                                        borderRadius: '12px',
                                        fontWeight: '600'
                                    }}
                                >
                                    🎯 {area}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Recent Activity */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-card"
                    style={{ padding: '2.5rem' }}
                >
                    <h2 style={{ fontSize: '2rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                        <Activity size={32} color="var(--primary)" />
                        Recent Activity
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {recentActivity.map((activity, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                style={{
                                    padding: '1.5rem',
                                    background: 'var(--bg-secondary)',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1.5rem',
                                    border: '2px solid var(--border)'
                                }}
                            >
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    background: `${activity.color}20`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <activity.icon size={24} color={activity.color} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600', marginBottom: '0.3rem' }}>{activity.title}</div>
                                    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                        {activity.score || activity.duration || activity.achievement}
                                    </div>
                                </div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                                    {activity.time}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Analysis;
