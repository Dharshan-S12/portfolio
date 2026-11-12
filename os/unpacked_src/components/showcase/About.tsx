import React from 'react';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';

export interface AboutProps {}

const About: React.FC<AboutProps> = () => {
    return (
        <div className="site-page-content">
            <h1 style={{ marginLeft: -16 }}>About Me</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, margin: '16px 0' }}>
                <img
                    src="/developer_photo.jpg"
                    style={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '3px solid #0a66c2',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    }}
                    alt="Developer Photo"
                />
                <div>
                    <h3 style={{ margin: 0, fontSize: 22 }}>Dharshan S</h3>
                    <p style={{ margin: '4px 0', color: '#555', fontWeight: 'bold' }}>
                        AI Engineer · Data Scientist · Python Developer
                    </p>
                </div>
            </div>
            <br />

            <div className="text-block">
                <p>
                    📍 Coimbatore, Tamil Nadu, India | 📧{' '}
                    <a href="mailto:dharshan.aidev@gmail.com">
                        dharshan.aidev@gmail.com
                    </a>
                </p>
                <p>
                    🔗{' '}
                    <a
                        href="https://techbit-22.web.app/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        techbit-22.web.app
                    </a>{' '}
                    | 🔗{' '}
                    <a
                        href="https://github.com/Dharshan-S12"
                        target="_blank"
                        rel="noreferrer"
                    >
                        github.com/Dharshan-S12
                    </a>{' '}
                    | 🔗{' '}
                    <a
                        href="https://github.com/Dharshan-S12/F1-Simulator"
                        target="_blank"
                        rel="noreferrer"
                    >
                        F1 Simulator
                    </a>
                </p>
                <br />
                <p>
                    I am an AI Engineer specializing in Agentic AI, multi-agent systems,
                    LLM/RAG pipelines, synthetic data generation, and full-stack Python
                    backend development. My work focuses on building local-first,
                    privacy-preserving AI solutions with deterministic workflows and human approval gates.
                </p>
            </div>

            <ResumeDownload />

            {/* Education */}
            <div className="text-block">
                <h3>Education</h3>
                <br />
                <p>
                    <b>B.Tech in Artificial Intelligence and Data Science</b>
                    <br />
                    Sri Krishna College of Engineering and Technology (SKCET), Coimbatore, Tamil Nadu
                    <br />
                    2024–2028
                </p>
            </div>

            {/* Technical Skills */}
            <div className="text-block">
                <h3>Technical Skills</h3>
                <br />
                <p>
                    <b>Programming Languages:</b> Python, SQL, R, TypeScript, C++, Java
                    <br />
                    <b>Agentic AI &amp; GenAI:</b> AutoGen, CrewAI, LangGraph, Tool-use agents, Multi-agent pipelines, LangChain, LlamaIndex, Ollama, Prompt Engineering, RAG, Hybrid BM25 + Dense Retrieval
                    <br />
                    <b>Machine Learning &amp; Deep Learning:</b> TensorFlow, PyTorch, Keras, Scikit-learn, XGBoost, OpenCV, Hugging Face Transformers, SDV, CTGAN, SciPy, NumPy, Pandas
                    <br />
                    <b>Backend &amp; Fullstack:</b> FastAPI, Spring Boot, PostgreSQL, React, Tailwind CSS, Flutter, Next.js, Node.js, MongoDB
                    <br />
                    <b>Cloud, Deployment &amp; MLOps:</b> Google Cloud AI, Azure ML, Docker, Kubernetes, MLflow, Git, GitHub, Streamlit
                </p>
            </div>

            {/* Major Projects */}
            <div className="text-block">
                <h3>Principal AI Projects</h3>
                <br />
                <p>
                    <b>1. Sovereign On-Premise Agentic AI Workbench (SIH-26117)</b>
                    <br />
                    <b>Tech Stack:</b> Python, FastAPI, React 19, TypeScript, Ollama, Qwen2.5, Qwen2.5-VL, PostgreSQL, SciPy
                    <br />
                    • Developed an air-gapped AI workbench for industrial and refinery environments.
                    <br />
                    • Implemented a confidence-scored intent router, 3-model disagreement ensemble, and 5-stage document workflow (extractor → rule engine → compliance → drafter → verifier).
                    <br />
                    • Built vision-model OCR, equipment knowledge graph, failure forecasting, long-term memory, and hybrid BM25 + dense retrieval.
                </p>
                <br />
                <p>
                    <b>2. GastroSense – Synthetic Data for Early Gastric Cancer Prediction</b>
                    <br />
                    <b>Tech Stack:</b> Python, SDV, Gaussian Copula, Bayesian Networks, CTGAN, Scikit-learn, XGBoost
                    <br />
                    • Generated 100,000 synthetic patient records for gastric cancer stage prediction with an 18-feature biomarker pipeline.
                    <br />
                    • Designed constraint engine integrating literature parameters, Gaussian Copula seeding, and CTGAN refinement for sweat biosensors.
                </p>
                <br />
                <p>
                    <b>3. Plant Disease Prediction Using Deep Learning</b>
                    <br />
                    <b>Tech Stack:</b> Python, TensorFlow, ResNet-50 CNN, OpenCV, Streamlit, PlantVillage
                    <br />
                    • Trained ResNet-50 CNN to classify 38+ plant diseases from leaf images with 95%+ accuracy.
                    <br />
                    • Deployed interactive Streamlit application for real-time agricultural diagnosis.
                </p>
                <br />
                <p>
                    <b>4. F1 Simulator</b>
                    <br />
                    <b>Tech Stack:</b> Unity, C#, 3D Physics Simulation
                    <br />
                    • Built physics-accurate Formula 1 racing simulation featuring telemetry, aerodynamics, and dynamic vehicle handling.
                </p>
                <br />
                <p>
                    <b>5. FarmBeats &amp; Smart Irrigation</b>
                    <br />
                    <b>Tech Stack:</b> Python, LoRaWAN, Sensors (Soil Moisture, Weather, pH), OpenCV, Fertigation
                    <br />
                    • Architected sensor-driven smart irrigation hardware system with multi-zone watering and solar-powered central monitoring.
                </p>
            </div>

            {/* Hackathons & Competitions */}
            <div className="text-block">
                <h3>Competitions &amp; Hackathons</h3>
                <br />
                <p>
                    • <b>NVIDIA India Agentic AI Open Hackathon 2026:</b> Selected Track C: Synthetic Data Generation (SDG) – Medical Multiverse counterfactual branching twins.
                    <br />
                    • <b>ML Challenge / ASTRA MAX:</b> Entity resolution V1–V5 (Team Paradoxical, Score: 0.758).
                    <br />
                    • <b>Winner, College Codathon</b>
                    <br />
                    • <b>StrateClause AI:</b> Intelligent Contract Negotiator (CDSC Hackathon).
                    <br />
                    • <b>UYIR Road Safety Hackathon 2025:</b> AI-assisted traffic safety analytics.
                </p>
            </div>

            {/* Certifications */}
            <div className="text-block">
                <h3>Certifications</h3>
                <br />
                <p>
                    • Google AI Essentials – Google
                    <br />
                    • Prompt Engineering for Generative AI – Google
                    <br />
                    • Machine Learning – Google (Coursera)
                    <br />
                    • Data Science Fundamentals – Microsoft
                    <br />
                    • Data Analytics – Microsoft
                    <br />
                    • Python for Beginners – Microsoft
                </p>
            </div>
        </div>
    );
};

export default About;
