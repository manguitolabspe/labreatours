
import React, { useState, useEffect } from 'react';
import { BRAND_NAME } from '../../constants';

export const InitialLoader: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  const [textIndex, setTextIndex] = useState(0);
  const loadingTexts = [
    "Conectando con La Brea...",
    "Sincronizando rutas locales...",
    "Preparando tu aventura...",
    "Bienvenido a Negritos"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-[500] flex flex-col items-center justify-center bg-white transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Background Decorative Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
        <i className="fa-solid fa-compass text-[40rem] absolute -top-20 -left-20 rotate-45"></i>
      </div>

      <div className="relative flex flex-col items-center animate-fade-in-scale">
        {/* Animated Brand Logo (Square) */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-sky-400/20 blur-3xl rounded-full animate-pulse-slow"></div>
          <div className="w-28 h-28 md:w-40 md:h-40 bg-white rounded-[2.5rem] flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.1)] relative z-10 border border-gray-100 overflow-hidden p-4">
            <img 
              src="/logo-square.webp" 
              alt="Cargando La Brea Tours" 
              className="w-full h-full object-contain animate-float"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<i class="fa-solid fa-anchor text-sky-500 text-4xl animate-float"></i>';
              }}
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-display italic font-bold tracking-tight text-black mb-2 uppercase">
            {BRAND_NAME}
          </h2>
          <div className="flex items-center justify-center space-x-3 mb-8">
            <span className="h-px w-6 bg-sky-200"></span>
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-sky-500">Talara • Piura</span>
            <span className="h-px w-6 bg-sky-200"></span>
          </div>
        </div>

        {/* Progress Text */}
        <div className="h-6 overflow-hidden">
          <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-gray-400 animate-slide-up">
            {loadingTexts[textIndex]}
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-[2px] bg-gray-100 mt-6 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-sky-500 animate-loading-bar"></div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes loading-bar {
          0% { left: -100%; width: 50%; }
          100% { left: 100%; width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 2s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};