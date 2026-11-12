import React, { useState, useEffect, useRef } from 'react';
import Window from '../os/Window';

export interface CodeTerminalProps extends WindowAppProps {}

interface Command {
    input: string;
    output: string;
}

const CodeTerminal: React.FC<CodeTerminalProps> = (props) => {
    const [commandHistory, setCommandHistory] = useState<Command[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [commandHistoryList, setCommandHistoryList] = useState<string[]>([]);
    const [currentDir, setCurrentDir] = useState('C:\\Users\\Dharshan');
    const inputRef = useRef<HTMLInputElement>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial welcome message
        const welcomeMessage = `Microsoft Windows [Version 10.0.26200]
(c) Microsoft Corporation. All rights reserved.

Welcome to DharshanOS Terminal!
Type 'help' for available commands.

`;
        setCommandHistory([{ input: '', output: welcomeMessage }]);
        // Focus input after a short delay to ensure DOM is ready
        setTimeout(() => {
            inputRef.current?.focus();
        }, 200);
    }, []);

    useEffect(() => {
        // Auto-scroll to bottom when new output is added
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
        // Refocus input after command execution
        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
    }, [commandHistory]);

    const executeCommand = (cmd: string): string => {
        const parts = cmd.trim().split(/\s+/);
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        switch (command) {
            case 'help':
                return `Available Commands:
  help          - Show this help message
  clear         - Clear the terminal screen
  ls            - List directory contents
  dir           - List directory contents (Windows style)
  cd [path]     - Change directory
  pwd           - Show current directory
  echo [text]   - Display text
  whoami        - Display current user
  date          - Show current date and time
  ver           - Show system version
  cls           - Clear screen (alias for clear)
  exit          - Close terminal
  color [code]  - Change text color (0-9, A-F)
  tree          - Display directory tree
  type [file]   - Display file contents
  mkdir [name]  - Create directory
  rmdir [name]  - Remove directory
  time          - Show current time
  vol           - Show volume label`;

            case 'clear':
            case 'cls':
                setCommandHistory([]);
                return '';

            case 'ls':
            case 'dir':
                return ` Volume in drive C is DharshanOS
 Volume Serial Number is 1A2B-3C4D

 Directory of ${currentDir}

[.]            [..]           [Documents]
[Projects]     [Desktop]      [Downloads]
[Portfolio]    [Code]         [Notes]
               0 File(s)      0 bytes
               8 Dir(s)   1,024,000 bytes free`;

            case 'cd':
                if (args.length === 0) {
                    return currentDir;
                }
                const newPath = args[0];
                if (newPath === '..') {
                    const parent = currentDir.split('\\').slice(0, -1).join('\\') || 'C:\\';
                    setCurrentDir(parent);
                    return '';
                } else if (newPath.includes(':')) {
                    setCurrentDir(newPath);
                    return '';
                } else {
                    setCurrentDir(`${currentDir}\\${newPath}`);
                    return '';
                }

            case 'pwd':
                return currentDir;

            case 'echo':
                return args.join(' ');

            case 'whoami':
                return 'Dharshan\\Dharshan';

            case 'date':
            case 'time':
                const now = new Date();
                return now.toLocaleString();

            case 'ver':
                return 'Microsoft Windows [Version 10.0.26200]\nDharshanOS Edition';

            case 'tree':
                return `${currentDir}
├── Documents
│   ├── Resume.pdf
│   └── Projects.docx
├── Projects
│   ├── Sovereign-Workbench
│   ├── GastroSense
│   └── PlantDisease
└── Code
    ├── agentic-workflows
    └── ml-algorithms`;

            case 'type':
                if (args.length === 0) {
                    return 'Error: File name required.';
                }
                const fileName = args[0];
                const fileContents: { [key: string]: string } = {
                    'readme.txt': 'Welcome to DharshanOS Terminal!\nThis is a sample file.',
                    'notes.txt': 'Project Ideas:\n- AI Chatbot\n- Portfolio Website\n- Mobile App',
                };
                return fileContents[fileName] || `File not found: ${fileName}`;

            case 'mkdir':
                if (args.length === 0) {
                    return 'Error: Directory name required.';
                }
                return `Directory created: ${args[0]}`;

            case 'rmdir':
                if (args.length === 0) {
                    return 'Error: Directory name required.';
                }
                return `Directory removed: ${args[0]}`;

            case 'vol':
                return ' Volume in drive C is DharshanOS\n Volume Serial Number is 1A2B-3C4D';

            case 'color':
                if (args.length === 0) {
                    return 'Current color: 0A (Black background, Green text)';
                }
                return `Color changed to: ${args[0]}`;

            case 'exit':
                props.onClose();
                return '';

            case '':
                return '';

            default:
                return `'${command}' is not recognized as an internal or external command,\noperable program or batch file.`;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentInput.trim()) return;

        const output = executeCommand(currentInput);
        setCommandHistory((prev) => [
            ...prev,
            { input: currentInput, output },
        ]);

        // Add to command history list (excluding empty commands)
        if (currentInput.trim()) {
            setCommandHistoryList((prev) => [...prev, currentInput]);
            setHistoryIndex(-1);
        }

        setCurrentInput('');
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistoryList.length > 0) {
                const newIndex =
                    historyIndex === -1
                        ? commandHistoryList.length - 1
                        : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setCurrentInput(commandHistoryList[newIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex >= 0) {
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistoryList.length) {
                    setHistoryIndex(-1);
                    setCurrentInput('');
                } else {
                    setHistoryIndex(newIndex);
                    setCurrentInput(commandHistoryList[newIndex]);
                }
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            // Basic tab completion (could be enhanced)
        }
    };


    const handleContainerClick = (e: React.MouseEvent) => {
        // Only focus if clicking on the container itself, not on other elements
        if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'PRE') {
            inputRef.current?.focus();
        }
    };

    return (
        <Window
            top={100}
            left={200}
            width={900}
            height={600}
            windowTitle="Command Prompt"
            windowBarIcon="windowExplorerIcon"
            windowBarColor="#1C1C1C"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'C:\\Windows\\System32\\cmd.exe'}
        >
            <div
                ref={terminalRef}
                style={styles.container}
                onClick={handleContainerClick}
                onMouseDown={(e) => {
                    const target = e.target as HTMLElement;
                    // Only stop propagation if not clicking on input or form
                    if (target.tagName !== 'INPUT' && target.tagName !== 'FORM' && !target.closest('form')) {
                        e.stopPropagation();
                        inputRef.current?.focus();
                    } else if (target.tagName === 'INPUT') {
                        // Allow input to receive focus naturally
                        return;
                    } else {
                        // For form area, stop propagation but don't prevent input focus
                        e.stopPropagation();
                    }
                }}
            >
                {commandHistory.map((cmd, index) => (
                    <div key={index} style={styles.outputContainer}>
                        {cmd.input && (
                            <div style={styles.prompt}>
                                <span style={styles.promptText}>
                                    {currentDir}&gt;
                                </span>
                                <span style={styles.inputText}>{cmd.input}</span>
                            </div>
                        )}
                        {cmd.output && (
                            <pre style={styles.output}>{cmd.output}</pre>
                        )}
                    </div>
                ))}
                <form 
                    onSubmit={handleSubmit} 
                    style={styles.inputForm}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                >
                    <span style={styles.promptText}>{currentDir}&gt;</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={currentInput}
                        onChange={(e) => {
                            e.stopPropagation();
                            setCurrentInput(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            e.stopPropagation();
                            handleKeyDown(e);
                        }}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => e.stopPropagation()}
                        style={styles.input}
                        autoFocus
                        spellCheck={false}
                        autoComplete="off"
                    />
                    <span style={styles.cursor}>▋</span>
                </form>
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
        fontFamily: 'Terminal, "Courier New", monospace',
        padding: '8px',
        overflowY: 'auto',
        overflowX: 'hidden',
        boxSizing: 'border-box',
    },
    outputContainer: {
        flexDirection: 'column',
        marginBottom: '4px',
    },
    prompt: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '2px',
    },
    promptText: {
        color: '#00ff00',
        fontSize: '16px',
        fontFamily: 'Terminal, "Courier New", monospace',
        marginRight: '4px',
    },
    inputText: {
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: 'Terminal, "Courier New", monospace',
    },
    output: {
        color: '#c0c0c0',
        fontSize: '16px',
        fontFamily: 'Terminal, "Courier New", monospace',
        lineHeight: '1.5',
        margin: '0 0 4px 0',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
    inputForm: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '4px',
    },
    input: {
        flex: 1,
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#ffffff',
        fontSize: '16px',
        fontFamily: 'Terminal, "Courier New", monospace',
        padding: '0',
        margin: '0',
        minWidth: '200px',
        caretColor: '#00ff00',
        // @ts-ignore
        WebkitUserSelect: 'text',
        MozUserSelect: 'text',
        msUserSelect: 'text',
        userSelect: 'text',
    },
    cursor: {
        color: '#00ff00',
        fontSize: '16px',
        animation: 'blink 1s infinite',
        marginLeft: '2px',
    },
};

export default CodeTerminal;
