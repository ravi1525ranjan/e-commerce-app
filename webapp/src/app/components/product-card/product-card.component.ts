import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ProductInterface } from '../../models/product';
import { Router} from '@angular/router';
import { BrandService } from '../../services/brand.service';
import { AuthService } from '../../services/auth.service';

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
  authService = inject(AuthService)
  brandService = inject(BrandService)
  brands = this.authService.brands
  brandName:any

  onCardClick(productId: any) {
    // Navigate to the product details page
    // This can be implemented using Angular Router
    console.log(`Navigating to product details for ID: ${productId}`);
    this.router.navigate(['/product', productId]);
  }

  ngOninit(){
    this.getBrands()
  }

  getBrands(){
        // Logic to fetch brandName from a service
    this.brandService.getBrands().subscribe((data: any) => {
      this.brands = data.brands; // Assuming the API returns an object with a 'categories' array
          console.log("brand data-->",this.brands)
    });
  }

  getBrandName(brandId:any){
  this.brandName = this.brands().find((res: any) => res._id === brandId)?.name;
  return this.brandName
  }

  
}
