
import React from 'react';
import { TourList } from '../TourList';
import { Tour } from '../../types';
import { translations } from '../../translations';

interface ToursProps {
  tours: Tour[];
  isLoading: boolean;
  title?: string;
  onBookTour?: (id: string) => void;
  language: 'es' | 'en';
}

export const Tours: React.FC<ToursProps> = ({ tours, isLoading, title, onBookTour, language }) => {
  const t = translations[language];

  return (
    <section id="tours" className="py-24 md:py-32 bg-gray-50/50 relative overflow-hidden min-h-[60vh]">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center space-x-3 mb-6">
            <div className="h-px w-8 bg-sky-300"></div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold text-gray-400">{t.tours_label}</span>
            <div className="h-px w-8 bg-sky-300"></div>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-8 font-display tracking-tight text-black italic">
            {title || <>{t.tours_title_prefix} <span className="text-sky-600">La Brea</span></>}
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed italic">
            {isLoading 
              ? t.tours_loading 
              : tours.length > 0 
                ? t.tours_desc
                : t.tours_empty}
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-sky-100 border-t-sky-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <i className="fa-solid fa-anchor text-sky-500 text-xs opacity-50"></i>
              </div>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mt-6 animate-pulse">{t.tours_loading}</span>
          </div>
        ) : (
          <div className="animate-fade-in">
            {tours.length > 0 ? (
              <TourList tours={tours} onBookTour={onBookTour} language={language} />
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-[3rem] border border-dashed border-gray-200 shadow-sm max-w-2xl mx-auto">
                <i className="fa-solid fa-map-location-dot text-6xl text-gray-200 mb-6"></i>
                <h3 className="text-xl font-bold text-gray-400 font-display italic">{t.tours_empty}</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
