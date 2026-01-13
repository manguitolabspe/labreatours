
import React from 'react';
import { translations } from '../../translations';

interface HeroProps {
  onNavigate?: (id: string) => void;
  language: 'es' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, language }) => {
  const t = translations[language];

  return (
    <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden bg-black -mt-20">
      <div 
        className="absolute inset-0 bg-cover bg-center animate-ken-burns opacity-70"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2200")' }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80"></div>

      <div className="relative container mx-auto px-6 text-center text-white z-10 flex flex-col items-center pt-10">
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight font-display tracking-tight animate-fade-in-scale">
          {t.hero_title} <br />
          <span className="text-sky-400">{t.hero_subtitle}</span>
        </h1>
        
        <div className="w-16 h-1 bg-sky-500 mb-10 rounded-full animate-grow-horizontal shadow-[0_0_15px_rgba(56,189,248,0.3)]"></div>
        
        <p className="text-base md:text-xl font-light mb-12 max-w-2xl mx-auto text-gray-200 leading-relaxed animate-fade-in-delay px-4 italic">
          {t.hero_desc}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-lg px-6 animate-fade-in-delay-more">
          <button 
            onClick={() => onNavigate?.('tours')} 
            className="group px-10 py-5 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-sky-50 transition-all w-full sm:w-1/2 text-center rounded-sm flex items-center justify-center space-x-3 shadow-xl"
          >
            <span>{t.hero_btn_tours}</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <button 
            onClick={() => onNavigate?.('nosotros')} 
            className="px-10 py-5 bg-transparent border border-white/40 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all w-full sm:w-1/2 text-center rounded-sm backdrop-blur-sm"
          >
            {t.hero_btn_about}
          </button>
        </div>
      </div>

      <div className="absolute bottom-12 left-8 md:left-16 hidden md:block">
        <div className="flex items-center space-x-5 group">
          <div className="w-px h-12 bg-gradient-to-b from-sky-500 to-transparent group-hover:h-16 transition-all duration-700"></div>
          <div className="animate-fade-in">
            <div className="text-white text-[9px] uppercase tracking-[0.4em] mb-1 opacity-50 font-bold">{t.hero_geo_label}</div>
            <div className="text-white text-sm font-mono tracking-tight italic flex items-center space-x-2">
               <i className="fa-solid fa-location-crosshairs text-sky-400 text-xs animate-pulse"></i>
               <span>4°40′58″S 81°19′43″O</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
