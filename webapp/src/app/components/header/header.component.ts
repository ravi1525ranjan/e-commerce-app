import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { CategoryInterface } from '../../models/category';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    RouterLink,
    MatMenuModule,
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  categorryService = inject(CategoryService);
  router = inject(Router);
  authService = inject(AuthService)
  categoriesList = this.authService.categories
  isLoggedIn = this.authService.isLoggedIn
  userName: any;
  isAdmin:any
  searchTerm:any

  constructor() {
    this.userName = this.authService.username
    this.isAdmin = this.authService.isAdminLoggedIn
    this.isLoggedIn = this.authService.isLoggedIn
    console.log("user logged in status--->",this.isLoggedIn())
  }

  ngOnInit() {

  }

  redirectToHomePage() {
    // Navigate to the home page
    console.log('Redirecting to home page');
    this.router.navigate(['/']);
  }

  onSearch(event: any) {
    // Implement search functionality here
    console.log('Search initiated', event.target.value);
    if (event.target.value) {
      // Perform search operation
      console.log('Searching for:', event.target.value);
      this.router.navigate(['/products'], {
        queryParams: { q: event.target.value },
      });
    }
  }

  getAllProductsOfCategory(categoryId: any) {
    // Implement click functionality here
    console.log('Header clicked', categoryId);
    this.searchTerm = ''
    if (categoryId) {
      this.router.navigate(['/products'], {
        queryParams: { category: categoryId },
      });
    }
  }

  logoutUser() {
    this.authService.logOut()
  }
}
