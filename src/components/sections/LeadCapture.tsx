
import React, { useState } from 'react';
import { GOOGLE_SCRIPT_URL } from '../../constants';

interface LeadCaptureProps {
  onToast: (m: string, t: any) => void;
  downloadUrl?: string;
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({ onToast, downloadUrl }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const cleanDownloadUrl = downloadUrl?.trim();

  const validateEmail = (email: string) => {
    if (!email) return "El correo es obligatorio";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return "Ingresa un correo válido";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError(null);
    setIsSubmitting(true);

    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            fecha: new Date().toLocaleString(),
            origen: 'Formulario Guía Secreta'
          })
        });
        
        onToast("¡Suscripción exitosa! Tu guía está lista para descargar.", "success");
        setIsSubscribed(true);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubscribed(true);
        onToast("Modo Demo: Guía desbloqueada.", "info");
      }
    } catch (error) {
      console.error("Error al enviar lead:", error);
      onToast("Hubo un error. Intenta por WhatsApp.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-sky-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <i className="fa-solid fa-map text-[30rem] -top-20 -right-20 absolute rotate-12"></i>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-2xl">
          <div className="w-full md:w-1/2">
            <span className="text-sky-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">Exclusivo para viajeros</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display italic text-black leading-tight">
              {isSubscribed ? '¡Guía Desbloqueada!' : 'Descarga la Guía Secreta de Negritos'}
            </h2>
            <p className="text-gray-500 mt-4 text-sm md:text-base italic">
              {isSubscribed 
                ? 'Gracias por suscribirte. Haz clic en el botón para obtener tu mapa de tesoros locales.' 
                : 'Descubre 5 playas vírgenes y los mejores puntos para fotos que solo los locales conocemos. ¡Gratis!'}
            </p>
          </div>
          
          <div className="w-full md:w-1/2 min-h-[140px] flex items-center justify-center">
            {isSubscribed ? (
              <div className="w-full animate-fade-in-scale">
                <a 
                  href={cleanDownloadUrl || '#'} 
                  download="Guia-Secreta-Negritos.pdf"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-6 bg-amber-400 text-black rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-2xl flex items-center justify-center space-x-4 group transform hover:scale-105"
                >
                  <i className="fa-solid fa-file-pdf text-xl animate-bounce"></i>
                  <span>Descargar Guía (PDF)</span>
                  <i className="fa-solid fa-circle-down text-lg opacity-50 group-hover:opacity-100"></i>
                </a>
                <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest mt-4 font-bold">
                  <i className="fa-solid fa-check-circle text-green-500 mr-1"></i> Archivo listo para dispositivos móviles
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="w-full animate-fade-in">
                <div className="w-full">
                  <input 
                    type="email" 
                    disabled={isSubmitting}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="Tu correo electrónico"
                    className={`w-full px-6 py-4 bg-gray-50 border ${error ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-100 focus:ring-sky-500'} rounded-full focus:outline-none focus:ring-2 font-medium transition-all disabled:opacity-50`}
                  />
                  {error && (
                    <p className="mt-3 ml-6 text-[10px] text-red-500 font-black uppercase tracking-widest animate-fade-in flex items-center">
                      <i className="fa-solid fa-triangle-exclamation mr-2 text-xs"></i> {error}
                    </p>
                  )}
                </div>
                
                <button 
                  disabled={isSubmitting}
                  className={`w-full py-4 bg-black text-white rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-sky-500 transition-all shadow-lg flex items-center justify-center space-x-3 disabled:bg-gray-400 ${error ? 'mt-6' : 'mt-4'}`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-circle-notch animate-spin"></i>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <span>Enviar Guía a mi Email</span>
                      <i className="fa-solid fa-paper-plane"></i>
                    </>
                  )}
                </button>
                <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest mt-4">No enviamos spam, solo contenido épico.</p>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </section>
  );
};
