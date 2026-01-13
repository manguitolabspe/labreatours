
import React, { useState } from 'react';
import { SocialLinks } from '../ui/SocialLinks';
import { ToastType, BusinessSettings } from '../../types';
import { translations } from '../../translations';
import { GOOGLE_SCRIPT_URL } from '../../constants';

interface ContactProps {
  onToast: (msg: string, type: ToastType) => void;
  settings: BusinessSettings;
  language: 'es' | 'en';
}

export const Contact: React.FC<ContactProps> = ({ onToast, settings, language }) => {
  const t = translations[language];
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = language === 'es' ? "El nombre es obligatorio" : "Name is required";
    if (!formData.mensaje.trim()) newErrors.mensaje = language === 'es' ? "Escribe tu consulta" : "Please write your query";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = language === 'es' ? "El email es obligatorio" : "Email is required";
    else if (!re.test(formData.email)) newErrors.email = language === 'es' ? "Email no válido" : "Invalid email";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      if (GOOGLE_SCRIPT_URL) {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: formData.nombre,
            email: formData.email,
            mensaje: formData.mensaje,
            origen: 'Consulta Contacto',
            fecha_registro: new Date().toLocaleString()
          })
        });
      }
      
      onToast(language === 'es' ? "Mensaje enviado con éxito." : "Message sent successfully.", "success");
      setFormData({ nombre: '', email: '', mensaje: '' });
    } catch (error) {
      onToast(language === 'es' ? "Error al enviar." : "Error sending.", "error");
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
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-display leading-[1.1] italic">
                {t.contact_title} <br />
                <span className="text-sky-400">{t.contact_subtitle}</span>
              </h2>
              <p className="text-gray-400 mb-12 text-base md:text-lg leading-relaxed font-light italic">
                {t.contact_desc}
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                    <i className="fa-solid fa-phone text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500">{t.contact_phone_label}</h4>
                    <p className="text-white font-mono text-lg tracking-tighter">{settings.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500">{t.contact_email_label}</h4>
                    <p className="text-white text-lg tracking-tighter">{settings.email}</p>
                  </div>
                </div>
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
                  youtube: settings.youtube,
                  twitter: settings.twitter,
                  whatsapp: settings.phone
                }}
              />
            </div>
          </div>

          <div className="lg:w-3/5 p-10 md:p-20 bg-white">
            <h3 className="text-2xl font-bold mb-10 text-black font-display tracking-tight italic">{t.contact_form_title}</h3>
            <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">{t.contact_form_name}</label>
                  <input 
                    type="text" 
                    disabled={isSubmitting}
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className={`w-full px-5 py-4 bg-gray-50 border ${errors.nombre ? 'border-red-400' : 'border-gray-100'} rounded-xl focus:border-sky-500 focus:outline-none transition-all text-black`} 
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">{t.contact_form_email}</label>
                  <input 
                    type="email" 
                    disabled={isSubmitting}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-5 py-4 bg-gray-50 border ${errors.email ? 'border-red-400' : 'border-gray-100'} rounded-xl focus:border-sky-500 focus:outline-none transition-all text-black`} 
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">{t.contact_form_msg}</label>
                <textarea 
                  rows={4} 
                  disabled={isSubmitting}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({...formData, mensaje: e.target.value})}
                  className={`w-full px-5 py-4 bg-gray-50 border ${errors.mensaje ? 'border-red-400' : 'border-gray-100'} rounded-xl focus:border-sky-500 focus:outline-none transition-all resize-none text-black`} 
                ></textarea>
              </div>
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-12 py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-sky-600 transition-all rounded-full shadow-xl disabled:bg-gray-400"
                >
                  {isSubmitting ? t.contact_form_sending : t.contact_form_btn}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
