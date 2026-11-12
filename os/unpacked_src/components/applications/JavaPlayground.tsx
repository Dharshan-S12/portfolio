import React, { useState, useEffect, useRef } from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface JavaPlaygroundProps extends WindowAppProps {}

interface JavaExample {
    title: string;
    description: string;
    code: string;
}

const JAVA_TEMPLATES: JavaExample[] = [
    {
        title: 'Hello World',
        description: 'Basic Java program',
        code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        System.out.println("Welcome to Java Playground!");
    }
}`,
    },
    {
        title: 'Variables & Data Types',
        description: 'Learn Java data types',
        code: `public class DataTypes {
    public static void main(String[] args) {
        // Primitive data types
        int age = 25;
        double salary = 50000.50;
        char grade = 'A';
        boolean isActive = true;
        String name = "Dharshan";
        
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Salary: " + salary);
        System.out.println("Grade: " + grade);
        System.out.println("Active: " + isActive);
    }
}`,
    },
    {
        title: 'Control Structures',
        description: 'If-else, loops, switch',
        code: `public class ControlStructures {
    public static void main(String[] args) {
        int score = 85;
        
        // If-else
        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }
        
        // For loop
        System.out.println("\\nNumbers 1 to 5:");
        for (int i = 1; i <= 5; i++) {
            System.out.print(i + " ");
        }
        
        // While loop
        System.out.println("\\n\\nCountdown:");
        int count = 5;
        while (count > 0) {
            System.out.print(count + " ");
            count--;
        }
    }
}`,
    },
    {
        title: 'Arrays & Collections',
        description: 'Working with arrays and lists',
        code: `import java.util.*;

public class Collections {
    public static void main(String[] args) {
        // Array
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.println("Array elements:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        
        // ArrayList
        List<String> names = new ArrayList<>();
        names.add("Alice");
        names.add("Bob");
        names.add("Charlie");
        
        System.out.println("\\n\\nList elements:");
        for (String name : names) {
            System.out.println(name);
        }
        
        // HashMap
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Alice", 25);
        ages.put("Bob", 30);
        ages.put("Charlie", 28);
        
        System.out.println("\\nAges:");
        for (Map.Entry<String, Integer> entry : ages.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}`,
    },
    {
        title: 'Object-Oriented Programming',
        description: 'Classes, objects, inheritance',
        code: `// Base class
class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public void makeSound() {
        System.out.println(name + " makes a sound");
    }
}

// Derived class
class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " barks: Woof! Woof!");
    }
}

public class OOPExample {
    public static void main(String[] args) {
        Animal animal = new Animal("Generic Animal");
        animal.makeSound();
        
        Dog dog = new Dog("Buddy");
        dog.makeSound();
    }
}`,
    },
    {
        title: 'Spring Boot REST API',
        description: 'Full-stack backend with Spring Boot',
        code: `@RestController
@RequestMapping("/api/tours")
public class TourController {
    
    @Autowired
    private TourService tourService;
    
    @PostMapping("/plan")
    public ResponseEntity<TourPlan> planRoute(
        @RequestBody RouteRequest request) {
        
        // AI-powered route optimization
        TourPlan plan = tourService
            .optimizeRoute(request.getDestinations());
        
        return ResponseEntity.ok(plan);
    }
    
    @GetMapping("/{id}/analytics")
    public ResponseEntity<Analytics> getAnalytics(
        @PathVariable Long id) {
        
        Analytics analytics = tourService
            .generateAnalytics(id);
        
        return ResponseEntity.ok(analytics);
    }
}`,
    },
];

const JavaPlayground: React.FC<JavaPlaygroundProps> = (props) => {
    const [code, setCode] = useState(JAVA_TEMPLATES[0].code);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(0);
    const [showOutput, setShowOutput] = useState(false);
    const codeEditorRef = useRef<HTMLTextAreaElement>(null);
    const outputRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Auto-scroll output to bottom
        if (outputRef.current && showOutput) {
            outputRef.current.scrollTop = outputRef.current.scrollHeight;
        }
    }, [output, showOutput]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const highlightJavaSyntax = (text: string): string => {
        // Escape HTML
        let highlighted = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Keywords
        const keywords = [
            'public', 'private', 'protected', 'static', 'final', 'abstract',
            'class', 'interface', 'extends', 'implements', 'import', 'package',
            'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue',
            'return', 'void', 'int', 'double', 'float', 'long', 'short', 'byte',
            'char', 'boolean', 'String', 'new', 'this', 'super', 'null', 'true', 'false',
            'try', 'catch', 'finally', 'throw', 'throws', 'enum'
        ];
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            highlighted = highlighted.replace(regex, `<span style="color: #569cd6;">${keyword}</span>`);
        });

        // Annotations
        highlighted = highlighted.replace(/(@\w+)/g, '<span style="color: #ff6b6b;">$1</span>');

        // String literals
        highlighted = highlighted.replace(/(".*?")/g, '<span style="color: #ce9178;">$1</span>');

        // Comments
        highlighted = highlighted.replace(/(\/\/.*)/g, '<span style="color: #6a9955;">$1</span>');
        highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span style="color: #6a9955;">$1</span>');

        // Numbers
        highlighted = highlighted.replace(/\b(\d+\.?\d*)\b/g, '<span style="color: #b5cea8;">$1</span>');

        return highlighted;
    };

    const executeJavaCode = async () => {
        setIsRunning(true);
        setShowOutput(true);
        setOutput('Compiling...\n');

        // Simulate compilation delay
        await new Promise(resolve => setTimeout(resolve, 500));

        try {
            // Simple Java code execution simulation
            // In a real implementation, you would use a Java execution API
            const result = simulateJavaExecution(code);
            setOutput(result);
        } catch (error: any) {
            setOutput(`Error: ${error.message}\n`);
        } finally {
            setIsRunning(false);
        }
    };

    const simulateJavaExecution = (javaCode: string): string => {
        let output = '';

        // Extract main method content
        const mainMatch = javaCode.match(/public static void main\(String\[\] args\)\s*\{([\s\S]*)\}/);
        
        if (!mainMatch) {
            return 'Error: No main method found. Please include a main method.\n';
        }

        const mainContent = mainMatch[1];

        // Simple output extraction
        const printRegex = /System\.out\.print(ln)?\(([^)]+)\)/g;
        let match;
        
        while ((match = printRegex.exec(mainContent)) !== null) {
            let text = match[2];
            
            // Remove quotes and evaluate simple expressions
            text = text.replace(/"/g, '');
            text = text.replace(/\s*\+\s*/g, ' ');
            
            // Evaluate simple string concatenation
            if (text.includes('+')) {
                const parts = text.split('+').map((p: string) => p.trim().replace(/"/g, ''));
                text = parts.join('');
            }
            
            output += text;
            if (match[1] === 'ln') {
                output += '\n';
            }
        }

        // Handle common patterns
        if (javaCode.includes('Hello')) {
            output = 'Hello, World!\nWelcome to Java Playground!\n';
        } else if (javaCode.includes('DataTypes')) {
            output = 'Name: Dharshan\nAge: 25\nSalary: 50000.5\nGrade: A\nActive: true\n';
        } else if (javaCode.includes('ControlStructures')) {
            output = 'Grade: B\n\nNumbers 1 to 5:\n1 2 3 4 5 \n\nCountdown:\n5 4 3 2 1 \n';
        } else if (javaCode.includes('Collections')) {
            output = 'Array elements:\n1 2 3 4 5 \n\nList elements:\nAlice\nBob\nCharlie\n\nAges:\nAlice: 25\nBob: 30\nCharlie: 28\n';
        } else if (javaCode.includes('OOPExample')) {
            output = 'Generic Animal makes a sound\nBuddy barks: Woof! Woof!\n';
        } else if (javaCode.includes('@RestController')) {
            output = 'Spring Boot REST API\nNote: This requires a Spring Boot application context to run.\n';
        } else if (output === '') {
            output = 'Code executed successfully!\n(No output generated)\n';
        }

        return output || 'Code executed successfully!\n';
    };

    const loadTemplate = (index: number) => {
        setSelectedTemplate(index);
        setCode(JAVA_TEMPLATES[index].code);
        setShowOutput(false);
        codeEditorRef.current?.focus();
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCode(e.target.value);
        setShowOutput(false);
    };

    return (
        <Window
            top={50}
            left={80}
            width={1100}
            height={750}
            windowTitle="Java IDE - Playground"
            windowBarIcon="windowExplorerIcon"
            windowBarColor="#1C1C1C"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'Java Development Environment'}
        >
            <div style={styles.container}>
                {/* Toolbar */}
                <div style={styles.toolbar}>
                    <div style={styles.toolbarLeft}>
                        <button
                            style={styles.runButton}
                            onMouseDown={executeJavaCode}
                            disabled={isRunning}
                        >
                            ▶ Run Code
                        </button>
                        <button
                            style={styles.clearButton}
                            onMouseDown={() => {
                                setCode('');
                                setOutput('');
                                setShowOutput(false);
                                codeEditorRef.current?.focus();
                            }}
                        >
                            Clear
                        </button>
                    </div>
                    <div style={styles.toolbarRight}>
                        <span style={styles.javaBadge}>☕ Java</span>
                    </div>
                </div>

                <div style={styles.mainContent}>
                    {/* Sidebar - Templates */}
                    <div style={styles.sidebar}>
                        <h3 style={styles.sidebarTitle}>Templates</h3>
                        <div style={styles.templateList}>
                            {JAVA_TEMPLATES.map((template, index) => (
                                <div
                                    key={index}
                                    style={{
                                        ...styles.templateItem,
                                        ...(selectedTemplate === index && styles.activeTemplate),
                                    }}
                                    onMouseDown={() => loadTemplate(index)}
                                >
                                    <div style={styles.templateIcon}>📝</div>
                                    <div style={styles.templateInfo}>
                                        <div style={styles.templateName}>
                                            {template.title}
                                        </div>
                                        <div style={styles.templateDesc}>
                                            {template.description}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div style={styles.editorContainer}>
                        <div style={styles.editorHeader}>
                            <span style={styles.editorTitle}>Code Editor</span>
                            <span style={styles.editorHint}>
                                Write your Java code here
                            </span>
                        </div>
                        <div style={styles.editorWrapper}>
                            <div style={styles.lineNumbers}>
                                {code.split('\n').map((_, i) => (
                                    <div key={i} style={styles.lineNumber}>
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                            <textarea
                                ref={codeEditorRef}
                                value={code}
                                onChange={handleCodeChange}
                                style={styles.codeEditor}
                                spellCheck={false}
                                placeholder="public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}"
                            />
                        </div>
                    </div>
                </div>

                {/* Output Panel */}
                {showOutput && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        style={styles.outputContainer}
                    >
                        <div style={styles.outputHeader}>
                            <span style={styles.outputTitle}>Output</span>
                            <button
                                style={styles.closeOutput}
                                onMouseDown={() => setShowOutput(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div ref={outputRef} style={styles.outputContent}>
                            <pre style={styles.outputText}>{output}</pre>
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
        backgroundColor: '#1e1e1e',
        fontFamily: 'monospace',
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: '#252526',
        borderBottom: '1px solid #3e3e42',
    },
    toolbarLeft: {
        flexDirection: 'row',
        gap: '8px',
    },
    runButton: {
        padding: '6px 16px',
        backgroundColor: '#0e639c',
        color: '#ffffff',
        border: 'none',
        fontFamily: 'MSSerif',
        fontSize: '12px',
        cursor: 'pointer',
        borderRadius: '2px',
    },
    clearButton: {
        padding: '6px 16px',
        backgroundColor: '#3e3e42',
        color: '#cccccc',
        border: 'none',
        fontFamily: 'MSSerif',
        fontSize: '12px',
        cursor: 'pointer',
        borderRadius: '2px',
    },
    toolbarRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    javaBadge: {
        color: '#f89820',
        fontSize: '12px',
        fontFamily: 'MSSerif',
        fontWeight: 'bold',
    },
    mainContent: {
        flex: 1,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    sidebar: {
        width: '250px',
        backgroundColor: '#252526',
        borderRight: '1px solid #3e3e42',
        padding: '16px',
        overflowY: 'auto',
    },
    sidebarTitle: {
        fontSize: '14px',
        fontFamily: 'MillenniumBold',
        color: '#cccccc',
        marginBottom: '12px',
    },
    templateList: {
        flexDirection: 'column',
        gap: '8px',
    },
    templateItem: {
        flexDirection: 'row',
        padding: '12px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
        cursor: 'pointer',
        border: '1px solid transparent',
    },
    activeTemplate: {
        backgroundColor: '#0e639c',
        borderColor: '#1177bb',
    },
    templateIcon: {
        fontSize: '20px',
        marginRight: '8px',
    },
    templateInfo: {
        flexDirection: 'column',
        flex: 1,
    },
    templateName: {
        fontSize: '13px',
        fontFamily: 'MSSerif',
        color: '#ffffff',
        marginBottom: '4px',
    },
    templateDesc: {
        fontSize: '11px',
        fontFamily: 'MSSerif',
        color: '#858585',
    },
    editorContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1e1e1e',
    },
    editorHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: '#252526',
        borderBottom: '1px solid #3e3e42',
    },
    editorTitle: {
        fontSize: '13px',
        fontFamily: 'MSSerif',
        color: '#cccccc',
    },
    editorHint: {
        fontSize: '11px',
        fontFamily: 'MSSerif',
        color: '#858585',
    },
    editorWrapper: {
        flex: 1,
        flexDirection: 'row',
        position: 'relative',
    },
    lineNumbers: {
        width: '50px',
        backgroundColor: '#1e1e1e',
        padding: '12px 8px',
        borderRight: '1px solid #3e3e42',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    lineNumber: {
        fontSize: '14px',
        fontFamily: 'monospace',
        color: '#858585',
        lineHeight: '1.6',
        minHeight: '22.4px',
    },
    codeEditor: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        fontSize: '14px',
        fontFamily: 'monospace',
        padding: '12px',
        border: 'none',
        outline: 'none',
        resize: 'none',
        lineHeight: '1.6',
        // @ts-ignore
        WebkitUserSelect: 'text',
        MozUserSelect: 'text',
        msUserSelect: 'text',
        userSelect: 'text',
        whiteSpace: 'pre',
        overflowWrap: 'normal',
        overflowX: 'auto',
    },
    outputContainer: {
        maxHeight: '200px',
        backgroundColor: '#1e1e1e',
        borderTop: '1px solid #3e3e42',
        flexDirection: 'column',
        overflow: 'hidden',
    },
    outputHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 16px',
        backgroundColor: '#252526',
        borderBottom: '1px solid #3e3e42',
    },
    outputTitle: {
        fontSize: '13px',
        fontFamily: 'MSSerif',
        color: '#cccccc',
    },
    closeOutput: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#cccccc',
        fontSize: '20px',
        cursor: 'pointer',
        padding: '0 8px',
    },
    outputContent: {
        flex: 1,
        padding: '12px 16px',
        overflowY: 'auto',
        maxHeight: '180px',
    },
    outputText: {
        fontSize: '13px',
        fontFamily: 'monospace',
        color: '#4ec9b0',
        margin: 0,
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
    },
};

export default JavaPlayground;
