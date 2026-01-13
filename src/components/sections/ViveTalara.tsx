
import React from 'react';

export const ViveTalara: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-sky-900 to-black relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-400 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-sky-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          
          {/* Mockup / Visual */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative group">
              {/* Sombra brillante detrás del móvil */}
              <div className="absolute inset-0 bg-sky-500/20 blur-[80px] rounded-full group-hover:bg-sky-500/30 transition-all duration-700"></div>
              
              {/* Simulación de Smartphone */}
              <div className="relative w-[280px] h-[580px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden transform lg:-rotate-6 group-hover:rotate-0 transition-transform duration-700">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20"></div>
                <img 
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800" 
                  alt="Vive Talara App Interface" 
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8">
                  <div className="w-12 h-12 bg-white rounded-xl mb-4 flex items-center justify-center shadow-lg">
                    <i className="fa-solid fa-location-dot text-sky-600 text-xl"></i>
                  </div>
                  <h4 className="text-white font-bold text-2xl font-display italic">¡Vive Talara!</h4>
                  <p className="text-gray-300 text-xs mt-2 uppercase tracking-widest">Guía de Bolsillo</p>
                </div>
              </div>

              {/* Elemento flotante adicional */}
              <div className="absolute -bottom-6 -right-6 md:-right-12 bg-white p-6 rounded-2xl shadow-2xl hidden md:block animate-float">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <i className="fa-solid fa-mobile-screen-button"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Digital</p>
                    <p className="text-sm font-bold text-black italic">100% Mobile Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Texto / CTA */}
          <div className="w-full lg:w-1/2 text-white order-1 lg:order-2">
            <div className="inline-flex items-center space-x-3 mb-8">
              <span className="w-12 h-px bg-sky-400"></span>
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-sky-400">Próximo Nivel</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold font-display italic leading-none mb-8">
              Tu Guía Digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-white">de Bolsillo</span>
            </h2>
            
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12 italic">
              "Lleva toda la provincia de Talara en tu smartphone. Descubre gastronomía, hoteles, eventos y rutas secretas con nuestra web hermana."
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="mt-1 text-sky-400"><i className="fa-solid fa-circle-check"></i></div>
                <p className="text-gray-300">Acceso instantáneo sin descargas pesadas.</p>
              </div>
              <div className="flex items-start space-x-4">
                <div className="mt-1 text-sky-400"><i className="fa-solid fa-circle-check"></i></div>
                <p className="text-gray-300">Geolocalización real para encontrar lo más cercano.</p>
              </div>
            </div>

            <a 
              href="https://vivetalara.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-4 px-10 py-6 bg-white text-black rounded-full font-bold uppercase text-[11px] tracking-[0.2em] hover:bg-sky-400 hover:text-white transition-all shadow-2xl group"
            >
              <span>Visitar ViveTalara.com</span>
              <i className="fa-solid fa-external-link text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>

        </div>
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
