
import React, { useState, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { CustomCalendar } from './CustomCalendar';
import { Tour, BusinessSettings } from '../../types';
import { translations } from '../../translations';
import { GOOGLE_SCRIPT_URL } from '../../constants';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (message: string) => void;
  tours: Tour[];
  settings: BusinessSettings;
  initialTourId?: string;
  language: 'es' | 'en';
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, onSuccess, tours, settings, initialTourId, language }) => {
  const t = translations[language];
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tourId: '',
    date: '',
    guests: 1
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialTourId) {
        setFormData(prev => ({ ...prev, tourId: initialTourId }));
      }
    } else {
      setFormData({ name: '', email: '', tourId: '', date: '', guests: 1 });
      setStep(1);
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, initialTourId]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = language === 'es' ? 'El nombre es obligatorio' : 'Name is required';
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = language === 'es' ? 'Ingresa un correo válido' : 'Invalid email';
    if (!formData.tourId) newErrors.tourId = language === 'es' ? 'Debes seleccionar un tour' : 'Please select a tour';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.date) newErrors.date = language === 'es' ? 'Debes seleccionar una fecha' : 'Please select a date';
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
      setErrors({});
    }
  };

  const logToSpreadsheet = async (tourTitle: string) => {
    if (!GOOGLE_SCRIPT_URL) return;
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          origen: 'Intento Reserva Web',
          fecha_registro: new Date().toLocaleString('es-PE'),
          nombre: formData.name,
          email: formData.email,
          tour: tourTitle,
          fecha_tour: formData.date,
          pasajeros: formData.guests
        })
      });
    } catch (e) {
      console.warn("Spreadsheet logging failed", e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1() && validateStep2()) {
      setIsSubmitting(true);
      const selectedTour = tours.find(t => t.id === formData.tourId);
      const tourTitle = selectedTour ? (language === 'es' ? selectedTour.title_es : selectedTour.title_en) : 'Tour';
      
      await logToSpreadsheet(tourTitle);

      const messageText = `¡Hola ${settings.brandName}! 👋\n\n` +
        `Solicitud de reserva desde la Web:\n\n` +
        `👤 *Nombre:* ${formData.name}\n` +
        `📧 *Correo:* ${formData.email}\n` +
        `🗺️ *Tour:* ${tourTitle}\n` +
        `📅 *Fecha:* ${formData.date}\n` +
        `👥 *Pasajeros:* ${formData.guests}\n\n`;

      const whatsappUrl = `https://wa.me/51${settings.phone.replace(/\s/g, '')}?text=${encodeURIComponent(messageText)}`;
      window.open(whatsappUrl, '_blank');

      onSuccess(language === 'es' ? "Redirigiendo a WhatsApp..." : "Redirecting to WhatsApp...");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.booking_title}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {step === 1 ? (
          <div className="space-y-6 animate-fade-in">
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">{t.booking_tour_label}</label>
              <select 
                value={formData.tourId} 
                onChange={(e) => setFormData({...formData, tourId: e.target.value})}
                className={`w-full p-4 bg-gray-50 border ${errors.tourId ? 'border-red-500' : 'border-gray-100'} rounded-xl focus:outline-none font-medium text-black`}
              >
                <option value="">{t.booking_tour_placeholder}</option>
                {tours.map(t => (
                  <option key={t.id} value={t.id} disabled={t.spots === 0}>
                    {language === 'es' ? t.title_es : t.title_en} - {t.price} {t.spots === 0 ? `(${translations[language].tours_sold_out})` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">{t.booking_name_label}</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`w-full p-4 bg-gray-50 border ${errors.name ? 'border-red-400' : 'border-gray-100'} rounded-xl focus:outline-none font-medium text-black`}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">{t.booking_email_label}</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full p-4 bg-gray-50 border ${errors.email ? 'border-red-400' : 'border-gray-100'} rounded-xl focus:outline-none font-medium text-black`}
                />
              </div>
            </div>

            <button 
              type="button" 
              onClick={handleNextStep}
              className="w-full py-5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-sky-600 transition-all flex items-center justify-center space-x-3"
            >
              <span>{t.booking_btn_next}</span>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
               <button type="button" onClick={() => setStep(1)} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-black flex items-center">
                 <i className="fa-solid fa-arrow-left mr-2"></i> {t.booking_btn_back}
               </button>
               <div className="text-[10px] font-bold text-sky-500 uppercase tracking-widest">{t.booking_step} 2 {t.booking_de} 2</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <CustomCalendar 
                  selectedDate={formData.date} 
                  onSelect={(date) => setFormData({...formData, date})} 
                />
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">{t.booking_guests_label}</label>
                  <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-xl border border-gray-100">
                    <button type="button" onClick={() => setFormData(f => ({...f, guests: Math.max(1, f.guests - 1)}))} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition-all"><i className="fa-solid fa-minus"></i></button>
                    <span className="flex-grow text-center font-bold text-xl text-black">{formData.guests}</span>
                    <button type="button" onClick={() => setFormData(f => ({...f, guests: f.guests + 1}))} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm hover:bg-black hover:text-white transition-all"><i className="fa-solid fa-plus"></i></button>
                  </div>
                </div>

                <div className={`p-6 ${formData.date ? 'bg-sky-50 border-sky-100' : 'bg-gray-50 border-gray-100'} rounded-2xl border transition-colors`}>
                  <h5 className={`font-bold ${formData.date ? 'text-sky-900' : 'text-gray-400'} mb-2 text-sm uppercase tracking-wider`}>{t.booking_selection_label}</h5>
                  <p className={`text-sm ${formData.date ? 'text-sky-700' : 'text-gray-400'} font-medium italic`}>
                    {formData.date ? formData.date : t.booking_selection_placeholder}
                  </p>
                </div>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full py-5 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl hover:bg-sky-600 transition-all disabled:bg-gray-400"
            >
              {isSubmitting ? "..." : t.booking_btn_confirm}
            </button>
          </div>
        )}
      </form>
    </Modal>
  );
};
