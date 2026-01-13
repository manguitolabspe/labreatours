
import React, { useState } from 'react';
import { Tour } from '../types';
import { translations } from '../translations';

interface TourCardProps {
  tour: Tour;
  onBookTour?: (id: string) => void;
  language: 'es' | 'en';
}

const categoryIcons = {
  'Aventura': 'fa-person-hiking',
  'Historia': 'fa-building-columns',
  'Relajación': 'fa-sun-beach',
  'Naturaleza': 'fa-wind'
};

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1200";

export const TourCard: React.FC<TourCardProps> = ({ tour, onBookTour, language }) => {
  const t = translations[language];
  const [imgSrc, setImgSrc] = useState(tour.imageUrl || FALLBACK_IMAGE);
  
  const isPopular = tour.popular || false;
  const spots = tour.spots !== undefined ? Number(tour.spots) : null;
  const lastTour = tour.lastTourHours !== undefined ? Number(tour.lastTourHours) : null;

  return (
    <div className="group relative bg-white flex flex-col rounded-[2rem] md:rounded-[3rem] overflow-hidden transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] border border-gray-100 h-full">
      <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-gray-100">
        <img 
          src={imgSrc} 
          alt={tour.title}
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        {/* Badges Superiores */}
        <div className="absolute top-4 md:top-6 left-4 md:left-6 flex flex-col space-y-2 z-20">
          <span className="bg-white/10 backdrop-blur-md text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] px-3 md:px-5 py-2 md:py-2.5 rounded-full border border-white/20 flex items-center space-x-2 self-start">
            <i className={`fa-solid ${categoryIcons[tour.category as keyof typeof categoryIcons] || 'fa-mountain-sun'}`}></i>
            <span>{tour.category}</span>
          </span>
          
          {isPopular && (
            <span className="bg-amber-400 text-black text-[8px] md:text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg self-start animate-pulse">
              <i className="fa-solid fa-fire-flame-curved mr-1"></i> {t.tours_popular_label}
            </span>
          )}

          {/* Prueba Social: Último tour (Punto 3) */}
          {lastTour !== null && lastTour <= 48 && (
            <span className="bg-sky-500 text-white text-[8px] md:text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg self-start">
              <i className="fa-solid fa-bolt mr-1"></i> {t.tours_last_tour.replace('{n}', lastTour.toString())}
            </span>
          )}
        </div>

        {/* Badge de Disponibilidad (Punto 6) */}
        {spots !== null && spots <= 5 && spots > 0 && (
          <div className="absolute top-4 right-4 z-20">
             <div className="bg-red-500 text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-2 rounded-lg shadow-xl animate-bounce">
               {t.tours_spots_left.replace('{n}', spots.toString())}
             </div>
          </div>
        )}

        {spots === 0 && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-30">
            <span className="border-2 border-white text-white px-6 py-2 uppercase font-black tracking-widest text-sm rotate-[-12deg]">
              {t.tours_sold_out}
            </span>
          </div>
        )}

        <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 text-white">
          <div className="flex items-center space-x-2 text-[9px] md:text-[10px] uppercase tracking-widest font-bold text-sky-400 mb-2">
            <i className="fa-solid fa-clock"></i>
            <span>{tour.duration} {t.tours_duration_label}</span>
          </div>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-display leading-tight italic">
            {tour.title}
          </h3>
        </div>
      </div>
      
      <div className="p-6 md:p-10 flex-grow flex flex-col bg-white">
        <p className="text-gray-500 mb-8 leading-relaxed text-sm md:text-base flex-grow italic font-light">
          "{tour.description}"
        </p>
        
        <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-gray-50">
          <div>
            <span className="text-[9px] md:text-[10px] text-gray-400 uppercase font-bold tracking-widest block mb-1">{t.tours_from_label}</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl md:text-3xl font-bold text-black">{tour.price}</span>
            </div>
          </div>
          <button 
            disabled={spots === 0}
            onClick={() => onBookTour?.(tour.id)}
            className={`px-6 py-3 md:px-8 md:py-4 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl group/btn flex items-center space-x-2 active:scale-90 ${
              spots === 0 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-sky-500'
            }`}
          >
            <span>{t.nav_reservar}</span>
            <i className="fa-solid fa-chevron-right text-[8px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
