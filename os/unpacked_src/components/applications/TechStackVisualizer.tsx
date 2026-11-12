import React, { useState } from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface TechStackVisualizerProps extends WindowAppProps {}

const TECH_STACK = {
    Languages: [
        { name: 'Java', level: 82, color: '#f89820', icon: '☕' },
        { name: 'Python', level: 68, color: '#3776ab', icon: '🐍' },
        { name: 'TypeScript', level: 48, color: '#3178c6', icon: '📘' },
        { name: 'JavaScript', level: 62, color: '#f7df1e', icon: '📜' },
        { name: 'C', level: 72, color: '#a8b9cc', icon: '⚙️' },
    ],
    Frontend: [
        { name: 'React', level: 78, color: '#61dafb', icon: '⚛️' },
        { name: 'Next.js', level: 42, color: '#000000', icon: '▲' },
        { name: 'Tailwind CSS', level: 53, color: '#06b6d4', icon: '💨' },
        { name: 'ShadCN UI', level: 38, color: '#000000', icon: '🎨' },
        { name: 'HTML/CSS', level: 95, color: '#e34c26', icon: '🌐' },
    ],
    Backend: [
        { name: 'Node.js', level: 63, color: '#339933', icon: '🟢' },
        { name: 'Express', level: 30, color: '#000000', icon: '🚂' },
        { name: 'Spring Boot', level: 78, color: '#6db33f', icon: '🍃' },
        { name: 'API Development', level: 43, color: '#ff6b6b', icon: '🔌' },
    ],
    Database: [
        { name: 'MongoDB', level: 80, color: '#47a248', icon: '🍃' },
        { name: 'Firebase', level: 48, color: '#ffca28', icon: '🔥' },
    ],
    'AI/ML': [
        { name: 'Google Genkit', level: 85, color: '#4285f4', icon: '🤖' },
        { name: 'Google AI', level: 85, color: '#ea4335', icon: '🧠' },
        { name: 'Deep Learning', level: 38, color: '#9c27b0', icon: '🔬' },
    ],
    Tools: [
        { name: 'Git/GitHub', level: 90, color: '#181717', icon: '📦' },
        { name: 'Docker', level: 38, color: '#2496ed', icon: '🐳' },
        { name: 'Recharts', level: 85, color: '#ff6b6b', icon: '📊' },
        { name: 'Leaflet Maps', level: 80, color: '#199900', icon: '🗺️' },
    ],
};

const TechStackVisualizer: React.FC<TechStackVisualizerProps> = (props) => {
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof TECH_STACK>('Languages');
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    const categories = Object.keys(TECH_STACK) as Array<keyof typeof TECH_STACK>;
    const currentTechs = TECH_STACK[selectedCategory];

    return (
        <Window
            top={60}
            left={80}
            width={1000}
            height={700}
            windowTitle="Tech Stack Visualizer"
            windowBarIcon="windowExplorerIcon"
            windowBarColor="#2d2d30"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'Interactive Technology Showcase'}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2 style={styles.title}>My Tech Stack</h2>
                    <p style={styles.subtitle}>
                        Hover over technologies to see proficiency levels
                    </p>
                </div>

                <div style={styles.categories}>
                    {categories.map((category) => (
                        <button
                            key={category}
                            style={{
                                ...styles.categoryButton,
                                ...(selectedCategory === category &&
                                    styles.activeCategory),
                            }}
                            onMouseDown={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div style={styles.techGrid}>
                    {currentTechs.map((tech, index) => (
                        <motion.div
                            key={tech.name}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                ...styles.techCard,
                                borderColor: tech.color,
                                transform:
                                    hoveredTech === tech.name
                                        ? 'scale(1.05)'
                                        : 'scale(1)',
                            }}
                            onMouseEnter={() => setHoveredTech(tech.name)}
                            onMouseLeave={() => setHoveredTech(null)}
                        >
                            <div style={styles.techHeader}>
                                <span style={styles.techIcon}>{tech.icon}</span>
                                <div style={styles.techInfo}>
                                    <h3 style={styles.techName}>{tech.name}</h3>
                                    <span
                                        style={{
                                            ...styles.techLevel,
                                            color: tech.color,
                                        }}
                                    >
                                        {tech.level}%
                                    </span>
                                </div>
                            </div>
                            <div style={styles.progressContainer}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${tech.level}%` }}
                                    transition={{
                                        duration: 1,
                                        delay: index * 0.1,
                                    }}
                                    style={{
                                        ...styles.progressBar,
                                        backgroundColor: tech.color,
                                    }}
                                />
                            </div>
                            {hoveredTech === tech.name && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={styles.tooltip}
                                >
                                    <div style={styles.tooltipContent}>
                                        <strong>{tech.name}</strong>
                                        <br />
                                        Proficiency: {tech.level}%
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    ))}
                </div>

                <div style={styles.stats}>
                    <div style={styles.statCard}>
                        <span style={styles.statNumber}>
                            {categories.length}
                        </span>
                        <span style={styles.statLabel}>Categories</span>
                    </div>
                    <div style={styles.statCard}>
                        <span style={styles.statNumber}>
                            {Object.values(TECH_STACK).reduce(
                                (sum, techs) => sum + techs.length,
                                0
                            )}
                        </span>
                        <span style={styles.statLabel}>Technologies</span>
                    </div>
                    <div style={styles.statCard}>
                        <span style={styles.statNumber}>
                            {Math.round(
                                Object.values(TECH_STACK)
                                    .flat()
                                    .reduce((sum, tech) => sum + tech.level, 0) /
                                    Object.values(TECH_STACK).flat().length
                            )}
                            %
                        </span>
                        <span style={styles.statLabel}>Avg Proficiency</span>
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
        backgroundColor: '#1e1e1e',
        padding: 24,
        boxSizing: 'border-box',
        overflow: 'auto',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 32,
        fontFamily: 'MillenniumBold',
        color: '#ffffff',
        margin: 0,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        color: '#cccccc',
        margin: 0,
    },
    categories: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 24,
        justifyContent: 'center',
    },
    categoryButton: {
        padding: '8px 16px',
        backgroundColor: '#3c3c3c',
        color: '#ffffff',
        border: '1px solid #555',
        fontFamily: 'MSSerif',
        fontSize: 12,
        cursor: 'pointer',
        borderRadius: 4,
    },
    activeCategory: {
        backgroundColor: '#0e639c',
        borderColor: '#0e639c',
    },
    techGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 24,
    },
    techCard: {
        flexDirection: 'column',
        padding: 16,
        backgroundColor: '#252526',
        border: '2px solid',
        borderRadius: 8,
        transition: 'transform 0.2s',
        position: 'relative',
    },
    techHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    techIcon: {
        fontSize: 32,
        marginRight: 12,
    },
    techInfo: {
        flexDirection: 'column',
        flex: 1,
    },
    techName: {
        fontSize: 16,
        fontFamily: 'MillenniumBold',
        color: '#ffffff',
        margin: 0,
        marginBottom: 4,
    },
    techLevel: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        fontWeight: 'bold',
    },
    progressContainer: {
        width: '100%',
        height: 8,
        backgroundColor: '#3c3c3c',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 4,
        transition: 'width 0.3s ease',
    },
    tooltip: {
        position: 'absolute',
        top: -40,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#000000',
        color: '#ffffff',
        padding: '8px 12px',
        borderRadius: 4,
        fontSize: 12,
        fontFamily: 'MSSerif',
        whiteSpace: 'nowrap',
        zIndex: 10,
    },
    tooltipContent: {
        textAlign: 'center',
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        paddingTop: 24,
        borderTop: '1px solid #3c3c3c',
    },
    statCard: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#252526',
        borderRadius: 8,
    },
    statNumber: {
        fontSize: 32,
        fontFamily: 'MillenniumBold',
        color: '#4ecdc4',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#cccccc',
    },
};

export default TechStackVisualizer;

