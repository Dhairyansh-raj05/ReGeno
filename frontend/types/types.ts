export enum Condition {
  MINT = 'Mint',
  GOOD = 'Good',
  FAIR = 'Fair'
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  currentPrice: number;
  originalPrice: number;
  condition: Condition;
  imageUrl: string;
  statusText: string;
  statusIcon: string;
  category: string;
  description: string;
  specs: { label: string; value: string }[];
  includes: string[];
  badge?: string;
}

export interface Game {
  id: string;
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  platform: string;
  genre: string;
  rating: string;
  year: number;
  description: string;
  features: string[];
  badge?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Accessory {
  id: string;
  name: string;
  brand: string;
  currentPrice: number;
  originalPrice: number;
  imageUrl: string;
  category: string;
  badge?: string;
  description: string;
  compatibility: string;
  features: string[];
}
