import axios, { AxiosError, AxiosInstance } from "axios";
import {
  DonationFormData,
  RazorpayOrderResponse,
  RazorpayOptions,
} from "../types/donation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
const RAZORPAY_KEY = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;

class RazorpayService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error("API Error:", error);
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): Error {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "An error occurred";

      switch (status) {
        case 400:
          return new Error(`Invalid request: ${message}`);
        case 401:
          return new Error("Unauthorized access");
        case 429:
          return new Error("Too many requests. Please try again later.");
        case 500:
          return new Error("Internal server error. Please try again later.");
        default:
          return new Error(message);
      }
    }
    return error;
  }

  async createOrder(data: DonationFormData): Promise<RazorpayOrderResponse> {
    try {
      const response = await this.api.post("/payments/create-order", {
        ...data,
        amount: data.amount * 100, // Convert to paise for Razorpay
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  async verifyPayment(paymentData: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) {
    try {
      const response = await this.api.post("/payments/verify", paymentData);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  getRazorpayOptions(
    orderData: RazorpayOrderResponse,
    userData: DonationFormData
  ): RazorpayOptions {
    return {
      key: RAZORPAY_KEY,
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Archana Ramkishori Foundation",
      description: "Donation for NGO",
      order_id: orderData.id,
      prefill: {
        name: userData.name,
        email: userData.email,
        contact: userData.phone,
      },
      notes: {
        address: "Foundation Headquarters",
      },
      theme: {
        color: "#3399cc",
      },
    };
  }
}

export const razorpayService = new RazorpayService();
