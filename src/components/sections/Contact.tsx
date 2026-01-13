
import React, { useState } from 'react';
import { SocialLinks } from '../ui/SocialLinks';
import { ToastType, BusinessSettings } from '../../types';

interface ContactProps {
  onToast: (msg: string, type: ToastType) => void;
  settings: BusinessSettings;
}

export const Contact: React.FC<ContactProps> = ({ onToast, settings }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.mensaje.trim()) newErrors.mensaje = "Escribe tu consulta";
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio";
    else if (!re.test(formData.email)) newErrors.email = "Email no válido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onToast("Mensaje enviado con éxito. Te responderemos pronto.", "success");
    setFormData({ nombre: '', email: '', mensaje: '' });
    setIsSubmitting(false);
  };

  return (
    <section id="contacto" className="py-24 md:py-32 relative overflow-hidden px-4 bg-white">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-sky-50/30 -z-10 skew-x-12 transform origin-top"></div>
      
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] overflow-hidden border border-gray-100">
          
          <div className="lg:w-2/5 bg-black text-white p-10 md:p-16 flex flex-col justify-between">
            <div>
              <div className="w-12 h-1 bg-sky-500 mb-8 rounded-full"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 font-display leading-[1.1]">
                Planifica tu <br />
                <span className="text-sky-400">Tour</span>
              </h2>
              <p className="text-gray-400 mb-12 text-base md:text-lg leading-relaxed font-light italic">
                Estamos en {settings.location}. Reserva directamente para una atención personalizada.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                    <i className="fa-solid fa-phone text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500">Teléfono</h4>
                    <p className="text-white font-mono text-lg tracking-tighter">{settings.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                    <i className="fa-solid fa-envelope text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-500">Email</h4>
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
            <h3 className="text-2xl font-bold mb-10 text-black font-display tracking-tight">Envíanos un mensaje</h3>
            <form onSubmit={handleFormSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Nombre</label>
                  <input 
                    type="text" 
                    value={formData.nombre}
                    onChange={(e) => {
                      setFormData({...formData, nombre: e.target.value});
                      if (errors.nombre) setErrors({...errors, nombre: ''});
                    }}
                    className={`w-full px-5 py-4 bg-gray-50 border ${errors.nombre ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-100'} rounded-xl focus:border-sky-500 focus:outline-none transition-all`} 
                    placeholder="Tu nombre" 
                  />
                  {errors.nombre && <p className="mt-2 text-[9px] text-red-500 font-bold uppercase tracking-widest animate-fade-in">{errors.nombre}</p>}
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Correo</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({...formData, email: e.target.value});
                      if (errors.email) setErrors({...errors, email: ''});
                    }}
                    className={`w-full px-5 py-4 bg-gray-50 border ${errors.email ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-100'} rounded-xl focus:border-sky-500 focus:outline-none transition-all`} 
                    placeholder="tu@correo.com" 
                  />
                  {errors.email && <p className="mt-2 text-[9px] text-red-500 font-bold uppercase tracking-widest animate-fade-in">{errors.email}</p>}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Mensaje</label>
                <textarea 
                  rows={4} 
                  value={formData.mensaje}
                  onChange={(e) => {
                    setFormData({...formData, mensaje: e.target.value});
                    if (errors.mensaje) setErrors({...errors, mensaje: ''});
                  }}
                  className={`w-full px-5 py-4 bg-gray-50 border ${errors.mensaje ? 'border-red-400 ring-2 ring-red-50' : 'border-gray-100'} rounded-xl focus:border-sky-500 focus:outline-none transition-all resize-none`} 
                  placeholder="¿En qué tour estás interesado?"
                ></textarea>
                {errors.mensaje && <p className="mt-2 text-[9px] text-red-500 font-bold uppercase tracking-widest animate-fade-in">{errors.mensaje}</p>}
              </div>
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-12 py-5 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-sky-600 transition-all rounded-full shadow-xl disabled:bg-gray-400"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
