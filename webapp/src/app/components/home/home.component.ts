import { Component, inject } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { ProductInterface } from '../../models/product';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";
import { CarouselModule} from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AuthService } from '../../services/auth.service';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    ProductCardComponent,
    CarouselModule
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }
  customerService = inject(CustomerService);
  authService = inject(AuthService)
  categorryService = inject(CategoryService)
  newProductList: ProductInterface[] = [];
  featuredProductList: ProductInterface[] = [];

  userName : any
  categoriesList : any
  isAdmin: any
  constructor() {
    this.userName = this.authService.getUserData()
    this.isAdmin = this.authService.isAdmin()
   }

  ngOnInit(): void {
    this.userName = this.authService.getUserData()
    this.isAdmin = this.authService.isAdmin()
    // Initialization logic can go here
    this.getNewProducts();
    this.getFeaturedProducts();
    this.getCategories()
  }

  getNewProducts() {
    this.customerService.getNewProducts().subscribe((response:any )=> {
      console.log('New Products:', response.products);
      this.newProductList = response.products;
    });
  }

  getFeaturedProducts() {
    this.customerService.getFeaturedProducts().subscribe((response:any ) => {
      console.log('Featured Products:', response.products);
      this.featuredProductList = response.products;
    });
  }

  getCategories(){
    console.log("user name", this.userName)
    this.categorryService.getCategories().subscribe((response: any) => {
      // Assuming response.categories is an array of categories
      if (!Array.isArray(response.categories)) {
        console.error('Invalid categories format:', response.categories);
        return;
      }
      // Assign the categories to the component property
      if (response.categories.length === 0) {
        console.warn('No categories found');
      }
      console.log('Categories fetched successfully:', response.categories);
      this.categoriesList = response.categories;
    });
  }
}
