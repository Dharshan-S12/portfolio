import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../constants/colors';
import { Icon } from '../general';
import { IconName } from '../../assets/icons';
import { isMobileDevice } from '../../utils/mobileDetection';
import MobileWarningModal from '../general/MobileWarningModal';

export interface ToolbarProps {
    windows: DesktopWindows;
    toggleMinimize: (key: string) => void;
    shutdown: () => void;
    applications?: {
        [key: string]: {
            key: string;
            name: string;
            shortcutIcon: IconName;
            component: React.FC<any>;
        };
    };
    addWindow?: (key: string, element: JSX.Element) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    windows,
    toggleMinimize,
    shutdown,
    applications = {},
    addWindow,
}) => {
    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let mins = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + mins + ' ' + amPm;
        return strTime;
    };

    const [startWindowOpen, setStartWindowOpen] = useState(false);
    const [programsMenuOpen, setProgramsMenuOpen] = useState(false);
    const [runDialogOpen, setRunDialogOpen] = useState(false);
    const [runCommand, setRunCommand] = useState('');
    const [showMobileWarning, setShowMobileWarning] = useState(false);
    const [mobileWarningGame, setMobileWarningGame] = useState('');
    const lastClickInside = useRef(false);
    const programsMenuRef = useRef<HTMLDivElement>(null);
    const runDialogRef = useRef<HTMLDivElement>(null);

    const [lastActive, setLastActive] = useState('');

    useEffect(() => {
        let max = 0;
        let k = '';
        Object.keys(windows).forEach((key) => {
            if (windows[key].zIndex >= max) {
                max = windows[key].zIndex;
                k = key;
            }
        });
        setLastActive(k);
    }, [windows]);

    const [time, setTime] = useState(getTime());

    const updateTime = () => {
        setTime(getTime());
        setTimeout(() => {
            updateTime();
        }, 5000);
    };

    useEffect(() => {
        updateTime();
    });

    const onCheckClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (
            lastClickInside.current ||
            programsMenuRef.current?.contains(target) ||
            runDialogRef.current?.contains(target)
        ) {
            setStartWindowOpen(true);
        } else {
            setStartWindowOpen(false);
            setProgramsMenuOpen(false);
            setRunDialogOpen(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onStartWindowClicked = () => {
        setStartWindowOpen(true);
        lastClickInside.current = true;
    };

    const toggleStartWindow = () => {
        if (!startWindowOpen) {
            lastClickInside.current = true;
        } else {
            lastClickInside.current = false;
        }
    };

    const handleProgramClick = (appKey: string) => {
        // Check if it's a game and user is on mobile
        const gameKeys = ['doom', 'trail', 'snake'];
        if (gameKeys.includes(appKey) && isMobileDevice()) {
            setMobileWarningGame(applications[appKey]?.name || 'Game');
            setShowMobileWarning(true);
            setStartWindowOpen(false);
            setProgramsMenuOpen(false);
            return;
        }
        
        if (addWindow && applications[appKey]) {
            const AppComponent = applications[appKey].component;
            addWindow(
                appKey,
                <AppComponent
                    onInteract={() => {}}
                    onMinimize={() => {}}
                    onClose={() => {}}
                />
            );
        }
        setStartWindowOpen(false);
        setProgramsMenuOpen(false);
    };

    const handleRunCommand = () => {
        if (runCommand.trim() && addWindow) {
            const appKey = runCommand.trim().toLowerCase();
            const gameKeys = ['doom', 'trail', 'snake'];
            
            // Check if it's a game and user is on mobile
            if (gameKeys.includes(appKey) && isMobileDevice()) {
                setMobileWarningGame(applications[appKey]?.name || runCommand);
                setShowMobileWarning(true);
                setRunDialogOpen(false);
                setRunCommand('');
                return;
            }
            
            if (applications[appKey]) {
                handleProgramClick(appKey);
            } else {
                alert(`Cannot find '${runCommand}'. Please check the name and try again.`);
            }
        }
        setRunDialogOpen(false);
        setRunCommand('');
    };

    const appEntries = Object.keys(applications).map((key) => ({
        key,
        name: applications[key].name,
        icon: applications[key].shortcutIcon,
    }));

    // Group applications for Programs menu
    const groupedApps = {
        'Portfolio': appEntries.filter((app) =>
            ['showcase', 'bio', 'resume', 'experience', 'certificates', 'timeline'].includes(app.key)
        ),
        'Development': appEntries.filter((app) =>
            ['terminal', 'java', 'algorithms', 'techstack', 'projectsHub'].includes(app.key)
        ),
        'Games': appEntries.filter((app) =>
            ['trail', 'snake', 'doom'].includes(app.key)
        ),
        'Other': appEntries.filter((app) =>
            !['showcase', 'bio', 'resume', 'experience', 'certificates', 'timeline',
              'terminal', 'java', 'algorithms', 'techstack', 'projectsHub',
              'trail', 'snake', 'doom', 'contact', 'guide96'].includes(app.key)
        ),
    };

    return (
        <div style={styles.toolbarOuter}>
            {showMobileWarning && (
                <MobileWarningModal
                    onClose={() => setShowMobileWarning(false)}
                    gameName={mobileWarningGame}
                />
            )}
            {startWindowOpen && (
                <div
                    onMouseDown={onStartWindowClicked}
                    style={styles.startWindow}
                >
                    <div style={styles.startWindowInner}>
                        <div style={styles.verticalStartContainer}>
                            <p style={styles.verticalText}>DharshanOS</p>
                        </div>
                        <div style={styles.startWindowContent}>
                            {/* Programs Menu */}
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                                onMouseEnter={() => setProgramsMenuOpen(true)}
                                onMouseLeave={() => {
                                    // Delay to allow moving to submenu
                                    setTimeout(() => {
                                        if (!programsMenuRef.current?.matches(':hover')) {
                                            setProgramsMenuOpen(false);
                                        }
                                    }, 100);
                                }}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="windowExplorerIcon"
                                />
                                <p style={styles.startMenuText}>
                                    <u>P</u>rograms ▸
                                </p>
                            </div>

                            {/* Documents */}
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="windowExplorerIcon"
                                />
                                <p style={styles.startMenuText}>
                                    <u>D</u>ocuments
                                </p>
                            </div>

                            {/* Settings */}
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="windowExplorerIcon"
                                />
                                <p style={styles.startMenuText}>
                                    <u>S</u>ettings
                                </p>
                            </div>

                            {/* Find */}
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="windowExplorerIcon"
                                />
                                <p style={styles.startMenuText}>
                                    <u>F</u>ind
                                </p>
                            </div>

                            {/* Help */}
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="windowExplorerIcon"
                                />
                                <p style={styles.startMenuText}>
                                    <u>H</u>elp
                                </p>
                            </div>

                            {/* Run */}
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                                onMouseDown={() => {
                                    setRunDialogOpen(true);
                                    lastClickInside.current = true;
                                }}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="windowExplorerIcon"
                                />
                                <p style={styles.startMenuText}>
                                    <u>R</u>un...
                                </p>
                            </div>

                            <div style={styles.startMenuLine} />

                            {/* Shut Down */}
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                                onMouseDown={shutdown}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="computerBig"
                                />
                                <p style={styles.startMenuText}>
                                    Sh<u>u</u>t down...
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Programs Submenu */}
            {programsMenuOpen && startWindowOpen && (
                <div
                    ref={programsMenuRef}
                    style={styles.programsMenu}
                    onMouseEnter={() => setProgramsMenuOpen(true)}
                    onMouseLeave={() => setProgramsMenuOpen(false)}
                >
                    <div style={styles.programsMenuInner}>
                        {Object.keys(groupedApps).map((groupName) => {
                            const apps = groupedApps[groupName as keyof typeof groupedApps];
                            if (apps.length === 0) return null;
                            return (
                                <div key={groupName}>
                                    {groupName !== 'Portfolio' && (
                                        <div style={styles.programsMenuDivider} />
                                    )}
                                    {apps.map((app) => (
                                        <div
                                            key={app.key}
                                            className="start-menu-option"
                                            style={styles.programsMenuItem}
                                            onMouseDown={() => handleProgramClick(app.key)}
                                        >
                                            <Icon
                                                size={16}
                                                icon={app.icon}
                                                style={styles.programsMenuIcon}
                                            />
                                            <p style={styles.programsMenuText}>
                                                {app.name}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Run Dialog */}
            {runDialogOpen && (
                <div
                    ref={runDialogRef}
                    style={styles.runDialog}
                    onMouseDown={(e) => {
                        e.stopPropagation();
                        lastClickInside.current = true;
                    }}
                >
                    <div style={styles.runDialogInner}>
                        <div style={styles.runDialogHeader}>
                            <p style={styles.runDialogTitle}>Run</p>
                        </div>
                        <div style={styles.runDialogContent}>
                            <p style={styles.runDialogLabel}>
                                Type the name of a program, folder, document, or Internet
                                resource, and Windows will open it for you.
                            </p>
                            <p style={styles.runDialogInputLabel}>Open:</p>
                            <input
                                type="text"
                                value={runCommand}
                                onChange={(e) => setRunCommand(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleRunCommand();
                                    } else if (e.key === 'Escape') {
                                        setRunDialogOpen(false);
                                        setRunCommand('');
                                    }
                                }}
                                style={styles.runDialogInput}
                                autoFocus
                                placeholder="Type application name..."
                            />
                        </div>
                        <div style={styles.runDialogFooter}>
                            <button
                                style={styles.runDialogButton}
                                onMouseDown={handleRunCommand}
                            >
                                OK
                            </button>
                            <button
                                style={styles.runDialogButton}
                                onMouseDown={() => {
                                    setRunDialogOpen(false);
                                    setRunCommand('');
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                style={styles.runDialogButton}
                                onMouseDown={() => {
                                    // Browse functionality
                                    alert('Browse functionality coming soon!');
                                }}
                            >
                                Browse...
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div style={styles.toolbarInner}>
                <div style={styles.toolbar}>
                    <div
                        style={Object.assign(
                            {},
                            styles.startContainerOuter,
                            startWindowOpen && styles.activeTabOuter
                        )}
                        onMouseDown={toggleStartWindow}
                    >
                        <div
                            style={Object.assign(
                                {},
                                styles.startContainer,
                                startWindowOpen && styles.activeTabInner
                            )}
                        >
                            <Icon
                                size={18}
                                icon="windowsStartIcon"
                                style={styles.startIcon}
                            />
                            <p className="toolbar-text ">Start</p>
                        </div>
                    </div>
                    <div style={styles.toolbarTabsContainer}>
                        {Object.keys(windows).map((key) => {
                            return (
                                <div
                                    key={key}
                                    style={Object.assign(
                                        {},
                                        styles.tabContainerOuter,
                                        lastActive === key &&
                                            !windows[key].minimized &&
                                            styles.activeTabOuter
                                    )}
                                    onMouseDown={() => toggleMinimize(key)}
                                >
                                    <div
                                        style={Object.assign(
                                            {},
                                            styles.tabContainer,
                                            lastActive === key &&
                                                !windows[key].minimized &&
                                                styles.activeTabInner
                                        )}
                                    >
                                        <Icon
                                            size={18}
                                            icon={windows[key].icon}
                                            style={styles.tabIcon}
                                        />
                                        <p style={styles.tabText}>
                                            {windows[key].name}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div style={styles.time}>
                    <Icon style={styles.volumeIcon} icon="volumeOn" />
                    <p style={styles.timeText}>{time}</p>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    toolbarOuter: {
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 32,
        background: Colors.lightGray,
        borderTop: `1px solid ${Colors.lightGray}`,
        zIndex: 100000,
    },
    verticalStartContainer: {
        height: '100%',
        background: Colors.darkGray,
        width: 30,
    },
    verticalText: {
        fontFamily: 'Terminal',
        textOrientation: 'sideways',
        fontSize: 32,
        padding: 4,
        paddingBottom: 64,
        paddingTop: 8,
        letterSpacing: 1,
        color: Colors.lightGray,
        transform: 'scale(-1)',
        WebkitTransform: 'scale(-1)',
        MozTransform: 'scale(-1)',
        msTransform: 'scale(-1)',
        OTransform: 'scale(-1)',
        // @ts-ignore
        writingMode: 'tb-rl',
    },
    startWindowContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        minHeight: 300,
    },
    startWindow: {
        position: 'absolute',
        bottom: 28,
        display: 'flex',
        flex: 1,
        width: 256,
        minHeight: 300,
        left: 4,
        boxSizing: 'border-box',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
        background: Colors.lightGray,
    },
    activeTabOuter: {
        border: `1px solid ${Colors.black}`,
        borderBottomColor: Colors.white,
        borderRightColor: Colors.white,
    },
    startWindowInner: {
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        flex: 1,
        flexDirection: 'row',
    },
    startMenuIcon: {
        width: 32,
        height: 32,
    },
    startMenuText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        marginLeft: 8,
    },
    startMenuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        padding: 12,
        cursor: 'pointer',
    },
    startMenuLine: {
        height: 1,
        background: Colors.white,
        borderTop: `1px solid ${Colors.darkGray}`,
        margin: '4px 0',
    },
    programsMenu: {
        position: 'absolute',
        bottom: 28,
        left: 260,
        width: 256,
        minHeight: 200,
        maxHeight: 400,
        overflowY: 'auto',
        boxSizing: 'border-box',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
        background: Colors.lightGray,
        zIndex: 100001,
    },
    programsMenuInner: {
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        padding: '4px 0',
    },
    programsMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '8px 12px',
        cursor: 'pointer',
    },
    programsMenuIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    programsMenuText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
    },
    programsMenuDivider: {
        height: 1,
        background: Colors.white,
        borderTop: `1px solid ${Colors.darkGray}`,
        margin: '4px 0',
    },
    runDialog: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        zIndex: 100002,
        boxSizing: 'border-box',
        border: `2px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
        background: Colors.lightGray,
    },
    runDialogInner: {
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
    },
    runDialogHeader: {
        padding: '8px 12px',
        background: `linear-gradient(to bottom, #0a246a, #1e3a8a)`,
        color: Colors.white,
    },
    runDialogTitle: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        margin: 0,
        color: Colors.white,
    },
    runDialogContent: {
        padding: '16px',
        flexDirection: 'column',
    },
    runDialogLabel: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        marginBottom: '12px',
        color: Colors.black,
    },
    runDialogInputLabel: {
        fontSize: 12,
        fontFamily: 'MSSerif',
        marginBottom: '4px',
        color: Colors.black,
    },
    runDialogInput: {
        width: '100%',
        padding: '4px',
        border: `1px inset ${Colors.darkGray}`,
        fontSize: 12,
        fontFamily: 'MSSerif',
        boxSizing: 'border-box',
    },
    runDialogFooter: {
        padding: '8px',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: '8px',
        borderTop: `1px solid ${Colors.darkGray}`,
    },
    runDialogButton: {
        padding: '4px 16px',
        border: `2px outset ${Colors.lightGray}`,
        background: Colors.lightGray,
        fontSize: 12,
        fontFamily: 'MSSerif',
        cursor: 'pointer',
        minWidth: 75,
    },
    activeTabInner: {
        border: `1px solid ${Colors.darkGray}`,
        borderBottomColor: Colors.lightGray,
        borderRightColor: Colors.lightGray,
        backgroundImage: `linear-gradient(45deg, white 25%, transparent 25%),
        linear-gradient(-45deg,  white 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%,  white 75%),
        linear-gradient(-45deg, transparent 75%,  white 75%)`,
        backgroundSize: `4px 4px`,
        backgroundPosition: `0 0, 0 2px, 2px -2px, -2px 0px`,
        pointerEvents: 'none',
    },
    tabContainerOuter: {
        display: 'flex',
        flex: 1,
        maxWidth: 300,
        marginRight: 4,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
    },
    tabContainer: {
        display: 'flex',
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        alignItems: 'center',
        paddingLeft: 4,
        flex: 1,
    },
    tabIcon: {
        marginRight: 6,
    },
    startContainer: {
        alignItems: 'center',
        flexShrink: 1,
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        padding: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    startContainerOuter: {
        marginLeft: 3,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
    },
    toolbarTabsContainer: {
        flex: 1,
        marginLeft: 4,
        marginRight: 4,
    },
    startIcon: {
        marginRight: 4,
    },
    toolbarInner: {
        borderTop: `1px solid ${Colors.white}`,
        alignItems: 'center',
        flex: 1,
    },
    toolbar: {
        flexGrow: 1,
        width: '100%',
    },
    time: {
        flexShrink: 1,
        width: 86,
        height: 24,
        boxSizing: 'border-box',
        marginRight: 4,
        paddingLeft: 4,
        paddingRight: 4,
        border: `1px solid ${Colors.white}`,
        borderTopColor: Colors.darkGray,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftColor: Colors.darkGray,
    },
    volumeIcon: {
        cursor: 'pointer',
        height: 18,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
    },
    timeText: {
        fontSize: 12,
        fontFamily: 'MSSerif',
    },
};

export default Toolbar;
