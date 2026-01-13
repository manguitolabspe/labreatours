
import React from 'react';
import { Review } from '../../types';
import { translations } from '../../translations';

interface TestimonialsProps {
  reviews: Review[];
  language: 'es' | 'en';
}

export const Testimonials: React.FC<TestimonialsProps> = ({ reviews, language }) => {
  const t = translations[language];
  if (reviews.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sky-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">{t.testimonials_label}</span>
          <h2 className="text-4xl md:text-5xl font-bold font-display italic text-black">{t.testimonials_title} <span className="text-sky-500">{t.testimonials_subtitle}</span></h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <div className="flex text-amber-400 mb-6">
                {[...Array(Number(r.stars) || 5)].map((_, s) => <i key={s} className="fa-solid fa-star text-xs mr-1"></i>)}
              </div>
              <p className="text-gray-600 italic mb-8 leading-relaxed text-sm md:text-base">"{r.text}"</p>
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center text-sky-500 font-bold text-xs uppercase shadow-inner">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm">{r.name}</h4>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{r.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
