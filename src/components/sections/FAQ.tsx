
import React, { useState } from 'react';
import { FaqItem } from '../../types';
import { translations } from '../../translations';

interface FAQProps {
  items: FaqItem[];
  language: 'es' | 'en';
}

export const FAQ: React.FC<FAQProps> = ({ items, language }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const t = translations[language];

  if (items.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display italic text-black mb-4">{t.faq_title} <span className="text-sky-500">{t.faq_subtitle}</span></h2>
          <p className="text-gray-500 italic">{t.faq_desc}</p>
        </div>
        
        <div className="space-y-4">
          {items.map((f, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden transition-all duration-300 hover:border-sky-200">
              <button 
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <span className="font-bold text-black text-lg italic pr-8">{f.q}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${openIdx === i ? 'bg-sky-500 text-white rotate-180' : 'bg-gray-100 text-gray-400'}`}>
                  <i className="fa-solid fa-chevron-down text-[10px]"></i>
                </div>
              </button>
              {openIdx === i && (
                <div className="p-6 pt-0 text-gray-500 italic leading-relaxed animate-fade-in text-base">
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
