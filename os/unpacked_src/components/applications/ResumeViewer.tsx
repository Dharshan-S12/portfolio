import React from 'react';
import Window from '../os/Window';

export interface ResumeViewerProps extends WindowAppProps {}

const ResumeViewer: React.FC<ResumeViewerProps> = (props) => {
    return (
        <Window
            top={60}
            left={100}
            width={800}
            height={700}
            windowTitle="Resume.pdf"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'ATS-Friendly Resume'}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.pdfIcon}>📄</div>
                    <div style={styles.headerText}>
                        <h2 style={styles.title}>Resume</h2>
                        <p style={styles.subtitle}>
                            Dharshan S - AI Engineer &amp; Data Scientist
                        </p>
                    </div>
                </div>
                <div style={styles.content}>
                    <div style={styles.resumeSection}>
                        <h3 style={styles.sectionTitle}>Download Resume </h3>
                        <div style={styles.buttons}>
                            <a
                                href="https://drive.google.com/file/d/1qGH7yPlBfu5TOH0llnMPvlB8OvIwq6UJ/view?usp=sharing"
                                target="_blank"
                                rel="noreferrer"
                                style={styles.button}
                            >
                                📥 Download PDF Resume
                            </a>
                        </div>
                    </div>

                    {/* Visual Stats Section */}
                    <div style={styles.statsGrid}>
                        <div style={styles.statCard}>
                            <div style={styles.statNumber}>2+</div>
                            <div style={styles.statLabel}>Years Experience</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statNumber}>3</div>
                            <div style={styles.statLabel}>Major Projects</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statNumber}>50+</div>
                            <div style={styles.statLabel}>OverAll Projects</div>
                        </div>
                        <div style={styles.statCard}>
                            <div style={styles.statNumber}>20+</div>
                            <div style={styles.statLabel}>Hackathon Experience</div>
                        </div>
                    </div>

                    {/* Skill Proficiency Bars
                    <div style={styles.resumeSection}>
                        <h3 style={styles.sectionTitle}>Technical Proficiency</h3>
                        <div style={styles.progressContainer}>
                            <div style={styles.progressItem}>
                                <div style={styles.progressLabel}>
                                    <span>Java Full Stack</span>
                                    <span style={styles.progressPercent}>90%</span>
                                </div>
                                <div style={styles.progressBar}>
                                    <div style={{...styles.progressFill, width: '90%', backgroundColor: '#4caf50'}}></div>
                                </div>
                            </div>
                            <div style={styles.progressItem}>
                                <div style={styles.progressLabel}>
                                    <span>Frontend Development</span>
                                    <span style={styles.progressPercent}>85%</span>
                                </div>
                                <div style={styles.progressBar}>
                                    <div style={{...styles.progressFill, width: '85%', backgroundColor: '#2196f3'}}></div>
                                </div>
                            </div>
                            <div style={styles.progressItem}>
                                <div style={styles.progressLabel}>
                                    <span>React & Next.js</span>
                                    <span style={styles.progressPercent}>88%</span>
                                </div>
                                <div style={styles.progressBar}>
                                    <div style={{...styles.progressFill, width: '88%', backgroundColor: '#9c27b0'}}></div>
                                </div>
                            </div>
                            <div style={styles.progressItem}>
                                <div style={styles.progressLabel}>
                                    <span>Spring Boot</span>
                                    <span style={styles.progressPercent}>82%</span>
                                </div>
                                <div style={styles.progressBar}>
                                    <div style={{...styles.progressFill, width: '82%', backgroundColor: '#ff9800'}}></div>
                                </div>
                            </div>
                            <div style={styles.progressItem}>
                                <div style={styles.progressLabel}>
                                    <span>Database Design</span>
                                    <span style={styles.progressPercent}>75%</span>
                                </div>
                                <div style={styles.progressBar}>
                                    <div style={{...styles.progressFill, width: '75%', backgroundColor: '#f44336'}}></div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Timeline Visualization
                    <div style={styles.resumeSection}>
                        <h3 style={styles.sectionTitle}>Career Timeline</h3>
                        <div style={styles.timelineContainer}>
                            <div style={styles.timelineLine}></div>
                            <div style={styles.timeline}>
                                <div style={styles.timelineItem}>
                                    <div style={styles.timelineDot}></div>
                                    <div style={styles.timelineContent}>
                                        <div style={styles.timelineYear}>2025</div>
                                        <div style={styles.timelineTitle}>Frontend Developer</div>
                                        <div style={styles.timelineCompany}>GlucoTrack</div>
                                    </div>
                                </div>
                                <div style={styles.timelineItem}>
                                    <div style={styles.timelineDot}></div>
                                    <div style={styles.timelineContent}>
                                        <div style={styles.timelineYear}>2024</div>
                                        <div style={styles.timelineTitle}>Frontend Developer</div>
                                        <div style={styles.timelineCompany}>ChainAim Technologies</div>
                                    </div>
                                </div>
                                <div style={styles.timelineItem}>
                                    <div style={styles.timelineDot}></div>
                                    <div style={styles.timelineContent}>
                                        <div style={styles.timelineYear}>2023</div>
                                        <div style={styles.timelineTitle}>B.Tech Started</div>
                                        <div style={styles.timelineCompany}>SKCET Coimbatore</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Visual Tech Stack */}
                    <div style={styles.resumeSection}>
                        <h3 style={styles.sectionTitle}>Tech Stack Overview</h3>
                        <div style={styles.techVisual}>
                            <div style={styles.techCoreBox}>
                                <div style={styles.techCore}>Python</div>
                                <div style={styles.techCoreLabel}>Core AI</div>
                            </div>
                            <div style={styles.techItems}>
                                <div style={styles.techRow}>
                                    <span style={styles.techItem}>PyTorch</span>
                                    <span style={styles.techItem}>FastAPI</span>
                                    <span style={styles.techItem}>LangGraph</span>
                                </div>
                                <div style={styles.techRow}>
                                    <span style={styles.techItem}>Docker</span>
                                    <span style={styles.techItem}>PostgreSQL</span>
                                    <span style={styles.techItem}>TypeScript</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resume Format Info */}
                    <div style={styles.formatInfo}>
                        <div style={styles.formatIcon}>📋</div>
                        <div style={styles.formatText}>
                            <strong>ATS-Optimized Format</strong>
                            <br />
                            3-page professional resume • Optimized for applicant tracking systems
                        </div>
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
        padding: 24,
        boxSizing: 'border-box',
        overflow: 'auto',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        paddingBottom: 16,
        borderBottom: '2px solid #e0e0e0',
    },
    pdfIcon: {
        fontSize: 64,
        marginRight: 16,
    },
    headerText: {
        flexDirection: 'column',
    },
    title: {
        fontSize: 28,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        color: '#666',
        margin: 0,
    },
    content: {
        flexDirection: 'column',
    },
    resumeSection: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontFamily: 'MillenniumBold',
        marginBottom: 12,
    },
    sectionText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        lineHeight: 1.6,
        marginBottom: 16,
        color: '#333',
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#0e639c',
        color: '#ffffff',
        textDecoration: 'none',
        fontFamily: 'MSSerif',
        fontSize: 14,
        borderRadius: 4,
        display: 'inline-block',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 12,
        marginBottom: 24,
    },
    statCard: {
        backgroundColor: '#f0f7ff',
        padding: 20,
        borderRadius: 8,
        textAlign: 'center',
        border: '2px solid #0e639c',
    },
    statNumber: {
        fontSize: 32,
        fontFamily: 'MillenniumBold',
        color: '#0e639c',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#666',
    },
    progressContainer: {
        flexDirection: 'column',
        gap: 16,
    },
    progressItem: {
        flexDirection: 'column',
        gap: 6,
    },
    progressLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontSize: 13,
        fontFamily: 'MSSerif',
        color: '#333',
    },
    progressPercent: {
        fontWeight: 'bold',
        color: '#0e639c',
    },
    progressBar: {
        width: '100%',
        height: 20,
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        overflow: 'hidden',
        border: '1px solid #ccc',
    },
    progressFill: {
        height: '100%',
        borderRadius: 10,
        transition: 'width 0.3s ease',
    },
    timelineContainer: {
        position: 'relative',
        paddingLeft: 30,
    },
    timelineLine: {
        position: 'absolute',
        left: 23,
        top: 0,
        bottom: 0,
        width: 2,
        backgroundColor: '#0e639c',
    },
    timeline: {
        position: 'relative',
        flexDirection: 'column',
        gap: 24,
    },
    timelineItem: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    timelineDot: {
        position: 'absolute',
        left: -38,
        top: 4,
        width: 16,
        height: 16,
        borderRadius: '50%',
        backgroundColor: '#0e639c',
        border: '3px solid #ffffff',
        boxShadow: '0 0 0 2px #0e639c',
    },
    timelineContent: {
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        padding: 12,
        borderRadius: 6,
        border: '1px solid #e0e0e0',
        flex: 1,
    },
    timelineYear: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#0e639c',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    timelineTitle: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 2,
    },
    timelineCompany: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#666',
    },
    techVisual: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 30,
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        border: '2px solid #e0e0e0',
    },
    techCoreBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: 120,
        height: 120,
        borderRadius: '50%',
        backgroundColor: '#0e639c',
        color: '#ffffff',
        border: '4px solid #ffffff',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    },
    techCore: {
        fontSize: 28,
        fontFamily: 'MillenniumBold',
        marginBottom: 4,
    },
    techCoreLabel: {
        fontSize: 11,
        fontFamily: 'MSSerif',
        opacity: 0.9,
    },
    techItems: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        flex: 1,
    },
    techRow: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center',
    },
    techItem: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#333',
        backgroundColor: '#ffffff',
        padding: '8px 14px',
        borderRadius: 6,
        border: '2px solid #0e639c',
        fontWeight: 'bold',
    },
    formatInfo: {
        backgroundColor: '#fff9e6',
        padding: 16,
        borderRadius: 6,
        border: '2px solid #ffc107',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
        marginTop: 8,
    },
    formatIcon: {
        fontSize: 32,
    },
    formatText: {
        fontSize: 13,
        fontFamily: 'MSSerif',
        color: '#333',
        lineHeight: 1.5,
    },
};

export default ResumeViewer;

