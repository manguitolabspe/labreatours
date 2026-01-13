
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { BrandLogo } from './ui/BrandLogo';
import { SocialLinks } from './ui/SocialLinks';
import { BusinessSettings } from '../types';
import { translations } from '../translations';

interface FooterProps {
  onNavigate: (id: string) => void;
  settings: BusinessSettings;
  language: 'es' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings, language }) => {
  const t = translations[language];

  return (
    <footer className="bg-black text-white pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-sm">
            <div className="mb-8 cursor-pointer" onClick={() => onNavigate('inicio')}>
              <BrandLogo brandName={settings.brandName} />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-8 italic">
              "{t.footer_desc}"
            </p>
            <SocialLinks 
              className="flex space-x-6 text-gray-400" 
              itemClassName="hover:text-sky-400 text-2xl" 
              config={{
                facebook: settings.facebook,
                instagram: settings.instagram,
                tiktok: settings.tiktok,
                youtube: settings.youtube,
                twitter: settings.twitter,
                whatsapp: settings.phone
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 flex-grow justify-end w-full md:w-auto">
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-sky-400 mb-8 underline decoration-sky-400/30 underline-offset-8">{t.footer_map}</h5>
              <ul className="space-y-4 text-sm text-gray-400 font-medium">
                {NAV_ITEMS.map(item => (
                  <li key={item.id}>
                    <button onClick={() => onNavigate(item.id)} className="hover:text-white transition-colors uppercase tracking-widest text-[10px]">
                      {language === 'es' ? item.label : (t as any)[`nav_${item.id}`]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[10px] uppercase tracking-[0.3em] font-bold text-sky-400 mb-8 underline decoration-sky-400/30 underline-offset-8">{t.footer_contact}</h5>
              <ul className="space-y-4 text-sm text-gray-400 font-medium italic">
                <li className="flex items-center space-x-2"><i className="fa-solid fa-phone text-xs text-sky-500"></i> <span>{settings.phone}</span></li>
                <li className="flex items-center space-x-2"><i className="fa-solid fa-envelope text-xs text-sky-500"></i> <span>{settings.email}</span></li>
                <li className="flex items-center space-x-2"><i className="fa-solid fa-location-dot text-xs text-sky-500"></i> <span>{settings.location}</span></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 text-[10px] uppercase tracking-[0.3em] font-bold text-center md:text-left">
            © {new Date().getFullYear()} {settings.brandName.toUpperCase()} • TALARA • PIURA • PERÚ
          </div>
          <div className="text-gray-700 text-[10px] uppercase tracking-[0.3em] font-bold">
            {t.footer_dev} <a href="https://manguitolabspe.web.app/" target="_blank" rel="noopener noreferrer" className="text-sky-800 hover:text-sky-400 transition-colors">Manguito Labs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
