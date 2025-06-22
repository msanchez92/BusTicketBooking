import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  // {
  //   path: 'search',
  //   loadComponent: () => import('./features/search/search-results.component').then(m => m.SearchResultsComponent)
  // },
  // {
  //   path: 'booking/:tripId',
  //   loadComponent: () => import('./features/booking/seat-selection.component').then(m => m.SeatSelectionComponent)
  // },
  // {
  //   path: 'passenger-info',
  //   loadComponent: () => import('./features/booking/passenger-info.component').then(m => m.PassengerInfoComponent)
  // },
  // {
  //   path: 'payment',
  //   loadComponent: () => import('./features/payment/payment.component').then(m => m.PaymentComponent)
  // },
  // {
  //   path: 'confirmation',
  //   loadComponent: () => import('./features/payment/confirmation.component').then(m => m.ConfirmationComponent)
  // },
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes)
  // },
  // {
  //   path: 'account',
  //   loadChildren: () => import('./features/account/account.routes').then(m => m.accountRoutes)
  // },
  // {
  //   path: '**',
  //   loadComponent: () => import('./shared/components/not-found.component').then(m => m.NotFoundComponent)
  // }
];