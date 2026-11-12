import './App.css';
import Desktop from './components/os/Desktop';
import React from 'react';

class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean; error?: Error }
> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div
                    style={{
                        padding: '20px',
                        backgroundColor: '#ff0000',
                        color: '#fff',
                        height: '100vh',
                    }}
                >
                    <h1>Something went wrong</h1>
                    <p>{this.state.error?.message}</p>
                    <pre>{this.state.error?.stack}</pre>
                </div>
            );
        }

        return this.props.children;
    }
}

function App() {
    return (
        <ErrorBoundary>
        <div className="App">
            <Desktop />
        </div>
        </ErrorBoundary>
    );
}

export default App;
