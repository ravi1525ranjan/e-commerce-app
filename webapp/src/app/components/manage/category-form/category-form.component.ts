import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CategoryFormComponent {
  categoryName = '';
  categoryService = inject(CategoryService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  categoryId: any;

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryId = params['id'];
      if (params['id']) {
        this.categoryService.getCategories().subscribe((data: any) => {
          const category = data.categories.find(
            (cat: any) => cat._id === params['id']
          );
          if (category) {
            this.categoryName = category.name;
          } else {
            console.error('Category not found');
          }
        });
      }
    });
  }
  addCategory() {
    console.log('Form submitted. Name:', this.categoryName);
    this.categoryService.createCategory({ name: this.categoryName }).subscribe({
      next: (response) => {
        alert('Category created successfully!');
        this.router.navigateByUrl('/admin/categories');
      },
      error: (error) => {
        console.error('Error creating category:', error);
      },
    });
  }
  editCategory() {
    console.log('Form submitted. Name:', this.categoryName);
    this.categoryService
      .updateCategory(this.categoryId, { name: this.categoryName })
      .subscribe({
        next: (response) => {
          alert('Category updated successfully!');
          this.router.navigateByUrl('/admin/categories');
        },
        error: (error) => {
          console.error('Error updating category:', error);
        },
      });
  }
}
