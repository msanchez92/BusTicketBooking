export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank_transfer' | 'wallet';
  name: string;
  icon: string;
  enabled: boolean;
}

export interface PaymentRequest {
  bookingId: string;
  amount: number;
  currency: string;
  paymentMethodId: string;
  cardDetails?: CardDetails;
}

export interface CardDetails {
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  cardholderName: string;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  redirectUrl?: string;
}

export interface PaymentState {
  methods: PaymentMethod[];
  selectedMethod?: PaymentMethod;
  processing: boolean;
  error?: string;
}