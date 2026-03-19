import React from 'react';
import { motion } from 'framer-motion';
import { Users, Code, Award, Target, Cpu, ShieldCheck } from 'lucide-react';

const About = () => {
    const team = [
        { name: 'Kartik Shete', role: 'Team Leader', color: '#6366f1' },
        { name: 'Purva Lad', role: 'Co-Leader', color: '#f43f5e' },
        { name: 'Chanksha Patil', role: 'Core Architect', color: '#06b6d4' },
        { name: 'Sunil Kumbhar', role: 'UI/UX Lead', color: '#10b981' },
        { name: 'Shriram Jagdale', role: 'Backend specialist', color: '#fbbf24' }
    ];

    return (
        <div style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>
            <div className="container">
                {/* Team Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    style={{ textAlign: 'center', marginBottom: '80px' }}
                >
                    <span style={{ color: 'var(--primary)', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase' }}>Meet the Visionaries</span>
                    <h1 className="gradient-text" style={{ fontSize: '4rem', marginTop: '1rem' }}>THE INNOVATORS</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '1.5rem auto' }}>
                        A multidisciplinary team dedicated to revolutionizing education through AI-driven personalization.
                    </p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '100px' }}>
                    {team.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-card"
                            style={{ textAlign: 'center', borderColor: member.color + '33' }}
                        >
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: member.color + '22',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                border: `2px solid ${member.color}`
                            }}>
                                <Users color={member.color} size={32} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem' }}>{member.name}</h3>
                            <p style={{ color: member.color, fontSize: '0.9rem', fontWeight: '700', marginTop: '0.5rem' }}>{member.role}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Project Description (500+ Words) */}
                <div className="glass-card" style={{ padding: '4rem', lineHeight: '2' }}>
                    <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>SkillSphere: The Future of Personalized Learning</h2>

                    <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                        <p style={{ marginBottom: '1.5rem' }}>
                            SkillSphere represents a paradigm shift in how we approach professional development and academic growth. For decades, the global education system has operated on a "one-size-fits-all" model—a static curriculum delivered at a uniform pace to learners with vastly different cognitive profiles, background knowledge, and professional aspirations. This legacy approach inevitably leaves behind those who need more support while failing to challenge high-performers, resulting in a systemic drain on human potential.
                        </p>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Recognizing this critical gap, <strong>THE INNOVATORS</strong> engineered SkillSphere—an AI-powered Personalization Engine designed to deliver truly bespoke learning experiences. Our core philosophy is built upon the integration of high-level architectural mapping and deep-dive content intelligence. By leveraging a dual-AI framework, SkillSphere doesn't just suggest courses; it architecturally adapts the entire learning journey to the individual.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', margin: '3rem 0' }}>
                            <div style={{ background: 'var(--bg-main)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                                <h4 style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <Cpu size={20} /> Neural Optimization
                                </h4>
                                <p style={{ fontSize: '0.95rem' }}>Our engine analyzes over 50 data points from initial diagnostics to predict the most effective learning sequence for each user.</p>
                            </div>
                            <div style={{ background: 'var(--bg-main)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--glass-border)' }}>
                                <h4 style={{ color: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <ShieldCheck size={20} /> Integrity First
                                </h4>
                                <p style={{ fontSize: '0.95rem' }}>SkillSphere prioritizes ethical AI usage, ensuring data privacy and transparency in every generated path.</p>
                            </div>
                        </div>

                        <p style={{ marginBottom: '1.5rem' }}>
                            The technical foundation of SkillSphere is as robust as its educational vision. Utilizing a Node.js and React monorepo architecture, we've implemented a hybrid intelligence model. The <strong>Gemini Path Engine</strong> takes the lead in structure, analyzing professional goals to create five-module progressive trees. Once a learner enters a module, the <strong>OpenAI Content Intelligence</strong> takes over, instantly generating interactive, Markdown-rendered lessons that include real-world exercises and context-aware examples.
                        </p>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Visual excellence is not just an aesthetic choice but a usability requirement. The SkillSphere interface features "Level Backgrounds"—a multi-layered, interactive CSS environment that provides visual depth without distracting from the learning task. With integrated Dark and Light mode support, the platform ensures comfort for long-duration study sessions, catering to the biological needs of the learner's circadian rhythm.
                        </p>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Looking toward the future, THE INNOVATORS plan to expand SkillSphere with real-time mentor integration and AI-driven peer groups. We believe that by democratizing high-end personalized education, we can close the global skills gap and empower a new generation of professionals to reach their full potential. SkillSphere is more than a platform; it is a commitment to the endless possibilities of human growth, powered by the most advanced technology available today.
                        </p>

                        <p>
                            In conclusion, this project serves as a testament to what a dedicated team can achieve when they combine technical prowess with a deep empathy for the learner's journey. From the team leader Kartik Shete's vision to the collective execution of Purva, Chanksha, Sunil, and Shriram, SkillSphere is built by innovators, for innovators.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
