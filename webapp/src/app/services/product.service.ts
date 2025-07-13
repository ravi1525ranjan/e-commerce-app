import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ProductInterface } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  http = inject(HttpClient);

  constructor() { }

  getProducts() {
    return this.http.get<ProductInterface[]>(`${environment.apiUrl}products/get-products`);
  }

  createProduct(product: any) {
    return this.http.post(`${environment.apiUrl}products/create-product`, product);
  }

  updateProduct(id: string, product: any) {
    return this.http.put(`${environment.apiUrl}products/update-product/${id}`, product);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.apiUrl}products/delete-product/${id}`);
  }

  getProductById(id: string) {
    return this.http.get<ProductInterface>(`${environment.apiUrl}products/get-product/${id}`);
  }
}
