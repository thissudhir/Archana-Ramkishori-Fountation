export interface DonationData {
  amount: number;
  email: string;
  currency?: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  error?: string;
}

export interface FocusArea {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

export interface NavigationItem {
  text: string;
  href: string;
}