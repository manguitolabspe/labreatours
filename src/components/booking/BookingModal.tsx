
import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { CustomCalendar } from './CustomCalendar';
import { Tour, BusinessSettings } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  tours: Tour[];
  settings: BusinessSettings;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSuccess, tours, settings }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tourId: '',
    date: '',
    guests: 1
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Ingresa un correo válido';
    if (!formData.tourId) newErrors.tourId = 'Debes seleccionar un tour';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.date) newErrors.date = 'Debes seleccionar una fecha en el calendario';
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1() && validateStep2()) {
      const selectedTour = tours.find(t => t.id === formData.tourId);
      const tourTitle = selectedTour ? selectedTour.title : 'Tour seleccionado';
      
      const messageText = `¡Hola ${settings.brandName}! 👋\n\n` +
        `Me gustaría solicitar una reserva para un tour:\n\n` +
        `👤 *Nombre:* ${formData.name}\n` +
        `📧 *Correo:* ${formData.email}\n` +
        `🗺️ *Tour:* ${tourTitle}\n` +
        `📅 *Fecha:* ${formData.date}\n` +
        `👥 *Pasajeros:* ${formData.guests}\n\n` +
        `Espero su confirmación. ¡Muchas gracias! ✨`;

      const whatsappUrl = `https://wa.me/51${settings.phone.replace(/\s/g, '')}?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank');

      onSuccess(`Redirigiendo a WhatsApp de ${settings.brandName}.`);
      onClose();
      // Reset form
      setFormData({ name: '', email: '', tourId: '', date: '', guests: 1 });
      setStep(1);
      setErrors({});
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reserva tu Experiencia">
      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 ? (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">¿Qué tour deseas?</label>
              <select 
                value={formData.tourId} 
                onChange={(e) => {
                  setFormData({...formData, tourId: e.target.value});
                  if (errors.tourId) setErrors({...errors, tourId: ''});
                }}
                className={`w-full p-4 bg-gray-50 border ${errors.tourId ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none focus:bg-white focus:border-sky-500 transition-all font-medium text-black`}
              >
                <option value="">Selecciona una opción</option>
                {tours.map(t => <option key={t.id} value={t.id}>{t.title} - {t.price}</option>)}
              </select>
              {errors.tourId && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider">{errors.tourId}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Nombre Completo</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({...formData, name: e.target.value});
                    if (errors.name) setErrors({...errors, name: ''});
                  }}
                  className={`w-full p-4 bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none font-medium text-black placeholder:text-gray-300`}
                  placeholder="Ej. Marina S."
                />
                {errors.name && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider">{errors.name}</p>}
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Correo</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) setErrors({...errors, email: ''});
                  }}
                  className={`w-full p-4 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none font-medium text-black placeholder:text-gray-300`}
                  placeholder="hola@tu.com"
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold uppercase tracking-wider">{errors.email}</p>}
              </div>
            </div>

            <button 
              type="button" 
              onClick={handleNextStep}
              className="w-full py-5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-sky-600 transition-all flex items-center justify-center space-x-3"
            >
              <span>Continuar con la fecha</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
               <button type="button" onClick={() => { setStep(1); setErrors({}); }} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black flex items-center">
                 <i className="fa-solid fa-arrow-left mr-2"></i> Volver atrás
               </button>
               <div className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">Paso 2 de 2</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <CustomCalendar 
                  selectedDate={formData.date} 
                  onSelect={(date) => {
                    setFormData({...formData, date});
                    if (errors.date) setErrors({...errors, date: ''});
                  }} 
                />
                {errors.date && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-wider text-center">{errors.date}</p>}
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Número de Personas</label>
                  <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <button type="button" onClick={() => setFormData(f => ({...f, guests: Math.max(1, f.guests - 1)}))} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition-all"><i className="fa-solid fa-minus"></i></button>
                    <span className="flex-grow text-center font-bold text-xl text-black">{formData.guests}</span>
                    <button type="button" onClick={() => setFormData(f => ({...f, guests: f.guests + 1}))} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition-all"><i className="fa-solid fa-plus"></i></button>
                  </div>
                </div>

                <div className={`p-6 ${formData.date ? 'bg-sky-50 border-sky-100' : 'bg-gray-50 border-gray-100'} rounded-2xl border transition-colors`}>
                  <h5 className={`font-bold ${formData.date ? 'text-sky-900' : 'text-gray-400'} mb-2 text-sm uppercase tracking-wider`}>Tu Selección</h5>
                  <p className={`text-sm ${formData.date ? 'text-sky-700' : 'text-gray-400'} font-medium italic`}>
                    {formData.date ? `Fecha: ${formData.date}` : 'Selecciona una fecha en el calendario'}
                  </p>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-sky-600 transition-all active:scale-95"
            >
              Confirmar y Enviar a WhatsApp
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
};
