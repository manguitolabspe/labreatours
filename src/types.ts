
export interface Tour {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  imageUrl: string;
  category: 'Aventura' | 'Historia' | 'Relajación' | 'Naturaleza';
  popular?: boolean;
}

export interface Review {
  name: string;
  city: string;
  text: string;
  stars: number;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface BusinessSettings {
  brandName: string;
  phone: string;
  email: string;
  location: string;
  aboutImageUrl?: string;
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
