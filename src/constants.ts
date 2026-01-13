
import { Tour, NavItem } from './types';

/**
 * Configuración Base (Valores por defecto)
 */
export const BRAND_NAME = "La Brea Tours";
export const PHONE_NUMBER = "997 579 482";
export const EMAIL = "labreatours@gmail.com";
export const LOCATION = "La Brea - Negritos | Talara, Piura";

/**
 * Configuración de Google Sheets
 * PUEDES AGREGAR MÁS IDs SI NECESITAS LEER DE OTROS ARCHIVOS:
 * export const GOOGLE_SHEET_ID_EXTRA = "OTRO_ID_AQUÍ";
 */
export const GOOGLE_SHEET_ID = "1CMvwdvvgPtARLjKdnad79_CNsyeb5XGhk4cbxL2Hhw4";

// GIDs de las pestañas
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
