import React from 'react';
import Window from '../os/Window';

export interface Guide96Props extends WindowAppProps {}

const Guide96: React.FC<Guide96Props> = (props) => {
    return (
        <Window
            top={50}
            left={90}
            width={1000}
            height={700}
            windowTitle="Guide96.exe"
            windowBarIcon="windowExplorerIcon"
            windowBarColor="#c0c0c0"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'Guide'}
        >
            <div style={styles.container}>
                <iframe
                    src="https://cypress-eyebrow-0f4.notion.site/ebd/2b7ac9f09a6080b9bf67f43517720563"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    style={styles.iframe}
                    title="Guide96"
                />
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
    },
    iframe: {
        border: 'none',
        display: 'block',
        width: '100%',
        height: '100%',
    },
};

export default Guide96;

