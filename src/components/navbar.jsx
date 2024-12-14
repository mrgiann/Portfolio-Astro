import React, { useState } from 'react';
import '../assets/navbar.css';

const themes = {
  moon: [' #0B0C0D', ' #0F0F0F', ' #181818', ' #ffffff', ' #020202', ' #9e9e9e', ' #d2d438', ' #333333', ' #333333'],
  sun: [' #cccccc', ' #ffffff', ' #cecece', ' #000000', ' #020202', ' #494949', ' #4CAF50', ' #CCCCCC', '#c9c9c9'],
  sunset: [' #202b26', ' #3c4d45', ' #597065', ' #ffffff', ' #020202', ' #a4b68d', ' #d2d438', ' #767c58', 'rgb(102, 129, 116)'],
  sunrise: [' #F08080', ' #F4978E', ' #be766f', 'rgb(0, 0, 0)', ' #020202', 'rgb(63, 50, 50)', ' #1D7AFC', ' #F8AD9D', 'rgb(190, 119, 112)'],
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
    updateThemeStyles(theme);
    setIsThemeOpen(false);
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setIsLanguageOpen(false);
  };

  const themeImages = {
    moon: 'logo.webp',
    sun: 'logoclaro.webp',
    sunset: 'logoatardecer.webp',
    sunrise: 'logoamanecer.webp',
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

  return (
    <div className={`navbar ${isMenuOpen || isLanguageOpen || isThemeOpen ? 'menu-open' : ''}`}>
      <div
        className={`menu-overlay ${isMenuOpen || isLanguageOpen || isThemeOpen ? 'open' : ''}`}
        onClick={closeMenus}
      ></div>

      <nav className="navbar">
        <div className="container">
          <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
            <a href="#about">
              <button onClick={closeMenus}>About</button>
            </a>
            <a href="#projects">
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
