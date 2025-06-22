import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { SearchCriteria } from '../../core/models/trip.model';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  searchForm: FormGroup;
  isSearching = false;
  minDate: string;

  popularRoutes = [
    { from: 'New York', to: 'Boston', startingPrice: 35, operators: 8, dailyTrips: 24 },
    { from: 'Los Angeles', to: 'San Francisco', startingPrice: 42, operators: 6, dailyTrips: 18 },
    { from: 'Chicago', to: 'Detroit', startingPrice: 28, operators: 5, dailyTrips: 15 },
    { from: 'Miami', to: 'Orlando', startingPrice: 25, operators: 7, dailyTrips: 20 },
    { from: 'Seattle', to: 'Portland', startingPrice: 32, operators: 4, dailyTrips: 12 },
    { from: 'Dallas', to: 'Houston', startingPrice: 30, operators: 6, dailyTrips: 16 }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private notificationService: NotificationService
  ) {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];

    this.searchForm = this.fb.group({
      from: ['', [Validators.required, Validators.minLength(2)]],
      to: ['', [Validators.required, Validators.minLength(2)]],
      date: [this.minDate, Validators.required],
      passengers: [1, [Validators.required, Validators.min(1)]]
    });
  }

  onSearch(): void {
    if (this.searchForm.valid) {
      this.isSearching = true;
      
      const searchCriteria: SearchCriteria = this.searchForm.value;
      
      // Simulate search delay
      setTimeout(() => {
        this.router.navigate(['/search'], {
          queryParams: searchCriteria
        });
        this.isSearching = false;
      }, 500);
    } else {
      this.notificationService.warning('Please fill in all required fields');
      this.markFormGroupTouched();
    }
  }

  searchRoute(route: any): void {
    this.searchForm.patchValue({
      from: route.from,
      to: route.to,
      date: this.minDate,
      passengers: 1
    });
    
    this.onSearch();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.searchForm.controls).forEach(key => {
      const control = this.searchForm.get(key);
      control?.markAsTouched();
    });
  }
}