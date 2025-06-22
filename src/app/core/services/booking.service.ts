import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { BookingState, Booking, Passenger } from '../models/booking.model';
import { Trip, Seat } from '../models/trip.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingStateSubject = new BehaviorSubject<BookingState>({
    selectedSeats: [],
    passengers: [],
    totalAmount: 0,
    currentStep: 'search'
  });

  public bookingState$ = this.bookingStateSubject.asObservable();

  constructor(private apiService: ApiService) {}

  get currentBookingState(): BookingState {
    return this.bookingStateSubject.value;
  }

  setTrip(trip: Trip): void {
    this.updateBookingState({
      trip,
      currentStep: 'seats'
    });
  }

  selectSeats(seats: Seat[]): void {
    const totalAmount = this.calculateTotalAmount(seats);
    this.updateBookingState({
      selectedSeats: seats,
      totalAmount,
      currentStep: 'passenger'
    });
  }

  setPassengers(passengers: Passenger[]): void {
    this.updateBookingState({
      passengers,
      currentStep: 'payment'
    });
  }

  proceedToPayment(): void {
    this.updateBookingState({
      currentStep: 'payment'
    });
  }

  completeBooking(): Observable<Booking> {
    const state = this.currentBookingState;
    
    const bookingData: Partial<Booking> = {
      tripId: state.trip!.id,
      passengers: state.passengers,
      selectedSeats: state.selectedSeats.map(seat => seat.id),
      totalAmount: state.totalAmount
    };

    return this.apiService.createBooking(bookingData);
  }

  resetBooking(): void {
    this.bookingStateSubject.next({
      selectedSeats: [],
      passengers: [],
      totalAmount: 0,
      currentStep: 'search'
    });
  }

  private updateBookingState(updates: Partial<BookingState>): void {
    const currentState = this.currentBookingState;
    this.bookingStateSubject.next({
      ...currentState,
      ...updates
    });
  }

  private calculateTotalAmount(seats: Seat[]): number {
    const state = this.currentBookingState;
    const basePrice = state.trip?.price || 0;
    const seatPremium = seats.reduce((total, seat) => total + (seat.price || 0), 0);
    
    return (basePrice * seats.length) + seatPremium;
  }
}