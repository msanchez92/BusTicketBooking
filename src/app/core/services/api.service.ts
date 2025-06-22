import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, delay, map } from 'rxjs';

import { Trip, SearchCriteria, SeatMap, Seat } from '../models/trip.model';
import { Booking, Passenger } from '../models/booking.model';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';
import { PaymentRequest, PaymentResponse, PaymentMethod } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = '/api'; // In real app, this would be your API URL

  constructor(private http: HttpClient) {}

  // Mock data for development
  private mockTrips: Trip[] = [
    {
      id: '1',
      operatorName: 'Express Lines',
      operatorLogo: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      from: 'New York',
      to: 'Boston',
      departureTime: '08:00',
      arrivalTime: '12:30',
      duration: '4h 30m',
      price: 45,
      availableSeats: 28,
      totalSeats: 50,
      date: '2025-01-20',
      busType: 'Luxury Coach',
      amenities: [
        { id: '1', name: 'Wi-Fi', icon: 'wifi', available: true },
        { id: '2', name: 'USB Charging', icon: 'usb', available: true },
        { id: '3', name: 'Restroom', icon: 'restroom', available: true },
        { id: '4', name: 'Air Conditioning', icon: 'ac', available: true }
      ]
    },
    {
      id: '2',
      operatorName: 'Metro Bus',
      operatorLogo: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      from: 'New York',
      to: 'Boston',
      departureTime: '14:15',
      arrivalTime: '18:45',
      duration: '4h 30m',
      price: 38,
      availableSeats: 15,
      totalSeats: 45,
      date: '2025-01-20',
      busType: 'Standard',
      amenities: [
        { id: '1', name: 'Wi-Fi', icon: 'wifi', available: true },
        { id: '2', name: 'USB Charging', icon: 'usb', available: false },
        { id: '3', name: 'Restroom', icon: 'restroom', available: true },
        { id: '4', name: 'Air Conditioning', icon: 'ac', available: true }
      ]
    },
    {
      id: '3',
      operatorName: 'Comfort Travel',
      operatorLogo: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      from: 'New York',
      to: 'Boston',
      departureTime: '20:00',
      arrivalTime: '00:30',
      duration: '4h 30m',
      price: 52,
      availableSeats: 35,
      totalSeats: 40,
      date: '2025-01-20',
      busType: 'Premium',
      amenities: [
        { id: '1', name: 'Wi-Fi', icon: 'wifi', available: true },
        { id: '2', name: 'USB Charging', icon: 'usb', available: true },
        { id: '3', name: 'Restroom', icon: 'restroom', available: true },
        { id: '4', name: 'Air Conditioning', icon: 'ac', available: true }
      ]
    }
  ];

  private mockPaymentMethods: PaymentMethod[] = [
    { id: '1', type: 'card', name: 'Credit/Debit Card', icon: 'credit-card', enabled: true },
    { id: '2', type: 'paypal', name: 'PayPal', icon: 'paypal', enabled: true },
    { id: '3', type: 'wallet', name: 'Digital Wallet', icon: 'wallet', enabled: true }
  ];

  // Trip search
  searchTrips(criteria: SearchCriteria): Observable<Trip[]> {
    // Simulate API call with delay
    return of(this.mockTrips.filter(trip => 
      trip.from.toLowerCase().includes(criteria.from.toLowerCase()) &&
      trip.to.toLowerCase().includes(criteria.to.toLowerCase()) &&
      trip.date === criteria.date
    )).pipe(delay(800));
  }

  // Get trip by ID
  getTripById(id: string): Observable<Trip | null> {
    const trip = this.mockTrips.find(t => t.id === id);
    return of(trip || null).pipe(delay(300));
  }

  // Get seat map for a trip
  getSeatMap(tripId: string): Observable<SeatMap> {
    const mockSeatMap: SeatMap = {
      tripId,
      layout: {
        rows: 12,
        columns: 4,
        aisleAfterColumn: 2
      },
      seats: this.generateMockSeats(12, 4)
    };
    
    return of(mockSeatMap).pipe(delay(500));
  }

  // Create booking
  createBooking(booking: Partial<Booking>): Observable<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      paymentStatus: 'pending',
      bookingDate: new Date().toISOString()
    } as Booking;
    
    return of(newBooking).pipe(delay(600));
  }

  // Process payment
  processPayment(paymentRequest: PaymentRequest): Observable<PaymentResponse> {
    // Simulate payment processing
    const success = Math.random() > 0.1; // 90% success rate
    
    const response: PaymentResponse = {
      success,
      transactionId: success ? Math.random().toString(36).substr(2, 12) : undefined,
      error: success ? undefined : 'Payment failed. Please try again.'
    };
    
    return of(response).pipe(delay(2000));
  }

  // Get payment methods
  getPaymentMethods(): Observable<PaymentMethod[]> {
    return of(this.mockPaymentMethods).pipe(delay(300));
  }

  // Authentication
  login(credentials: LoginRequest): Observable<AuthResponse> {
    // Mock successful login
    const mockUser: User = {
      id: '1',
      email: credentials.email,
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890',
      preferences: {
        favoriteRoutes: [],
        preferredSeatType: 'window',
        notifications: { email: true, sms: false, push: true },
        language: 'en',
        currency: 'USD'
      },
      createdAt: new Date().toISOString()
    };

    const response: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token'
    };

    return of(response).pipe(delay(1000));
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    // Mock successful registration
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      preferences: {
        favoriteRoutes: [],
        preferredSeatType: 'any',
        notifications: { email: true, sms: false, push: true },
        language: 'en',
        currency: 'USD'
      },
      createdAt: new Date().toISOString()
    };

    const response: AuthResponse = {
      user: mockUser,
      token: 'mock-jwt-token',
      refreshToken: 'mock-refresh-token'
    };

    return of(response).pipe(delay(1200));
  }

  // Get user bookings
  getUserBookings(userId: string): Observable<Booking[]> {
    // Mock user bookings
    const mockBookings: Booking[] = [
      {
        id: 'booking-1',
        tripId: '1',
        passengers: [{
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          documentType: 'id',
          documentNumber: '123456789',
          type: 'adult'
        }],
        selectedSeats: ['1A'],
        totalAmount: 45,
        status: 'confirmed',
        paymentStatus: 'completed',
        bookingDate: '2025-01-15T10:30:00Z',
        confirmationCode: 'BG123456'
      }
    ];

    return of(mockBookings).pipe(delay(600));
  }

  private generateMockSeats(rows: number, columns: number) {
    const seats = [];
    const seatLabels = ['A', 'B', 'C', 'D'];
    const bookedSeats = ['3A', '3B', '7C', '9A', '11D']; // Some pre-booked seats
    
    for (let row = 1; row <= rows; row++) {
      for (let col = 0; col < columns; col++) {
        const seatNumber = `${row}${seatLabels[col]}`;
        const isBooked = bookedSeats.includes(seatNumber);

        let seat:Seat = {
          id: seatNumber,
          number: seatNumber,
          row,
          column: col + 1,
          type: row <= 2 ? 'premium' : 'regular',
          status: isBooked ? 'booked' : 'available',
          price: row <= 2 ? 10 : 0 // Premium seats cost extra
        };
        
        seats.push(seat);
      }
    }
    
    return seats;
  }
}