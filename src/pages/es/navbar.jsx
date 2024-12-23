import React, { useState, useEffect } from 'react';
import '../../assets/navbar.css';
import { languages } from '../../i18n/ui';
import { useTranslations } from '../../i18n/utils';

const lang = 'es';
const t = useTranslations(lang);
// {t('nombre-del-texto')}

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

const ColorCircles = ({ theme }) => {
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
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('moon');
  const [selectedLanguage, setSelectedLanguage] = useState('spanish');

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      updateThemeStyles(savedTheme);
      updateThemeStyless(savedTheme);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsLanguageOpen(false);
    setIsThemeOpen(false);
  };

  const toggleLanguage = () => {
    setIsLanguageOpen(!isLanguageOpen);
    setIsMenuOpen(false);
    setIsThemeOpen(false);
  };

  const toggleThemeMenu = () => {
    setIsThemeOpen(!isThemeOpen);
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
    setIsThemeOpen(false);
  };

  const changeTheme = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem('selectedTheme', theme); // Guardar el tema en localStorage
    updateThemeStyles(theme);
    updateThemeStyless(theme);
    setIsThemeOpen(false);
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  
    if (language === 'en') {
      window.location.href = '/en/';
    }
    else if (language === 'es') {
      window.location.href = '/es/';
    }
    else if (language === 'fr') {
      window.location.href = '/fr/';
    }
    else if (language === 'pt') {
      window.location.href = '/pt/';
    }
  };

  const themeImages = {
    moon: '../logo.webp',
    sun: '../logoclaro.webp',
    sunset: '../logoatardecer.webp',
    sunrise: '../logoamanecer.webp',
  };

  // Función para actualizar las variables de CSS según el tema seleccionado
  const updateThemeStyles = (theme) => {
    const colors = themes[theme];
    document.documentElement.style.setProperty('--color-navbar', colors[0]);
    document.documentElement.style.setProperty('--color-fondo', colors[1]);
    document.documentElement.style.setProperty('--color-fondo-card', colors[2]);
    document.documentElement.style.setProperty('--color-texto', colors[3]);
    document.documentElement.style.setProperty('--color-fondo-menu', colors[4]);
    document.documentElement.style.setProperty('--color-text-secundario', colors[5]);
    document.documentElement.style.setProperty('--color-scroll-down-hover', colors[5]);
    document.documentElement.style.setProperty('--color-texto-titulo', colors[6]);
    document.documentElement.style.setProperty('--color-fondo-titulos', colors[7]);
    document.documentElement.style.setProperty('--color-scroll-down', colors[8]);

    // Cambiar la imagen del contenedor
    const imgElement = document.querySelector('.containerImg img');
    if (imgElement && themeImages[theme]) {
      imgElement.src = themeImages[theme];
    }
  };

  const updateThemeStyless = (theme) => {
    const colors = themesThg[theme];
    if (colors) {
        document.documentElement.style.setProperty('--html', colors[0]);
        document.documentElement.style.setProperty('--css', colors[1]);
        document.documentElement.style.setProperty('--js', colors[2]);
        document.documentElement.style.setProperty('--bts', colors[3]);
        document.documentElement.style.setProperty('--cloud', colors[4]);
        document.documentElement.style.setProperty('--react', colors[5]);
        document.documentElement.style.setProperty('--icon', colors[6]);

        // Aplicar brillo según el tema
        if (theme === 'sun' || theme === 'sunrise') {
            document.documentElement.style.setProperty('--theme-input-filter', 'brightness(0.1)');
        } else {
            document.documentElement.style.setProperty('--theme-input-filter', 'none');
        }
    }
};

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

          <button className="menu-toggle" onClick={toggleMenu}>
            <i className={`fas fa-bars ${isMenuOpen ? 'open' : ''}`}></i>
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
                <div className="theme-option" onClick={() => changeTheme('moon')}>
                  <img src="../moon.webp" alt="Moon" />
                  <span id='moon-navbar'>{t('moon-navbar')}</span>
                  <ColorCircles theme="moon" />
                </div>
                <div className="theme-option" onClick={() => changeTheme('sun')}>
                  <img src="../sun.webp" alt="Sun" />
                  <span id='sun-navbar'>{t('sun-navbar')}</span>
                  <ColorCircles theme="sun" />
                </div>
                <div className="theme-option" onClick={() => changeTheme('sunset')}>
                  <img src="../sunset.webp" alt="Sunset" />
                  <span id='sunset-navbar'>{t('sunset-navbar')}</span>
                  <ColorCircles theme="sunset" />
                </div>
                <div className="theme-option" onClick={() => changeTheme('sunrise')}>
                  <img src="../sunrise.webp" alt="Sunrise" />
                  <span id='sunrise-navbar'>{t('sunrise-navbar')}</span>
                  <ColorCircles theme="sunrise" />
                </div>
              </div>
            </div>

            <div className="language-select-container">
              <div className="idioma">
                <img
                  src="../idioma.webp"
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
                    onChange={() => changeLanguage('en')}
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
                    onChange={() => changeLanguage('fr')}
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
                    onChange={() => changeLanguage('pt')}
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
                    onChange={() => changeLanguage('es')}
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
