
import React from 'react';
import { translations } from '../../translations';

interface TrustBarProps {
  language: 'es' | 'en';
}

export const TrustBar: React.FC<TrustBarProps> = ({ language }) => {
  const t = translations[language];

  const benefits = [
    { icon: 'fa-shield-halved', title: t.trust_security, desc: t.trust_security_desc },
    { icon: 'fa-certificate', title: t.trust_guides, desc: t.trust_guides_desc },
    { icon: 'fa-tags', title: t.trust_price, desc: t.trust_price_desc },
    { icon: 'fa-clock-rotate-left', title: t.trust_flex, desc: t.trust_flex_desc }
  ];

  return (
    <div className="bg-white py-10 border-b border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 mb-3 group-hover:scale-110 transition-transform duration-300">
                <i className={`fa-solid ${b.icon} text-xl`}></i>
              </div>
              <h4 className="text-[10px] uppercase tracking-widest font-bold text-black">{b.title}</h4>
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter mt-1">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
