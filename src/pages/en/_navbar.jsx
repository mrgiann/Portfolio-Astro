import React, { useState, useEffect, useCallback } from 'react';
import '../../assets/navbar.css';
import { languages } from '../../i18n/ui';
import { useTranslations } from '../../i18n/utils';

const lang = 'en';
const t = useTranslations(lang);

const themes = {
  moon: ['#0B0C0D', '#0F0F0F', '#181818', '#ffffff', '#020202', '#9e9e9e', '#d2d438', '#333333', '#333333'],
  sun: ['#cccccc', '#ffffff', '#cecece', '#000000', '#020202', '#494949', '#303030FF', '#CCCCCC', '#c9c9c9'],
  sunset: ['#202b26', '#3c4d45', '#597065', '#ffffff', '#020202', '#a4b68d', '#96B492FF', '#96B492FF', 'rgb(102, 129, 116)'],
  sunrise: ['#F08080', '#F4978E', '#be766f', '#2C2C2CFF', '#020202', 'rgb(63, 50, 50)', '#3F3F3FFF', '#F8AD9D', 'rgb(190, 119, 112)'],
};

const themesThg = {
  moon: ['#E34F26', '#1572B6', '#F7DF1E', '#7952B3', '#4A90E2', '#4A90E2', '#2a2e35'],
  sun: ['#303030FF', '#303030FF', '#303030FF', '#303030FF', '#303030FF', '#303030FF', '#C4C4C4FF'],
  sunset: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#FFFFFF', '#2a2e35'],
  sunrise: ['#271313FF', '#271313FF', '#271313FF', '#271313FF', '#271313FF', '#271313FF', '#af6f69'],
};

// Memoized ColorCircles component to prevent unnecessary re-renders
const ColorCircles = React.memo(({ theme }) => {
  return (
    <div className="color-circles">
      {themes[theme].map((color, index) => (
        <span
          key={index}
          className="circle"
          style={{ backgroundColor: color }}
        ></span>
      ))}
    </div>
  );
});

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('moon');
  const [selectedLanguage, setSelectedLanguage] = useState('english');

  // Batched CSS update function using requestAnimationFrame
  const updateThemeStyles = useCallback((theme) => {
    const colors = themes[theme];
    const thgColors = themesThg[theme];

    requestAnimationFrame(() => {
      const root = document.documentElement.style;

      // Batch all CSS variable updates in a single frame
      root.setProperty('--color-navbar', colors[0]);
      root.setProperty('--color-fondo', colors[1]);
      root.setProperty('--color-fondo-card', colors[2]);
      root.setProperty('--color-texto', colors[3]);
      root.setProperty('--color-fondo-menu', colors[4]);
      root.setProperty('--color-text-secundario', colors[5]);
      root.setProperty('--color-scroll-down-hover', colors[5]);
      root.setProperty('--color-texto-titulo', colors[6]);
      root.setProperty('--color-fondo-titulos', colors[7]);
      root.setProperty('--color-scroll-down', colors[8]);

      if (thgColors) {
        root.setProperty('--html', thgColors[0]);
        root.setProperty('--css', thgColors[1]);
        root.setProperty('--js', thgColors[2]);
        root.setProperty('--bts', thgColors[3]);
        root.setProperty('--cloud', thgColors[4]);
        root.setProperty('--react', thgColors[5]);
        root.setProperty('--icon', thgColors[6]);

        // Apply brightness filter
        const filterValue = (theme === 'sun' || theme === 'sunrise') ? 'brightness(0.1)' : 'none';
        root.setProperty('--theme-input-filter', filterValue);
        root.setProperty('--language-input-filter', filterValue);

        // Update Express icons with cached DOM references
        const iconSrc = (theme === 'moon' || theme === 'sunset') ? '/SVG/expressw.svg' : '/SVG/express.svg';
        const expressIcon = document.getElementById('first-project-express-icon');
        const skillsExpressIcon = document.getElementById('skills-express-icon');

        if (expressIcon) expressIcon.src = iconSrc;
        if (skillsExpressIcon) skillsExpressIcon.src = iconSrc;
      }
    });
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      updateThemeStyles(savedTheme);
    }
  }, [updateThemeStyles]);

  // Memoized toggle functions to prevent re-creation on every render
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
    setIsLanguageOpen(false);
    setIsThemeOpen(false);
  }, []);

  const toggleLanguage = useCallback(() => {
    setIsLanguageOpen(prev => !prev);
    setIsMenuOpen(false);
    setIsThemeOpen(false);
  }, []);

  const toggleThemeMenu = useCallback(() => {
    setIsThemeOpen(prev => !prev);
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
  }, []);

  const closeMenus = useCallback(() => {
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
    setIsThemeOpen(false);
  }, []);

  // Memoized theme change handler
  const handleThemeChange = useCallback((theme) => {
    setSelectedTheme(theme);
    localStorage.setItem('selectedTheme', theme);
    updateThemeStyles(theme);
    setIsThemeOpen(false);
  }, [updateThemeStyles]);

  // Memoized language change handler
  const handleLanguageChange = useCallback((language) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);

    const routes = {
      en: '/en/',
      es: '/es/',
      fr: '/fr/',
      pt: '/pt/'
    };

    if (routes[language]) {
      window.location.href = routes[language];
    }
  }, []);

  return (
    <div className={`navbar ${isMenuOpen || isLanguageOpen || isThemeOpen ? 'menu-open' : ''}`}>
      <div
        className={`menu-overlay ${isMenuOpen || isLanguageOpen || isThemeOpen ? 'open' : ''}`}
        onClick={closeMenus}
      ></div>
      <div className="line"></div>
      <nav className="navbar">
        <div className="container">
          <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
            <div className="menu-title">Menu</div>
            <a href="#about">
              <button id='about-navbar' onClick={closeMenus}>{t('about-navbar')}</button>
            </a>
            <a href="#projects">
              <button id='projects-navbar' onClick={closeMenus}>{t('projects-navbar')}</button>
            </a>
            <a href="#skills">
              <button id='skills-navbar' onClick={closeMenus}>{t('skills-navbar')}</button>
            </a>
            <a href="#contact">
              <button id='contact-navbar' onClick={closeMenus}>{t('contact-navbar')}</button>
            </a>
          </div>

          <button className="menu-toggle" aria-label="Abrir menú" onClick={toggleMenu}>
            <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          <div className="navbar-actions">
            <div className="theme-select-container">
              <img
                src={`../${selectedTheme}.webp`}
                alt="Tema actual"
                className="theme-input"
                onClick={toggleThemeMenu}
              />
              <div className={`theme-options ${isThemeOpen ? 'open' : ''}`}>
                <div id='theme-navbar' className="theme-title">Theme</div>
                <div className="theme-option" onClick={() => handleThemeChange('moon')}>
                  <img src="../moon.webp" alt="Moon" />
                  <span id='moon-navbar'>{t('moon-navbar')}</span>
                  <ColorCircles theme="moon" />
                </div>
                <div className="theme-option" onClick={() => handleThemeChange('sun')}>
                  <img src="../sun.webp" alt="Sun" />
                  <span id='sun-navbar'>{t('sun-navbar')}</span>
                  <ColorCircles theme="sun" />
                </div>
                <div className="theme-option" onClick={() => handleThemeChange('sunset')}>
                  <img src="../sunset.webp" alt="Sunset" />
                  <span id='sunset-navbar'>{t('sunset-navbar')}</span>
                  <ColorCircles theme="sunset" />
                </div>
                <div className="theme-option" onClick={() => handleThemeChange('sunrise')}>
                  <img src="../sunrise.webp" alt="Sunrise" />
                  <span id='sunrise-navbar'>{t('sunrise-navbar')}</span>
                  <ColorCircles theme="sunrise" />
                </div>
              </div>
            </div>

            <div className="language-select-container">
              <div className="idioma">
                <img
                  src="../language.svg"
                  alt="Idioma"
                  className="language-input"
                  onClick={toggleLanguage}
                />
              </div>
              <div className={`language-options ${isLanguageOpen ? 'open' : ''}`}>
                <div id='language-navbar' className="language-title">Language</div>
                <label>
                  <input
                    id='englishh'
                    type="radio"
                    value="english"
                    checked={selectedLanguage === 'english'}
                    onChange={() => handleLanguageChange('en')}
                  />
                  <img src="../en.webp" alt="English" />
                  English
                </label>
                <label>
                  <input
                    id='frenchh'
                    type="radio"
                    value="french"
                    checked={selectedLanguage === 'french'}
                    onChange={() => handleLanguageChange('fr')}
                  />
                  <img src="../fr.webp" alt="Français" />
                  Français
                </label>
                <label>
                  <input
                    id='portuguesee'
                    type="radio"
                    value="portuguese"
                    checked={selectedLanguage === 'portuguese'}
                    onChange={() => handleLanguageChange('pt')}
                  />
                  <img src="../pt.webp" alt="Português" />
                  Português
                </label>
                <label>
                  <input
                    id='spanishh'
                    type="radio"
                    value="spanish"
                    checked={selectedLanguage === 'spanish'}
                    onChange={() => handleLanguageChange('es')}
                  />
                  <img src="../es.webp" alt="Español" />
                  Español
                </label>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
