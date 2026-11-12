import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface ContactDialupProps extends WindowAppProps {}

const ContactDialup: React.FC<ContactDialupProps> = (props) => {
    const [isConnecting, setIsConnecting] = useState(false);
    const [connected, setConnected] = useState(false);
    const [dialupNoise, setDialupNoise] = useState('');

    useEffect(() => {
        if (isConnecting) {
            const noiseChars = ['BEEP', 'BRRR', 'EEEE', 'ZZZZ', 'CHHH'];
            const interval = setInterval(() => {
                setDialupNoise(
                    noiseChars[Math.floor(Math.random() * noiseChars.length)]
                );
            }, 200);
            setTimeout(() => {
                setIsConnecting(false);
                setConnected(true);
                clearInterval(interval);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [isConnecting]);

    const contactMethods = [
        {
            name: 'Email',
            value: 'dharshan.aidev@gmail.com',
            icon: '📧',
            link: 'mailto:dharshan.aidev@gmail.com',
            color: '#ea4335',
        },
        {
            name: 'GitHub',
            value: 'github.com/Dharshan-S12',
            icon: '💻',
            link: 'https://github.com/Dharshan-S12',
            color: '#181717',
        },
        {
            name: 'Portfolio / TechBit',
            value: 'techbit-22.web.app',
            icon: '🌐',
            link: 'https://techbit-22.web.app/',
            color: '#4ecdc4',
        },
        {
            name: 'F1 Simulator Repo',
            value: 'github.com/Dharshan-S12/F1-Simulator',
            icon: '🏎️',
            link: 'https://github.com/Dharshan-S12/F1-Simulator',
            color: '#ff6b6b',
        },
        {
            name: 'Location',
            value: 'Coimbatore, Tamil Nadu, India',
            icon: '📍',
            link: 'https://maps.google.com/?q=Coimbatore,Tamil+Nadu',
            color: '#25d366',
        },
    ];

    return (
        <Window
            top={70}
            left={120}
            width={800}
            height={650}
            windowTitle="Contact Me - Dial-Up"
            windowBarIcon="windowExplorerIcon"
            windowBarColor="#1C1C1C"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'Connecting...'}
        >
            <div style={styles.container}>
                {!connected ? (
                    <div style={styles.dialupScreen}>
                        <div style={styles.modemIcon}>📡</div>
                        <h2 style={styles.dialupTitle}>
                            {isConnecting ? 'Connecting...' : 'Dial-Up Connection'}
                        </h2>
                        {isConnecting ? (
                            <div style={styles.connecting}>
                                <div style={styles.dialupNoise}>
                                    {dialupNoise}
                                </div>
                                <div style={styles.progressBar}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 3 }}
                                        style={styles.progressFill}
                                    />
                                </div>
                                <p style={styles.connectingText}>
                                    Establishing connection...
                                </p>
                            </div>
                        ) : (
                            <button
                                style={styles.connectButton}
                                onMouseDown={() => setIsConnecting(true)}
                            >
                                Click to Connect
                            </button>
                        )}
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={styles.contactScreen}
                    >
                        <div style={styles.connectedHeader}>
                            <span style={styles.connectedIcon}>✓</span>
                            <h2 style={styles.connectedTitle}>Connected!</h2>
                        </div>
                        <div style={styles.contactGrid}>
                            {contactMethods.map((method, index) => (
                                <motion.a
                                    key={method.name}
                                    href={method.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    style={{
                                        ...styles.contactCard,
                                        borderColor: method.color,
                                    }}
                                >
                                    <div style={styles.cardIcon}>
                                        {method.icon}
                                    </div>
                                    <div style={styles.cardContent}>
                                        <h3 style={styles.cardName}>
                                            {method.name}
                                        </h3>
                                        <p style={styles.cardValue}>
                                            {method.value}
                                        </p>
                                    </div>
                                    <div
                                        style={{
                                            ...styles.cardIndicator,
                                            backgroundColor: method.color,
                                        }}
                                    />
                                </motion.a>
                            ))}
                        </div>
                        <div style={styles.footer}>
                            <p style={styles.footerText}>
                                Click on any contact method to connect
                            </p>
                        </div>
                    </motion.div>
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
        backgroundColor: '#000000',
        padding: 20,
        boxSizing: 'border-box',
    },
    dialupScreen: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        color: '#00ff00',
        fontFamily: 'Terminal, monospace',
    },
    modemIcon: {
        fontSize: 64,
        marginBottom: 20,
    },
    dialupTitle: {
        fontSize: 24,
        fontFamily: 'Terminal, monospace',
        color: '#00ff00',
        marginBottom: 40,
    },
    connecting: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    dialupNoise: {
        fontSize: 18,
        fontFamily: 'Terminal, monospace',
        color: '#00ff00',
        marginBottom: 20,
        minHeight: 24,
    },
    progressBar: {
        width: '80%',
        height: 20,
        backgroundColor: '#333',
        border: '1px solid #00ff00',
        marginBottom: 20,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#00ff00',
    },
    connectingText: {
        fontSize: 14,
        fontFamily: 'Terminal, monospace',
        color: '#00ff00',
    },
    connectButton: {
        padding: '12px 24px',
        backgroundColor: '#00ff00',
        color: '#000000',
        border: 'none',
        fontFamily: 'Terminal, monospace',
        fontSize: 16,
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    contactScreen: {
        flexDirection: 'column',
        flex: 1,
    },
    connectedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    connectedIcon: {
        fontSize: 32,
        color: '#00ff00',
        marginRight: 12,
    },
    connectedTitle: {
        fontSize: 24,
        fontFamily: 'Terminal, monospace',
        color: '#00ff00',
        margin: 0,
    },
    contactGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 16,
        marginBottom: 20,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#1a1a1a',
        border: '2px solid',
        borderRadius: 4,
        cursor: 'pointer',
        textDecoration: 'none',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
    },
    cardIcon: {
        fontSize: 32,
        marginRight: 12,
    },
    cardContent: {
        flexDirection: 'column',
        flex: 1,
    },
    cardName: {
        fontSize: 14,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 4,
    },
    cardValue: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        margin: 0,
        color: '#cccccc',
    },
    cardIndicator: {
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: 4,
    },
    footer: {
        paddingTop: 16,
        borderTop: '1px solid #333',
        textAlign: 'center',
    },
    footerText: {
        fontSize: 12,
        fontFamily: 'Terminal, monospace',
        color: '#00ff00',
        margin: 0,
    },
};

export default ContactDialup;

