import React, { useState } from 'react';
import '../assets/navbar.css';

const themes = {
  moon: ['#101214', '#0B0C0D', '#FFFFFF', '#143F3A', '#d2d438', '#1D7AFC'],
  sun: ['#F7F8F9', '#F1F2F4', ' #101214', '#247067', '#d2d438', '#1D7AFC'],
  sunset: ['#151C19', '#2F3834', '#424F4A', '#C0AB92', '#101214', '#1D7AFC'],
  sunrise: ['#FFDAB9', '#D7C9C6', '#FFFFFF', '#4F2733', '#685844', '#A04D66'],
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
  const [selectedLanguage, setSelectedLanguage] = useState('english');

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
    setIsThemeOpen(false);
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language); // Cambiar el idioma
    setIsLanguageOpen(false);
  };

  return (
    <div className={`navbar ${isMenuOpen || isLanguageOpen || isThemeOpen ? 'menu-open' : ''}`}>
      <div
        className={`menu-overlay ${isMenuOpen || isLanguageOpen || isThemeOpen ? 'open' : ''}`}
        onClick={closeMenus}
      ></div>

      <nav className="navbar">
        <div className="container">
          <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="#">
              <button onClick={closeMenus}>Home</button>
            </a>
            <a href="#proyectos">
              <button onClick={closeMenus}>Projects</button>
            </a>
            <a href="#habilidades">
              <button onClick={closeMenus}>Skills</button>
            </a>
            <a href="#contacto">
              <button onClick={closeMenus}>Contact</button>
            </a>
          </div>

          <button className="menu-toggle" onClick={toggleMenu}>
            <i className={`fas fa-bars ${isMenuOpen ? 'open' : ''}`}></i>
          </button>

          <div className="navbar-actions">
            <div className="theme-select-container">
              <img
                src={`${selectedTheme}.webp`}
                alt="Tema actual"
                className="theme-input"
                onClick={toggleThemeMenu}
              />
              <div className={`theme-options ${isThemeOpen ? 'open' : ''}`}>
              <div className="theme-title">Theme</div>
                <div className="theme-option" onClick={() => changeTheme('moon')}>
                  <img src="moon.webp" alt="Moon" />
                  <span>Moon</span>
                  <ColorCircles theme="moon" />
                </div>
                <div className="theme-option" onClick={() => changeTheme('sun')}>
                  <img src="sun.webp" alt="Sun" />
                  <span>Sun</span>
                  <ColorCircles theme="sun" />
                </div>
                <div className="theme-option" onClick={() => changeTheme('sunset')}>
                  <img src="sunset.webp" alt="Sunset" />
                  <span>Sunset</span>
                  <ColorCircles theme="sunset" />
                </div>
                <div className="theme-option" onClick={() => changeTheme('sunrise')}>
                  <img src="sunrise.webp" alt="Sunrise" />
                  <span>Sunrise</span>
                  <ColorCircles theme="sunrise" />
                </div>
              </div>
            </div>

            <div className="language-select-container">
              <div className="idioma">
                <img
                  src="idioma.webp"
                  alt="Idioma"
                  className="language-input"
                  onClick={toggleLanguage}
                />
              </div>
              <div className={`language-options ${isLanguageOpen ? 'open' : ''}`}>
              <div className="language-title">Language</div>
              <label>
                <input
                  type="radio"
                  value="english"
                  checked={selectedLanguage === 'english'} // Estado controlado
                  onChange={() => changeLanguage('english')}
                />
                <img src="reinounido.webp" alt="English" />
                English
              </label>
              <label>
                <input
                  type="radio"
                  value="french"
                  checked={selectedLanguage === 'french'} // Estado controlado
                  onChange={() => changeLanguage('french')}
                />
                <img src="francia.webp" alt="Français" />
                Français
              </label>
              <label>
                <input
                  type="radio"
                  value="portuguese"
                  checked={selectedLanguage === 'portuguese'} // Estado controlado
                  onChange={() => changeLanguage('portuguese')}
                />
                <img src="portugal.webp" alt="Português" />
                Português
              </label>
              <label>
                <input
                  type="radio"
                  value="spanish"
                  checked={selectedLanguage === 'spanish'} // Estado controlado
                  onChange={() => changeLanguage('spanish')}
                />
                <img src="espana.webp" alt="Español" />
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
