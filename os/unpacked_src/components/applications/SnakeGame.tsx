import React, { useState, useEffect, useRef, useCallback } from 'react';
import Window from '../os/Window';
// import { motion } from 'framer-motion';

export interface SnakeGameProps extends WindowAppProps {}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE: Position[] = [
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
];

const SnakeGame: React.FC<SnakeGameProps> = (props) => {
    const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE);
    const [food, setFood] = useState<Position>({ x: 15, y: 15 });
    const [direction, setDirection] = useState<Direction>('UP');
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const directionRef = useRef<Direction>('UP');

    const generateFood = useCallback((): Position => {
        return {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };
    }, []);

    const checkCollision = useCallback(
        (head: Position): boolean => {
            // Wall collision
            if (
                head.x < 0 ||
                head.x >= GRID_SIZE ||
                head.y < 0 ||
                head.y >= GRID_SIZE
            ) {
                return true;
            }
            // Self collision
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === head.x && snake[i].y === head.y) {
                    return true;
                }
            }
            return false;
        },
        [snake]
    );

    const moveSnake = useCallback(() => {
        if (gameOver || isPaused) return;

        setSnake((prevSnake) => {
            const head = { ...prevSnake[0] };
            const dir = directionRef.current;

            switch (dir) {
                case 'UP':
                    head.y -= 1;
                    break;
                case 'DOWN':
                    head.y += 1;
                    break;
                case 'LEFT':
                    head.x -= 1;
                    break;
                case 'RIGHT':
                    head.x += 1;
                    break;
            }

            if (checkCollision(head)) {
                setGameOver(true);
                return prevSnake;
            }

            const newSnake = [head, ...prevSnake];

            // Check if food eaten
            if (head.x === food.x && head.y === food.y) {
                setScore((prev) => prev + 10);
                setFood(generateFood());
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [food, gameOver, isPaused, checkCollision, generateFood]);

    useEffect(() => {
        const interval = setInterval(moveSnake, 150);
        return () => clearInterval(interval);
    }, [moveSnake]);

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (gameOver) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (directionRef.current !== 'DOWN')
                        setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (directionRef.current !== 'UP')
                        setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (directionRef.current !== 'RIGHT')
                        setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (directionRef.current !== 'LEFT')
                        setDirection('RIGHT');
                    break;
                case ' ':
                    e.preventDefault();
                    setIsPaused((prev) => !prev);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [gameOver]);

    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setFood(generateFood());
        setDirection('UP');
        setGameOver(false);
        setScore(0);
        setIsPaused(false);
    };

    return (
        <Window
            top={50}
            left={100}
            width={500}
            height={550}
            windowTitle="Snake.exe"
            windowBarIcon="windowGameIcon"
            windowBarColor="#1C1C1C"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'Use Arrow Keys to Play | Space to Pause'}
        >
            <div style={styles.container}>
                <div style={styles.header}>
                    <div style={styles.score}>
                        <span style={styles.scoreLabel}>Score:</span>
                        <span style={styles.scoreValue}>{score}</span>
                    </div>
                    <div style={styles.controls}>
                        {gameOver ? (
                            <button
                                style={styles.button}
                                onMouseDown={resetGame}
                            >
                                🔄 Restart
                            </button>
                        ) : (
                            <button
                                style={styles.button}
                                onMouseDown={() => setIsPaused(!isPaused)}
                            >
                                {isPaused ? '▶ Resume' : '⏸ Pause'}
                            </button>
                        )}
                    </div>
                </div>
                <div style={styles.gameArea}>
                    {gameOver ? (
                        <div style={styles.gameOver}>
                            <h2 style={styles.gameOverText}>Game Over!</h2>
                            <p style={styles.finalScore}>Final Score: {score}</p>
                            <button
                                style={styles.restartButton}
                                onMouseDown={resetGame}
                            >
                                Play Again
                            </button>
                        </div>
                    ) : (
                        <div style={styles.grid}>
                            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map(
                                (_, index) => {
                                    const x = index % GRID_SIZE;
                                    const y = Math.floor(index / GRID_SIZE);
                                    const isSnakeHead =
                                        snake[0].x === x && snake[0].y === y;
                                    const isSnakeBody = snake.some(
                                        (segment, idx) =>
                                            idx > 0 &&
                                            segment.x === x &&
                                            segment.y === y
                                    );
                                    const isFood = food.x === x && food.y === y;

                                    return (
                                        <div
                                            key={index}
                                            style={{
                                                ...styles.cell,
                                                backgroundColor: isSnakeHead
                                                    ? '#4ecdc4'
                                                    : isSnakeBody
                                                    ? '#45b7d1'
                                                    : isFood
                                                    ? '#ff6b6b'
                                                    : '#1a1a1a',
                                            }}
                                        />
                                    );
                                }
                            )}
                        </div>
                    )}
                </div>
                {!gameOver && (
                    <div style={styles.instructions}>
                        <p style={styles.instructionText}>
                            Use Arrow Keys to move | Space to pause
                        </p>
                    </div>
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
        padding: 16,
        boxSizing: 'border-box',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: '12px',
        backgroundColor: '#1a1a1a',
        borderRadius: 4,
    },
    score: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    scoreLabel: {
        fontSize: 14,
        fontFamily: 'MSSerif',
        color: '#ffffff',
    },
    scoreValue: {
        fontSize: 20,
        fontFamily: 'MillenniumBold',
        color: '#4ecdc4',
    },
    controls: {
        flexDirection: 'row',
    },
    button: {
        padding: '6px 12px',
        backgroundColor: '#0e639c',
        color: '#ffffff',
        border: 'none',
        fontFamily: 'MSSerif',
        fontSize: 12,
        cursor: 'pointer',
        borderRadius: 4,
    },
    gameArea: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        borderRadius: 4,
        border: '2px solid #333',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
        gap: 1,
    },
    cell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        borderRadius: 2,
    },
    gameOver: {
        flexDirection: 'column',
        alignItems: 'center',
        color: '#ffffff',
    },
    gameOverText: {
        fontSize: 32,
        fontFamily: 'MillenniumBold',
        margin: 0,
        marginBottom: 16,
        color: '#ff6b6b',
    },
    finalScore: {
        fontSize: 18,
        fontFamily: 'MSSerif',
        marginBottom: 20,
    },
    restartButton: {
        padding: '10px 20px',
        backgroundColor: '#4ecdc4',
        color: '#000000',
        border: 'none',
        fontFamily: 'MillenniumBold',
        fontSize: 14,
        cursor: 'pointer',
        borderRadius: 4,
    },
    instructions: {
        marginTop: 12,
        textAlign: 'center',
    },
    instructionText: {
        fontSize: 11,
        fontFamily: 'MSSerif',
        color: '#888',
        margin: 0,
    },
};

export default SnakeGame;

