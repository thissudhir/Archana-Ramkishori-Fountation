import { z } from "zod";

export const donationSchema = z.object({
  amount: z.number().min(1, "Amount must be at least 1"),
  email: z.string().email("Invalid email address"),
  currency: z.string().default("INR"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().optional(),
});

export type DonationFormData = z.infer<typeof donationSchema>;

export interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string;
  };
  theme?: {
    color: string;
  };
}

export interface DonationFormProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}
