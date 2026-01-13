
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
    setIsLoadingData(true);
    try {
      // 1. Cargar Configuración (Settings)
      try {
        const settingRows = await fetchCSV(GID_SETTINGS);
        if (settingRows.length > 0) {
          const updates: any = {};
          settingRows.forEach(row => {
            const key = row[0]?.replace(/^"|"$/g, '').trim().toLowerCase();
            const val = row[1]?.replace(/^"|"$/g, '').trim();
            if (!key || !val) return;

            if (key === 'brand_name') updates.brandName = val;
            if (key === 'whatsapp') updates.phone = val;
            if (key === 'email') updates.email = val;
            if (key === 'location') updates.location = val;
            if (key === 'secret_guide_url') updates.secretGuideUrl = val; 
            if (key === 'show_lead_capture') updates.showLeadCapture = val.toLowerCase() === 'true' || val === '1';
            if (key === 'show_testimonials') updates.showTestimonials = val.toLowerCase() === 'true' || val === '1';
            if (key === 'show_faqs') updates.showFaqs = val.toLowerCase() === 'true' || val === '1';
            if (key === 'facebook') updates.facebook = val;
            if (key === 'instagram') updates.instagram = val;
            if (key === 'tiktok') updates.tiktok = val;
            if (key === 'youtube') updates.youtube = val;
            if (key === 'twitter') updates.twitter = val;
          });
          
          setSettings(prev => ({ ...prev, ...updates }));
        }
      } catch (e) { console.warn("Error cargando settings, usando defaults"); }

      // 2. Cargar Tours
      try {
        const tourRows = await fetchCSV(GID_TOURS);
        if (tourRows.length > 1) {
          const headers = tourRows[0].map(h => h.replace(/^"|"$/g, '').trim().toLowerCase());
          const idx = {
            id: headers.indexOf('id'),
            title: headers.indexOf('title'),
            desc: headers.indexOf('description'),
            price: headers.indexOf('price'),
            duration: headers.indexOf('duration'),
            img: headers.indexOf('imageurl'),
            cat: headers.indexOf('category'),
            pop: headers.indexOf('popular')
          };
          const fetchedTours: Tour[] = tourRows.slice(1)
            .filter(cols => cols.length > 1 && (cols[idx.title] || cols[1])?.trim() !== '')
            .map((cols, i) => {
              const clean = (val: string) => val?.replace(/^"|"$/g, '').trim() || '';
              return {
                id: clean(cols[idx.id !== -1 ? idx.id : 0]) || i.toString(),
                title: clean(cols[idx.title !== -1 ? idx.title : 1]),
                description: clean(cols[idx.desc !== -1 ? idx.desc : 2]),
                price: clean(cols[idx.price !== -1 ? idx.price : 3]),
                duration: clean(cols[idx.duration !== -1 ? idx.duration : 4]),
                imageUrl: clean(cols[idx.img !== -1 ? idx.img : 5]),
                category: (clean(cols[idx.cat !== -1 ? idx.cat : 6]) as any) || 'Aventura',
                popular: clean(cols[idx.pop])?.toLowerCase() === 'true' || clean(cols[idx.pop]) === '1'
              };
            });
          setTours(fetchedTours);
        }
      } catch (e) { console.error("Error cargando tours:", e); }

      // 3. Cargar Testimonios
      try {
        const reviewRows = await fetchCSV(GID_TESTIMONIALS);
        if (reviewRows.length > 1) {
          const fetchedReviews: Review[] = reviewRows.slice(1)
            .filter(cols => cols.length >= 3)
            .map(cols => ({
              name: cols[0]?.replace(/^"|"$/g, '').trim(),
              city: cols[1]?.replace(/^"|"$/g, '').trim(),
              text: cols[2]?.replace(/^"|"$/g, '').trim(),
              stars: parseInt(cols[3]) || 5
            }));
          setReviews(fetchedReviews);
        }
      } catch (e) { console.warn("Pestaña testimonios no disponible"); }

      // 4. Cargar FAQ
      try {
        const faqRows = await fetchCSV(GID_FAQ);
        if (faqRows.length > 1) {
          const fetchedFaqs: FaqItem[] = faqRows.slice(1)
            .filter(cols => cols.length >= 2)
            .map(cols => ({
              q: cols[0]?.replace(/^"|"$/g, '').trim(),
              a: cols[1]?.replace(/^"|"$/g, '').trim()
            }));
          setFaqs(fetchedFaqs);
        }
      } catch (e) { console.warn("Pestaña FAQ no disponible"); }

    } catch (error) {
      console.error("Error general Sheets:", error);
    } finally {
      setIsLoadingData(false);
      setTimeout(() => setShowPreloader(false), 800);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (tourId?: string) => {
    setPreselectedTourId(tourId);
    setIsBookingOpen(true);
  };

  const renderContent = () => {
    switch (currentPath) {
      case 'inicio': 
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <TrustBar />
            <Tours 
              tours={tours.slice(0, 2)} 
              isLoading={isLoadingData} 
              title="Tours Destacados" 
              onBookTour={handleOpenBooking}
            />
            {!isLoadingData && tours.length > 0 && (
              <div className="flex justify-center pb-20 bg-gray-50/50">
                <button 
                  onClick={() => handleNavigate('tours')}
                  className="px-12 py-5 bg-black text-white rounded-full font-bold uppercase text-[11px] tracking-widest hover:bg-sky-500 transition-all shadow-xl transform hover:scale-105 active:scale-95"
                >
                  Ver Catálogo Completo
                </button>
              </div>
            )}
            <ViveTalara />
            {settings.showLeadCapture && (
              <LeadCapture onToast={addToast} downloadUrl={settings.secretGuideUrl} />
            )}
            {settings.showTestimonials && (
              <Testimonials reviews={reviews} />
            )}
            {settings.showFaqs && (
              <FAQ items={faqs} />
            )}
          </>
        );
      case 'tours': 
        return <Tours tours={tours} isLoading={isLoadingData} onBookTour={handleOpenBooking} />;
      case 'nosotros': 
        return (
          <>
            <About />
            {settings.showLeadCapture && (
              <LeadCapture onToast={addToast} downloadUrl={settings.secretGuideUrl} />
            )}
          </>
        );
      case 'contacto': 
        return (
          <>
            <Contact onToast={addToast} settings={settings} />
            {settings.showFaqs && (
              <FAQ items={faqs} />
            )}
          </>
        );
      default: return <Hero onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-sky-100 selection:text-black overflow-x-hidden flex flex-col">
      <InitialLoader isVisible={showPreloader} />
      
      <Navbar 
        currentPath={currentPath} 
        onNavigate={handleNavigate} 
        onOpenBooking={() => handleOpenBooking()}
        settings={settings}
      />
      
      <main className="flex-grow pt-20">
        {renderContent()}
      </main>
      
      <Footer onNavigate={handleNavigate} settings={settings} />

      <a 
        href={`https://wa.me/51${settings.phone.replace(/\s/g, '')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[150] bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform md:w-16 md:h-16"
      >
        <i className="fa-brands fa-whatsapp text-2xl md:text-3xl"></i>
      </a>

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => { setIsBookingOpen(false); setPreselectedTourId(undefined); }} 
        onSuccess={(msg) => addToast(msg, 'success')}
        tours={tours}
        settings={settings}
        initialTourId={preselectedTourId}
      />
      
      <ToastContainer toasts={toasts} onClose={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />
    </div>
  );
}

export default App;
