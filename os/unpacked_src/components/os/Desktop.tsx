import React, { useCallback, useEffect, useState } from 'react';
// import Colors from '../../constants/colors';
import wallpaper2 from '../../assets/wallpaper/wallpaper2.jpg';
import ShowcaseExplorer from '../applications/ShowcaseExplorer';
import Doom from '../applications/Doom';
import OregonTrail from '../applications/OregonTrail';
import ShutdownSequence from './ShutdownSequence';
// import ThisComputer from '../applications/ThisComputer';
import Toolbar from './Toolbar';
import DesktopShortcut, { DesktopShortcutProps } from './DesktopShortcut';
import { IconName } from '../../assets/icons';
// import SkillsShowcase from '../applications/SkillsShowcase';
import CodeTerminal from '../applications/CodeTerminal';
import JavaPlayground from '../applications/JavaPlayground';
import AlgorithmVisualizer from '../applications/AlgorithmVisualizer';
import TechStackVisualizer from '../applications/TechStackVisualizer';
import CareerTimeline from '../applications/CareerTimeline';
import CertificatesViewer from '../applications/CertificatesViewer';
import BioNotepad from '../applications/BioNotepad';
import ContactDialup from '../applications/ContactDialup';
// import NotesDiary from '../applications/NotesDiary';
import ProjectsHub from '../applications/ProjectsHub';
import ExperienceApp from '../applications/ExperienceApp';
import ResumeViewer from '../applications/ResumeViewer';
import SnakeGame from '../applications/SnakeGame';
// import AboutApp from '../applications/AboutApp';
import Guide96 from '../applications/Guide96';
import MobileWarningModal from '../general/MobileWarningModal';
import { isMobileDevice } from '../../utils/mobileDetection';

export interface DesktopProps {}

type ExtendedWindowAppProps<T> = T & WindowAppProps;

const APPLICATIONS: {
    [key in string]: {
        key: string;
        name: string;
        shortcutIcon: IconName;
        component: React.FC<ExtendedWindowAppProps<any>>;
    };
} = {
    showcase: {
        key: 'showcase',
        name: 'My Showcase',
        shortcutIcon: 'my_showcase',
        component: ShowcaseExplorer,
    },
    // about: {
    //     key: 'about',
    //     name: 'About Me',
    //     shortcutIcon: 'about_port',
    //     component: AboutApp,
    // },
    bio: {
        key: 'bio',
        name: 'BIO.exe',
        shortcutIcon: 'BIO',
        component: BioNotepad,
    },
    techstack: {
        key: 'techstack',
        name: 'Tech Stack',
        shortcutIcon: 'tech_stack_portfolio',
        component: TechStackVisualizer,
    },
    projectsHub: {
        key: 'projectsHub',
        name: 'Projects Hub',
        shortcutIcon: 'projects_hub',
        component: ProjectsHub,
    },
    experience: {
        key: 'experience',
        name: 'Experience.exe',
        shortcutIcon: 'experience',
        component: ExperienceApp,
    },
    // skills: {
    //     key: 'skills',
    //     name: 'Skills & Achievements',
    //     shortcutIcon: 'skills & achievements',
    //     component: SkillsShowcase,
    //},
    contact: {
        key: 'contact',
        name: 'Contact Me',
        shortcutIcon: 'contact',
        component: ContactDialup,
    },
    resume: {
        key: 'resume',
        name: 'Resume',
        shortcutIcon: 'resume',
        component: ResumeViewer,
    },
    // notes: {
    //     key: 'notes',
    //     name: 'Diary96.exe',
    //     shortcutIcon: 'ownNote',
    //     component: NotesDiary,
    // },
    guide96: {
        key: 'guide96',
        name: 'Notes By Knowledge',
        shortcutIcon: 'ownNote',
        component: Guide96,
    },
    certificates: {
        key: 'certificates',
        name: 'Certificates',
        shortcutIcon: 'certificate',
        component: CertificatesViewer,
    },
    timeline: {
        key: 'timeline',
        name: 'Career Timeline',
        shortcutIcon: 'carrer_timeline',
        component: CareerTimeline,
    },
    trail: {
        key: 'trail',
        name: 'The Oregon Trail',
        shortcutIcon: 'trailIcon',
        component: OregonTrail,
    },
    snake: {
        key: 'snake',
        name: 'snake.exe',
        shortcutIcon: 'snakegame',
        component: SnakeGame,
    },
    doom: {
        key: 'doom',
        name: 'Doom',
        shortcutIcon: 'doom',
        component: Doom,
    },
    terminal: {
        key: 'terminal',
        name: 'Code Terminal',
        shortcutIcon: 'code_terminal',
        component: CodeTerminal,
    },
    java: {
        key: 'java',
        name: 'Java Playground',
        shortcutIcon: 'java',
        component: JavaPlayground,
    },
    algorithms: {
        key: 'algorithms',
        name: 'Algorithm Visualizer',
        shortcutIcon: 'algorithm',
        component: AlgorithmVisualizer,
    },
};

const Desktop: React.FC<DesktopProps> = (props) => {
    const [windows, setWindows] = useState<DesktopWindows>({});

    const [shortcuts, setShortcuts] = useState<DesktopShortcutProps[]>([]);

    const [shutdown, setShutdown] = useState(false);
    const [numShutdowns, setNumShutdowns] = useState(1);
    const [showMobileWarning, setShowMobileWarning] = useState(false);
    const [mobileWarningGame, setMobileWarningGame] = useState('');

    // Debug: Log when Desktop component renders
    useEffect(() => {
        console.log('Desktop component mounted');
    }, []);

    useEffect(() => {
        if (shutdown === true) {
            rebootDesktop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shutdown]);

    useEffect(() => {
        const newShortcuts: DesktopShortcutProps[] = [];
        Object.keys(APPLICATIONS).forEach((key) => {
            const app = APPLICATIONS[key];
            newShortcuts.push({
                shortcutName: app.name,
                icon: app.shortcutIcon,
                onOpen: () => {
                    // Check if it's a game and user is on mobile
                    const gameKeys = ['doom', 'trail', 'snake'];
                    if (gameKeys.includes(key) && isMobileDevice()) {
                        setMobileWarningGame(app.name);
                        setShowMobileWarning(true);
                        return;
                    }
                    
                    addWindow(
                        app.key,
                        <app.component
                            onInteract={() => onWindowInteract(app.key)}
                            onMinimize={() => minimizeWindow(app.key)}
                            onClose={() => removeWindow(app.key)}
                            key={app.key}
                        />
                    );
                },
            });
        });

        newShortcuts.forEach((shortcut) => {
            if (shortcut.shortcutName === 'My Showcase') {
                shortcut.onOpen();
            }
        });

        setShortcuts(newShortcuts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const rebootDesktop = useCallback(() => {
        setWindows({});
    }, []);

    const removeWindow = useCallback((key: string) => {
        // Absolute hack and a half
        setTimeout(() => {
            setWindows((prevWindows) => {
                const newWindows = { ...prevWindows };
                delete newWindows[key];
                return newWindows;
            });
        }, 100);
    }, []);

    const minimizeWindow = useCallback((key: string) => {
        setWindows((prevWindows) => {
            const newWindows = { ...prevWindows };
            newWindows[key].minimized = true;
            return newWindows;
        });
    }, []);

    const getHighestZIndex = useCallback((): number => {
        let highestZIndex = 0;
        Object.keys(windows).forEach((key) => {
            const window = windows[key];
            if (window) {
                if (window.zIndex > highestZIndex)
                    highestZIndex = window.zIndex;
            }
        });
        return highestZIndex;
    }, [windows]);

    const toggleMinimize = useCallback(
        (key: string) => {
            const newWindows = { ...windows };
            const highestIndex = getHighestZIndex();
            if (
                newWindows[key].minimized ||
                newWindows[key].zIndex === highestIndex
            ) {
                newWindows[key].minimized = !newWindows[key].minimized;
            }
            newWindows[key].zIndex = getHighestZIndex() + 1;
            setWindows(newWindows);
        },
        [windows, getHighestZIndex]
    );

    const onWindowInteract = useCallback(
        (key: string) => {
            setWindows((prevWindows) => {
                // Calculate highest z-index from current state
                let highestZIndex = 0;
                Object.keys(prevWindows).forEach((k) => {
                    if (prevWindows[k] && prevWindows[k].zIndex > highestZIndex) {
                        highestZIndex = prevWindows[k].zIndex;
                    }
                });
                return {
                    ...prevWindows,
                    [key]: {
                        ...prevWindows[key],
                        zIndex: highestZIndex + 1,
                    },
                };
            });
        },
        []
    );

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns(numShutdowns + 1);
        }, 600);
    }, [numShutdowns]);

    const addWindow = useCallback(
        (key: string, element: JSX.Element) => {
            setWindows((prevState) => {
                // Calculate highest z-index from current state
                let highestZIndex = 0;
                Object.keys(prevState).forEach((k) => {
                    if (prevState[k] && prevState[k].zIndex > highestZIndex) {
                        highestZIndex = prevState[k].zIndex;
                    }
                });
                return {
                    ...prevState,
                    [key]: {
                        zIndex: highestZIndex + 1,
                        minimized: false,
                        component: element,
                        name: APPLICATIONS[key].name,
                        icon: APPLICATIONS[key].shortcutIcon,
                    },
                };
            });
        },
        []
    );

    return !shutdown ? (
        <div style={styles.desktop}>
            {showMobileWarning && (
                <MobileWarningModal
                    onClose={() => setShowMobileWarning(false)}
                    gameName={mobileWarningGame}
                />
            )}
            {/* For each window in windows, loop over and render  */}
            {Object.keys(windows).map((key) => {
                const element = windows[key].component;
                if (!element) return <div key={`win-${key}`}></div>;
                return (
                    <div
                        key={`win-${key}`}
                        style={Object.assign(
                            {},
                            { zIndex: windows[key].zIndex },
                            windows[key].minimized && styles.minimized
                        )}
                    >
                        {React.cloneElement(element, {
                            key,
                            onInteract: () => onWindowInteract(key),
                            onClose: () => removeWindow(key),
                        })}
                    </div>
                );
            })}
            <div style={styles.shortcuts}>
                {shortcuts.map((shortcut, i) => {
                    const iconsPerColumn = 9; // 9 icons per column (vertical)
                    const col = Math.floor(i / iconsPerColumn);
                    const row = i % iconsPerColumn;
                    const spacingX = 95;
                    const spacingY = 100;
                    return (
                        <div
                            style={Object.assign({}, styles.shortcutContainer, {
                                top: 16 + row * spacingY,
                                left: 6 + col * spacingX,
                            })}
                            key={shortcut.shortcutName}
                        >
                            <DesktopShortcut
                                icon={shortcut.icon}
                                shortcutName={shortcut.shortcutName}
                                onOpen={shortcut.onOpen}
                            />
                        </div>
                    );
                })}
            </div>
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                shutdown={startShutdown}
                applications={APPLICATIONS}
                addWindow={addWindow}
            />
        </div>
    ) : (
        <ShutdownSequence
            setShutdown={setShutdown}
            numShutdowns={numShutdowns}
        />
    );
};

const styles: StyleSheetCSS = {
    desktop: {
        minHeight: '100%',
        flex: 1,
        backgroundImage: `url(${wallpaper2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#1d2e2f',
    },
    shortcuts: {
        position: 'absolute',
        top: 16,
        left: 6,
        width: 'auto',
        height: 'auto',
        // @ts-ignore
        '@media (max-width: 768px)': {
            top: 8,
            left: 4,
        },
    },
    shortcutContainer: {
        position: 'absolute',
        // @ts-ignore
        '@media (max-width: 768px)': {
            transform: 'scale(0.8)',
        },
    },
    minimized: {
        pointerEvents: 'none',
        opacity: 0,
    },
};

export default Desktop;
