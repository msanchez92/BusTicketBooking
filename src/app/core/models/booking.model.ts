export interface Passenger {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  documentType: 'passport' | 'id' | 'license';
  documentNumber: string;
  dateOfBirth?: string;
  type: 'adult' | 'child' | 'senior';
}

export interface Booking {
  id?: string;
  tripId: string;
  passengers: Passenger[];
  selectedSeats: string[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  bookingDate: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  confirmationCode?: string;
  qrCode?: string;
}

export interface BookingState {
  trip?: Trip;
  selectedSeats: Seat[];
  passengers: Passenger[];
  totalAmount: number;
  currentStep: 'search' | 'seats' | 'passenger' | 'payment' | 'confirmation';
}

import { Trip, Seat } from './trip.model';