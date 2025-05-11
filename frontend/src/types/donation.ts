import { z } from 'zod';

export const donationSchema = z.object({
  amount: z.number().min(1, 'Amount must be at least 1'),
  email: z.string().email('Invalid email address'),
  currency: z.string().default('USD'),
});

export type DonationFormData = z.infer<typeof donationSchema>;

export interface PaymentIntentResponse {
  clientSecret: string;
  error?: string;
}

export interface DonationFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}
