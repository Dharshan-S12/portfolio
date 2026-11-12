import React from 'react';
import ResumeDownload from '../ResumeDownload';

export interface ClientWorksProps {}

const ClientWorks: React.FC<ClientWorksProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Client Works</h1>
            <h3>Freelance Projects</h3>
            <br />
            <p>
                Below are the professional projects I have delivered for clients,
                ranging from corporate websites to enterprise platforms.
            </p>
            <br />
            <ResumeDownload />
            <br />
            <div className="text-block">
                <h2>ISHRAE UAE</h2>
                <br />
                <p>
                    Professional association website for the ISHRAE UAE Sub Chapter, featuring organizational information, events, memberships, activities, and HVAC&R community resources.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://ishraeuae.com"
                        >
                            <p>
                                <b>[Live Site]</b> - ishraeuae.com
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>GLOBAL MEP TRAINING</h2>
                <br />
                <p>
                    Training platform for an MEP education academy, showcasing courses, training programs, instructors, schedules, and educational services.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://globalmeptraining.com"
                        >
                            <p>
                                <b>[Live Site]</b> - globalmeptraining.com
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>PERFECT WAY TRAVELS</h2>
                <br />
                <p>
                    Travel and tourism website for showcasing tour packages, destinations, travel services, and customer-oriented travel solutions.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://perfectwaytraveluae.com"
                        >
                            <p>
                                <b>[Live Site]</b> - perfectwaytraveluae.com
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="text-block">
                <h2>TIECONN ORGANIZATION</h2>
                <br />
                <p>
                    Corporate organization website designed to showcase services, projects, capabilities, and business information through a modern digital platform.
                </p>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://tieconn.in"
                        >
                            <p>
                                <b>[Live Site]</b> - tieconn.in
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <ResumeDownload />
        </div>
    );
};

export default ClientWorks;
