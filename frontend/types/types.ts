
export enum Condition {
  MINT = 'Mint',
  GOOD = 'Good',
  FAIR = 'Fair'
}

export interface Product {
  id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  condition: Condition;
  imageUrl: string;
  statusText: string;
  statusIcon: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
