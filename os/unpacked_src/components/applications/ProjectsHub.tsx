import React, { useState } from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface ProjectsHubProps extends WindowAppProps {}

const PROJECTS = [
    {
        id: 1,
        name: 'Sovereign AI Workbench',
        subtitle: 'SIH-26117 · Industrial Multi-Agent System',
        description: 'Air-gapped AI workbench for confidential industrial/refinery environments with intent routing, 5-stage document workflow (extractor → rule engine → compliance → drafter → verifier), vision OCR, equipment KG, failure forecasting, and hybrid BM25 + dense retrieval.',
        techStack: ['Python', 'FastAPI', 'React 19', 'TypeScript', 'Ollama', 'Qwen2.5', 'PostgreSQL', 'SciPy'],
        githubLink: 'https://github.com/Dharshan-S12',
        demoLink: null,
        icon: '🛡️',
        color: '#4ecdc4',
    },
    {
        id: 2,
        name: 'GastroSense',
        subtitle: 'Healthcare AI · Synthetic Data Pipeline',
        description: 'Generated 100,000 synthetic patient records with an 18-feature biomarker pipeline using Gaussian Copula seeding, biological constraint engine, and CTGAN refinement for early gastric cancer detection via sweat biosensor concept.',
        techStack: ['Python', 'SDV', 'Gaussian Copula', 'CTGAN', 'Bayesian Networks', 'XGBoost', 'Scikit-learn'],
        githubLink: 'https://github.com/Dharshan-S12',
        demoLink: null,
        icon: '🧬',
        color: '#45b7d1',
    },
    {
        id: 3,
        name: 'Plant Disease Prediction',
        subtitle: 'Computer Vision · Agricultural AI',
        description: 'Deep learning classification system using ResNet-50 CNN to classify 38+ plant diseases from leaf images with 95%+ accuracy, data augmentation, transfer learning, and real-time Streamlit diagnosis application.',
        techStack: ['Python', 'TensorFlow', 'ResNet-50', 'OpenCV', 'Streamlit', 'PlantVillage'],
        githubLink: 'https://github.com/Dharshan-S12',
        demoLink: null,
        icon: '🌿',
        color: '#96ceb4',
    },
    {
        id: 4,
        name: 'F1 Simulator',
        subtitle: 'Interactive 3D Racing Simulation',
        description: 'Physics-driven Formula 1 racing simulation developed in Unity featuring realistic vehicle dynamics, aerodynamics, tire degradation modeling, and custom telemetry overlays.',
        techStack: ['Unity', 'C#', '3D Physics', 'ShaderLab'],
        githubLink: 'https://github.com/Dharshan-S12/F1-Simulator',
        demoLink: null,
        icon: '🏎️',
        color: '#ff6b6b',
    },
    {
        id: 5,
        name: 'TechBit Solutions',
        subtitle: 'Client Digital & AI Solutions Platform',
        description: 'Full-stack digital engineering platform delivering modern web applications, interactive 3D user experiences, and AI-driven automation tools for clients and startups.',
        techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
        githubLink: 'https://techbit-22.web.app',
        demoLink: 'https://techbit-22.web.app',
        icon: '💻',
        color: '#feca57',
    },
];

const ProjectsHub: React.FC<ProjectsHubProps> = (props) => {
    const [selectedProject, setSelectedProject] = useState<number | null>(null);

    return (
        <Window
            top={40}
            left={60}
            width={1000}
            height={750}
            windowTitle="Projects Hub"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'My Top Projects'}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2 style={styles.title}>📁 Projects Hub</h2>
                    <p style={styles.subtitle}>
                        Click on a project to view details
                    </p>
                </div>
                <div style={styles.projectsGrid}>
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                ...styles.projectCard,
                                borderColor: project.color,
                            }}
                            onMouseDown={() =>
                                setSelectedProject(
                                    selectedProject === index ? null : index
                                )
                            }
                        >
                            <div style={styles.cardHeader}>
                                <span style={styles.projectIcon}>
                                    {project.icon}
                                </span>
                                <div style={styles.cardTitle}>
                                    <h3 style={styles.projectName}>
                                        {project.name}
                                    </h3>
                                    <p style={styles.projectSubtitle}>
                                        {project.subtitle}
                                    </p>
                                </div>
                            </div>
                            {selectedProject === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    style={styles.projectDetails}
                                >
                                    <p style={styles.description}>
                                        {project.description}
                                    </p>
                                    <div style={styles.techSection}>
                                        <h4 style={styles.techTitle}>
                                            Tech Stack:
                                        </h4>
                                        <div style={styles.techTags}>
                                            {project.techStack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    style={styles.techTag}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div style={styles.links}>
                                        {project.githubLink && (
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={styles.link}
                                            >
                                                📦 GitHub
                                            </a>
                                        )}
                                        {project.demoLink && (
                                            <a
                                                href={project.demoLink}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={styles.link}
                                            >
                                                🌐 Live Demo
                                            </a>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
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
        backgroundColor: '#c0c0c0',
        padding: 20,
        boxSizing: 'border-box',
        overflow: 'auto',
    },
    header: {
        flexDirection: 'column',
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#666',
        margin: 0,
    },
    projectsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 20,
    },
    projectCard: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#ffffff',
        border: '3px solid',
        borderRadius: 4,
        cursor: 'pointer',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    projectIcon: {
        fontSize: 48,
        marginRight: 12,
    },
    cardTitle: {
        flexDirection: 'column',
        flex: 1,
    },
    projectName: {
        fontSize: 20,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 4,
    },
    projectSubtitle: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        color: '#666',
        margin: 0,
    },
    projectDetails: {
        flexDirection: 'column',
        marginTop: 12,
        paddingTop: 12,
        borderTop: '1px solid #e0e0e0',
    },
    description: {
        fontSize: 13,
        fontFamily: 'MSSerif',
        lineHeight: 1.6,
        marginBottom: 12,
        color: '#333',
    },
    techSection: {
        flexDirection: 'column',
        marginBottom: 12,
    },
    techTitle: {
        fontSize: 12,
        fontFamily: 'MillenniumBold',
        marginBottom: 8,
    },
    techTags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
    },
    techTag: {
        fontSize: 10,
        fontFamily: 'MSSerif',
        padding: '4px 8px',
        backgroundColor: '#f0f0f0',
        borderRadius: 3,
    },
    links: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
    },
    link: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#0e639c',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
};

export default ProjectsHub;

