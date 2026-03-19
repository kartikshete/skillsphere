import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    HelpCircle, Sparkles, CheckCircle, XCircle, Trophy, RotateCcw, Clock, Zap,
    AlertCircle, Settings, Target, Mic, Paperclip, Send,
    MessageSquare, Trash2, BookmarkPlus, BookOpen, X, Globe, Code, Copy, Check
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIChatbot = ({ language }) => {
    const [messages, setMessages] = useState([
        {
            role: 'ai', text: `🎓 ** Welcome to SkillSphere AI - Your Universal Doubt Solver! **

    I can help you with ** ALL SUBJECTS ** - just like ChatGPT:

📚 ** Subjects I Cover:**
• Science(Physics, Chemistry, Biology)
• Mathematics(Algebra, Calculus, Geometry, Statistics)
• Engineering(Computer, Mechanical, Civil, Electrical)
• Medical(Anatomy, Physiology, Pharmacology)
• Commerce(Accounting, Economics, Finance, Business)
• Arts(History, Geography, Literature, Psychology)
• Programming(JavaScript, Python, Java, C++, React, DSA)

💡 ** What I Can Do:**
• Explain concepts in simple language
• Solve numerical problems step - by - step
• Debug code and explain errors
• Answer theory questions
• Provide real - world examples
• Help with homework and assignments

🌐 ** Language:** Responding in ** ${language}**

** Ask me ANYTHING ** - from "What is photosynthesis?" to "Debug my React code"!` }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [savedNotes, setSavedNotes] = useState([]);
    const [showNotes, setShowNotes] = useState(false);
    const [copiedCode, setCopiedCode] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isListening, setIsListening] = useState(false);
    const chatEndRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        const notes = JSON.parse(localStorage.getItem('skillsphere_notes') || '[]');
        setSavedNotes(notes);
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    // Handle File Select
    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    // Handle Voice Input (Web Speech API)
    const toggleMic = () => {
        if (isListening) {
            setIsListening(false);
            window.speechRecognition?.stop();
        } else {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            if (!SpeechRecognition) {
                alert("Browser does not support Voice Input");
                return;
            }
            const recognition = new SpeechRecognition();
            recognition.lang = 'en-US'; // Or map from {language}
            recognition.interimResults = false;
            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setInput(prev => prev + ' ' + transcript);
            };
            recognition.start();
            window.speechRecognition = recognition;
        }
    };

    const sendMessage = async () => {
        if (!input.trim() && !selectedFile) return;

        let finalMessage = input;

        // Handle File Content (Client-Side Read)
        if (selectedFile) {
            if (selectedFile.type.startsWith('text/') || selectedFile.name.endsWith('.js') || selectedFile.name.endsWith('.py') || selectedFile.name.endsWith('.txt')) {
                const text = await selectedFile.text();
                finalMessage += `\n\n[Attached File: ${selectedFile.name}]\n\`\`\`\n${text}\n\`\`\``;
            } else {
                finalMessage += `\n\n[Attached File: ${selectedFile.name} (Binary/Image - Analysis pending)]`;
            }
        }

        const userMsg = { role: 'user', text: finalMessage };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setSelectedFile(null); // Clear file
        setLoading(true);

        try {
            const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
            const resp = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: finalMessage, profile, language, history: messages })
            });
            const data = await resp.json();
            if (data.error) throw new Error(data.error);
            setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
        } catch (e) {
            console.error('Chat Error:', e);
            setMessages(prev => [...prev, { role: 'ai', text: `⚠️ Error: ${e.message}. Check backend console.` }]);
        }
        setLoading(false);
    };

    const saveNote = (text) => {
        const note = {
            id: Date.now(),
            content: text,
            date: new Date().toLocaleDateString(),
            language
        };
        const updated = [...savedNotes, note];
        setSavedNotes(updated);
        localStorage.setItem('skillsphere_notes', JSON.stringify(updated));
    };

    const deleteNote = (id) => {
        const updated = savedNotes.filter(n => n.id !== id);
        setSavedNotes(updated);
        localStorage.setItem('skillsphere_notes', JSON.stringify(updated));
    };

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(code);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    return (
        <div style={{ paddingTop: '2rem', minHeight: '100vh', paddingBottom: '2rem' }}>
            <div className="container" style={{ maxWidth: '1200px' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                        <h1 className="gradient-text" style={{ fontSize: '2.5rem' }}>AI Universal Doubt Solver</h1>
                        <p style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Globe size={16} /> Responding in <strong style={{ color: 'var(--primary)' }}>{language}</strong> • Paste code for debugging
                        </p>
                    </div>
                    <button
                        onClick={() => setShowNotes(!showNotes)}
                        className="btn-primary"
                        style={{ padding: '0.7rem 1.2rem', borderRadius: '12px' }}
                    >
                        <BookOpen size={18} /> Notes ({savedNotes.length})
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: showNotes ? '1fr 350px' : '1fr', gap: '1.5rem', transition: 'all 0.3s ease' }}>
                    {/* Chat Area */}
                    <div className="glass-card" style={{ padding: '0', display: 'flex', flexDirection: 'column', height: '70vh', overflow: 'hidden' }}>

                        {/* Messages */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                            <div className="stack-sm">
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        style={{
                                            display: 'flex',
                                            justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                            gap: '0.5rem'
                                        }}
                                    >
                                        <div style={{
                                            maxWidth: '85%',
                                            background: msg.role === 'user' ? 'var(--primary)' : 'var(--bg-offset)',
                                            padding: '1rem 1.25rem',
                                            borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                                            border: msg.role === 'ai' ? '1px solid var(--glass-border)' : 'none',
                                            position: 'relative'
                                        }}>
                                            {msg.role === 'ai' ? (
                                                <div className="lesson-content" style={{ fontSize: '0.95rem' }}>
                                                    <ReactMarkdown
                                                        components={{
                                                            code({ node, inline, className, children, ...props }) {
                                                                const match = /language-(\w+)/.exec(className || '');
                                                                const codeString = String(children).replace(/\n$/, '');
                                                                return !inline && match ? (
                                                                    <div style={{ position: 'relative' }}>
                                                                        <button
                                                                            onClick={() => copyCode(codeString)}
                                                                            style={{
                                                                                position: 'absolute', top: '0.5rem', right: '0.5rem',
                                                                                background: 'rgba(255,255,255,0.1)', border: 'none',
                                                                                padding: '0.4rem 0.6rem', borderRadius: '6px',
                                                                                cursor: 'pointer', color: 'white', fontSize: '0.75rem',
                                                                                display: 'flex', alignItems: 'center', gap: '0.3rem'
                                                                            }}
                                                                        >
                                                                            {copiedCode === codeString ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
                                                                        </button>
                                                                        <SyntaxHighlighter
                                                                            style={vscDarkPlus}
                                                                            language={match[1]}
                                                                            PreTag="div"
                                                                            {...props}
                                                                        >
                                                                            {codeString}
                                                                        </SyntaxHighlighter>
                                                                    </div>
                                                                ) : (
                                                                    <code className={className} {...props}>
                                                                        {children}
                                                                    </code>
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        {msg.text}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                <p style={{ fontSize: '0.95rem', color: 'white', whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                                            )}

                                            {/* Save Note Button */}
                                            {msg.role === 'ai' && idx > 0 && (
                                                <button
                                                    onClick={() => saveNote(msg.text)}
                                                    title="Save as Note"
                                                    style={{
                                                        position: 'absolute', top: '0.5rem', right: '0.5rem',
                                                        background: 'none', border: 'none', cursor: 'pointer',
                                                        color: 'var(--text-muted)', opacity: 0.6
                                                    }}
                                                >
                                                    <BookmarkPlus size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                                {loading && (
                                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'var(--text-muted)' }}>
                                        <Sparkles size={16} className="animate-float" /> Analyzing...
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>
                        </div>

                        {/* Input Bar */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            borderTop: '1px solid var(--glass-border)',
                            background: 'var(--bg-offset)'
                        }}>
                            {/* File Preview */}
                            {selectedFile && (
                                <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                                    <Paperclip size={14} /> {selectedFile.name}
                                    <button onClick={() => setSelectedFile(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}><XCircle size={14} /></button>
                                </div>
                            )}

                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                                {/* File Upload Button */}
                                <label style={{ cursor: 'pointer', padding: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
                                    <input type="file" onChange={handleFileSelect} style={{ display: 'none' }} accept="image/*,.pdf,.txt" />
                                    <Paperclip size={20} />
                                </label>

                                <div style={{ flex: 1 }}>
                                    <textarea
                                        ref={textareaRef}
                                        value={input}
                                        onChange={e => setInput(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                sendMessage();
                                            }
                                        }}
                                        placeholder={isListening ? "Listening..." : "Ask anything..."}
                                        rows={1}
                                        style={{
                                            width: '100%',
                                            background: 'var(--bg-main)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '12px',
                                            padding: '0.8rem 1rem',
                                            color: 'var(--text-main)',
                                            resize: 'none',
                                            minHeight: '46px',
                                            maxHeight: '150px',
                                            outline: 'none',
                                            fontFamily: 'inherit'
                                        }}
                                    />
                                </div>

                                {/* Mic Button */}
                                <button
                                    onClick={toggleMic}
                                    className={`btn-icon ${isListening ? 'animate-pulse' : ''}`}
                                    style={{
                                        padding: '0.8rem',
                                        background: isListening ? 'red' : 'var(--bg-card)',
                                        color: isListening ? 'white' : 'var(--text-muted)',
                                        borderRadius: '50%',
                                        border: '1px solid var(--glass-border)'
                                    }}
                                    title="Voice Input"
                                >
                                    <Mic size={20} />
                                </button>

                                <button
                                    onClick={sendMessage}
                                    disabled={loading || (!input.trim() && !selectedFile)}
                                    className="btn-primary"
                                    style={{
                                        borderRadius: '12px',
                                        padding: '0.8rem 1.2rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        opacity: (loading || (!input.trim() && !selectedFile)) ? 0.5 : 1
                                    }}
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                                <Code size={12} style={{ display: 'inline', marginRight: '0.3rem' }} />
                                Paste code directly • Ask in {language} • Get step-by-step help
                            </p>
                        </div>
                    </div>

                    {/* Notes Sidebar */}
                    <AnimatePresence>
                        {showNotes && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="glass-card"
                                style={{ height: '70vh', overflowY: 'auto', padding: '1.5rem' }}
                            >
                                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <BookOpen size={20} color="var(--primary)" /> Saved Notes
                                </h3>

                                {savedNotes.length === 0 ? (
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                        No notes yet. Click the 🔖 icon on any AI response to save it.
                                    </p>
                                ) : (
                                    <div className="stack-sm">
                                        {savedNotes.map(note => (
                                            <div key={note.id} style={{
                                                background: 'var(--bg-main)',
                                                padding: '1rem',
                                                borderRadius: '12px',
                                                border: '1px solid var(--glass-border)',
                                                position: 'relative'
                                            }}>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                                                    {note.date} • {note.language}
                                                </div>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
                                                    {note.content.substring(0, 200)}{note.content.length > 200 ? '...' : ''}
                                                </p>
                                                <button
                                                    onClick={() => deleteNote(note.id)}
                                                    style={{
                                                        position: 'absolute', top: '0.75rem', right: '0.75rem',
                                                        background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)'
                                                    }}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AIChatbot;
