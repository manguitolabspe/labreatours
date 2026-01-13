
import React from 'react';

interface BrandLogoProps {
  isDark?: boolean;
  brandName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ isDark = false, brandName = "La Brea Tours" }) => (
  <div className="flex items-center space-x-3 cursor-pointer group">
    <div className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-500 overflow-hidden ${
      isDark ? 'bg-white shadow-md border border-gray-100' : 'bg-white/10 backdrop-blur-md border border-white/20'
    }`}>
      <img 
        src="/logo.webp" 
        alt="Logo La Brea Tours" 
        className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-500"
        onError={(e) => {
          // Fallback por si la imagen no existe aún
          e.currentTarget.style.display = 'none';
          e.currentTarget.parentElement!.innerHTML = '<i class="fa-solid fa-anchor text-lg"></i>';
        }}
      />
    </div>
    <div className="flex flex-col leading-none text-left">
      <span className={`font-bold text-lg md:text-xl tracking-tighter font-display italic transition-colors duration-500 ${
        isDark ? 'text-black' : 'text-white'
      }`}>
        {brandName}
      </span>
      <span className={`text-[8px] md:text-[9px] tracking-[0.3em] font-medium uppercase transition-colors duration-500 ${
        isDark ? 'text-gray-400' : 'text-gray-300'
      }`}>
        Negritos • Talara
      </span>
    </div>
  </div>
);