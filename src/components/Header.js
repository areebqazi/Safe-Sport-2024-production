import React, { useContext } from 'react';
import './Header.css';
import { LanguageContext } from '../LanguageContext';
import englishLogo from '../assets/logos/safesportlogo.png';
import frenchLogo from '../assets/logos/safesportlogoFrench.png';

function Header() {
    const { language } = useContext(LanguageContext);

    return (
        <header className="header">
            <div className='logo-div'>
                <img 
                    src={language === 'english' ? englishLogo : frenchLogo} 
                    className="logo" 
                    alt="Main Logo" 
                />
            </div>
        </header>
    );
}

export default Header;
