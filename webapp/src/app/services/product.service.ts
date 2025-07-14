import { effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../models/product';
import { CategoryInterface } from '../models/category';
import { BrandInterface } from '../models/brand';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  http = inject(HttpClient);

  // Signal for brands list
  brands = signal<BrandInterface[]>([]);

  constructor() {
       effect(() => {
          this.getBrands();
        });
  }

  getProducts() {
    return this.http.get<ProductInterface[]>(
      `${environment.apiUrl}products/get-products`
    );
  }

  createProduct(product: any) {
    return this.http.post(
      `${environment.apiUrl}products/create-product`,
      product
    );
  }

  updateProduct(id: string, product: any) {
    return this.http.put(
      `${environment.apiUrl}products/update-product/${id}`,
      product
    );
  }

  deleteProduct(id: string) {
    return this.http.delete(
      `${environment.apiUrl}products/delete-product/${id}`
    );
  }

  getProductById(id: string) {
    return this.http.get<ProductInterface>(
      `${environment.apiUrl}products/get-product/${id}`
    );
  }

  getBrands() {
    this.http
      .get<BrandInterface[]>(`${environment.apiUrl}brands/get-brands`)
      .subscribe((response: any) => {
        console.log('brandlist list--->', response);
        this.brands.set(response.brands);
      });
  }
}
