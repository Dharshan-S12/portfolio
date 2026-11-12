import React, { useState, useEffect } from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface AlgorithmVisualizerProps extends WindowAppProps {}

type AlgorithmCategory = 
    | 'sorting' 
    | 'pathfinding' 
    | 'cpu-scheduling' 
    | 'priority-queue' 
    | 'string-matching';

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = (props) => {
    const [category, setCategory] = useState<AlgorithmCategory>('sorting');
    const [algorithm, setAlgorithm] = useState<string>('bubble');
    const [isRunning, setIsRunning] = useState(false);
    const [array, setArray] = useState<number[]>([]);
    const [comparisons, setComparisons] = useState(0);
    const [swaps, setSwaps] = useState(0);
    
    // Pathfinding state
    const [grid, setGrid] = useState<number[][]>([]);
    const [path, setPath] = useState<[number, number][]>([]);
    const [visited, setVisited] = useState<[number, number][]>([]);
    
    // CPU Scheduling state
    const [processes, setProcesses] = useState<any[]>([]);
    const [ganttChart, setGanttChart] = useState<any[]>([]);
    
    // Priority Queue state
    const [heap, setHeap] = useState<number[]>([]);
    
    // String Matching state
    const [text, setText] = useState('');
    const [pattern, setPattern] = useState('');
    const [matchPositions, setMatchPositions] = useState<number[]>([]);

    useEffect(() => {
        if (category === 'sorting') {
            generateArray();
        } else if (category === 'pathfinding') {
            initializeGrid();
        } else if (category === 'cpu-scheduling') {
            initializeProcesses();
        } else if (category === 'priority-queue') {
            initializeHeap();
        } else if (category === 'string-matching') {
            setText('ABABCABABACABABAC');
            setPattern('ABABAC');
        }
    }, [category]);

    const generateArray = () => {
        const newArray = Array.from({ length: 15 }, () =>
            Math.floor(Math.random() * 100) + 10
        );
        setArray(newArray);
        setComparisons(0);
        setSwaps(0);
    };

    const initializeGrid = () => {
        const newGrid = Array(15).fill(null).map(() => Array(20).fill(0));
        // Add some walls
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 20; j++) {
                if (Math.random() < 0.25) {
                    newGrid[i][j] = 1; // Wall
                }
            }
        }
        newGrid[0][0] = 2; // Start
        newGrid[14][19] = 3; // End
        setGrid(newGrid);
        setPath([]);
        setVisited([]);
    };

    const initializeProcesses = () => {
        const newProcesses = [
            { id: 'P1', arrival: 0, burst: 5, priority: 3, color: '#ff6b6b' },
            { id: 'P2', arrival: 1, burst: 3, priority: 1, color: '#4ecdc4' },
            { id: 'P3', arrival: 2, burst: 8, priority: 2, color: '#45b7d1' },
            { id: 'P4', arrival: 3, burst: 2, priority: 4, color: '#96ceb4' },
        ];
        setProcesses(newProcesses);
        setGanttChart([]);
    };

    const initializeHeap = () => {
        const newHeap = [5, 3, 8, 1, 9, 2, 7];
        setHeap(newHeap);
    };

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    // Sorting Algorithms
    const bubbleSort = async () => {
        setIsRunning(true);
        setComparisons(0);
        setSwaps(0);
        let comps = 0;
        let swapCount = 0;
        const arr = [...array];
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                comps++;
                setComparisons(comps);
                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    swapCount++;
                    setSwaps(swapCount);
                    setArray([...arr]);
                    await sleep(150);
                }
            }
        }
        setIsRunning(false);
    };

    const quickSort = async () => {
        setIsRunning(true);
        setComparisons(0);
        setSwaps(0);
        let comps = 0;
        let swapCount = 0;
        const arr = [...array];

        const partition = async (arr: number[], low: number, high: number): Promise<number> => {
            const pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                comps++;
                setComparisons(comps);
                if (arr[j] < pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    swapCount++;
                    setSwaps(swapCount);
                    setArray([...arr]);
                    await sleep(100);
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            swapCount++;
            setSwaps(swapCount);
            setArray([...arr]);
            return i + 1;
        };

        const quickSortRecursive = async (arr: number[], low: number, high: number) => {
            if (low < high) {
                const pi = await partition(arr, low, high);
                await quickSortRecursive(arr, low, pi - 1);
                await quickSortRecursive(arr, pi + 1, high);
            }
        };

        await quickSortRecursive(arr, 0, arr.length - 1);
        setIsRunning(false);
    };

    const mergeSort = async () => {
        setIsRunning(true);
        setComparisons(0);
        setSwaps(0);
        let comps = 0;
        const arr = [...array];

        const merge = async (arr: number[], left: number, mid: number, right: number) => {
            const n1 = mid - left + 1;
            const n2 = right - mid;
            const L = arr.slice(left, mid + 1);
            const R = arr.slice(mid + 1, right + 1);
            let i = 0, j = 0, k = left;

            while (i < n1 && j < n2) {
                comps++;
                setComparisons(comps);
                if (L[i] <= R[j]) {
                    arr[k] = L[i];
                    i++;
                } else {
                    arr[k] = R[j];
                    j++;
                }
                k++;
                setArray([...arr]);
                await sleep(80);
            }

            while (i < n1) {
                arr[k] = L[i];
                i++;
                k++;
                setArray([...arr]);
                await sleep(50);
            }

            while (j < n2) {
                arr[k] = R[j];
                j++;
                k++;
                setArray([...arr]);
                await sleep(50);
            }
        };

        const mergeSortRecursive = async (arr: number[], left: number, right: number) => {
            if (left < right) {
                const mid = Math.floor((left + right) / 2);
                await mergeSortRecursive(arr, left, mid);
                await mergeSortRecursive(arr, mid + 1, right);
                await merge(arr, left, mid, right);
            }
        };

        await mergeSortRecursive(arr, 0, arr.length - 1);
        setIsRunning(false);
    };

    // Pathfinding Algorithms
    const runBFS = async () => {
        setIsRunning(true);
        setVisited([]);
        setPath([]);
        const newGrid = grid.map(row => [...row]);
        const queue: [number, number, [number, number][]][] = [[0, 0, [[0, 0]]]];
        const visitedSet = new Set<string>();
        visitedSet.add('0,0');
        const visitedList: [number, number][] = [[0, 0]];

        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

        while (queue.length > 0) {
            const [r, c, currentPath] = queue.shift()!;
            
            if (r === 14 && c === 19) {
                setPath(currentPath);
                setIsRunning(false);
                return;
            }

            for (const [dr, dc] of directions) {
                const nr = r + dr;
                const nc = c + dc;
                const key = `${nr},${nc}`;

                if (nr >= 0 && nr < 15 && nc >= 0 && nc < 20 && 
                    !visitedSet.has(key) && newGrid[nr][nc] !== 1) {
                    visitedSet.add(key);
                    visitedList.push([nr, nc]);
                    queue.push([nr, nc, [...currentPath, [nr, nc]]]);
                    setVisited([...visitedList]);
                    await sleep(50);
                }
            }
        }
        setIsRunning(false);
    };

    const runDFS = async () => {
        setIsRunning(true);
        setVisited([]);
        setPath([]);
        const visitedSet = new Set<string>();
        const path: [number, number][] = [];
        const visitedList: [number, number][] = [];

        const dfs = async (r: number, c: number): Promise<boolean> => {
            if (r < 0 || r >= 15 || c < 0 || c >= 20 || grid[r][c] === 1 || visitedSet.has(`${r},${c}`)) {
                return false;
            }

            visitedSet.add(`${r},${c}`);
            visitedList.push([r, c]);
            path.push([r, c]);
            setVisited([...visitedList]);
            setPath([...path]);
            await sleep(30);

            if (r === 14 && c === 19) {
                return true;
            }

            const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
            for (const [dr, dc] of directions) {
                if (await dfs(r + dr, c + dc)) {
                    return true;
                }
            }

            path.pop();
            setPath([...path]);
            return false;
        };

        await dfs(0, 0);
        setIsRunning(false);
    };

    // CPU Scheduling
    const runFCFS = async () => {
        setIsRunning(true);
        const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);
        const gantt: any[] = [];
        let currentTime = 0;

        for (const proc of sorted) {
            gantt.push({
                process: proc.id,
                start: currentTime,
                end: currentTime + proc.burst,
                color: proc.color,
            });
            currentTime += proc.burst;
            setGanttChart([...gantt]);
            await sleep(300);
        }
        setIsRunning(false);
    };

    const runSJF = async () => {
        setIsRunning(true);
        const sorted = [...processes].sort((a, b) => a.burst - b.burst);
        const gantt: any[] = [];
        let currentTime = 0;

        for (const proc of sorted) {
            gantt.push({
                process: proc.id,
                start: currentTime,
                end: currentTime + proc.burst,
                color: proc.color,
            });
            currentTime += proc.burst;
            setGanttChart([...gantt]);
            await sleep(300);
        }
        setIsRunning(false);
    };

    const runRoundRobin = async () => {
        setIsRunning(true);
        const timeQuantum = 2;
        const queue = [...processes];
        const gantt: any[] = [];
        let currentTime = 0;

        while (queue.length > 0) {
            const proc = queue.shift()!;
            const executeTime = Math.min(timeQuantum, proc.burst);
            
            gantt.push({
                process: proc.id,
                start: currentTime,
                end: currentTime + executeTime,
                color: proc.color,
            });
            currentTime += executeTime;
            
            if (proc.burst > executeTime) {
                queue.push({ ...proc, burst: proc.burst - executeTime });
            }
            
            setGanttChart([...gantt]);
            await sleep(200);
        }
        setIsRunning(false);
    };

    // Priority Queue - Heap Visualization
    const visualizeHeap = () => {
        const heapArray = [...heap];
        const levels = Math.ceil(Math.log2(heapArray.length + 1));
        return { heapArray, levels };
    };

    const extractMin = async () => {
        if (heap.length === 0) return;
        setIsRunning(true);
        const newHeap = [...heap];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const min = newHeap[0];
        newHeap[0] = newHeap[newHeap.length - 1];
        newHeap.pop();
        
        // Heapify down
        let i = 0;
        while (true) {
            let smallest = i;
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            
            if (left < newHeap.length && newHeap[left] < newHeap[smallest]) {
                smallest = left;
            }
            if (right < newHeap.length && newHeap[right] < newHeap[smallest]) {
                smallest = right;
            }
            
            if (smallest === i) break;
            
            [newHeap[i], newHeap[smallest]] = [newHeap[smallest], newHeap[i]];
            i = smallest;
            setHeap([...newHeap]);
            await sleep(200);
        }
        
        setHeap(newHeap);
        setIsRunning(false);
    };

    // String Matching
    const runKMP = async () => {
        setIsRunning(true);
        setMatchPositions([]);
        
        // Build LPS array
        const lps: number[] = [0];
        let len = 0;
        let i = 1;
        
        while (i < pattern.length) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len !== 0) {
                    len = lps[len - 1];
                } else {
                    lps[i] = 0;
                    i++;
                }
            }
        }

        // Search
        const matches: number[] = [];
        let j = 0;
        i = 0;

        while (i < text.length) {
            if (pattern[j] === text[i]) {
                i++;
                j++;
            }
            if (j === pattern.length) {
                matches.push(i - j);
                j = lps[j - 1];
            } else if (i < text.length && pattern[j] !== text[i]) {
                if (j !== 0) {
                    j = lps[j - 1];
                } else {
                    i++;
                }
            }
            setMatchPositions([...matches]);
            await sleep(100);
        }
        
        setIsRunning(false);
    };

    const handleRun = async () => {
        if (category === 'sorting') {
            if (algorithm === 'bubble') await bubbleSort();
            else if (algorithm === 'quick') await quickSort();
            else if (algorithm === 'merge') await mergeSort();
        } else if (category === 'pathfinding') {
            if (algorithm === 'bfs') await runBFS();
            else if (algorithm === 'dfs') await runDFS();
        } else if (category === 'cpu-scheduling') {
            if (algorithm === 'fcfs') await runFCFS();
            else if (algorithm === 'sjf') await runSJF();
            else if (algorithm === 'round-robin') await runRoundRobin();
        } else if (category === 'string-matching') {
            if (algorithm === 'kmp') await runKMP();
        }
    };

    const categories = [
        { id: 'sorting', name: 'Sorting', icon: '📊' },
        { id: 'pathfinding', name: 'Pathfinding', icon: '🗺️' },
        { id: 'cpu-scheduling', name: 'CPU Scheduling', icon: '⚙️' },
        { id: 'priority-queue', name: 'Priority Queue', icon: '📈' },
        { id: 'string-matching', name: 'String Matching', icon: '🔍' },
    ];

    const getAlgorithms = (cat: AlgorithmCategory) => {
        const algorithms: { [key in AlgorithmCategory]: { id: string; name: string }[] } = {
            'sorting': [
                { id: 'bubble', name: 'Bubble Sort' },
                { id: 'quick', name: 'Quick Sort' },
                { id: 'merge', name: 'Merge Sort' },
            ],
            'pathfinding': [
                { id: 'bfs', name: 'BFS' },
                { id: 'dfs', name: 'DFS' },
            ],
            'cpu-scheduling': [
                { id: 'fcfs', name: 'FCFS' },
                { id: 'sjf', name: 'SJF' },
                { id: 'round-robin', name: 'Round Robin' },
            ],
            'priority-queue': [
                { id: 'min-heap', name: 'Min-Heap' },
            ],
            'string-matching': [
                { id: 'kmp', name: 'KMP' },
            ],
        };
        return algorithms[cat] || [];
    };

    const getBarColor = (value: number): string => {
        const max = Math.max(...array, 1);
        const ratio = value / max;
        if (ratio > 0.8) return '#ff6b6b';
        if (ratio > 0.6) return '#4ecdc4';
        if (ratio > 0.4) return '#45b7d1';
        return '#96ceb4';
    };

    const getGridColor = (row: number, col: number): string => {
        const cell = grid[row]?.[col];
        if (cell === 2) return '#4ecdc4'; // Start
        if (cell === 3) return '#ff6b6b'; // End
        if (cell === 1) return '#333333'; // Wall
        if (path.some(([r, c]) => r === row && c === col)) return '#feca57'; // Path
        if (visited.some(([r, c]) => r === row && c === col)) return '#48dbfb'; // Visited
        return '#1e1e1e'; // Empty
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { heapArray, levels } = visualizeHeap();

    return (
        <Window
            top={50}
            left={80}
            width={1200}
            height={800}
            windowTitle="Algorithm Visualizer"
            windowBarIcon="algorithm"
            windowBarColor="#2d2d30"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'Interactive Algorithm Visualizations'}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2 style={styles.title}>🔥 Algorithm Visualizer</h2>
                    <div style={styles.badge}>5 Categories • Visual Animations</div>
                </div>

                <div style={styles.mainContent}>
                    {/* Sidebar */}
                    <div style={styles.sidebar}>
                        <h3 style={styles.sidebarTitle}>Categories</h3>
                        <div style={styles.categoryList}>
                            {categories.map((cat) => (
                                <div
                                    key={cat.id}
                                    style={{
                                        ...styles.categoryItem,
                                        ...(category === cat.id && styles.activeCategory),
                                    }}
                                    onMouseDown={() => {
                                        setCategory(cat.id as AlgorithmCategory);
                                        const algs = getAlgorithms(cat.id as AlgorithmCategory);
                                        if (algs.length > 0) setAlgorithm(algs[0].id);
                                    }}
                                >
                                    <span style={styles.categoryIcon}>{cat.icon}</span>
                                    <span style={styles.categoryName}>{cat.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Visualization Area */}
                    <div style={styles.content}>
                        <div style={styles.controls}>
                            <div style={styles.algorithmSelect}>
                                <select
                                    style={styles.select}
                                    value={algorithm}
                                    onChange={(e) => setAlgorithm(e.target.value)}
                                    disabled={isRunning}
                                >
                                    {getAlgorithms(category).map((algo) => (
                                        <option key={algo.id} value={algo.id}>
                                            {algo.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button
                                style={styles.runButton}
                                onMouseDown={handleRun}
                                disabled={isRunning}
                            >
                                {isRunning ? 'Running...' : '▶ Run'}
                            </button>
                            {(category === 'sorting' || category === 'pathfinding' || category === 'cpu-scheduling') && (
                                <button
                                    style={styles.resetButton}
                                    onMouseDown={() => {
                                        if (category === 'sorting') generateArray();
                                        else if (category === 'pathfinding') initializeGrid();
                                        else if (category === 'cpu-scheduling') initializeProcesses();
                                    }}
                                    disabled={isRunning}
                                >
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* Sorting Visualization */}
                        {category === 'sorting' && (
                            <div style={styles.visualization}>
                                <div style={styles.stats}>
                                    <div style={styles.stat}>
                                        <span style={styles.statLabel}>Comparisons:</span>
                                        <span style={styles.statValue}>{comparisons}</span>
                                    </div>
                                    <div style={styles.stat}>
                                        <span style={styles.statLabel}>Swaps:</span>
                                        <span style={styles.statValue}>{swaps}</span>
                                    </div>
                                </div>
                                <div style={styles.barChart}>
                                    {array.map((value, index) => (
                                        <motion.div
                                            key={index}
                                            style={{
                                                ...styles.bar,
                                                height: `${(value / Math.max(...array, 1)) * 100}%`,
                                                backgroundColor: getBarColor(value),
                                            }}
                                            initial={{ scaleY: 0 }}
                                            animate={{ scaleY: 1 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <span style={styles.barValue}>{value}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Pathfinding Visualization */}
                        {category === 'pathfinding' && (
                            <div style={styles.visualization}>
                                <div style={styles.gridContainer}>
                                    {Array(15).fill(0).map((_, row) => (
                                        <div key={row} style={styles.gridRow}>
                                            {Array(20).fill(0).map((_, col) => (
                                                <div
                                                    key={col}
                                                    style={{
                                                        ...styles.gridCell,
                                                        backgroundColor: getGridColor(row, col),
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    ))}
                                </div>
                                <div style={styles.legend}>
                                    <div style={styles.legendItem}>
                                        <div style={{...styles.legendColor, backgroundColor: '#4ecdc4'}} />
                                        <span>Start</span>
                                    </div>
                                    <div style={styles.legendItem}>
                                        <div style={{...styles.legendColor, backgroundColor: '#ff6b6b'}} />
                                        <span>End</span>
                                    </div>
                                    <div style={styles.legendItem}>
                                        <div style={{...styles.legendColor, backgroundColor: '#48dbfb'}} />
                                        <span>Visited</span>
                                    </div>
                                    <div style={styles.legendItem}>
                                        <div style={{...styles.legendColor, backgroundColor: '#feca57'}} />
                                        <span>Path</span>
                                    </div>
                                    <div style={styles.legendItem}>
                                        <div style={{...styles.legendColor, backgroundColor: '#333333'}} />
                                        <span>Wall</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CPU Scheduling Visualization */}
                        {category === 'cpu-scheduling' && (
                            <div style={styles.visualization}>
                                <div style={styles.ganttChart}>
                                    {ganttChart.map((item, index) => (
                                        <div key={index} style={styles.ganttItem}>
                                            <div style={styles.ganttBar}>
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(item.end - item.start) * 20}px` }}
                                                    style={{
                                                        ...styles.ganttBarFill,
                                                        backgroundColor: item.color,
                                                    }}
                                                />
                                            </div>
                                            <div style={styles.ganttLabel}>
                                                <span>{item.process}</span>
                                                <span>{item.start}-{item.end}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={styles.processList}>
                                    {processes.map((proc) => (
                                        <div key={proc.id} style={styles.processItem}>
                                            <div style={{...styles.processColor, backgroundColor: proc.color}} />
                                            <span>{proc.id}: Arrival={proc.arrival}, Burst={proc.burst}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Priority Queue Visualization */}
                        {category === 'priority-queue' && (
                            <div style={styles.visualization}>
                                <div style={styles.heapContainer}>
                                    {heapArray.map((value, index) => {
                                        const level = Math.floor(Math.log2(index + 1));
                                        const posInLevel = index - (Math.pow(2, level) - 1);
                                        const totalInLevel = Math.pow(2, level);
                                        const left = (posInLevel / totalInLevel) * 100;
                                        
                                        return (
                                            <motion.div
                                                key={index}
                                                style={{
                                                    ...styles.heapNode,
                                                    top: `${level * 80 + 20}px`,
                                                    left: `${left}%`,
                                                }}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                            >
                                                {value}
                                            </motion.div>
                                        );
                                    })}
                                </div>
                                <button
                                    style={styles.extractButton}
                                    onMouseDown={extractMin}
                                    disabled={isRunning || heap.length === 0}
                                >
                                    Extract Min
                                </button>
                            </div>
                        )}

                        {/* String Matching Visualization */}
                        {category === 'string-matching' && (
                            <div style={styles.visualization}>
                                <div style={styles.stringContainer}>
                                    <div style={styles.stringText}>
                                        {text.split('').map((char, index) => {
                                            const isMatch = matchPositions.some(pos => 
                                                index >= pos && index < pos + pattern.length
                                            );
                                            return (
                                                <span
                                                    key={index}
                                                    style={{
                                                        ...styles.stringChar,
                                                        backgroundColor: isMatch ? '#4ecdc4' : 'transparent',
                                                        color: isMatch ? '#1e1e1e' : '#ffffff',
                                                    }}
                                                >
                                                    {char}
                                                </span>
                                            );
                                        })}
                                    </div>
                                    <div style={styles.patternText}>
                                        Pattern: {pattern}
                                    </div>
                                    <div style={styles.matchInfo}>
                                        Matches found: {matchPositions.length}
                                        {matchPositions.length > 0 && ` at positions: ${matchPositions.join(', ')}`}
                                    </div>
                                </div>
                            </div>
                        )}
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
        backgroundColor: '#1e1e1e',
        padding: '20px',
        boxSizing: 'border-box',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '2px solid #3e3e42',
    },
    title: {
        fontSize: '24px',
        fontFamily: 'MillenniumBold',
        color: '#ffffff',
        margin: 0,
    },
    badge: {
        padding: '6px 12px',
        backgroundColor: '#0e639c',
        color: '#ffffff',
        fontSize: '12px',
        fontFamily: 'MSSerif',
        borderRadius: '4px',
    },
    mainContent: {
        flex: 1,
        flexDirection: 'row',
        gap: '20px',
        overflow: 'hidden',
    },
    sidebar: {
        width: '200px',
        backgroundColor: '#252526',
        borderRadius: '4px',
        padding: '16px',
        overflowY: 'auto',
    },
    sidebarTitle: {
        fontSize: '16px',
        fontFamily: 'MillenniumBold',
        color: '#ffffff',
        marginBottom: '12px',
    },
    categoryList: {
        flexDirection: 'column',
        gap: '8px',
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: '12px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
        cursor: 'pointer',
        border: '1px solid transparent',
    },
    activeCategory: {
        backgroundColor: '#0e639c',
        borderColor: '#1177bb',
    },
    categoryIcon: {
        fontSize: '20px',
        marginRight: '10px',
    },
    categoryName: {
        fontSize: '14px',
        fontFamily: 'MSSerif',
        color: '#ffffff',
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#252526',
        borderRadius: '4px',
        padding: '20px',
        overflow: 'hidden',
    },
    controls: {
        flexDirection: 'row',
        gap: '10px',
        marginBottom: '20px',
    },
    algorithmSelect: {
        flex: 1,
    },
    select: {
        width: '100%',
        padding: '8px 12px',
        backgroundColor: '#1e1e1e',
        color: '#ffffff',
        border: '1px solid #3e3e42',
        fontFamily: 'MSSerif',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '4px',
    },
    runButton: {
        padding: '8px 20px',
        backgroundColor: '#4ecdc4',
        color: '#1e1e1e',
        border: 'none',
        fontFamily: 'MillenniumBold',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '4px',
    },
    resetButton: {
        padding: '8px 20px',
        backgroundColor: '#3e3e42',
        color: '#ffffff',
        border: 'none',
        fontFamily: 'MSSerif',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '4px',
    },
    visualization: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'auto',
    },
    stats: {
        flexDirection: 'row',
        gap: '30px',
        marginBottom: '20px',
        padding: '12px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
    },
    stat: {
        flexDirection: 'column',
    },
    statLabel: {
        fontSize: '11px',
        fontFamily: 'MSSerif',
        color: '#cccccc',
        marginBottom: '4px',
    },
    statValue: {
        fontSize: '18px',
        fontFamily: 'MillenniumBold',
        color: '#4ecdc4',
    },
    barChart: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: '8px',
        padding: '20px 0',
        minHeight: '300px',
    },
    bar: {
        flex: 1,
        minWidth: '40px',
        position: 'relative',
        borderRadius: '4px 4px 0 0',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: '8px',
    },
    barValue: {
        fontSize: '10px',
        fontFamily: 'MSSerif',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gridContainer: {
        flexDirection: 'column',
        gap: '2px',
        padding: '20px',
    },
    gridRow: {
        flexDirection: 'row',
        gap: '2px',
    },
    gridCell: {
        width: '25px',
        height: '25px',
        borderRadius: '2px',
        border: '1px solid #3e3e42',
    },
    legend: {
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'center',
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '8px',
        fontSize: '12px',
        fontFamily: 'MSSerif',
        color: '#cccccc',
    },
    legendColor: {
        width: '20px',
        height: '20px',
        borderRadius: '2px',
    },
    ganttChart: {
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
    },
    ganttItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
    },
    ganttBar: {
        width: '200px',
        height: '30px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
        overflow: 'hidden',
    },
    ganttBarFill: {
        height: '100%',
        borderRadius: '4px',
    },
    ganttLabel: {
        flexDirection: 'column',
        fontSize: '12px',
        fontFamily: 'MSSerif',
        color: '#cccccc',
    },
    processList: {
        flexDirection: 'column',
        gap: '8px',
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
    },
    processItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        fontSize: '14px',
        fontFamily: 'MSSerif',
        color: '#cccccc',
    },
    processColor: {
        width: '20px',
        height: '20px',
        borderRadius: '2px',
    },
    heapContainer: {
        position: 'relative',
        minHeight: '400px',
        padding: '20px',
    },
    heapNode: {
        position: 'absolute',
        width: '50px',
        height: '50px',
        backgroundColor: '#4ecdc4',
        color: '#1e1e1e',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'MillenniumBold',
        fontSize: '16px',
        border: '2px solid #1e1e1e',
    },
    extractButton: {
        padding: '10px 20px',
        backgroundColor: '#4ecdc4',
        color: '#1e1e1e',
        border: 'none',
        fontFamily: 'MillenniumBold',
        fontSize: '14px',
        cursor: 'pointer',
        borderRadius: '4px',
        marginTop: '20px',
    },
    stringContainer: {
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
    },
    stringText: {
        fontSize: '24px',
        fontFamily: 'monospace',
        color: '#ffffff',
        lineHeight: '1.8',
        wordSpacing: '4px',
    },
    stringChar: {
        padding: '4px 6px',
        borderRadius: '4px',
        transition: 'all 0.3s',
    },
    patternText: {
        fontSize: '18px',
        fontFamily: 'MSSerif',
        color: '#4ecdc4',
        padding: '12px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
    },
    matchInfo: {
        fontSize: '14px',
        fontFamily: 'MSSerif',
        color: '#cccccc',
        padding: '12px',
        backgroundColor: '#1e1e1e',
        borderRadius: '4px',
    },
};

export default AlgorithmVisualizer;
