import React from 'react';
import Window from '../os/Window';

export interface ExperienceAppProps extends WindowAppProps {}

const EXPERIENCES = [
    {
        company: 'GlucoTrack',
        location: 'Erode (Remote)',
        role: 'Frontend Developer',
        duration: 'Sep 2025 – Current',
        description: 'GlucoTrack is a health analytics platform focused on glucose monitoring and tracking. Built with React and real-time data visualization technologies.',
        achievements: [
            'Developed interactive health analytics dashboards using React to visualize glucose trends and insights',
            'Implemented data tracking UI for users to monitor glucose levels, trends, and reports efficiently',
            'Designed responsive components for better UX across devices',
        ],
        tech: ['React', 'Real-time Data Visualization', 'Analytics UI'],
        icon: '💻',
        color: '#4ecdc4',
    },
    {
        company: 'ChainAim Technologies',
        location: 'USA (Remote)',
        role: 'Frontend Developer',
        duration: 'Jul 2024 – Dec 2024',
        description: 'ChainAim Technologies is a blockchain-focused company. I worked on frontend development and documentation using React and Docusaurus.',
        achievements: [
            'Authored comprehensive Actus Quickstart guide using Docusaurus, enhancing developer onboarding for 200+ developers',
            'Built and maintained frontend components with clean, modular architecture',
            'Improved documentation accessibility and developer experience',
        ],
        tech: ['React', 'Docusaurus', 'Frontend Development'],
        icon: '🌐',
        color: '#45b7d1',
    },
];

const ExperienceApp: React.FC<ExperienceAppProps> = (props) => {
    return (
        <Window
            top={50}
            left={80}
            width={900}
            height={700}
            windowTitle="Experience - Internships.exe"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'Work Experience & Internships'}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2 style={styles.title}>💼 Work Experience</h2>
                </div>
                <div style={styles.experiences}>
                    {EXPERIENCES.map((exp, index) => (
                        <div
                            key={exp.company}
                            style={{
                                ...styles.experienceCard,
                                borderColor: exp.color,
                            }}
                        >
                            <div style={styles.expHeader}>
                                <span style={styles.expIcon}>{exp.icon}</span>
                                <div style={styles.expInfo}>
                                    <h3 style={styles.companyName}>
                                        {exp.company}
                                    </h3>
                                    <p style={styles.location}>{exp.location}</p>
                                </div>
                                <div style={styles.expMeta}>
                                    <h4 style={styles.role}>{exp.role}</h4>
                                    <p style={styles.duration}>
                                        {exp.duration}
                                    </p>
                                </div>
                            </div>
                            <p style={styles.description}>{exp.description}</p>
                            <div style={styles.achievements}>
                                <h4 style={styles.achievementsTitle}>
                                    Key Achievements:
                                </h4>
                                <ul style={styles.achievementsList}>
                                    {exp.achievements.map((achievement, idx) => (
                                        <li key={idx} style={styles.achievement}>
                                            {achievement}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div style={styles.techSection}>
                                <span style={styles.techLabel}>Tech: </span>
                                <span style={styles.techList}>
                                    {exp.tech.join(', ')}
                                </span>
                            </div>
                        </div>
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
        backgroundColor: '#f0f0f0',
        padding: 24,
        boxSizing: 'border-box',
        overflow: 'auto',
    },
    header: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontFamily: 'MillenniumBold',
        margin: 0,
    },
    experiences: {
        flexDirection: 'column',
        gap: 24,
    },
    experienceCard: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#ffffff',
        border: '2px solid',
        borderRadius: 4,
    },
    expHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    expIcon: {
        fontSize: 32,
        marginRight: 12,
    },
    expInfo: {
        flexDirection: 'column',
        flex: 1,
    },
    companyName: {
        fontSize: 24,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 4,
    },
    location: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        color: '#666',
        margin: 0,
    },
    expMeta: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    role: {
        fontSize: 18,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 4,
    },
    duration: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#666',
        margin: 0,
    },
    description: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        lineHeight: 1.6,
        marginBottom: 16,
        color: '#333',
    },
    achievements: {
        marginBottom: 16,
    },
    achievementsTitle: {
        fontSize: 16,
        fontFamily: 'MillenniumBold',
        marginBottom: 8,
    },
    achievementsList: {
        margin: 0,
        paddingLeft: 20,
    },
    achievement: {
        fontSize: 13,
        fontFamily: 'MSSerif',
        lineHeight: 1.6,
        marginBottom: 6,
        color: '#333',
    },
    techSection: {
        paddingTop: 12,
        borderTop: '1px solid #e0e0e0',
    },
    techLabel: {
        fontSize: 13,
        fontFamily: 'MillenniumBold',
    },
    techList: {
        fontSize: 13,
        fontFamily: 'MSSerif',
        color: '#666',
    },
};

export default ExperienceApp;

