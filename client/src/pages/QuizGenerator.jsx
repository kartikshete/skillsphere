import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, BrainCircuit, CheckCircle, XCircle, ArrowRight, RefreshCw, Trophy } from 'lucide-react';

const QuizGenerator = ({ language }) => {
    const [step, setStep] = useState('config'); // config, play, result
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleGenerate = async () => {
        if (!topic.trim()) return;
        setLoading(true);
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);

            const response = await fetch('http://localhost:5000/api/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    topic,
                    numQuestions: 5,
                    difficulty: 'Intermediate',
                    language: language || 'English'
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error('Failed');
            const data = await response.json();

            if (Array.isArray(data) && data.length > 0) {
                setQuestions(data);
                setStep('play');
                setScore(0);
                setCurrentQ(0);
            } else {
                throw new Error('No questions generated');
            }
        } catch (error) {
            // Fallback (Offline Mode)
            setQuestions([
                {
                    question: `What is the core concept of ${topic}? (Offline Backup)`,
                    options: ["Abstraction", "Complexity", "Decoration", "Nothing"],
                    correctIndex: 0,
                    explanation: "Abstraction handles complexity by hiding details."
                },
                {
                    question: `Why implies ${topic} is useful?`,
                    options: ["Efficiency", "Cost", "Weight", "Taste"],
                    correctIndex: 0,
                    explanation: "It improves efficiency in development."
                },
                {
                    question: `Which tool supports ${topic}?`,
                    options: ["IDE", "Hammer", "Spoon", "Car"],
                    correctIndex: 0,
                    explanation: "Integrated Development Environments are key."
                }
            ]);
            setStep('play');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswer = (index) => {
        setSelectedOption(index);
        setShowExplanation(true);
        if (index === questions[currentQ].correctIndex) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        setSelectedOption(null);
        setShowExplanation(false);
        if (currentQ < questions.length - 1) {
            setCurrentQ(c => c + 1);
        } else {
            setStep('result');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
                {step === 'config' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-lg bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-indigo-500/20 rounded-full text-indigo-400 animate-pulse">
                                <BrainCircuit size={48} />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold text-center text-white mb-2">AI Quiz Master</h2>
                        <p className="text-center text-slate-400 mb-8">Test your knowledge on any topic instantly.</p>

                        <div className="space-y-4">
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Enter Topic (e.g., React, Python)..."
                                className="w-full bg-slate-800/50 border border-slate-600 text-white rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
                            />
                            <button
                                onClick={handleGenerate}
                                disabled={loading || !topic}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? <RefreshCw className="animate-spin" /> : <Sparkles size={20} />}
                                {loading ? 'Generating Magic...' : 'Start Quiz'}
                            </button>

                            <div className="flex flex-wrap gap-2 justify-center mt-4">
                                {['JavaScript', 'React', 'CSS', 'Python', 'System Design'].map(tag => (
                                    <span key={tag} onClick={() => setTopic(tag)} className="px-3 py-1 bg-slate-800 text-slate-400 text-sm rounded-full cursor-pointer hover:bg-slate-700 hover:text-white transition-colors border border-slate-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'play' && (
                    <motion.div
                        key="play"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-8 shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-slate-400 font-medium tracking-wide text-sm">Question {currentQ + 1}/{questions.length}</span>
                            <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded-full text-sm font-bold">
                                Score: {score * 10} XP
                            </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2 bg-slate-800 rounded-full mb-8 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}
                            />
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-8 leading-relaxed">
                            {questions[currentQ].question}
                        </h3>

                        <div className="space-y-3 mb-8">
                            {questions[currentQ].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => !showExplanation && handleAnswer(idx)}
                                    className={`w-full p-4 rounded-xl text-left font-medium transition-all flex justify-between items-center group ${showExplanation
                                        ? idx === questions[currentQ].correctIndex
                                            ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                                            : idx === selectedOption
                                                ? 'bg-red-500/20 border-red-500/50 text-red-400'
                                                : 'bg-slate-800/50 border-slate-700 text-slate-400 opacity-50'
                                        : 'bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/50 text-slate-200'
                                        }`}
                                >
                                    <span>{option}</span>
                                    {showExplanation && idx === questions[currentQ].correctIndex && <CheckCircle size={20} />}
                                    {showExplanation && idx === selectedOption && idx !== questions[currentQ].correctIndex && <XCircle size={20} />}
                                </button>
                            ))}
                        </div>

                        {showExplanation && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-slate-800/50 rounded-xl p-4 mb-6 border-l-4 border-indigo-500"
                            >
                                <p className="text-slate-300 text-sm">
                                    <span className="text-indigo-400 font-bold">Explanation:</span> {questions[currentQ].explanation}
                                </p>
                            </motion.div>
                        )}

                        <div className="flex justify-end">
                            <button
                                onClick={nextQuestion}
                                disabled={!showExplanation}
                                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-bold flex items-center gap-2 transition-all"
                            >
                                {currentQ === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {step === 'result' && (
                    <motion.div
                        key="result"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-lg bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-10 text-center shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                            <Trophy size={150} className="text-yellow-500" />
                        </div>

                        <div className="inline-flex p-5 rounded-full bg-yellow-500/10 mb-6 ring-4 ring-yellow-500/5">
                            <Trophy size={48} className="text-yellow-400" />
                        </div>

                        <h2 className="text-4xl font-bold text-white mb-2">Quiz Completed!</h2>
                        <p className="text-slate-400 mb-8">You showed great potential.</p>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                <p className="text-sm text-slate-400 uppercase tracking-wider">Score</p>
                                <p className="text-3xl font-bold text-indigo-400">{score}/{questions.length}</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                <p className="text-sm text-slate-400 uppercase tracking-wider">XP Earned</p>
                                <p className="text-3xl font-bold text-emerald-400">+{score * 10}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => { setStep('config'); setTopic(''); }}
                            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-600 hover:border-slate-500"
                        >
                            <RefreshCw size={20} /> Try Another Quiz
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default QuizGenerator;
