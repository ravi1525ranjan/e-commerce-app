import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { NgImageSliderModule } from 'ng-image-slider';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDividerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    CommonModule,
    NgImageSliderModule,
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  product: any;
  carouselImages: any;
  // {
  //   name: 'Wireless Headphones',
  //   price: 2999,
  //   description: 'High-quality wireless headphones with noise cancellation.',
  //   details: 'Bluetooth 5.0, 20hr battery life, Fast Charging, Comfortable Fit.',
  //   images: [
  //     'assets/images/headphone-1.jpg',
  //     'assets/images/headphone-2.jpg',
  //     'assets/images/headphone-3.jpg'
  //   ],
  //   reviews: [
  //     { user: 'Amit', comment: 'Great sound quality!' },
  //     { user: 'Neha', comment: 'Very comfortable and long battery life.' }
  //   ]
  // };

  activatedRoute = inject(ActivatedRoute);
  productService = inject(ProductService);
  productId: any;
  selectedImage: any;

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      console.log('productId', this.productId);
    });
    this.productService
      .getProductById(this.productId)
      .subscribe((response: any) => {
        console.log('product by Id cons--', response);
        this.product = response.product;
        this.carouselImages = this.product?.images.map((img: any) => ({
          image: img,
          thumbImage: img,
        }));
        // this.selectedImage = this.product.images[0];
      });
  }

  ngOninit() {
    this.productService
      .getProductById(this.productId)
      .subscribe((response: any) => {
        console.log('product by Id oninit--', response);
        this.product = response.product;
        this.carouselImages = this.product.images.map((img: any) => ({
          image: img,
          thumbImage: img,
        }));
        // this.selectedImage = this.product.images[0];
      });
  }

  get discountedPrice(): number {
  const discount = this.product.price * (this.product.discount / 100);
  return (this.product.price - discount);
}
}
