
import React from 'react';
import { BRAND_NAME } from '../../constants';

interface AboutProps {
  imageUrl?: string;
}

const DEFAULT_ABOUT_IMAGE = "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200";

export const About: React.FC<AboutProps> = ({ imageUrl }) => {
  const displayImage = imageUrl && imageUrl.trim() !== "" ? imageUrl : DEFAULT_ABOUT_IMAGE;

  return (
    <section id="nosotros" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-1/2 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl group">
              <img 
                src={displayImage} 
                alt="Sobre La Brea Tours" 
                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h4 className="text-xl font-bold font-display uppercase tracking-wider">Patrimonio Local</h4>
                <p className="text-sm opacity-80 mt-1">Distrito de La Brea, Talara.</p>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="inline-flex items-center space-x-3 mb-6">
              <span className="w-10 h-0.5 bg-sky-400"></span>
              <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-sky-500">Nosotros</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight font-display">
              Turismo Consciente en <span className="text-sky-500">La Brea</span>
            </h2>
            <div className="space-y-6 text-gray-600 text-base md:text-lg leading-relaxed">
              <p>En **{BRAND_NAME}**, somos apasionados relatores de la historia de Negritos. Conectamos a los viajeros con la esencia real de nuestro distrito.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-sky-500 flex items-center justify-center text-white shadow-md"><i className="fa-solid fa-users"></i></div>
                  <div><h5 className="font-bold text-black mb-1">Guías Locales</h5><p className="text-sm">Expertos en la zona.</p></div>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-sky-500 flex items-center justify-center text-white shadow-md"><i className="fa-solid fa-leaf"></i></div>
                  <div><h5 className="font-bold text-black mb-1">Sostenible</h5><p className="text-sm">Respeto al entorno.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
