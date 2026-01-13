
import React from 'react';
import { BRAND_NAME } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-sky-100/30 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          <div className="w-full lg:w-1/2 relative group order-2 lg:order-1">
            <div className="relative z-10 rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&q=80&w=1200" 
                alt="Negritos Landscape" 
                className="w-full h-[400px] md:h-[550px] lg:h-[650px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <i className="fa-solid fa-camera-retro text-3xl mb-4 text-sky-300"></i>
                <h4 className="text-2xl md:text-3xl font-display italic font-bold">Patrimonio de La Brea</h4>
                <p className="text-sm md:text-base opacity-80 mt-2 max-w-sm">Preservando la historia y el entorno natural de nuestra provincia.</p>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-sky-400 rounded-tl-3xl -z-10 hidden md:block"></div>
          </div>
          
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="inline-flex items-center space-x-3 mb-6">
              <span className="w-12 h-0.5 bg-sky-400"></span>
              <span className="text-[11px] uppercase tracking-[0.4em] font-bold text-sky-500">Quiénes somos</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-10 leading-tight font-display italic">
              Impulsando el <span className="text-sky-500 underline decoration-sky-100 underline-offset-8">Turismo Consciente</span>
            </h2>
            <div className="space-y-6 md:space-y-8 text-gray-600 text-base md:text-lg leading-relaxed italic">
              <p>
                En **{BRAND_NAME}**, somos apasionados relatores de la historia de Negritos. No solo guiamos, sino que conectamos a los viajeros con la esencia del distrito de La Brea.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 mt-10 md:mt-12">
                <div className="flex items-start space-x-4 p-5 md:p-7 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm transition-all hover:border-sky-300 hover:bg-white group">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-sky-500 shadow-md group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-users-viewfinder text-2xl"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-black mb-1">Local Focus</h5>
                    <p className="text-sm leading-snug">Conocimiento profundo del terreno y su historia.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4 p-5 md:p-7 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-100 shadow-sm transition-all hover:border-sky-300 hover:bg-white group">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-sky-500 shadow-md group-hover:scale-110 transition-transform">
                    <i className="fa-solid fa-sun-plant-wilt text-2xl"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-black mb-1">Eco Travesía</h5>
                    <p className="text-sm leading-snug">Respeto total por el entorno marino y desértico.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 md:mt-12 p-6 md:p-8 border-l-4 border-sky-400 bg-sky-50/30 rounded-r-2xl">
                <p className="text-gray-500 font-medium italic text-sm md:text-base leading-relaxed">
                  "Nuestra misión es poner en valor el Distrito La Brea, resaltando su importancia como el hito geográfico más occidental de nuestro continente."
                </p>
              </div>
            </div>
            
            <button className="mt-10 md:mt-14 px-12 py-5 bg-black text-white text-[11px] font-bold uppercase tracking-widest hover:bg-sky-600 transition-all rounded-full flex items-center space-x-4 shadow-2xl transform hover:-translate-y-1">
              <span>Nuestra Trayectoria</span>
              <i className="fa-solid fa-chevron-right text-[10px]"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
