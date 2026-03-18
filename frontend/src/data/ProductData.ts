import { Gamepad2, Monitor, Cpu, Joystick } from "lucide-react";

export interface Category {
  id: string;
  name: string;
  icon: any;
}

export interface ProductModel {
  id: string;
  categoryId: string;
  brand: string;
  name: string;
  basePrice: number;
}

export const CATEGORIES: Category[] = [
  { id: "consoles", name: "Consoles", icon: Gamepad2 },
  { id: "handhelds", name: "Handhelds", icon: Joystick },
  { id: "retro", name: "Retro Hardware", icon: Monitor },
  { id: "pc", name: "PC Components", icon: Cpu },
];

export const MODELS: ProductModel[] = [
  // Consoles
  { id: "ps5", categoryId: "consoles", brand: "Sony", name: "PlayStation 5", basePrice: 35000 },
  { id: "ps5-digital", categoryId: "consoles", brand: "Sony", name: "PlayStation 5 Digital Edition", basePrice: 32000 },
  { id: "ps4-pro", categoryId: "consoles", brand: "Sony", name: "PlayStation 4 Pro", basePrice: 15000 },
  { id: "ps4-slim", categoryId: "consoles", brand: "Sony", name: "PlayStation 4 Slim", basePrice: 12000 },
  { id: "xbox-series-x", categoryId: "consoles", brand: "Microsoft", name: "Xbox Series X", basePrice: 32000 },
  { id: "xbox-series-s", categoryId: "consoles", brand: "Microsoft", name: "Xbox Series S", basePrice: 18000 },
  
  // Handhelds
  { id: "switch-oled", categoryId: "handhelds", brand: "Nintendo", name: "Switch OLED", basePrice: 18000 },
  { id: "switch-v2", categoryId: "handhelds", brand: "Nintendo", name: "Switch V2", basePrice: 14000 },
  { id: "steam-deck-512", categoryId: "handhelds", brand: "Valve", name: "Steam Deck 512GB", basePrice: 30000 },
  
  // Retro
  { id: "ps2", categoryId: "retro", brand: "Sony", name: "PlayStation 2", basePrice: 3000 },
  { id: "ps3", categoryId: "retro", brand: "Sony", name: "PlayStation 3", basePrice: 6000 },
  { id: "n64", categoryId: "retro", brand: "Nintendo", name: "Nintendo 64", basePrice: 4000 },
  { id: "gamecube", categoryId: "retro", brand: "Nintendo", name: "GameCube", basePrice: 5000 },
  
  // PC Components
  { id: "rtx-4090", categoryId: "pc", brand: "NVIDIA", name: "RTX 4090", basePrice: 120000 },
  { id: "rtx-4080", categoryId: "pc", brand: "NVIDIA", name: "RTX 4080", basePrice: 80000 },
  { id: "rtx-3080", categoryId: "pc", brand: "NVIDIA", name: "RTX 3080", basePrice: 35000 },
  { id: "rx-7900-xtx", categoryId: "pc", brand: "AMD", name: "Radeon RX 7900 XTX", basePrice: 75000 },
];

export const CONDITIONS = [
  { 
    id: "brand-new", 
    name: "Brand New", 
    description: "Flawless condition, sealed or completely unused with all original accessories.", 
    multiplier: 1.0 
  },
  { 
    id: "good", 
    name: "Good", 
    description: "Minor cosmetic wear like light scratches, fully functional with accessories.", 
    multiplier: 0.8 
  },
  { 
    id: "well-used", 
    name: "Well-Used", 
    description: "Visible wear and tear, deep scratches but fully functional.", 
    multiplier: 0.6 
  },
  { 
    id: "faulty", 
    name: "Faulty", 
    description: "Not working perfectly, hardware defects or heavy physical damage.", 
    multiplier: 0.2 
  },
];
