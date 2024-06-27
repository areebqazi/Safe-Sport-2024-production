import React, { useContext } from 'react';
import './Footer.css';
import englishLogo from '../assets/logos/safesportlogo.png';
import frenchLogo from '../assets/logos/safesportlogoFrench.png';
import { LanguageContext } from '../LanguageContext';
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Avenir:wght@100;700&display=swap"></link>

function Footer() {
    const { language } = useContext(LanguageContext);

    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Left Section (Logos) */}
                <div className="footer-logos">
                    <a href="https://www.swimming.ca/en/" target="_blank" rel="noopener noreferrer" className="logo-link">
                        <img className='swim-voll' src={require('../assets/logos/Swim_Canada_Logo.png')} alt="Logo 1" />
                    </a>
                    <div className="vertical-line"></div>   
                    <a href="https://athletics.ca/" target="_blank" rel="noopener noreferrer" className="logo-link">
                        <img className='athlCan' src={require('../assets/logos/Athletics_Canada_Logo.png')} alt="Logo 2" />
                    </a>
                    <div className="vertical-line"></div>
                    <a href="https://volleyball.ca/" target="_blank" rel="noopener noreferrer" className="logo-link">
                        <img className='swim-voll' src={require('../assets/logos/Volleyball_Canada_Logo.png')} alt="Logo 3" />
                    </a>
                </div>

                {/* Center Section (Main Logo) */}
                <div className="footer-logo">
                    {/* <img src={require('../assets/logos/safesportlogo.png')} alt="Main Logo" /> */}
                    <img 
                    src={language === 'english' ? englishLogo : frenchLogo} 
                    className="logo" 
                    alt="Main Logo" 
                />
                </div>

                {/* Right Section (Email and Phone) */}
                <div className="footer-contact">
                    <p>For inquiries please contact us at</p>
                    <p>Email: hello@safesportforyouth.org</p>

                </div>
            </div>
        </footer>
    );
}

export default Footer;
