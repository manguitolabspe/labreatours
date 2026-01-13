
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

  // Bloqueo total de scroll cuando el menú está abierto para evitar bugs visuales
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.touchAction = 'auto';
    };
  }, [isMenuOpen]);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[200] transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white py-4'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="z-[220]" onClick={() => handleNavClick('inicio')}>
          <BrandLogo isDark={true} brandName={settings.brandName} />
        </div>

        {/* Desktop Menu */}
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

        {/* Burger Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          className="md:hidden focus:outline-none z-[220] p-2 bg-gray-50 rounded-lg relative"
          aria-label="Menu"
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 origin-left ${isMenuOpen ? 'rotate-[42deg] w-[30px]' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-all duration-300 origin-left ${isMenuOpen ? '-rotate-[42deg] w-[30px]' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Fullscreen Mobile Menu Overlay - Corregido para cubrir todo sin importar el scroll */}
      <div 
        className={`fixed inset-0 w-full h-[100dvh] bg-white z-[210] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.77,0.2,0.05,1.0)] ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-center items-center p-10 space-y-6">
          <div className="absolute top-8 left-8">
            <BrandLogo isDark={true} brandName={settings.brandName} />
          </div>

          {NAV_ITEMS.map((item) => (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)} 
              className={`text-4xl font-display font-bold transition-colors ${
                currentPath === item.id ? 'text-sky-500' : 'text-black'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="w-full space-y-4 pt-10 max-w-xs">
            <a 
              href="https://vivetalara.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full py-5 bg-sky-500 text-white rounded-2xl text-center text-xs font-bold uppercase tracking-widest shadow-xl active:scale-95 transition-transform"
            >
              <i className="fa-solid fa-mobile-screen-button mr-2"></i>
              ¡Vive Talara!
            </a>
            <button 
              onClick={() => { setIsMenuOpen(false); onOpenBooking(); }} 
              className="w-full py-5 border-2 border-black text-black rounded-2xl text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform"
            >
              Reservar Ahora
            </button>
          </div>

          <div className="pt-10">
            <SocialLinks 
              className="flex space-x-6" 
              itemClassName="text-3xl text-gray-400 hover:text-sky-500 transition-colors" 
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
          
          <div className="absolute bottom-10 text-center w-full">
             <p className="text-[10px] text-gray-300 uppercase tracking-[0.4em] font-bold">
               {settings.brandName} • NEGRITOS
             </p>
          </div>
        </div>
      </div>
    </nav>
  );
};
