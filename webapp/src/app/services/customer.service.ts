import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ProductInterface } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  http = inject(HttpClient);
  constructor() { }

  getNewProducts() {
    return this.http.get<ProductInterface[]>(`${environment.apiUrl}customer/new-products`);
  }

  getFeaturedProducts() {
    return this.http.get<ProductInterface[]>(`${environment.apiUrl}customer/features-products`);
  }

  getProductList(searchTerm:string, categoryId:string, brandId:string, sortBy:string, sortOrder:number, pageSize:number, page:number){
    return this.http.get<ProductInterface[]>(`${environment.apiUrl}customer/products-by-query?searchTerm=${searchTerm}&categoryId=${categoryId}&brandId=${brandId}&sortBy=${sortBy}&sortOrder=${sortOrder}&pageSize=${pageSize}&page=${page}`)
  }
}
