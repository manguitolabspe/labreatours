
export interface Tour {
  id: string;
  title_es: string;
  title_en: string;
  description_es: string;
  description_en: string;
  price: string;
  duration: string;
  imageUrl: string;
  category: 'Aventura' | 'Historia' | 'Relajación' | 'Naturaleza';
  popular?: boolean;
  spots?: number;
  lastTourHours?: number;
}

export interface Review {
  name: string;
  city: string;
  text_es: string;
  text_en: string;
  stars: number;
}

export interface FaqItem {
  q_es: string;
  q_en: string;
  a_es: string;
  a_en: string;
}

export interface BusinessSettings {
  brandName: string;
  phone: string;
  email: string;
  location: string;
  aboutImageUrl?: string;
  aboutText_es?: string;
  aboutText_en?: string;
  secretGuideUrl?: string;
  showLeadCapture?: boolean;
  showTestimonials?: boolean;
  showFaqs?: boolean;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  twitter?: string;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface BookingData {
  name: string;
  email: string;
  tourId: string;
  date: string;
  guests: number;
}
