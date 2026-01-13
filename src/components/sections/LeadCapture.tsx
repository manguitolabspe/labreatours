
import React, { useState } from 'react';
import { GOOGLE_SCRIPT_URL } from '../../constants';
import { translations } from '../../translations';

interface LeadCaptureProps {
  onToast: (m: string, t: any) => void;
  downloadUrl?: string;
  language: 'es' | 'en';
}

export const LeadCapture: React.FC<LeadCaptureProps> = ({ onToast, downloadUrl, language }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const t = translations[language];
  const cleanDownloadUrl = downloadUrl?.trim();

  const validateEmail = (email: string) => {
    if (!email) return language === 'es' ? "El correo es obligatorio" : "Email is required";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) return language === 'es' ? "Ingresa un correo válido" : "Enter a valid email";
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
        // Enviamos con origen de Guía para que el script lo guarde en 'Leads'
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            origen: 'Formulario Guía Secreta',
            fecha_registro: new Date().toLocaleString()
          })
        });
        
        onToast(language === 'es' ? "¡Suscripción exitosa!" : "Success!", "success");
        setIsSubscribed(true);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubscribed(true);
      }
    } catch (error) {
      onToast(language === 'es' ? "Hubo un error." : "Error.", "error");
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
            <span className="text-sky-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-4 block">{t.lead_label}</span>
            <h2 className="text-3xl md:text-4xl font-bold font-display italic text-black leading-tight">
              {isSubscribed ? t.lead_unlocked : t.lead_title}
            </h2>
            <p className="text-gray-500 mt-4 text-sm md:text-base italic">
              {isSubscribed ? t.lead_thanks : t.lead_desc}
            </p>
          </div>
          
          <div className="w-full md:w-1/2 min-h-[140px] flex items-center justify-center">
            {isSubscribed ? (
              <div className="w-full animate-fade-in-scale">
                <a 
                  href={cleanDownloadUrl || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full py-6 bg-amber-400 text-black rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-black hover:text-white transition-all shadow-2xl flex items-center justify-center space-x-4 group transform hover:scale-105"
                >
                  <i className="fa-solid fa-file-pdf text-xl animate-bounce"></i>
                  <span>{t.lead_download}</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="w-full">
                <input 
                  type="email" 
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.lead_placeholder}
                  className={`w-full px-6 py-4 bg-gray-50 border ${error ? 'border-red-400' : 'border-gray-100'} rounded-full focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium transition-all text-black`}
                />
                {error && <p className="mt-3 ml-6 text-[10px] text-red-500 font-bold uppercase tracking-widest">{error}</p>}
                
                <button 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white rounded-full font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-sky-500 transition-all shadow-lg mt-4"
                >
                  {isSubmitting ? "..." : t.lead_btn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
