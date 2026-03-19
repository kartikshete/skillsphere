import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Briefcase, Star, Award } from 'lucide-react';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: 'Kartik Shete',
        role: 'Full Stack Innovator',
        email: 'kartik@innovators.ai',
        rank: 'Gold Specialist',
        xp: 2450,
        level: 12
    });

    useEffect(() => {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            const parsed = JSON.parse(saved);
            setProfile(prev => ({ ...prev, ...parsed }));
        }
    }, []);

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem' }}>

                    {/* Identity Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card"
                        style={{ textAlign: 'center' }}
                    >
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            margin: '0 auto 1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '4px solid var(--glass-border)',
                            fontSize: '3rem',
                            fontWeight: '800',
                            color: 'white'
                        }}>
                            {profile.name[0]}
                        </div>
                        <h2 style={{ fontSize: '1.5rem' }}>{profile.name}</h2>
                        <p style={{ color: 'var(--primary)', fontWeight: '700', marginTop: '0.25rem' }}>{profile.role}</p>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                            <div className="glass-card" style={{ padding: '0.75rem', borderRadius: '12px', flex: 1 }}>
                                <Star size={20} color="#fbbf24" />
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Level</div>
                                <div style={{ fontWeight: '800' }}>{profile.level}</div>
                            </div>
                            <div className="glass-card" style={{ padding: '0.75rem', borderRadius: '12px', flex: 1 }}>
                                <Award size={20} color="#6366f1" />
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rank</div>
                                <div style={{ fontWeight: '800' }}>{profile.rank.split(' ')[0]}</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Settings / Building Flow */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card"
                    >
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Shield color="var(--primary)" /> Profile Builder
                        </h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="text"
                                        value={profile.name}
                                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email Address</label>
                                <div style={{ position: 'relative' }}>
                                    <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input
                                        type="email"
                                        value={profile.email}
                                        style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)' }}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Primary Learning Path</label>
                            <div style={{ position: 'relative' }}>
                                <Briefcase size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    value={profile.role}
                                    onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                                    style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)' }}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                localStorage.setItem('userProfile', JSON.stringify(profile));
                                alert('Sphere Profile Updated!');
                            }}
                            className="btn-primary"
                            style={{ marginTop: '2rem', width: '200px', justifyContent: 'center' }}
                        >
                            Update Identity
                        </button>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
