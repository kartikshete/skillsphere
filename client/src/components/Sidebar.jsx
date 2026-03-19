import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Orbit, Sun, Moon, Globe, BarChart, Trophy,
    Award, MessageSquare, Users, HelpCircle,
    Fingerprint, Briefcase, ChevronRight, LogOut
} from 'lucide-react';

const Sidebar = ({ theme, toggleTheme, language, setLanguage }) => {
    const [showLang, setShowLang] = useState(false);
    const location = useLocation();
    const languages = ['English', 'Hindi', 'Marathi', 'Hinglish'];

    const isActive = (path) => location.pathname === path;

    const NavItem = ({ to, icon: Icon, label }) => (
        <Link
            to={to}
            style={{
                display: 'flex', alignItems: 'center', gap: '0.8rem',
                padding: '0.8rem 1rem', borderRadius: '12px',
                color: isActive(to) ? 'white' : 'var(--text-muted)',
                background: isActive(to) ? 'var(--primary)' : 'transparent',
                textDecoration: 'none', transition: 'all 0.2s ease',
                fontWeight: isActive(to) ? '600' : '500',
                marginBottom: '0.5rem',
                border: isActive(to) ? 'none' : '1px solid transparent'
            }}
            onMouseEnter={(e) => {
                if (!isActive(to)) {
                    e.target.style.background = 'var(--glass)';
                    e.target.style.color = 'var(--text-main)';
                }
            }}
            onMouseLeave={(e) => {
                if (!isActive(to)) {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--text-muted)';
                }
            }}
        >
            <Icon size={18} />
            <span style={{ fontSize: '0.95rem' }}>{label}</span>
            {isActive(to) && <ChevronRight size={16} style={{ marginLeft: 'auto', opacity: 0.8 }} />}
        </Link>
    );

    return (
        <aside style={{
            position: 'fixed', top: 0, left: 0, height: '100vh', width: '260px',
            background: 'var(--glass)', backdropFilter: 'blur(20px)',
            borderRight: '1px solid var(--glass-border)',
            padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column',
            zIndex: 1000
        }}>
            {/* Brand */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '3rem', paddingLeft: '0.5rem' }}>
                <Orbit size={32} color="var(--primary)" className="animate-float" />
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)', letterSpacing: '-1px' }}>
                    Skill<span style={{ color: 'var(--primary)' }}>Sphere</span>
                </span>
            </Link>

            {/* Navigation */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1rem', paddingLeft: '0.5rem' }}>Learning</p>
                <NavItem to="/dashboard" icon={BarChart} label="Dashboard" />
                <NavItem to="/skillprint" icon={Fingerprint} label="SkillPrint" />
                <NavItem to="/quiz" icon={HelpCircle} label="Quiz Gen" />
                <NavItem to="/chatbot" icon={MessageSquare} label="AI Solver" />

                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 1rem', paddingLeft: '0.5rem' }}>Progress</p>
                <NavItem to="/analysis" icon={Briefcase} label="Analysis" />
                <NavItem to="/certificate" icon={Award} label="Certificate" />

                <p style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', margin: '1.5rem 0 1rem', paddingLeft: '0.5rem' }}>System</p>
                <NavItem to="/profile" icon={Users} label="Profile" />
                <NavItem to="/about" icon={HelpCircle} label="About Team" />
            </div>

            {/* Controls */}
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>

                {/* Language */}
                <div style={{ position: 'relative', marginBottom: '0.8rem' }}>
                    <button
                        onClick={() => setShowLang(!showLang)}
                        style={{
                            width: '100%', padding: '0.8rem', borderRadius: '12px',
                            background: 'var(--bg-offset)', border: '1px solid var(--glass-border)',
                            color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Globe size={16} color="var(--primary)" /> {language}
                        </div>
                        <ChevronRight size={14} style={{ transform: showLang ? 'rotate(-90deg)' : 'rotate(0deg)', transition: '0.2s' }} />
                    </button>

                    {showLang && (
                        <div style={{
                            position: 'absolute', bottom: '110%', left: 0, width: '100%',
                            background: 'var(--bg-offset)', border: '1px solid var(--glass-border)',
                            borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                            zIndex: 1001
                        }}>
                            {languages.map(lang => (
                                <button
                                    key={lang}
                                    onClick={() => { setLanguage(lang); setShowLang(false); }}
                                    style={{
                                        width: '100%', padding: '0.7rem 1rem', background: 'none', border: 'none',
                                        color: language === lang ? 'var(--primary)' : 'var(--text-main)',
                                        textAlign: 'left', cursor: 'pointer', fontSize: '0.9rem',
                                        fontWeight: language === lang ? '700' : '500',
                                        borderBottom: '1px solid var(--glass-border)'
                                    }}
                                    onMouseEnter={(e) => e.target.style.background = 'var(--glass)'}
                                    onMouseLeave={(e) => e.target.style.background = 'none'}
                                >
                                    {lang}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    style={{
                        width: '100%', padding: '0.8rem', borderRadius: '12px',
                        background: 'transparent', border: '1px solid var(--glass-border)',
                        color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', transition: '0.2s'
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'var(--glass)';
                        e.target.style.color = 'var(--text-main)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.color = 'var(--text-muted)';
                    }}
                >
                    {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
