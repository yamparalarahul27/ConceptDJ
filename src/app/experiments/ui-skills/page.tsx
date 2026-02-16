'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles,
    Layers,
    MousePointer2,
    Terminal,
    ExternalLink,
    Code2,
    Palette,
    Zap
} from 'lucide-react';

const SKILLS = [
    {
        id: 'baseline-ui',
        name: 'Baseline UI',
        description: 'Enforces an opinionated UI baseline to prevent AI-generated interface slop.',
        focus: ['Spacing', 'Typography', 'Border Radius', 'Shadows']
    },
    {
        id: 'frontend-design',
        name: 'Frontend Design',
        description: 'Create distinctive, production-grade frontend interfaces with high design quality.',
        focus: ['Craft', 'Visual Interest', 'Originality']
    },
    {
        id: 'interaction-design',
        name: 'Interaction Design',
        description: 'Microinteractions, motion design, transitions, and user feedback patterns.',
        focus: ['State Transitions', 'Gestures', 'Feedback Loops']
    },
    {
        id: '12-principles',
        name: '12 Principles of Animation',
        description: "Apply Disney's 12 principles to web interfaces for natural motion.",
        focus: ['Ease', 'Squash & Stretch', 'Timing']
    }
];

export default function UISkillsExperimentPage() {
    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-16 selection:bg-purple-500/30">
            {/* Nav Header */}
            <div className="flex justify-between items-center mb-24">
                <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-purple-500 rotate-45"></div>
                    <span className="font-mono text-xs uppercase tracking-[0.4em]">Experiments // Project CDJ</span>
                </div>
                <a
                    href="https://www.ui-skills.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[10px] font-mono text-white/40 hover:text-white transition-colors"
                >
                    REF: UI-SKILLS.COM <ExternalLink size={12} />
                </a>
            </div>

            {/* Hero */}
            <header className="max-w-4xl mb-32">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-6xl md:text-8xl font-bold uppercase tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
                >
                    Design <br />System <br />Evo.
                </motion.h1>
                <p className="text-xl text-white/50 font-light leading-relaxed max-w-2xl">
                    Researching the next generation of interface design using agent-optimized skills.
                    Moving beyond generic AI patterns towards high-craft digital products.
                </p>
            </header>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                {SKILLS.map((skill, idx) => (
                    <motion.div
                        key={skill.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group p-8 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <Code2 size={24} className="text-purple-500" />
                        </div>

                        <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{skill.name}</h3>
                        <p className="text-white/40 text-sm mb-8 leading-relaxed">
                            {skill.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {skill.focus.map(f => (f && (
                                <span key={f} className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-1 uppercase">
                                    {f}
                                </span>
                            )))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Implementation Lab / Section */}
            <section className="border-t border-white/5 pt-24">
                <div className="flex flex-col md:flex-row gap-16 items-start">
                    <div className="w-full md:w-1/3">
                        <h2 className="text-sm font-mono text-purple-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Terminal size={14} /> Implementation Lab
                        </h2>
                        <p className="text-white/30 text-sm leading-relaxed">
                            The CDJ "Experiments" folder is where we test these skills before rolling them out to the core playground components.
                        </p>

                        <div className="mt-12 space-y-4">
                            <div className="flex items-center gap-4 text-xs font-mono text-white/20">
                                <span className="w-4 h-[1px] bg-white/10"></span>
                                01 BASELINE AUDIT
                            </div>
                            <div className="flex items-center gap-4 text-xs font-mono text-white/20">
                                <span className="w-4 h-[1px] bg-white/10"></span>
                                02 MOTION REFINEMENT
                            </div>
                            <div className="flex items-center gap-4 text-xs font-mono text-white/20">
                                <span className="w-4 h-[1px] bg-white/10"></span>
                                03 ACCESSIBILITY PASS
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 bg-white/[0.03] border border-white/10 aspect-video flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                        <Palette size={48} className="text-white/10 mb-6 group-hover:text-purple-500 transition-colors" />
                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Awaiting First Artifact...</span>

                        {/* Decorative Pixel Grid */}
                        <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-1">
                            {Array.from({ length: 16 }).map((_, i) => (
                                <div key={i} className="w-1 h-1 bg-white/5"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-64 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Build Status:</span>
                    <span className="text-[10px] font-mono text-green-500 uppercase tracking-widest flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> LABS READY
                    </span>
                </div>
                <div className="text-[10px] font-mono text-white/10 uppercase italic">
                    Pushing the boundaries of decentralized analytics.
                </div>
            </footer>
        </div>
    );
}
