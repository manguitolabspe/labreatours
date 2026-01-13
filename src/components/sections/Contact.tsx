
import React, { useState } from 'react';
import { SocialLinks } from '../ui/SocialLinks';
import { ToastType, BusinessSettings } from '../../types';
import { translations } from '../../translations';
import { GOOGLE_SCRIPT_URL } from '../../constants';

const COUNTRY_CODES = [
  { code: '+51', country: 'PE', name: 'Perú' },
  { code: '+56', country: 'CL', name: 'Chile' },
  { code: '+57', country: 'CO', name: 'Colombia' },
  { code: '+54', country: 'AR', name: 'Argentina' },
  { code: '+34', country: 'ES', name: 'España' },
  { code: '+1', country: 'US', name: 'USA/Canadá' },
  { code: '+52', country: 'MX', name: 'México' },
  { code: '+593', country: 'EC', name: 'Ecuador' },
  { code: '+591', country: 'BO', name: 'Bolivia' },
  { code: '+507', country: 'PA', name: 'Panamá' },
  { code: '+598', country: 'UY', name: 'Uruguay' },
];

interface ContactProps {
  onToast: (msg: string, type: ToastType) => void;
  settings: BusinessSettings;
  language: 'es' | 'en';
}

export const Contact: React.FC<ContactProps> = ({ onToast, settings, language }) => {
  const t = translations[language];
  const [countryCode, setCountryCode] = useState('+51');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = language === 'es' ? "Nombre requerido" : "Name required";
    
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !re.test(formData.email)) {
      newErrors.email = language === 'es' ? "Email inválido" : "Invalid email";
    }

    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = language === 'es' ? "WhatsApp requerido" : "WhatsApp required";
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = language === 'es' ? "Escribe tu consulta" : "Message required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Concatenamos el código y el número para enviarlo completo
    const fullWhatsapp = `${countryCode}${formData.whatsapp}`;
    
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origen: 'Consulta Contacto',
          fecha_registro: new Date().toLocaleString('es-PE'),
          nombre: formData.nombre,
          email: formData.email,
          mensaje: formData.mensaje,
          whatsapp: fullWhatsapp 
        })
      });
      
      onToast(language === 'es' ? "¡Mensaje enviado correctamente!" : "Message sent correctly!", "success");
      setFormData({ nombre: '', email: '', whatsapp: '', mensaje: '' });
      setErrors({});
    } catch (error) {
      onToast(language === 'es' ? "Error al enviar." : "Error sending message.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 md:py-32 relative overflow-hidden px-4 bg-white">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-50/30 -z-10 skew-x-12 transform origin-top"></div>
      
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
          
          <div className="lg:w-2/5 bg-black text-white p-10 md:p-16 flex flex-col justify-between">
            <div>
              <div className="w-12 h-1 bg-sky-500 mb-8 rounded-full"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-display italic">
                {t.contact_title} <br />
                <span className="text-sky-400">{t.contact_subtitle}</span>
              </h2>
              <p className="text-gray-400 mb-12 text-base leading-relaxed font-light italic">
                {t.contact_desc}
              </p>
              
              <div className="space-y-8">
                <a href={`https://wa.me/51${settings.phone.replace(/\s/g, '')}`} target="_blank" className="flex items-center space-x-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-all">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-widest text-gray-500">{t.contact_phone_label}</h4>
                    <p className="text-white font-mono text-lg">{settings.phone}</p>
                  </div>
                </a>
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10">
              <SocialLinks 
                className="flex space-x-6" 
                itemClassName="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all" 
                config={{
                  facebook: settings.facebook,
                  instagram: settings.instagram,
                  tiktok: settings.tiktok,
                  whatsapp: settings.phone
                }}
              />
            </div>
          </div>

          <div className="lg:w-3/5 p-10 md:p-20 bg-white">
            <h3 className="text-2xl font-bold mb-10 text-black font-display italic">{t.contact_form_title}</h3>
            <form onSubmit={handleFormSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col relative">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">{t.contact_form_name}</label>
                  <input 
                    type="text" 
                    disabled={isSubmitting}
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className={`w-full px-5 py-4 bg-gray-50 border ${errors.nombre ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:border-sky-500 focus:outline-none transition-all text-black`} 
                    placeholder="Juan Pérez"
                  />
                </div>
                <div className="flex flex-col relative">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">{t.contact_form_email}</label>
                  <input 
                    type="email" 
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-5 py-4 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:border-sky-500 focus:outline-none transition-all text-black`} 
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div className="flex flex-col relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">{t.contact_form_whatsapp}</label>
                <div className="flex space-x-2">
                  <select 
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none text-black font-bold text-sm cursor-pointer"
                  >
                    {COUNTRY_CODES.map(c => (
                      <option key={c.country} value={c.code}>{c.country} ({c.code})</option>
                    ))}
                  </select>
                  <input 
                    type="tel" 
                    disabled={isSubmitting}
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({...formData, whatsapp: e.target.value.replace(/\D/g, '')})}
                    className={`flex-grow px-5 py-4 bg-gray-50 border ${errors.whatsapp ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:border-sky-500 focus:outline-none transition-all text-black font-mono`} 
                    placeholder="999 000 000"
                  />
                </div>
              </div>

              <div className="flex flex-col relative">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-2">{t.contact_form_msg}</label>
                <textarea 
                  rows={4} 
                  disabled={isSubmitting}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                  className={`w-full px-5 py-4 bg-gray-50 border ${errors.mensaje ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:border-sky-500 focus:outline-none transition-all resize-none text-black`} 
                  placeholder="Escribe tu mensaje aquí..."
                ></textarea>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-16 py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-sky-600 transition-all rounded-full shadow-xl disabled:bg-gray-400 flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <><i className="fa-solid fa-circle-notch animate-spin"></i><span>{t.contact_form_sending}</span></>
                  ) : (
                    <><i className="fa-solid fa-paper-plane text-[9px] mr-2"></i><span>{t.contact_form_btn}</span></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
