
import React from 'react';
import { PHONE_NUMBER, EMAIL, LOCATION, BRAND_NAME } from '../constants';

export const Contact: React.FC = () => {
  return (
    <div className="py-24 md:py-32 relative overflow-hidden px-4 sm:px-6">
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] overflow-hidden border border-gray-100">
          
          {/* Info Side */}
          <div className="lg:w-2/5 bg-black text-white p-10 md:p-16 flex flex-col justify-between relative">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
              <i className="fa-solid fa-compass text-[15rem] rotate-12"></i>
            </div>
            
            <div className="relative z-10">
              <div className="w-12 h-1 bg-sky-500 mb-8 rounded-full"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-display italic leading-tight">Hablemos de tu <br /><span className="text-sky-400">próximo tour</span></h2>
              <p className="text-gray-400 mb-12 text-base md:text-lg leading-relaxed italic font-light">
                Reserva tu aventura directamente con nosotros. Somos guías locales orgullosos de Negritos.
              </p>
              
              <div className="space-y-10">
                <a href={`https://wa.me/51${PHONE_NUMBER.replace(/\s/g, '')}`} target="_blank" rel="noopener" className="flex items-start space-x-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-sky-400 border border-white/10 transition-all group-hover:bg-sky-500 group-hover:text-white group-hover:scale-110 shadow-lg">
                    <i className="fa-brands fa-whatsapp text-2xl"></i>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">WhatsApp Oficial</h4>
                    <p className="text-white text-lg font-mono tracking-tight group-hover:text-sky-400 transition-colors">{PHONE_NUMBER}</p>
                  </div>
                </a>
                
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-sky-400 border border-white/10">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Escríbenos</h4>
                    <p className="text-white text-lg tracking-tight">{EMAIL}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-sky-400 border border-white/10">
                    <i className="fa-solid fa-map-pin text-xl"></i>
                  </div>
                  <div className="pt-1">
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Sede Local</h4>
                    <p className="text-white text-lg tracking-tight">{LOCATION}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-6 relative z-10 mt-16 md:mt-0 pt-10 md:pt-0">
              <a href="https://web.facebook.com/labreatours" target="_blank" rel="noopener" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/labreatours" target="_blank" rel="noopener" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Form Side */}
          <div className="lg:w-3/5 p-10 md:p-20 bg-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-12 text-black font-display italic">¿Cuándo nos visitas?</h3>
            <form className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Nombre Completo</label>
                  <input 
                    type="text" 
                    className="w-full py-3 bg-transparent border-b-2 border-gray-100 focus:border-sky-500 focus:outline-none transition-all font-medium text-lg"
                    placeholder="Ej. Juan Pérez"
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Correo Electrónico</label>
                  <input 
                    type="email" 
                    className="w-full py-3 bg-transparent border-b-2 border-gray-100 focus:border-sky-500 focus:outline-none transition-all font-medium text-lg"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Tu Mensaje o Plan de Viaje</label>
                <textarea 
                  rows={4}
                  className="w-full py-3 bg-transparent border-b-2 border-gray-100 focus:border-sky-500 focus:outline-none transition-all font-medium text-lg resize-none"
                  placeholder="Cuéntanos cuántos son y qué tour les interesa..."
                ></textarea>
              </div>
              
              <div className="flex pt-6">
                <button 
                  type="submit"
                  className="w-full md:w-auto px-20 py-6 bg-black text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-sky-600 transition-all rounded-full shadow-2xl flex items-center justify-center space-x-4 group transform hover:-translate-y-1 active:scale-95"
                >
                  <span>Enviar Consulta</span>
                  <i className="fa-solid fa-paper-plane text-xs group-hover:translate-x-2 transition-transform"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
