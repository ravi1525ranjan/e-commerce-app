import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BrandInterface } from '../models/brand';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  http = inject(HttpClient);
  constructor() { }

  getBrands() {
    return this.http.get<BrandInterface[]>(environment.apiUrl +'brands/get-brands');
  }

  createBrand(brand: any) {
    return this.http.post(environment.apiUrl +'brands/create-brand', brand);
  }

  updateBrand(id: string, brand: any) {
    return this.http.put(environment.apiUrl +`brands/update-brand/${id}`, brand);
  }

  deleteBrand(id: string) {
    return this.http.delete(environment.apiUrl +`brands/delete-brand/${id}`);
  }

  getBrandById(id: string) {
    return this.http.get<any>(environment.apiUrl +`brands/get-brand/${id}`);
  }

  getBrandsByCategory(categoryId: string) {
    return this.http.get<any[]>(environment.apiUrl +`brands/get-brands-by-category/${categoryId}`);
  }
}
