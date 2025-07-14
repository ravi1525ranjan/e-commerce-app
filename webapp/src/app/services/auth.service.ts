import { HttpClient } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Router } from '@angular/router';
import { CategoryInterface } from '../models/category';
import { BrandInterface } from '../models/brand';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  // Signal for username
  username = signal<string>('Guest');

  // Signal for categories list
  categories = signal<CategoryInterface[]>([]);

  // Signal for brands list
  brands = signal<BrandInterface[]>([]);

  // Signal to track loading/error (optional)
  loading = signal(false);
  error = signal<string | null>(null);

  // Signal for login state
  isAdminLoggedIn = signal<boolean>(false);

  isLoggedIn = signal<boolean>(true);

  constructor() {
    effect(() => {
      this.getCategories(); // runs once automatically
      this.getBrands();
    });
  }

  registerUser(userDetails: any) {
    return this.http.post(environment.apiUrl + 'user/create-user', userDetails);
  }

  loginUser(loginDetails: any) {
    return this.http.post(environment.apiUrl + 'user/login', loginDetails);
  }

  getUserData() {
    let userData = localStorage.getItem('user');
    if (userData) {
      console.log('userData', JSON.parse(userData));
      this.getCategories();
      this.getBrands();
      this.username.set(JSON.parse(userData).name);
      return JSON.parse(userData).name;
    } else {
      console.log('userData', null);
      return null;
    }
  }

  isUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn.set(true);
      return true;
    } else {
      this.isLoggedIn.set(false);
      return false;
    }
  }

  isAdmin() {
    let userData = localStorage.getItem('user');
    if (userData) {
      console.log('userData', JSON.parse(userData));
      this.isAdminLoggedIn.set(JSON.parse(userData).isAdmin);
      return JSON.parse(userData).isAdmin;
    } else {
      console.log('userData', null);
      return null;
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isUserLoggedIn();
    this.router.navigateByUrl('/login');
  }

  getCategories() {
    this.http
      .get<CategoryInterface[]>(
        `${environment.apiUrl}categories/get-categories`
      )
      .subscribe((response: any) => {
        console.log('catogeries list--->', response);
        this.categories.set(response.categories);
      });
  }

  getBrands() {
    this.http
      .get<BrandInterface[]>(`${environment.apiUrl}brands/get-brands`)
      .subscribe((response: any) => {
        console.log('brandlist list--->', response);
        this.brands.set(response.brands);
      });
  }
  // return this.http.get<CategoryInterface[]>(environment.apiUrl +'categories/get-categories');
}
