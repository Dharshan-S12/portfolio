import React from 'react';
import ResumeDownload from './ResumeDownload';

export interface ExperienceProps {}

const Experience: React.FC<ExperienceProps> = (props) => {
    return (
        <div className="site-page-content">
            <ResumeDownload />
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>ISHRAE-UAE</h1>
                        <h4>Remote</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Lead Full Stack Developer</h3>
                        <b>
                            <p>05/2026 – Current</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Lead developer for the ISHRAE-UAE enterprise platform, building robust and scalable web applications for the professional association.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Engineered a $65K+ enterprise web platform using React, TypeScript, Vite, Tailwind CSS, and Supabase, including a custom CMS, admin dashboards, and dynamic event management.
                        </p>
                    </li>
                    <li>
                        <p>
                            Developed media delivery, event registration, membership, and sponsor features while optimizing performance, SEO, and responsive UX.
                        </p>
                    </li>
                </ul>
            </div>
            <div style={styles.headerContainer}>
                <div style={styles.header}>
                    <div style={styles.headerRow}>
                        <h1>Tieconn</h1>
                        <h4>Remote</h4>
                    </div>
                    <div style={styles.headerRow}>
                        <h3>Full Stack Developer (Freelance)</h3>
                        <b>
                            <p>03/2026 – 05/2026</p>
                        </b>
                    </div>
                </div>
            </div>
            <div className="text-block">
                <p>
                    Developed a complete engineering community platform from scratch as a freelance full-stack developer.
                </p>
                <br />
                <ul>
                    <li>
                        <p>
                            Developed and deployed a production-grade engineering community platform using Next.js, TypeScript, and Tailwind CSS for webinars, mentorship programs, technical events, and engineering collaboration.
                        </p>
                    </li>
                    <li>
                        <p>
                            Integrated Google Sheets–based dynamic content workflows and built scalable frontend/backend functionality for seamless real-time content updates and user experience across the live platform.
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    header: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
    },
    skillRow: {
        flex: 1,
        justifyContent: 'space-between',
    },
    skillName: {
        minWidth: 56,
    },
    skill: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
    },
    progressBar: {
        flex: 1,
        background: 'red',
        marginLeft: 8,
        height: 8,
    },
    hoverLogo: {
        height: 32,
        marginBottom: 16,
    },
    headerContainer: {
        alignItems: 'flex-end',
        width: '100%',
        justifyContent: 'center',
    },
    hoverText: {
        marginBottom: 8,
    },
    indent: {
        marginLeft: 24,
    },
    headerRow: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

export default Experience;
