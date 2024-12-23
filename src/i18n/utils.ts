// utils.ts
import { ui, defaultLang } from './ui';

// Esta función obtiene el idioma desde la URL de la página
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

// Esta función te devuelve la traducción correspondiente del idioma actual
export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
