
import React from 'react';

interface BrandLogoProps {
  isDark?: boolean;
  brandName?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ isDark = false, brandName = "La Brea Tours" }) => (
  <div className="flex items-center space-x-3 cursor-pointer">
    <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-500 ${
      isDark ? 'bg-black text-white shadow-lg' : 'bg-white/20 text-white backdrop-blur-md border border-white/30'
    }`}>
      <i className="fa-solid fa-anchor text-lg"></i>
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
