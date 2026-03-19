import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Orbit, Sun, Moon, Globe, User, BarChart, Trophy, Award, MessageSquare, Users, HelpCircle, Fingerprint } from 'lucide-react';

const Navbar = ({ theme, toggleTheme, language, setLanguage }) => {
    const [showLang, setShowLang] = useState(false);
    const languages = ['English', 'Hindi', 'Marathi', 'Hinglish'];

    const navLink = {
        display: 'flex', alignItems: 'center', gap: '0.35rem',
        color: 'var(--text-muted)', textDecoration: 'none',
        fontWeight: '600', fontSize: '0.8rem', transition: '0.2s',
        whiteSpace: 'nowrap'
    };

    return (
        <nav style={{
            position: 'fixed', top: 0, width: '100%', zIndex: 1000,
            padding: '0.6rem 1.5rem',
            background: 'var(--glass)', backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--glass-border)'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <Orbit size={24} color="var(--primary)" />
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-0.5px' }}>
                        Skill<span style={{ color: 'var(--primary)' }}>Sphere</span>
                    </span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                    <Link to="/dashboard" style={navLink}><BarChart size={14} /> Dashboard</Link>
                    <Link to="/chatbot" style={navLink}><MessageSquare size={14} /> AI Solver</Link>
                    <Link to="/quiz" style={navLink}><HelpCircle size={14} /> Quiz</Link>
                    <Link to="/skillprint" style={navLink}><Fingerprint size={14} /> SkillPrint</Link>
                    <Link to="/leaderboard" style={navLink}><Trophy size={14} /> Rank</Link>
                    <Link to="/progress" style={navLink}><BarChart size={14} /> Stats</Link>
                    <Link to="/profile" style={navLink}><User size={14} /> Profile</Link>
                    <Link to="/certificate" style={navLink}><Award size={14} /> Cert</Link>
                    <Link to="/about" style={navLink}><Users size={14} /> About</Link>

                    {/* Language Selector */}
                    <div style={{ position: 'relative' }}>
                        <button
                            onClick={() => setShowLang(!showLang)}
                            style={{
                                background: 'var(--glass)', border: '1px solid var(--glass-border)',
                                color: 'var(--text-main)', padding: '0.35rem 0.6rem', borderRadius: '8px',
                                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem',
                                fontSize: '0.75rem', fontWeight: '600', fontFamily: 'Outfit'
                            }}
                        >
                            <Globe size={12} color="var(--primary)" /> {language}
                        </button>

                        {showLang && (
                            <>
                                <div onClick={() => setShowLang(false)} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />
                                <div style={{
                                    position: 'absolute', top: '120%', right: 0, zIndex: 999,
                                    background: 'var(--bg-offset)', border: '1px solid var(--glass-border)',
                                    borderRadius: '10px', width: '120px', overflow: 'hidden', boxShadow: 'var(--shadow)'
                                }}>
                                    {languages.map(lang => (
                                        <button
                                            key={lang}
                                            onClick={() => { setLanguage(lang); setShowLang(false); }}
                                            style={{
                                                width: '100%', padding: '0.5rem 0.75rem', background: 'none', border: 'none',
                                                color: language === lang ? 'var(--primary)' : 'var(--text-main)',
                                                textAlign: 'left', cursor: 'pointer', fontSize: '0.8rem',
                                                fontWeight: language === lang ? '700' : '500', fontFamily: 'Outfit'
                                            }}
                                            onMouseEnter={(e) => e.target.style.background = 'var(--glass)'}
                                            onMouseLeave={(e) => e.target.style.background = 'none'}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={toggleTheme}
                        style={{
                            background: 'var(--glass)', border: '1px solid var(--glass-border)',
                            color: 'var(--text-main)', padding: '0.35rem', borderRadius: '8px', cursor: 'pointer'
                        }}
                    >
                        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
