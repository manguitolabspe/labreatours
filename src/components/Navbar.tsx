
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { useScroll } from '../hooks/useScroll';
import { BrandLogo } from './ui/BrandLogo';
import { SocialLinks } from './ui/SocialLinks';
import { BusinessSettings } from '../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (id: string) => void;
  onOpenBooking: () => void;
  settings: BusinessSettings;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, onOpenBooking, settings }) => {
  const isScrolled = useScroll(10);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed w-full z-[200] transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="z-[220]" onClick={() => handleNavClick('inicio')}>
          <BrandLogo isDark={true} brandName={settings.brandName} />
        </div>

        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)} 
              className={`text-[11px] uppercase tracking-[0.2em] font-bold transition-all hover:text-sky-500 relative group ${
                currentPath === item.id ? 'text-sky-600' : 'text-black'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-sky-400 transition-all duration-300 ${
                currentPath === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
          
          <div className="flex items-center space-x-3">
            <a 
              href="https://vivetalara.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 rounded-full bg-sky-500 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-sky-600 transition-all shadow-md flex items-center space-x-2"
            >
              <i className="fa-solid fa-mobile-screen-button"></i>
              <span>¡Vive Talara!</span>
            </a>
            <button 
              onClick={onOpenBooking}
              className="px-6 py-2.5 rounded-full border border-black text-black text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
            >
              Reservar
            </button>
          </div>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden focus:outline-none z-[220] p-2">
          <div className="relative w-6 h-4 flex flex-col justify-between">
            <span className={`block w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      <div className={`fixed inset-0 bg-white z-[210] transition-transform duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full justify-center items-center p-10 space-y-6">
          {NAV_ITEMS.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)} 
              className={`text-3xl font-display font-bold ${currentPath === item.id ? 'text-sky-500' : 'text-black'}`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="w-full space-y-4 pt-8">
            <a 
              href="https://vivetalara.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full py-5 bg-sky-500 text-white rounded-full text-center text-xs font-bold uppercase tracking-widest shadow-lg"
            >
              <i className="fa-solid fa-mobile-screen-button mr-2"></i>
              ¡Vive Talara!
            </a>
            <button 
              onClick={() => { setIsMenuOpen(false); onOpenBooking(); }} 
              className="w-full py-5 border-2 border-black text-black rounded-full text-xs font-bold uppercase tracking-widest"
            >
              Reservar Ahora
            </button>
          </div>

          <SocialLinks 
            className="flex space-x-6 pt-10" 
            itemClassName="text-2xl text-gray-400" 
            config={{
              facebook: settings.facebook,
              instagram: settings.instagram,
              tiktok: settings.tiktok,
              youtube: settings.youtube,
              twitter: settings.twitter,
              whatsapp: settings.phone
            }}
          />
        </div>
      </div>
    </nav>
  );
};
