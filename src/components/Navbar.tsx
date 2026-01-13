
import React, { useState } from 'react';
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

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenBooking, settings, language, onLanguageChange }) => {
  const isScrolled = useScroll(10);
  const t = translations[language];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[200] transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div onClick={() => onNavigate('inicio')}>
          <BrandLogo isDark={true} brandName={settings.brandName} />
        </div>

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
          
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full">
            <button 
              onClick={() => onLanguageChange('es')}
              className={`px-3 py-1 rounded-full text-[9px] font-bold ${language === 'es' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
            >ES</button>
            <button 
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1 rounded-full text-[9px] font-bold ${language === 'en' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}
            >EN</button>
          </div>

          <button 
            onClick={onOpenBooking}
            className="px-6 py-2 bg-black text-white text-[9px] font-bold uppercase rounded-full hover:bg-sky-500 transition-all"
          >
            {t.nav_reservar}
          </button>
        </div>
      </div>
    </nav>
  );
};
