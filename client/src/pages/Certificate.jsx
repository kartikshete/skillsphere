import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, Sparkles, ShieldCheck, Star, Trophy } from 'lucide-react';
import html2canvas from 'html2canvas';

const Certificate = () => {
    const [profile, setProfile] = useState(null);
    const [showCert, setShowCert] = useState(false);
    const certRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem('userProfile');
        if (saved) {
            setProfile(JSON.parse(saved));
            setShowCert(true);
        }
    }, []);

    const downloadCert = async () => {
        if (!certRef.current) return;
        const canvas = await html2canvas(certRef.current, { scale: 3, backgroundColor: '#ffffff' });
        const link = document.createElement('a');
        link.download = `SkillSphere_Certificate_${profile?.name?.replace(/\s/g, '_') || 'Learner'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: '4rem', paddingBottom: '4rem', position: 'relative', overflow: 'hidden' }}>
            {/* Animated Background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.1 }}>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0.2, 0.5, 0.2],
                            scale: [1, 1.5, 1],
                            x: [0, Math.random() * 100 - 50, 0],
                            y: [0, Math.random() * 100 - 50, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        style={{
                            position: 'absolute',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    >
                        <Star size={20 + Math.random() * 30} color="var(--primary)" />
                    </motion.div>
                ))}
            </div>

            <div className="container" style={{ maxWidth: '1100px' }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '3rem' }}
                >
                    <div className="flex-center" style={{ justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Trophy size={48} color="var(--primary)" />
                        </motion.div>
                        <h1 className="gradient-text" style={{ fontSize: '3.5rem', margin: 0 }}>
                            Achievement Unlocked
                        </h1>
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Award size={48} color="var(--secondary)" />
                        </motion.div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                        Your official SkillSphere completion certificate
                    </p>
                </motion.div>

                {/* Certificate */}
                {showCert && (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
                        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                        transition={{ duration: 1, type: "spring" }}
                        style={{ perspective: '1000px' }}
                    >
                        <div
                            ref={certRef}
                            style={{
                                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                                color: '#0f172a',
                                padding: '4rem',
                                borderRadius: '20px',
                                border: '12px solid',
                                borderImage: 'linear-gradient(135deg, #6366f1, #06b6d4, #f43f5e) 1',
                                position: 'relative',
                                boxShadow: '0 30px 80px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255,255,255,0.1)',
                                fontFamily: 'Outfit, serif',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Decorative Corner Elements */}
                            <div style={{ position: 'absolute', top: '1rem', left: '1rem', opacity: 0.15 }}>
                                <Award size={120} color="#6366f1" />
                            </div>
                            <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', opacity: 0.15 }}>
                                <Sparkles size={120} color="#06b6d4" />
                            </div>

                            {/* Certificate Content */}
                            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                {/* Logo/Brand */}
                                <div style={{ marginBottom: '2rem' }}>
                                    <div style={{
                                        fontSize: '2.5rem',
                                        fontWeight: '800',
                                        background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        letterSpacing: '3px'
                                    }}>
                                        SKILLSPHERE
                                    </div>
                                    <div style={{ fontSize: '0.9rem', color: '#64748b', letterSpacing: '2px', marginTop: '0.5rem' }}>
                                        AI-POWERED LEARNING PLATFORM
                                    </div>
                                </div>

                                {/* Certificate Title */}
                                <h2 style={{
                                    fontSize: '4rem',
                                    marginBottom: '1rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '8px',
                                    color: '#1e293b',
                                    fontWeight: '900'
                                }}>
                                    CERTIFICATE
                                </h2>
                                <h3 style={{
                                    fontSize: '1.8rem',
                                    marginBottom: '3rem',
                                    color: '#6366f1',
                                    letterSpacing: '4px',
                                    fontWeight: '600'
                                }}>
                                    OF MASTERY
                                </h3>

                                {/* Recipient */}
                                <p style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: '#64748b' }}>
                                    This certifies that
                                </p>
                                <h1 style={{
                                    fontSize: '3.5rem',
                                    fontFamily: 'Brush Script MT, cursive',
                                    color: '#0f172a',
                                    margin: '0 0 2.5rem',
                                    fontWeight: 'bold',
                                    textDecoration: 'underline',
                                    textDecorationColor: '#6366f1',
                                    textDecorationThickness: '3px',
                                    textUnderlineOffset: '10px'
                                }}>
                                    {profile?.name || 'Authorized Learner'}
                                </h1>

                                {/* Achievement Description */}
                                <p style={{
                                    fontSize: '1.2rem',
                                    maxWidth: '700px',
                                    margin: '0 auto 3rem',
                                    lineHeight: '1.8',
                                    color: '#334155'
                                }}>
                                    Has successfully completed the <strong style={{ color: '#6366f1' }}>{profile?.role || 'Advanced Technology'} Proficiency Track</strong> via the SkillSphere Adaptive Learning Engine, demonstrating exceptional mastery in core competencies, practical application, and problem-solving excellence.
                                </p>

                                {/* Stats */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    gap: '3rem',
                                    marginBottom: '3rem',
                                    padding: '2rem',
                                    background: 'rgba(99, 102, 241, 0.05)',
                                    borderRadius: '12px'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#6366f1' }}>
                                            {profile?.xp || 0}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            XP Earned
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#06b6d4' }}>
                                            {profile?.level || 1}
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            Level Achieved
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#f43f5e' }}>
                                            A+
                                        </div>
                                        <div style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                            Grade
                                        </div>
                                    </div>
                                </div>

                                {/* Signature Section */}
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: '4rem',
                                    borderTop: '3px solid #e2e8f0',
                                    paddingTop: '2rem'
                                }}>
                                    <div style={{ textAlign: 'left' }}>
                                        <div style={{
                                            fontSize: '2rem',
                                            fontFamily: 'Brush Script MT, cursive',
                                            marginBottom: '0.5rem',
                                            color: '#0f172a'
                                        }}>
                                            SkillSphere AI
                                        </div>
                                        <div style={{
                                            fontSize: '0.9rem',
                                            color: '#64748b',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            Certification Authority
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{
                                            fontSize: '1.8rem',
                                            fontWeight: '700',
                                            marginBottom: '0.5rem',
                                            color: '#0f172a'
                                        }}>
                                            {new Date().toLocaleDateString('en-US', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </div>
                                        <div style={{
                                            fontSize: '0.9rem',
                                            color: '#64748b',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>
                                            Date Issued
                                        </div>
                                    </div>
                                </div>

                                {/* Verification */}
                                <div style={{
                                    marginTop: '3rem',
                                    fontSize: '0.85rem',
                                    color: '#94a3b8',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem',
                                    background: 'rgba(99, 102, 241, 0.05)',
                                    borderRadius: '8px'
                                }}>
                                    <ShieldCheck size={18} color="#6366f1" />
                                    <span>
                                        Blockchain Verified • Certificate ID: <strong>SKILL-{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Download Button */}
                {showCert && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        style={{ textAlign: 'center', marginTop: '3rem' }}
                    >
                        <motion.button
                            onClick={downloadCert}
                            whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)' }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-primary"
                            style={{
                                padding: '1.2rem 3rem',
                                fontSize: '1.3rem',
                                borderRadius: '16px'
                            }}
                        >
                            <Download size={28} /> Download Certificate
                        </motion.button>
                        <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            High-resolution PNG • Ready to share on LinkedIn
                        </p>
                    </motion.div>
                )}

                {!showCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="glass-card"
                        style={{ textAlign: 'center', padding: '4rem' }}
                    >
                        <Sparkles size={64} color="var(--primary)" style={{ margin: '0 auto 2rem' }} className="animate-float" />
                        <h3 style={{ marginBottom: '1rem' }}>Complete Your Learning Journey</h3>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Finish the assessment and earn XP to unlock your certificate!
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Certificate;
