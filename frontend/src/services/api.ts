import axios, { AxiosError, AxiosInstance } from 'axios';
import { DonationData, PaymentIntentResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 429) {
          console.error('Rate limit exceeded');
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): Error {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || 'An error occurred';
      
      switch (status) {
        case 400:
          return new Error(`Invalid request: ${message}`);
        case 401:
          return new Error('Unauthorized access');
        case 429:
          return new Error('Too many requests. Please try again later.');
        case 500:
          return new Error('Internal server error. Please try again later.');
        default:
          return new Error(message);
      }
    }
    return error;
  }

  async createPaymentIntent(data: DonationData): Promise<PaymentIntentResponse> {
    try {
      const response = await this.api.post<PaymentIntentResponse>(
        '/payments/create-payment-intent',
        data
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw this.handleError(error);
      }
      throw error;
    }
  }

  async verifyDonation(paymentIntentId: string): Promise<{ status: string }> {
    try {
      const response = await this.api.get(`/payments/verify/${paymentIntentId}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw this.handleError(error);
      }
      throw error;
    }
  }

  async getDonationHistory(email: string): Promise<DonationData[]> {
    try {
      const response = await this.api.get(`/payments/history`, {
        params: { email }
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw this.handleError(error);
      }
      throw error;
    }
  }
}

export const apiService = new ApiService();