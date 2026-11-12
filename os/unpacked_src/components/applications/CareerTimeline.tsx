import React, { useState } from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface CareerTimelineProps extends WindowAppProps {}

const TIMELINE_EVENTS = [
    // ---------- 2021 ----------
    {
        year: '2021',
        title: 'SSLC Completed',
        location: 'Tamil Nadu State Board',
        description:
            'Completed SSLC (10th) with strong foundation in core subjects including Tamil, English, Mathematics, Science, and Social Science.',
        icon: '📘',
        color: '#4cd137',
    },

    {
        year: '2017 - 2022',
        title: 'School President – Red Cross',
        location: 'Junior Red Cross Leader',
        description:
            'Led health, safety, blood donation, and awareness programs for 5 years, developing leadership and volunteer management skills.',
        icon: '🩺',
        color: '#e84118',
    },
    // ---------- 2023 ----------
    {
        year: '2023',
        title: 'HSC Completed',
        location: 'Tamil Nadu State Board',
        description:
            'Finished Higher Secondary (12th) with science stream, building analytical and problem-solving abilities.',
        icon: '📗',
        color: '#44bd32',
    },
    {
        year: '2023',
        title: 'Visited as Fellow',
        location: 'Imam Abdulrahman Bin Faisal University, Saudi Arabia',
        description:
            'One-month exposure to advanced hospital engineering labs, Siemens equipment, power generators, and safety systems.',
        icon: '🌍',
        color: '#00a8ff',
    },
    {
        year: '2023',
        title: 'Started B.Tech AI & DS',
        location: 'SKCET Coimbatore',
        description:
            'Joined B.Tech Artificial Intelligence & Data Science program. Learning ML, DL, DS, programming, and project-based engineering.',
        icon: '🎓',
        color: '#4ecdc4',
    },

    // ---------- 2024 ----------
    {
        year: '2024',
        title: 'UI/UX Intern',
        location: 'W3App Developers',
        description:
            'Worked 10 days in UI/UX, gaining hands-on experience in wireframing, prototyping, and user-centered design.',
        icon: '🎨',
        color: '#e056fd',
    },
    {
        year: '2024',
        title: 'Frontend Developer',
        location: 'ChainAim Technologies, USA (Remote)',
        description:
            'Built Actus Quickstart Guide using Docusaurus, improving onboarding for 200+ developers.',
        icon: '💼',
        color: '#45b7d1',
    },
    {
        year: '2024',
        title: '1st Prize – Hackvotrix',
        location: 'Hackathon Winner',
        description: 'Won 1st prize in a 30-hour hackathon event.',
        icon: '🏆',
        color: '#feca57',
    },
    {
        year: '2024',
        title: 'CSI Member',
        location: 'Computer Society of India',
        description:
            'Active member participating in coding events, seminars, and software engineering activities.',
        icon: '👨‍💻',
        color: '#7f8fa6',
    },
    {
        year: '2024',
        title: 'Rotaract Club Member',
        location: 'KEC Rotaract',
        description:
            'Involved in community service initiatives, leadership events, and awareness programs.',
        icon: '🤝',
        color: '#e1b12c',
    },
    {
        year: '2024',
        title: 'Executive Member – MAD Club',
        location: 'Mobile & App Dev Club, KEC',
        description:
            'Contributed to mobile app development projects and collaborative coding sessions.',
        icon: '📱',
        color: '#00cec9',
    },
    {
        year: '2024',
        title: 'Executive Member – Science Club',
        location: 'KEC',
        description:
            'Participated in scientific and research-focused activities that encouraged innovation.',
        icon: '🔬',
        color: '#81ecec',
    },
    {
        year: '2024',
        title: 'Placement Coordinator',
        location: 'SKCET Coimbatore',
        description:
            'Coordinated placement drives, student data, communication, and preparation activities.',
        icon: '📊',
        color: '#6c5ce7',
    },
    {
        year: '2024',
        title: 'Generative AI Intern',
        location: 'Generative AI Consortium (Remote)',
        description:
            'Working on generative AI workflows, automation models, and experiment documentation.',
        icon: '🤖',
        color: '#a29bfe',
    },

    // ---------- 2025 ----------
    {
        year: '2025',
        title: 'Microsoft Azure AI Certification',
        location: 'Microsoft Certified',
        description:
            'Earned Azure AI Engineer Associate certification, validating cloud AI skills.',
        icon: '☁️',
        color: '#48dbfb',
    },
    {
        year: '2025',
        title: 'Frontend Developer',
        location: 'GlucoTrack, Erode (Remote)',
        description:
            'Building health analytics dashboards and creating interactive UI for glucose tracking.',
        icon: '💻',
        color: '#ff6b6b',
    },
    {
        year: '2025',
        title: 'Leadership Roles',
        location: 'Multiple Clubs, KEC',
        description:
            'Serving as Event Coordinator (AI Coding Club) and Joint Secretary (MAD Club).',
        icon: '👥',
        color: '#a55eea',
    },

    {
        year: '2025',
        title: 'Freelance Project – Tieconn',
        location: 'Tieconn • Technical Training & Webinars',
        description:
            'Designed and developed the official Tieconn website including branding, UI/UX, email setup, and content structure for webinars, workshops, and technical training services.',
        icon: '🌐',
        color: '#16a085',
    },
    

    // ---------- 2017 - 2022 (Long Duration Role) ----------
    
];

const CareerTimeline: React.FC<CareerTimelineProps> = (props) => {
    const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

    return (
        <Window
            top={50}
            left={100}
            width={1000}
            height={750}
            windowTitle="Career Timeline"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'My Journey & Achievements'}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2 style={styles.title}>My Career Timeline</h2>
                    <p style={styles.subtitle}>
                        Click on events to see details
                    </p>
                </div>

                <div style={styles.timeline}>
                    {TIMELINE_EVENTS.map((event, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={styles.timelineItem}
                            onMouseDown={() =>
                                setSelectedEvent(
                                    selectedEvent === index ? null : index
                                )
                            }
                        >
                            <div
                                style={{
                                    ...styles.timelineDot,
                                    backgroundColor: event.color,
                                }}
                            >
                                <span style={styles.timelineIcon}>
                                    {event.icon}
                                </span>
                            </div>
                            <div style={styles.timelineContent}>
                                <div style={styles.timelineYear}>
                                    {event.year}
                                </div>
                                <h3 style={styles.timelineTitle}>
                                    {event.title}
                                </h3>
                                <p style={styles.timelineLocation}>
                                    {event.location}
                                </p>
                                {selectedEvent === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        style={styles.timelineDescription}
                                    >
                                        {event.description}
                                    </motion.div>
                                )}
                            </div>
                            <div
                                style={{
                                    ...styles.timelineLine,
                                    backgroundColor: event.color,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                <div style={styles.summary}>
                    <div style={styles.summaryCard}>
                        <span style={styles.summaryNumber}>
                            {TIMELINE_EVENTS.length}
                        </span>
                        <span style={styles.summaryLabel}>Milestones</span>
                    </div>
                    <div style={styles.summaryCard}>
                        <span style={styles.summaryNumber}>2</span>
                        <span style={styles.summaryLabel}>Current Roles</span>
                    </div>
                    <div style={styles.summaryCard}>
                        <span style={styles.summaryNumber}>2023-2027</span>
                        <span style={styles.summaryLabel}>Education Period</span>
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
        backgroundColor: '#f0f0f0',
        padding: 24,
        boxSizing: 'border-box',
        overflow: 'auto',
    },
    header: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        color: '#666',
        margin: 0,
    },
    timeline: {
        flexDirection: 'column',
        position: 'relative',
        paddingLeft: 40,
    },
    timelineItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 32,
        position: 'relative',
        cursor: 'pointer',
    },
    timelineDot: {
        width: 60,
        height: 60,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: -30,
        zIndex: 2,
        border: '4px solid #ffffff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
    },
    timelineIcon: {
        fontSize: 24,
    },
    timelineContent: {
        flexDirection: 'column',
        marginLeft: 40,
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        border: '1px solid #e0e0e0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    timelineYear: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#999',
        marginBottom: 4,
    },
    timelineTitle: {
        fontSize: 18,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 4,
    },
    timelineLocation: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        color: '#666',
        margin: 0,
        marginBottom: 8,
    },
    timelineDescription: {
        fontSize: 13,
        fontFamily: 'MSSerif',
        color: '#333',
        lineHeight: 1.6,
        marginTop: 8,
        paddingTop: 8,
        borderTop: '1px solid #e0e0e0',
    },
    timelineLine: {
        position: 'absolute',
        left: -2,
        top: 60,
        width: 4,
        height: 'calc(100% + 32px)',
        zIndex: 1,
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 24,
        marginTop: 32,
        paddingTop: 24,
        borderTop: '2px solid #e0e0e0',
    },
    summaryCard: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#ffffff',
        borderRadius: 8,
        border: '1px solid #e0e0e0',
    },
    summaryNumber: {
        fontSize: 24,
        fontFamily: 'MillenniumBold',
        color: '#0e639c',
        marginBottom: 4,
    },
    summaryLabel: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#666',
    },
};

export default CareerTimeline;

