
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { useScroll } from '../hooks/useScroll';
import { BrandLogo } from './ui/BrandLogo';
import { BusinessSettings } from '../types';
import { translations } from '../translations';

interface NavbarProps {
  currentPath: string;
  onNavigate: (id: string) => void;
  onOpenBooking: () => void;
  settings: BusinessSettings;
  language: 'es' | 'en';
  onLanguageChange: (lang: 'es' | 'en') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPath, 
  onNavigate, 
  onOpenBooking, 
  settings, 
  language, 
  onLanguageChange 
}) => {
  const isScrolled = useScroll(10);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[language];

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const handleMobileNavigate = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  const handleMobileBooking = () => {
    onOpenBooking();
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[200] transition-all duration-300 ${
      isScrolled || isMenuOpen ? 'bg-white/98 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center h-12">
        {/* Logo - Se oculta en móvil cuando el menú está abierto */}
        <div 
          onClick={() => handleMobileNavigate('inicio')} 
          className={`cursor-pointer transition-all duration-300 ${
            isMenuOpen ? 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto' : 'opacity-100'
          }`}
        >
          <BrandLogo isDark={true} brandName={settings.brandName} />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.id} 
              onClick={() => onNavigate(item.id)} 
              className={`text-[10px] uppercase tracking-widest font-bold transition-all ${
                currentPath === item.id ? 'text-sky-600' : 'text-black hover:text-sky-500'
              }`}
            >
              {language === 'es' ? item.label : (t as any)[`nav_${item.id}`]}
            </button>
          ))}
          
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full border border-gray-200">
            <button 
              onClick={() => onLanguageChange('es')}
              className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all ${language === 'es' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
            >ES</button>
            <button 
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded-full text-[9px] font-bold transition-all ${language === 'en' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
            >EN</button>
          </div>

          <button 
            onClick={onOpenBooking}
            className="px-6 py-2 bg-black text-white text-[9px] font-bold uppercase rounded-full hover:bg-sky-500 transition-all shadow-md active:scale-95"
          >
            {t.nav_reservar}
          </button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 flex items-center justify-center text-black focus:outline-none transition-transform active:scale-90"
            aria-label="Toggle Menu"
          >
            <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars-staggered'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out origin-top border-t border-gray-100 ${
        isMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible pointer-events-none'
      }`}>
        <div className="flex flex-col h-full items-center justify-center p-8 space-y-10 overflow-y-auto">
          {/* Enlaces centrados */}
          <div className="flex flex-col space-y-8 items-center w-full">
            {NAV_ITEMS.map((item) => (
              <button 
                key={item.id} 
                onClick={() => handleMobileNavigate(item.id)} 
                className={`text-center text-xl uppercase tracking-[0.3em] font-bold py-2 transition-all duration-300 ${
                  currentPath === item.id ? 'text-sky-600 scale-110' : 'text-black active:scale-95'
                }`}
              >
                {language === 'es' ? item.label : (t as any)[`nav_${item.id}`]}
              </button>
            ))}
          </div>

          {/* Selector de Idioma Centrado */}
          <div className="flex flex-col items-center space-y-4 w-full pt-8 border-t border-gray-100">
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
              {language === 'es' ? 'Cambiar Idioma' : 'Switch Language'}
            </span>
            <div className="flex items-center space-x-2 bg-gray-100 p-1.5 rounded-full border border-gray-200">
              <button 
                onClick={() => onLanguageChange('es')}
                className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all ${language === 'es' ? 'bg-white shadow-md text-black' : 'text-gray-400'}`}
              >ESPAÑOL</button>
              <button 
                onClick={() => onLanguageChange('en')}
                className={`px-8 py-2.5 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-white shadow-md text-black' : 'text-gray-400'}`}
              >ENGLISH</button>
            </div>
          </div>

          {/* Botón de Reserva Centrado */}
          <button 
            onClick={handleMobileBooking}
            className="w-full max-w-[280px] py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.3em] rounded-full shadow-2xl transition-all active:scale-95 bg-gradient-to-r from-black to-gray-900"
          >
            {t.nav_reservar}
          </button>
        </div>
      </div>
    </nav>
  );
};
