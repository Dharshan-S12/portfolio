import React from 'react';

export interface MobileWarningModalProps {
    onClose: () => void;
    gameName: string;
}

const MobileWarningModal: React.FC<MobileWarningModalProps> = ({ onClose, gameName }) => {
    return (
        <div style={styles.overlay} onMouseDown={onClose}>
            <div style={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h2 style={styles.title}>⚠️ Desktop/Laptop Required</h2>
                    <button style={styles.closeButton} onMouseDown={onClose}>
                        ×
                    </button>
                </div>
                <div style={styles.content}>
    <div style={styles.icon}>💻</div>
    <p style={styles.message}>
        <strong>{gameName}</strong> requires a desktop or laptop computer to play.
    </p>
    <p style={styles.subMessage}>
        Please use a computer or laptop with a keyboard and mouse for the best gaming experience.
    </p>
</div>

                <div style={styles.footer}>
                    <button style={styles.okButton} onMouseDown={onClose}>
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1000000,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        width: '90%',
        maxWidth: '500px',
        backgroundColor: '#c0c0c0',
        border: '2px solid #000000',
        borderRadius: '4px',
        flexDirection: 'column',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        backgroundColor: '#0a246a',
        color: '#ffffff',
        borderBottom: '2px solid #000000',
    },
    title: {
        fontSize: '18px',
        fontFamily: 'MillenniumBold',
        margin: 0,
        color: '#ffffff',
    },
    closeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ffffff',
        fontSize: '28px',
        cursor: 'pointer',
        padding: '0',
        width: '30px',
        height: '30px',
        lineHeight: '30px',
    },
    content: {
        padding: '24px',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
    },
    icon: {
        fontSize: '64px',
        marginBottom: '16px',
    },
    message: {
        fontSize: '16px',
        fontFamily: 'MSSerif',
        color: '#000000',
        marginBottom: '12px',
        lineHeight: '1.6',
    },
    subMessage: {
        fontSize: '14px',
        fontFamily: 'MSSerif',
        color: '#333333',
        marginBottom: '16px',
        lineHeight: '1.6',
    },
    tamilMessage: {
        fontSize: '14px',
        fontFamily: 'MSSerif',
        color: '#0066cc',
        marginBottom: '8px',
        lineHeight: '1.6',
        padding: '12px',
        backgroundColor: '#e6f3ff',
        borderRadius: '4px',
    },
    footer: {
        padding: '12px 20px',
        borderTop: '1px solid #808080',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    okButton: {
        padding: '8px 24px',
        backgroundColor: '#0e639c',
        color: '#ffffff',
        border: '2px outset #0e639c',
        fontFamily: 'MSSerif',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '2px',
    },
};

export default MobileWarningModal;

