import React from 'react';
import ResumeDownload from '../ResumeDownload';

export interface ArtProjectsProps {}

const ArtProjects: React.FC<ArtProjectsProps> = (props) => {
    return (
        <div className="site-page-content">
            <h1>Extra</h1>
            <h3>Freelance Projects</h3>
            <br />
            <p>
                Below are freelance projects I've completed for real clients —
                full website development, logo design, animations, and branding.
            </p>
            <br />
            <ResumeDownload />
            <br />
            <div className="text-block">
                <h2>Tieconn – Corporate Website</h2>
                <br />
                <p>
                    Tieconn is a complete website I designed and developed from
                    scratch as a freelance project. I handled everything
                    end-to-end — website development, logo design, animations,
                    and all visual design elements. The site showcases the
                    brand's identity with polished UI, smooth animations, and a
                    fully responsive layout.
                </p>
                <br />
                <h3>What I Did:</h3>
                <ul>
                    <li>Full website design &amp; development</li>
                    <li>Logo design &amp; branding</li>
                    <li>Animations &amp; interactive elements</li>
                    <li>Responsive layout for all devices</li>
                </ul>
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
            <div className="text-block">
                <h2>Perfect Way Travels – Travel Agency Website</h2>
                <br />
                <p>
                    Perfect Way Travels is a UAE-based travel agency for which I
                    built the entire website and designed the logo. The site
                    features a clean, professional design tailored to the travel
                    industry, with service listings, booking information, and
                    strong brand presentation. I delivered the complete package —
                    from logo creation to a fully functional, live website.
                </p>
                <br />
                <h3>What I Did:</h3>
                <ul>
                    <li>Full website design &amp; development</li>
                    <li>Logo design &amp; branding</li>
                    <li>Service pages &amp; travel content layout</li>
                    <li>Responsive design for all devices</li>
                </ul>
                <br />
                <h3>Links:</h3>
                <ul>
                    <li>
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://perfectwaytravelsuae.com"
                        >
                            <p>
                                <b>[Live Site]</b> - perfectwaytravelsuae.com
                            </p>
                        </a>
                    </li>
                </ul>
            </div>
            <ResumeDownload />
        </div>
    );
};

export default ArtProjects;
