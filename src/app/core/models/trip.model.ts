export interface Trip {
  id: string;
  operatorName: string;
  operatorLogo?: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  amenities: Amenity[];
  busType: string;
  date: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  available: boolean;
}

export interface SearchCriteria {
  from: string;
  to: string;
  date: string;
  passengers: number;
}

export interface Seat {
  id: string;
  number: string;
  row: number;
  column: number;
  type: 'regular' | 'premium' | 'disabled';
  status: 'available' | 'booked' | 'selected';
  price?: number;
}

export interface SeatMap {
  tripId: string;
  layout: {
    rows: number;
    columns: number;
    aisleAfterColumn?: number;
  };
  seats: Seat[];
}