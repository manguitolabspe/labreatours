
import React from 'react';
import { Tour } from '../types';
import { TourCard } from './TourCard';

interface TourListProps {
  tours: Tour[];
  onBookTour?: (id: string) => void;
  language: 'es' | 'en';
}

export const TourList: React.FC<TourListProps> = ({ tours, onBookTour, language }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-16 md:gap-y-24 max-w-7xl mx-auto">
      {tours.map((tour, idx) => (
        <div 
          key={tour.id} 
          className={`transition-all duration-1000 ${
            idx % 2 !== 0 ? 'lg:translate-y-24' : ''
          }`}
        >
          <TourCard tour={tour} onBookTour={onBookTour} language={language} />
        </div>
      ))}
    </div>
  );
};
