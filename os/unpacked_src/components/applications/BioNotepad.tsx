import React, { useState } from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface BioNotepadProps extends WindowAppProps {}

const BioNotepad: React.FC<BioNotepadProps> = (props) => {
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        {
            title: 'Who I Am',
            content: `I'm Dharshan S — an AI Engineer, Data Scientist, and Python Backend Developer from Coimbatore, India.

My focus centers on Agentic AI, multi-agent systems, LLM/RAG pipelines, and synthetic data generation. I build local-first, privacy-oriented AI systems, design deterministic agent workflows with human approval gates, and deploy robust full-stack ML applications.

Currently pursuing B.Tech in Artificial Intelligence and Data Science at Sri Krishna College of Engineering and Technology (SKCET), Coimbatore.`,
        },
        {
            title: "What I'm Learning",
            content: `Currently building strong skills in:
    • Agentic AI (CrewAI, AutoGen, LangGraph, Tool-use agents, Multi-agent pipelines)
    • GenAI & LLMs (LangChain, LlamaIndex, Ollama, Qwen2.5, Hybrid BM25 + Dense RAG)
    • Mathematics for Machine Learning (Linear algebra, calculus, probability & statistics)
    • Deep Learning & Computer Vision (PyTorch, TensorFlow, ResNet, Transformers)
    • Synthetic Data Pipelines (SDV, CTGAN, Gaussian Copula, Bayesian Networks)
    • Full-Stack & MLOps (FastAPI, PostgreSQL, Docker, Kubernetes, MLflow)`,
        },
        {
            title: 'My Interests',
            content: `Core Interests:
    • Autonomous Agentic AI Workflows & Multi-Agent Teams
    • Medical AI & Synthetic Patient Data Generation (GastroSense)
    • Industrial On-Premise Air-Gapped AI Systems
    • High-Performance Python Backend Architecture
    • Interactive 3D & Simulation (F1 Simulator, Three.js)

    Hobbies:
    • Building AI products (TechBit Solutions)
    • Competing in Hackathons & Technical Challenges
    • Solving DSA problems & preparing for GATE DA
    • Running & Fitness`,
        },
        {
            title: 'Achievements',
            content: `    🏆 Selected Track C (SDG) – NVIDIA India Agentic AI Open Hackathon 2026
    🎯 Score 0.758 – ML Challenge / ASTRA MAX (Team Paradoxical)
    🥇 Winner – College Codathon
    🛡️ Sovereign AI Workbench (SIH-26117 · 32/32 Test Suites Passing)
    📜 Google AI Essentials & Prompt Engineering Certifications
    📜 Microsoft Data Science Fundamentals & Python Certifications`,
        },
        {
            title: 'Future Goals',
            content: `Short-term Goals:
    • Secure an AI Engineering internship focused on agentic AI, LLM/RAG, and synthetic data
    • Excel in GATE DA examination & advance core ML mathematical foundations
    • Publish reproducible benchmarks for GastroSense and Sovereign Workbench

    Long-term Goals:
    • Lead research and engineering in production autonomous multi-agent systems
    • Scale innovative technology solutions through TechBit Solutions
    • Build high-impact AI systems that solve complex industrial and healthcare problems`,
        },
    ];
    

    const nextPage = () => {
        setCurrentPage((prev) => (prev + 1) % pages.length);
    };

    const prevPage = () => {
        setCurrentPage((prev) => (prev - 1 + pages.length) % pages.length);
    };

    return (
        <Window
            top={60}
            left={100}
            width={700}
            height={600}
            windowTitle="BIO.exe"
            windowBarIcon="windowExplorerIcon"
            windowBarColor="#c0c0c0"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'About Me - Notepad'}
        >
            <div style={styles.container}>
                <div style={styles.menuBar}>
                    <div style={styles.menuItem}>File</div>
                    <div style={styles.menuItem}>Edit</div>
                    <div style={styles.menuItem}>Format</div>
                    <div style={styles.menuItem}>View</div>
                    <div style={styles.menuItem}>Help</div>
                </div>
                <div style={styles.content}>
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={styles.page}
                    >
                        <h2 style={styles.pageTitle}>
                            {pages[currentPage].title}
                        </h2>
                        <div style={styles.pageContent}>
                            {pages[currentPage].content.split('\n').map(
                                (line, index) => (
                                    <p key={index} style={styles.line}>
                                        {line || '\u00A0'}
                                    </p>
                                )
                            )}
                        </div>
                    </motion.div>
                </div>
                <div style={styles.footer}>
                    <div style={styles.pageNav}>
                        <button
                            style={styles.navButton}
                            onMouseDown={prevPage}
                        >
                            ← Prev
                        </button>
                        <span style={styles.pageCounter}>
                            Page {currentPage + 1} of {pages.length}
                        </span>
                        <button
                            style={styles.navButton}
                            onMouseDown={nextPage}
                        >
                            Next →
                        </button>
                    </div>
                    <div style={styles.statusBar}>
                        <span>Ln {currentPage + 1}, Col 1</span>
                    </div>
                </div>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    menuBar: {
        flexDirection: 'row',
        backgroundColor: '#c0c0c0',
        padding: '4px 8px',
        borderBottom: '1px solid #808080',
        gap: 16,
    },
    menuItem: {
        fontSize: 11,
        fontFamily: 'MSSerif',
        padding: '2px 8px',
        cursor: 'pointer',
    },
    content: {
        flex: 1,
        padding: 16,
        overflow: 'auto',
        backgroundColor: '#ffffff',
    },
    page: {
        flexDirection: 'column',
    },
    pageTitle: {
        fontSize: 20,
        fontFamily: 'MillenniumBold',
        marginBottom: 16,
        color: '#000000',
    },
    pageContent: {
        flexDirection: 'column',
    },
    line: {
        fontSize: 13,
        fontFamily: 'MSSerif',
        lineHeight: 1.6,
        margin: 0,
        marginBottom: 8,
        color: '#000000',
    },
    footer: {
        flexDirection: 'column',
        borderTop: '1px solid #c0c0c0',
    },
    pageNav: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px',
        gap: 16,
        backgroundColor: '#f0f0f0',
    },
    navButton: {
        padding: '4px 12px',
        backgroundColor: '#c0c0c0',
        border: '2px outset #c0c0c0',
        fontFamily: 'MSSerif',
        fontSize: 11,
        cursor: 'pointer',
    },
    pageCounter: {
        fontSize: 11,
        fontFamily: 'MSSerif',
        color: '#666',
    },
    statusBar: {
        padding: '4px 8px',
        backgroundColor: '#c0c0c0',
        fontSize: 11,
        fontFamily: 'MSSerif',
    },
};

export default BioNotepad;

