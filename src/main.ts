import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { appConfig } from './app/app.config';
import { HeaderComponent } from './app/shared/components/header.component';
import { FooterComponent } from './app/shared/components/footer.component';
import { LoadingService } from './app/core/services/loading.service';
import { NotificationService } from './app/core/services/notification.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <div class="min-h-screen flex flex-col">
      <!-- Loading overlay -->
      <div 
        *ngIf="loadingService.isLoading$ | async"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        role="status"
        aria-label="Loading">
        <div class="bg-white rounded-lg p-6 flex items-center space-x-3">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
          <span class="text-gray-700">Loading...</span>
        </div>
      </div>

      <!-- Notification -->
      <div 
        *ngIf="notificationService.notification$ | async as notification"
        class="fixed top-4 right-4 z-40 animate-slide-up"
        [attr.aria-live]="notification.type === 'error' ? 'assertive' : 'polite'">
        <div 
          class="rounded-lg p-4 shadow-lg max-w-sm"
          [ngClass]="{
            'bg-green-50 border border-green-200 text-green-800': notification.type === 'success',
            'bg-red-50 border border-red-200 text-red-800': notification.type === 'error',
            'bg-blue-50 border border-blue-200 text-blue-800': notification.type === 'info',
            'bg-yellow-50 border border-yellow-200 text-yellow-800': notification.type === 'warning'
          }">
          <div class="flex items-start">
            <div class="flex-1">
              <p class="font-medium">{{ notification.title }}</p>
              <p *ngIf="notification.message" class="mt-1 text-sm opacity-90">
                {{ notification.message }}
              </p>
            </div>
            <button 
              (click)="notificationService.clear()"
              class="ml-3 flex-shrink-0 rounded-md p-1 hover:bg-black hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2"
              [class.focus:ring-green-500]="notification.type === 'success'"
              [class.focus:ring-red-500]="notification.type === 'error'"
              [class.focus:ring-blue-500]="notification.type === 'info'"
              [class.focus:ring-yellow-500]="notification.type === 'warning'"
              aria-label="Close notification">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <app-header></app-header>
      
      <main class="flex-1" role="main">
        <router-outlet></router-outlet>
      </main>
      
      <app-footer></app-footer>
    </div>
  `
})
export class App {
  constructor(
    public loadingService: LoadingService,
    public notificationService: NotificationService
  ) {}
}

bootstrapApplication(App, appConfig);