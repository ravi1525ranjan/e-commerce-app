import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CategoryInterface } from '../models/category';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http = inject(HttpClient)
  constructor() { }

  getCategories() {
    return this.http.get<CategoryInterface[]>(environment.apiUrl +'categories/get-categories');
  }

  createCategory(category: any) {
    return this.http.post(environment.apiUrl +'categories/create-category', category);
  }

  updateCategory(id: string, category: any) {
    return this.http.put(environment.apiUrl +`categories/update-category/${id}`, category);
  }

  deleteCategory(id: string) {
    return this.http.delete(environment.apiUrl +`categories/delete-category/${id}`);
  }
}
