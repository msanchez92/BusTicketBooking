import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { User, AuthState, LoginRequest, RegisterRequest } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor(private apiService: ApiService) {
    this.loadStoredAuth();
  }

  get currentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  get isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  get token(): string | null {
    return this.authStateSubject.value.token;
  }

  login(credentials: LoginRequest): Observable<any> {
    this.setLoading(true);
    
    return this.apiService.login(credentials).pipe(
      tap(response => {
        this.setAuthState(response.user, response.token);
        this.storeAuth(response.user, response.token);
        this.setLoading(false);
      })
    );
  }

  register(userData: RegisterRequest): Observable<any> {
    this.setLoading(true);
    
    return this.apiService.register(userData).pipe(
      tap(response => {
        this.setAuthState(response.user, response.token);
        this.storeAuth(response.user, response.token);
        this.setLoading(false);
      })
    );
  }

  logout(): void {
    this.clearAuth();
    this.authStateSubject.next({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  }

  private setAuthState(user: User, token: string): void {
    this.authStateSubject.next({
      user,
      token,
      isAuthenticated: true,
      isLoading: false
    });
  }

  private setLoading(loading: boolean): void {
    const currentState = this.authStateSubject.value;
    this.authStateSubject.next({
      ...currentState,
      isLoading: loading
    });
  }

  private storeAuth(user: User, token: string): void {
    localStorage.setItem('busgo_user', JSON.stringify(user));
    localStorage.setItem('busgo_token', token);
  }

  private loadStoredAuth(): void {
    const storedUser = localStorage.getItem('busgo_user');
    const storedToken = localStorage.getItem('busgo_token');

    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser);
        this.setAuthState(user, storedToken);
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  private clearAuth(): void {
    localStorage.removeItem('busgo_user');
    localStorage.removeItem('busgo_token');
  }
}