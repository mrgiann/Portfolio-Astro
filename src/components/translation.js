// translation.js
import { translations } from './translations';

let currentLanguage = 'en'; // Idioma por defecto

// Función para cambiar el idioma
export function changeLanguage(language) {
  currentLanguage = language;
  updateTextContent();
}

// Función para actualizar los textos en el sitio
function updateTextContent() {
  // Obtener todos los elementos que tienen un atributo 'data-translate'
  const elements = document.querySelectorAll('[data-translate]');

  elements.forEach(element => {
    const key = element.getAttribute('data-translate');
    
    // Verificar si la clave existe en el idioma actual
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });
}
