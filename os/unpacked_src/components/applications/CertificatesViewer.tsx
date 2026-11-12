import React, { useState } from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

interface Certificate {
    id: number;
    title: string;
    issuer: string;
    date: string;
    description: string;
    icon: string;
    color: string;
    category: string;
    driveLink?: string;
}

interface StyleSheetCSS {
    [key: string]: React.CSSProperties & {
        '&:hover'?: React.CSSProperties;
        '&:active'?: React.CSSProperties;
    };
}

export interface CertificatesViewerProps extends WindowAppProps {}

const CERTIFICATES: Certificate[] = [
    {
        id: 1,
        title: 'Microsoft Azure AI Engineer Associate',
        issuer: 'Microsoft',
        date: 'April 2025',
        description: 'Professional certification in Azure AI services and machine learning',
        icon: '☁️',
        color: '#0078d4',
        driveLink: 'https://drive.google.com/file/d/1syZrRMJ2BX3rfc6ZvI5XWL03xXBYX1sY/preview',
        category: 'professional'
    },
    {
        id: 2,
        title: '1st Prize - Hackvotrix Hackathon',
        issuer: 'Hackvotrix',
        date: '2024',
        description: 'Winner of 30-hour hackathon competition',
        icon: '🏆',
        color: '#ffd700',
        driveLink: 'https://drive.google.com/file/d/1vyg5ZyBmsKlQDhyM21Lh_EBysPQ52gtz/preview',
        category: 'hackathon'
    },
    {
        id: 3,
        title: 'Finalist - AI Hackathon 2025',
        issuer: 'AI Hackathon',
        date: '2025',
        description: 'Finalist in 30-hour AI-focused competition',
        icon: '🥈',
        color: '#c0c0c0',
        category: 'hackathon'
    },
    {
        id: 4,
        title: 'Finalist - SIH Internal Hackathon',
        issuer: 'Smart India Hackathon',
        date: '2025',
        description: 'Qualified for Smart India Hackathon',
        icon: '🎯',
        color: '#4ecdc4',
        category: 'hackathon'
    },
];

const OTHER_CERTIFICATES: Certificate[] = [
    {
        id: 5,
        title: 'Other Certificate 1',
        issuer: 'Issuer Name',
        date: '2024',
        description: 'Additional certificate details',
        icon: '📜',
        color: '#9c27b0',
        category: 'other'
    },
    // Add more other certificates as needed
];

const CertificatesViewer: React.FC<CertificatesViewerProps> = (props) => {
    const [selectedCert, setSelectedCert] = useState<number | null>(null);
    const [selectedCertList, setSelectedCertList] = useState<'main' | 'other'>('main');
    const [viewMode, setViewMode] = useState<'grid' | 'detail'>('grid');

    const currentCert = selectedCert !== null ? 
        (selectedCertList === 'main' ? CERTIFICATES[selectedCert] : OTHER_CERTIFICATES[selectedCert]) : 
        null;
        
    const currentList = selectedCertList === 'main' ? CERTIFICATES : OTHER_CERTIFICATES;

    return (
        <Window
            top={50}
            left={80}
            width={900}
            height={700}
            windowTitle="Certificates"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'My Certifications & Achievements'}
        >
            <div style={styles.container}>
                {viewMode === 'grid' ? (
                    <>
                        <div style={styles.header}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
                                <h2 style={styles.title}>
                                    {selectedCertList === 'main' ? '📁 Certificates' : '📁 Other Certificates'}
                                </h2>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <button 
                                        style={{
                                            ...styles.tabButton, 
                                            ...(selectedCertList === 'main' && styles.activeTab)
                                        }}
                                        onClick={() => setSelectedCertList('main')}
                                    >
                                        Main Certificates
                                    </button>
                                    <button 
                                        style={{
                                            ...styles.tabButton,
                                            ...(selectedCertList === 'other' && styles.activeTab)
                                        }}
                                        onClick={() => setSelectedCertList('other')}
                                    >
                                        Other Certificates
                                    </button>
                                </div>
                            </div>
                            <p style={styles.subtitle}>
                                Click on a certificate to view details
                            </p>
                        </div>
                        <div style={styles.grid}>
                            {currentList.map((cert, index) => (
                                <motion.div
                                    key={cert.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{
                                        ...styles.certCard,
                                        borderColor: cert.color,
                                    }}
                                    onMouseDown={() => {
                                        setSelectedCert(index);
                                        setViewMode('detail');
                                    }}
                                >
                                    <div style={styles.certIcon}>{cert.icon}</div>
                                    <h3 style={styles.certTitle}>{cert.title}</h3>
                                    <p style={styles.certIssuer}>{cert.issuer}</p>
                                    <p style={styles.certDate}>{cert.date}</p>
                                </motion.div>
                            ))}
                        </div>
                    </>
                ) : (
                    currentCert && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={styles.detailView}
                        >
                            <button
                                style={styles.backButton}
                                onMouseDown={() => {
                                    setViewMode('grid');
                                    setSelectedCert(null);
                                }}
                            >
                                ← Back
                            </button>
                            <div style={styles.detailContent}>
                                <div
                                    style={{
                                        ...styles.detailHeader,
                                        backgroundColor: currentCert.color,
                                    }}
                                >
                                    <span style={styles.detailIcon}>
                                        {currentCert.icon}
                                    </span>
                                    <div>
                                        <h2 style={styles.detailTitle}>
                                            {currentCert.title}
                                        </h2>
                                        <p style={styles.detailIssuer}>
                                            {currentCert.issuer}
                                        </p>
                                    </div>
                                </div>
                                <div style={styles.detailBody}>
                                    <div style={styles.infoRow}>
                                        <div style={styles.infoItem}>
                                            <span style={styles.infoLabel}>Date: </span>
                                            <span style={styles.infoText}>{currentCert.date}</span>
                                        </div>
                                        <div style={styles.infoItem}>
                                            <span style={styles.infoLabel}>Description: </span>
                                            <span style={styles.infoText}>{currentCert.description}</span>
                                        </div>
                                    </div>
                                    <div style={styles.horizontalLayout}>
                                        {currentCert.driveLink && (
                                            <div style={styles.previewContainer}>
                                                <iframe 
                                                    src={currentCert.driveLink}
                                                    style={styles.certificateFrame}
                                                    allow="autoplay"
                                                    title={`${currentCert.title} Certificate`}
                                                ></iframe>
                                            </div>
                                        )}
                                        <div style={styles.buttonGroup}>
                                            <div style={styles.buttonContainer}>
                                                <div
                                                    style={{
                                                        ...styles.certificateBadge,
                                                        borderColor: currentCert.color,
                                                    }}
                                                >
                                                    <span style={styles.badgeText}>
                                                        ✓ Verified Certificate
                                                    </span>
                                                </div>
                                                {currentCert.driveLink && (
                                                    <button 
                                                        style={{
                                                            ...styles.viewButton,
                                                            backgroundColor: currentCert.color,
                                                            marginLeft: '12px',
                                                        }}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            window.open(currentCert.driveLink, '_blank', 'noopener,noreferrer');
                                                        }}
                                                    >
                                                        View Certificate
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )
                )}
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
        padding: 16,
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
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: 16,
        marginBottom: 20,
    },
    tabButton: {
        padding: '8px 16px',
        border: '1px solid #999',
        backgroundColor: '#e0e0e0',
        borderRadius: '4px',
        cursor: 'pointer',
        fontFamily: 'MS Sans Serif',
        fontSize: '12px',
        outline: 'none',
        '&:hover': {
            backgroundColor: '#d0d0e0',
        },
        '&:active': {
            backgroundColor: '#c0c0d0',
        },
    },
    activeTab: {
        backgroundColor: '#0078d4',
        color: 'white',
        borderColor: '#005a9e',
        '&:hover': {
            backgroundColor: '#0066bb',
        },
    },
    certCard: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
        border: '3px solid',
        borderRadius: 4,
        cursor: 'pointer',
        textAlign: 'center',
    },
    certIcon: {
        fontSize: 64,
        marginBottom: 12,
    },
    certTitle: {
        fontSize: 14,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 8,
        textAlign: 'center',
    },
    certIssuer: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        color: '#666',
        margin: 0,
        marginBottom: 4,
    },
    certDate: {
        fontSize: 11,
        fontFamily: 'MSSerif',
        color: '#999',
        margin: 0,
    },
    detailView: {
        width: '100%',
        flexDirection: 'column',
    },
    backButton: {
        padding: '8px 16px',
        backgroundColor: '#0e639c',
        color: '#ffffff',
        border: 'none',
        fontFamily: 'MSSerif',
        fontSize: 12,
        cursor: 'pointer',
        marginBottom: 16,
        width: 'fit-content',
    },
    detailContent: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        border: '2px solid #000',
        borderRadius: 4,
    },
    detailHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 24,
        color: '#ffffff',
    },
    detailIcon: {
        fontSize: 64,
        marginRight: 16,
    },
    detailTitle: {
        fontSize: 24,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 4,
        color: '#ffffff',
    },
    detailIssuer: {
        fontSize: 16,
        fontFamily: 'MSSerif',
        margin: 0,
        color: '#ffffff',
        opacity: 0.9,
    },
    detailBody: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    infoRow: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    infoLabel: {
        fontWeight: 'bold',
        marginRight: '8px',
        fontFamily: 'MillenniumBold',
    },
    infoText: {
        fontFamily: 'MSSerif',
    },
    horizontalLayout: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        marginTop: '16px',
    },
    buttonGroup: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        flexWrap: 'wrap',
        gap: '12px',
    },
    viewButton: {
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        color: 'white',
        cursor: 'pointer',
        fontFamily: 'MS Sans Serif',
        fontSize: '14px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        transition: 'all 0.2s ease',
        '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        '&:active': {
            transform: 'translateY(0)',
            boxShadow: 'none',
        },
    },
    previewContainer: {
        width: '100%',
        height: '450px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    },
    certificateFrame: {
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: '#fff',
    },
    detailSection: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: 'MillenniumBold',
        marginBottom: 8,
    },
    sectionText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        lineHeight: 1.6,
        color: '#333',
    },
    certificateBadge: {
        padding: '10px 18px',
        border: '2px solid',
        borderRadius: 4,
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
    },
    badgeText: {
        fontSize: 14,
        fontFamily: 'MillenniumBold',
        color: '#333',
    },
};

export default CertificatesViewer;

