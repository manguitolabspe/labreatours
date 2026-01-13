
import { Tour, NavItem } from './types';

/**
 * Configuración Base (Valores por defecto si falla la carga)
 */
export const BRAND_NAME = "La Brea Tours & Adventures";
export const PHONE_NUMBER = "997 579 482";
export const EMAIL = "labreatours@gmail.com";
export const LOCATION = "Negritos - Talara, Piura (Perú)";

/**
 * Configuración de Google Sheets
 */
export const GOOGLE_SHEET_ID = "1CMvwdvvgPtARLjKdnad79_CNsyeb5XGhk4cbxL2Hhw4";

// GIDs de las pestañas proporcionados por el usuario
export const GID_TOURS = "0";
export const GID_TESTIMONIALS = "207045178";
export const GID_FAQ = "2044873712";
export const GID_SETTINGS = "965589579";
export const GID_LEADS = "1838398456"; 

export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyV7zir4hn_UEs-iIBJuCxAGbnYrC_Y5EuHtmNL9nZw4fh5tGbDRSErXdghO8BTKsCm/exec"; 

export const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', id: 'inicio', href: '#inicio' },
  { label: 'Tours', id: 'tours', href: '#tours' },
  { label: 'Nosotros', id: 'nosotros', href: '#nosotros' },
  { label: 'Contacto', id: 'contacto', href: '#contacto' },
];

export const INITIAL_TOURS: Tour[] = [];
