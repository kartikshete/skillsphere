import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Target, Zap, Trophy, Clock, Star, TrendingUp, BookOpen, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-xl relative overflow-hidden group`}
    >
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity`}>
            <Icon size={80} className={`text-${color}-500`} />
        </div>
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400`}>
                <Icon size={24} />
            </div>
            {trend && (
                <span className="text-emerald-400 text-sm font-medium flex items-center bg-emerald-500/10 px-2 py-1 rounded-full">
                    <TrendingUp size={14} className="mr-1" /> {trend}
                </span>
            )}
        </div>
        <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
    </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl">
                <p className="text-slate-200 font-medium mb-1">{label}</p>
                <p className="text-indigo-400 font-bold">
                    {payload[0].value}% Mastery
                </p>
            </div>
        );
    }
    return null;
};

const Dashboard = ({ language }) => {
    // Mock Data
    const activityData = [
        { name: 'Mon', completion: 45, xp: 120 },
        { name: 'Tue', completion: 52, xp: 200 },
        { name: 'Wed', completion: 49, xp: 150 },
        { name: 'Thu', completion: 63, xp: 280 },
        { name: 'Fri', completion: 58, xp: 210 },
        { name: 'Sat', completion: 75, xp: 350 },
        { name: 'Sun', completion: 80, xp: 400 },
    ];

    const skillData = [
        { subject: 'React', A: 120, fullMark: 150 },
        { subject: 'Node.js', A: 98, fullMark: 150 },
        { subject: 'Python', A: 86, fullMark: 150 },
        { subject: 'Data Structures', A: 99, fullMark: 150 },
        { subject: 'System Design', A: 85, fullMark: 150 },
        { subject: 'Database', A: 65, fullMark: 150 },
    ];

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                        Welcome Back, Warrior! 🚀
                    </h1>
                    <p className="text-slate-400 mt-2">
                        {language === 'Hindi' ? 'आपकी प्रगति शानदार है!' : 'Your learning journey is on fire today.'}
                    </p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium transition-colors shadow-lg shadow-indigo-500/20">
                        Resume Learning
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total XP" value="12,450" icon={Zap} color="yellow" trend="+12%" />
                <StatCard title="Problem Solved" value="142" icon={Target} color="emerald" trend="+5" />
                <StatCard title="Current Streak" value="7 Days" icon={Trophy} color="orange" />
                <StatCard title="Time Spent" value="28h" icon={Clock} color="blue" trend="+2h" />
            </div>

            {/* Main Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Activity Chart (Spread across 2 columns) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm shadow-2xl shadow-indigo-500/5"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="text-indigo-400" /> Learning Activity
                        </h2>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={activityData}>
                                <defs>
                                    <linearGradient id="colorXp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#475569" tick={{ fill: '#94a3b8' }} axisLine={false} />
                                <YAxis stroke="#475569" tick={{ fill: '#94a3b8' }} axisLine={false} />
                                <Tooltip content={<CustomTooltip />} />
                                <Area type="monotone" dataKey="completion" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorXp)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Skill Radar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm flex flex-col items-center justify-center relative shadow-2xl shadow-purple-500/5"
                >
                    <div className="absolute top-6 left-6">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Target className="text-pink-400" /> Skill Radar
                        </h2>
                    </div>
                    <div className="h-[300px] w-full mt-8">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                                <Radar name="My Skills" dataKey="A" stroke="#ec4899" strokeWidth={2} fill="#ec4899" fillOpacity={0.4} />
                                <Legend />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity List */}
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <BookOpen className="text-cyan-400" /> Recent Progress
                </h2>
                <div className="space-y-4">
                    {[
                        { title: "React Hooks Masterclass", type: "Lesson", time: "2 hours ago", score: "+50 XP" },
                        { title: "Data Structures Quiz", type: "Quiz", time: "5 hours ago", score: "Top 10%" },
                        { title: "Dynamic Programming", type: "Challenge", time: "Yesterday", score: "Completed" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer border border-slate-700/50 group">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                                    {item.type === 'Quiz' ? <Zap size={20} /> : <BookOpen size={20} />}
                                </div>
                                <div>
                                    <h4 className="text-white font-medium group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                                    <p className="text-slate-400 text-sm">{item.type} • {item.time}</p>
                                </div>
                            </div>
                            <span className="text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1 rounded-full text-sm">
                                {item.score}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
