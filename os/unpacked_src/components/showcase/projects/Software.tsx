import React from 'react';
import ResumeDownload from '../ResumeDownload';

export interface SoftwareProjectsProps {}

const SoftwareProjects: React.FC<SoftwareProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Projects</h1>
            <h3>Software & AI</h3>
            <br />
            <p>
                Below are some of my favorite software projects I have worked on,
                focusing on AI-powered applications, system optimization, and full-stack development.
            </p>
            <br />
            <ResumeDownload />
            <br />
            
            <div className="text-block">
                <h2>GCC-Pulse – AI-Powered Hiring Ecosystem</h2>
                <br />
                <p>
                    Architected a full recruitment lifecycle platform (resume discovery → AI scoring → coding assessment → video interview) in 2,500+ lines of production TypeScript. Integrated Google Gemini 1.5 Flash for AI resume analysis with a custom GCC Readiness Score (0–100) and attrition risk prediction (Flight Risk Assessment).
                </p>
                <br />
                <p>
                    Implemented vector similarity search using PostgreSQL + pgvector (Supabase) and in-browser code assessment via Monaco Editor.
                </p>
                <br />
                <h3>Tech Stack:</h3>
                <p>Next.js 15, TypeScript, Google Gemini AI, Supabase (PostgreSQL + pgvector), Node.js, Jitsi</p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/dharshan-bahur/GCC-Pulse">
                            <p><b>[GitHub]</b> - GCC-Pulse</p>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="text-block">
                <h2>EndoCore-Workspace – Privacy-Preserving Workspace Monitoring</h2>
                <br />
                <p>
                    Architected a full-stack developer platform featuring an Electron Desktop Agent for real-time window tracking and a React 19 web dashboard with instant WebSocket presence sync.
                </p>
                <br />
                <p>
                    Engineered a 3-tier Edge Privacy Sanitizer (Regex scrubbing, SHA 256 caching, local Ollama SLMs) to sanitize raw developer telemetry on-device, preventing private data leakage.
                </p>
                <br />
                <h3>Tech Stack:</h3>
                <p>React 19, TypeScript, Electron, Express.js, Node.js, Gemini 2.5 Flash, Ollama, Redis, Prisma, SQLite, Socket.io, Tailwind CSS</p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/dharshan-bahur/EndoCore-Workspace">
                            <p><b>[GitHub]</b> - EndoCore-Workspace</p>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="text-block">
                <h2>AortaCore Engine – High-Performance System Optimization</h2>
                <br />
                <p>
                    Architected a full-stack desktop platform using Java 17, React, Electron, and Javalin for duplicate file detection, storage analytics, and real-time system performance monitoring via REST APIs.
                </p>
                <br />
                <p>
                    Implemented multi-threaded MD5-based file scanning, SQLite persistence, and secure Recycle Bin recovery to optimize large-scale file analysis and improve storage management.
                </p>
                <br />
                <h3>Tech Stack:</h3>
                <p>Java 17, React, Electron, TypeScript, SQLite, Javalin, Tailwind CSS, REST APIs</p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/dharshan-bahur/AortaCore-Engine">
                            <p><b>[GitHub]</b> - AortaCore Engine</p>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="text-block">
                <h2>FleetFlow – AI-Powered Fleet Management Platform</h2>
                <br />
                <p>
                    Built a responsive fleet management application for vehicle tracking, trip planning, expense management, and performance analytics. Integrated Google AI with Genkit for intelligent trip cost estimation and automated expense extraction from receipts and invoices.
                </p>
                <br />
                <h3>Tech Stack:</h3>
                <p>Next.js 15, TypeScript, React, Tailwind CSS, ShadCN UI, Genkit, Google AI, Node.js, Recharts</p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/dharshan-bahur/FLEET-CORE">
                            <p><b>[GitHub]</b> - FleetFlow Repository</p>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="text-block">
                <h2>NeoThink-TourJet – AI Tour Management Platform</h2>
                <br />
                <p>
                    Designed and deployed a full-stack AI platform handling trip planning, member management, receipt scanning, and route optimization for organizers and travelers. Built dual-database architecture (Firebase for real-time data, MongoDB for structured history) with RESTful API routes and comprehensive documentation (8+ docs).
                </p>
                <br />
                <h3>Tech Stack:</h3>
                <p>Next.js 15, TypeScript, React, Genkit, Google AI, Firebase, MongoDB, Leaflet, Recharts</p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/dharshan-bahur/TourJet-newVersion">
                            <p><b>[GitHub]</b> - TourJet Repository</p>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="text-block">
                <h2>ProTube – AI-Powered Safe Video Streaming Platform</h2>
                <br />
                <p>
                    Developed a moderated video platform with role-based access control, parental controls, AI-powered semantic search, and multi-tier content approval workflows.
                </p>
                <br />
                <p>
                    Built REST APIs for authentication, video moderation, reporting, watch history, and recommendations using JWT.
                </p>
                <br />
                <h3>Tech Stack:</h3>
                <p>Node.js, Express.js, MongoDB, React.js, Tailwind CSS, JWT, NLP, Vite</p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/dharshan-bahur/ProTube">
                            <p><b>[GitHub]</b> - ProTube</p>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="text-block">
                <h2>E-Commerce Platform – Spring Boot + React</h2>
                <br />
                <p>
                    Built a full-stack e-commerce application with a Spring Boot backend (MVC architecture, REST APIs, MySQL with JDBC) and a React + Tailwind CSS frontend.
                </p>
                <br />
                <p>
                    Applied OOP design patterns (Repository pattern, Service layer separation) for scalable, testable backend code.
                </p>
                <br />
                <h3>Tech Stack:</h3>
                <p>Java, Spring Boot, MySQL, React, JavaScript, Docker</p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/dharshan-bahur/ecommerce-spring">
                            <p><b>[GitHub]</b> - E-Commerce Platform</p>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="text-block">
                <h2>Pocket Doctor – AI Medication Management App</h2>
                <br />
                <p>
                    Developed a v1 prototype (React + Vite) and scaled to a v2 production app (Next.js 15 + MongoDB) with persistent medication scheduling, adherence tracking, and an AI chatbot.
                </p>
                <br />
                <p>
                    Implemented RESTful APIs with a seeding pipeline and deployed on Firebase App Hosting.
                </p>
                <br />
                <h3>Tech Stack:</h3>
                <p>Next.js 15, TypeScript, React, Genkit, Google AI, MongoDB, Recharts</p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a rel="noreferrer" target="_blank" href="https://github.com/dharshan-bahur/pocket-doctor">
                            <p><b>[GitHub]</b> - Pocket Doctor Repository</p>
                        </a>
                    </li>
                </ul>
            </div>

            <ResumeDownload />
        </div>
    );
};

export default SoftwareProjects;
