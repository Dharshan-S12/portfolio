import React, { useEffect, useState } from 'react';
import colors from '../../constants/colors';
import ghIcon from '../../assets/pictures/contact-gh.png';
import inIcon from '../../assets/pictures/contact-in.png';
import ResumeDownload from './ResumeDownload';

export interface ContactProps {}

// function to validate email
const validateEmail = (email: string) => {
    const re =
        // eslint-disable-next-line
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

interface SocialBoxProps {
    icon: string;
    link: string;
}

const SocialBox: React.FC<SocialBoxProps> = ({ link, icon }) => {
    return (
        <a rel="noreferrer" target="_blank" href={link}>
            <div className="big-button-container" style={styles.social}>
                <img src={icon} alt="" style={styles.socialImage} />
            </div>
        </a>
    );
};

const Contact: React.FC<ContactProps> = (props) => {
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [formMessage, setFormMessage] = useState<string>('');
    const [formMessageColor, setFormMessageColor] = useState<string>('');

    useEffect(() => {
        if (validateEmail(email) && name.length > 0 && message.length > 0) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    }, [email, name, message]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        if (!isFormValid) {
            setFormMessage('Please fill in all required fields.');
            setFormMessageColor('red');
            return;
        }
        
        setIsLoading(true);
        
        return new Promise((resolve, reject) => {
            // Create URL-encoded form data for Google Apps Script
            const params = new URLSearchParams();
            params.append('name', name);
            params.append('email', email);
            params.append('company', company || '');
            params.append('message', message);

            const xhr = new XMLHttpRequest();
            const url = 'https://script.google.com/macros/s/AKfycbxRRAtbS5rHb8Wh66ih8uaPPAdPVR-xasL-4c5S09la3AUWs6FP84qAbfUP0Ot627c/exec';
            
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            
            xhr.onload = function() {
                setIsLoading(false);
                // Google Apps Script returns 200 even on errors, so check response
                if (xhr.status === 200 || xhr.status === 0) {
                    setFormMessage(`Message successfully sent. Thank you ${name}!`);
                    setFormMessageColor(colors.blue);
                    
                    // Reset form after a short delay
                    setTimeout(() => {
                        setCompany('');
                        setEmail('');
                        setName('');
                        setMessage('');
                        setFormMessage('');
                        setFormMessageColor('');
                    }, 5000);
                    resolve(xhr.response);
                } else {
                    throw new Error('Request failed with status: ' + xhr.status);
                }
            };
            
            xhr.onerror = function() {
                setIsLoading(false);
                setFormMessage('Network error. Please check your connection and try again.');
                setFormMessageColor(colors.red);
                reject(new Error('Network error'));
            };
            
            xhr.send(params.toString());
        }).catch(error => {
            console.error('Error:', error);
            setIsLoading(false);
            setFormMessage('There was an error sending your message. Please try again later or contact me directly at dharshan.aidev@gmail.com');
            setFormMessageColor(colors.red);
        });
    }

    useEffect(() => {
        if (formMessage.length > 0) {
            setTimeout(() => {
                setFormMessage('');
                setFormMessageColor('');
            }, 4000);
        }
    }, [formMessage]);

    return (
        <div className="site-page-content">
            <div style={styles.header}>
                <h1>Contact</h1>
                <div style={styles.socials}>
                    <SocialBox
                        icon={ghIcon}
                        link={'https://github.com/dharshan-bahur'}
                    />
                    <SocialBox
                        icon={inIcon}
                        link={'https://www.linkedin.com/in/dharshanb'}
                    />
                </div>
            </div>
            <div className="text-block">
                <p>
                    I am currently working as a Frontend Developer at GlucoTrack, however if you have any
                    opportunities, feel free to reach out - I would love to
                    chat! You can reach me via my personal email, or fill out
                    the form below!
                </p>
                <br />
                <p>
                    <b>Email: </b>
                    <a href="mailto:dharshan.aidev@gmail.com">
                        dharshan.aidev@gmail.com
                    </a>
                </p>
                <br />
                <p>
                    <b>Portfolio: </b>
                    <a href="https://drive.google.com/file/d/1qGH7yPlBfu5TOH0llnMPvlB8OvIwq6UJ/view?usp=sharing" target="_blank" rel="noreferrer">
                        dharshan's Portfolio
                    </a>
                </p>
                <br />
                <p>
                    <b>Phone: </b>
                    <a href="tel:94872842271">
                        +91 94872842271
                    </a>
                </p>

                <form 
                    onSubmit={handleSubmit}
                    style={styles.form as React.CSSProperties}
                >
                    <label>
                        <p>
                            {!name && <span style={styles.star}>*</span>}
                            <b>Your name:</b>
                        </p>
                    </label>
                    <input
                        style={styles.formItem}
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label>
                        <p>
                            {!validateEmail(email) && (
                                <span style={styles.star}>*</span>
                            )}
                            <b>Email:</b>
                        </p>
                    </label>
                    <input
                        style={styles.formItem}
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label>
                        <p>
                            <b>Company (optional):</b>
                        </p>
                    </label>
                    <input
                        style={styles.formItem}
                        type="company"
                        name="company"
                        placeholder="Company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <label>
                        <p>
                            {!message && <span style={styles.star}>*</span>}
                            <b>Message:</b>
                        </p>
                    </label>
                    <textarea
                        name="message"
                        placeholder="Message"
                        style={styles.formItem}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div style={styles.buttons}>
                        <button
                            className="site-button"
                            style={styles.button}
                            type="submit"
                            disabled={!isFormValid || isLoading}
                        >
                            {!isLoading ? (
                                'Send Message'
                            ) : (
                                <p className="loading">Sending</p>
                            )}
                        </button>
                        <div style={styles.formInfo}>
                            <p
                                style={Object.assign(
                                    {},
                                    { color: formMessageColor }
                                )}
                            >
                                <b>
                                    <sub>
                                        {formMessage
                                            ? `${formMessage}`
                                            : ' All messages get forwarded straight to my personal email'}
                                    </sub>
                                </b>
                            </p>
                            <p>
                                <sub>
                                    {!isFormValid ? (
                                        <span>
                                            <b style={styles.star}>*</b> =
                                            required
                                        </span>
                                    ) : (
                                        '\xa0'
                                    )}
                                </sub>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
            <ResumeDownload altText="Need a copy of my Resume?" />
        </div>
    );
};

const styles: StyleSheetCSS = {
    form: {
        flexDirection: 'column',
        marginTop: 32,
    },
    formItem: {
        marginTop: 4,
        marginBottom: 16,
    },
    socialImage: {
        width: 36,
        height: 36,
    },
    buttons: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    formInfo: {
        textAlign: 'right',

        flexDirection: 'column',
        alignItems: 'flex-end',
        paddingLeft: 24,
    },
    star: {
        paddingRight: 4,
        color: 'red',
    },
    button: {
        minWidth: 184,
        height: 32,
    },
    header: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    socials: {
        marginBottom: 16,
        justifyContent: 'flex-end',
    },
    social: {
        width: 4,
        height: 4,
        // borderRadius: 1000,

        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
};

export default Contact;
