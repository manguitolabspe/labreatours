
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Ken Burns Effect Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-ken-burns opacity-80"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2200")',
        }}
      ></div>
      
      {/* Gradient Overlays for Cinematic Feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90"></div>
      <div className="absolute inset-0 bg-sky-900/10 mix-blend-overlay"></div>

      <div className="relative container mx-auto px-6 text-center text-white z-10 flex flex-col items-center">
        {/* Main Title - Removed the top label as requested */}
        <h1 className="text-6xl sm:text-8xl md:text-[9rem] lg:text-[11rem] font-bold mb-6 tracking-tighter leading-none font-display italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] animate-fade-in-scale">
          DESTINO <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-100 to-gray-400">NEGRITOS</span>
        </h1>
        
        {/* Decorative Divider */}
        <div className="w-20 h-1 bg-sky-500 mb-10 rounded-full animate-grow-horizontal shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>
        
        <p className="text-lg md:text-2xl font-light mb-12 max-w-3xl mx-auto text-gray-100 leading-relaxed italic opacity-95 animate-fade-in-delay px-4">
          "Redescubre el punto donde Sudamérica toca el Pacífico en una travesía de historia y naturaleza pura."
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center w-full max-w-lg px-6 animate-fade-in-delay-more">
          <a 
            href="#tours" 
            className="group px-10 py-5 bg-white text-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-sky-50 transition-all w-full sm:w-1/2 text-center rounded-sm flex items-center justify-center space-x-3 shadow-2xl transform hover:-translate-y-1 active:translate-y-0"
          >
            <span>Iniciar Travesía</span>
            <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-2"></i>
          </a>
          <a 
            href="#nosotros" 
            className="px-10 py-5 bg-transparent border border-white/40 text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all w-full sm:w-1/2 text-center rounded-sm backdrop-blur-md transform hover:-translate-y-1 active:translate-y-0"
          >
            Ver Historia
          </a>
        </div>
      </div>

      {/* Floating HUD Elements */}
      <div className="absolute bottom-12 left-8 md:left-16 hidden md:block">
        <div className="flex items-center space-x-5 group">
          <div className="w-px h-12 bg-gradient-to-b from-sky-500 to-transparent group-hover:h-16 transition-all duration-700"></div>
          <div className="animate-fade-in">
            <div className="text-white text-[9px] uppercase tracking-[0.4em] mb-1 opacity-50 font-bold">Ubicación Geo</div>
            <div className="text-white text-sm font-mono tracking-tight italic flex items-center space-x-2">
               <i className="fa-solid fa-location-crosshairs text-sky-400 text-xs animate-pulse"></i>
               <span>4°40′58″S 81°19′43″O</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated Scroll Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-3 opacity-40 animate-bounce">
        <span className="text-[8px] uppercase tracking-[0.4em] text-white font-bold">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white to-transparent"></div>
      </div>
      
      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-ken-burns {
          animation: ken-burns 30s infinite alternate ease-in-out;
        }
        .animate-fade-in-scale {
          animation: fadeInScale 1.4s ease-out forwards;
        }
        .animate-grow-horizontal {
          animation: growHorizontal 1.2s ease-in-out forwards;
        }
        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.8s forwards;
          opacity: 0;
        }
        .animate-fade-in-delay-more {
          animation: fadeIn 1s ease-out 1.2s forwards;
          opacity: 0;
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes growHorizontal {
          from { width: 0; }
          to { width: 5rem; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
