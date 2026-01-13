
import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/sections/Hero';
import { Tours } from './components/sections/Tours';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Footer } from './components/Footer';
import { BookingModal } from './components/booking/BookingModal';
import { ToastContainer } from './components/ui/Toast';
import { TrustBar } from './components/sections/TrustBar';
import { LeadCapture } from './components/sections/LeadCapture';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { InitialLoader } from './components/ui/InitialLoader';
import { ViveTalara } from './components/sections/ViveTalara';
import { translations } from './translations';
import { ToastType, Tour, Review, FaqItem, BusinessSettings } from './types';
import { 
  GOOGLE_SHEET_ID, 
  GID_TOURS, 
  GID_TESTIMONIALS, 
  GID_FAQ, 
  GID_SETTINGS,
  BRAND_NAME,
  PHONE_NUMBER,
  EMAIL,
  LOCATION
} from './constants';

function App() {
  const [currentPath, setCurrentPath] = useState('inicio');
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedTourId, setPreselectedTourId] = useState<string | undefined>(undefined);
  const [toasts, setToasts] = useState<{id: number, message: string, type: ToastType}[]>([]);
  
  const [tours, setTours] = useState<Tour[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [settings, setSettings] = useState<BusinessSettings>({
    brandName: BRAND_NAME,
    phone: PHONE_NUMBER,
    email: EMAIL,
    location: LOCATION,
    secretGuideUrl: '#',
    showLeadCapture: true,
    showTestimonials: true,
    showFaqs: true
  });
  
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const fetchCSV = async (gid: string) => {
    const url = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=${gid}&t=${Date.now()}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error en GID ${gid}`);
    const text = await response.text();
    return text.split('\n').map(row => row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));
  };

  const loadAllData = useCallback(async () => {
    // Solo cargamos si no se ha cargado antes o si es la primera vez
    setIsLoadingData(true);
    try {
      // SETTINGS
      try {
        const rows = await fetchCSV(GID_SETTINGS);
        const updates: any = {};
        rows.forEach(row => {
          const key = row[0]?.replace(/^"|"$/g, '').trim().toLowerCase();
          const val = row[1]?.replace(/^"|"$/g, '').trim();
          if (!key || !val) return;
          
          if (key === 'brand_name') updates.brandName = val;
          if (key === 'whatsapp') updates.phone = val;
          if (key === 'email') updates.email = val;
          if (key === 'location') updates.location = val;
          if (key === 'about_image_url') updates.aboutImageUrl = val;
          if (key === 'about_text_es') updates.aboutText_es = val;
          if (key === 'about_text_en') updates.aboutText_en = val;
          if (key === 'secret_guide_url') updates.secretGuideUrl = val;
          
          const isTrue = val.toLowerCase() === 'true';
          if (key === 'show_lead_capt' || key === 'show_lead_capture') updates.showLeadCapture = isTrue;
          if (key === 'show_testimonia' || key === 'show_testimonials') updates.showTestimonials = isTrue;
          if (key === 'show_faqs') updates.showFaqs = isTrue;
        });
        setSettings(prev => ({ ...prev, ...updates }));
      } catch (e) { console.error("Error settings:", e); }

      // TOURS (Cargar todas las columnas de idioma)
      try {
        const rows = await fetchCSV(GID_TOURS);
        if (rows.length > 1) {
          const headers = rows[0].map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
          const idx = {
            id: headers.indexOf('id'),
            title_es: headers.indexOf('title_es'),
            title_en: headers.indexOf('title_en'),
            desc_es: headers.indexOf('description_es'),
            desc_en: headers.indexOf('description_en'),
            price: headers.indexOf('price'),
            duration: headers.indexOf('duration'),
            img: headers.indexOf('imageurl'),
            cat: headers.indexOf('category'),
            popular: headers.indexOf('popular'),
            spots: headers.indexOf('spots'),
            lastTour: headers.indexOf('last_tour_hours')
          };
          const fetchedTours: Tour[] = rows.slice(1).filter(r => r.length > 1).map(cols => {
            const clean = (v: string) => v?.replace(/^"|"$/g, '').trim() || '';
            return {
              id: clean(cols[idx.id]),
              title_es: clean(cols[idx.title_es]),
              title_en: clean(cols[idx.title_en]) || clean(cols[idx.title_es]),
              description_es: clean(cols[idx.desc_es]),
              description_en: clean(cols[idx.desc_en]) || clean(cols[idx.desc_es]),
              price: clean(cols[idx.price]),
              duration: clean(cols[idx.duration]),
              imageUrl: clean(cols[idx.img]),
              category: clean(cols[idx.cat]) as any || 'Aventura',
              popular: clean(cols[idx.popular]).toLowerCase() === 'true',
              spots: clean(cols[idx.spots]) !== '' ? Number(clean(cols[idx.spots])) : undefined,
              lastTourHours: clean(cols[idx.lastTour]) !== '' ? Number(clean(cols[idx.lastTour])) : undefined
            };
          });
          setTours(fetchedTours);
        }
      } catch (e) {}

      // TESTIMONIALS
      try {
        const rows = await fetchCSV(GID_TESTIMONIALS);
        if (rows.length > 1) {
          const headers = rows[0].map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
          const idx = {
            name: headers.indexOf('name'),
            city: headers.indexOf('city'),
            text_es: headers.indexOf('text_es'),
            text_en: headers.indexOf('text_en'),
            stars: headers.indexOf('stars')
          };
          const fetched = rows.slice(1).filter(r => r.length > 1).map(cols => {
            const clean = (v: string) => v?.replace(/^"|"$/g, '').trim() || '';
            return {
              name: clean(cols[idx.name]),
              city: clean(cols[idx.city]),
              text_es: clean(cols[idx.text_es]),
              text_en: clean(cols[idx.text_en]) || clean(cols[idx.text_es]),
              stars: parseInt(clean(cols[idx.stars])) || 5
            };
          });
          setReviews(fetched);
        }
      } catch (e) {}

      // FAQ
      try {
        const rows = await fetchCSV(GID_FAQ);
        if (rows.length > 1) {
          const fetched = rows.slice(1).filter(r => r.length > 1).map(cols => {
            const clean = (v: string) => v?.replace(/^"|"$/g, '').trim() || '';
            return {
              q_es: clean(cols[0]),
              q_en: clean(cols[1]) || clean(cols[0]),
              a_es: clean(cols[2]),
              a_en: clean(cols[3]) || clean(cols[2])
            };
          });
          setFaqs(fetched);
        }
      } catch (e) {}

    } catch (error) {
      console.error("Error global de carga:", error);
    } finally {
      setIsLoadingData(false);
      // El preloader solo se quita una vez al inicio
      setTimeout(() => setShowPreloader(false), 800);
    }
  }, []); // Sin dependencias para que solo se cree una vez

  useEffect(() => {
    loadAllData();
  }, [loadAllData]); // Se ejecuta solo al montar el App

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (tourId?: string) => {
    setPreselectedTourId(tourId);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden flex flex-col">
      <InitialLoader isVisible={showPreloader} />
      <Navbar 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
        onOpenBooking={() => handleOpenBooking()}
        settings={settings}
        language={language}
        onLanguageChange={setLanguage}
      />
      <main className="flex-grow pt-20">
        {currentPath === 'inicio' && (
          <>
            <Hero onNavigate={handleNavigate} language={language} />
            <TrustBar language={language} />
            <Tours language={language} tours={tours.slice(0, 3)} isLoading={isLoadingData} onBookTour={handleOpenBooking} />
            <ViveTalara language={language} />
            {settings.showLeadCapture && <LeadCapture language={language} onToast={addToast} downloadUrl={settings.secretGuideUrl} />}
            {settings.showTestimonials && <Testimonials language={language} reviews={reviews} />}
            {settings.showFaqs && <FAQ language={language} items={faqs} />}
          </>
        )}
        {currentPath === 'tours' && <Tours language={language} tours={tours} isLoading={isLoadingData} onBookTour={handleOpenBooking} />}
        {currentPath === 'nosotros' && <About language={language} imageUrl={settings.aboutImageUrl} customText_es={settings.aboutText_es} customText_en={settings.aboutText_en} />}
        {currentPath === 'contacto' && <Contact language={language} onToast={addToast} settings={settings} />}
      </main>
      <Footer onNavigate={handleNavigate} settings={settings} language={language} />
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        onSuccess={(m) => addToast(m, 'success')}
        tours={tours}
        settings={settings}
        initialTourId={preselectedTourId}
        language={language}
      />
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
    </div>
  );
}

export default App;
