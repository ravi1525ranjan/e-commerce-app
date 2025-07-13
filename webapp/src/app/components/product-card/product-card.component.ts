import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../../models/product';
import { Router} from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input () product! : ProductInterface
  router = inject(Router);

  onCardClick(productId: any) {
    // Navigate to the product details page
    // This can be implemented using Angular Router
    console.log(`Navigating to product details for ID: ${productId}`);
    this.router.navigate(['/product', productId]);
  }
}
