import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { BrandService } from '../../../services/brand.service';


@Component({
  selector: 'app-brand-form',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatSelectModule
  ],
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.scss',
})
export class BrandFormComponent {
  brandName = '';
  brandService = inject(BrandService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  brandId: any;

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.brandId = params['id'];
      if (params['id']) {
        this.brandService.getBrands().subscribe((data: any) => {
          const brand = data.brands.find(
            (cat: any) => cat._id === params['id']
          );
          if (brand) {
            this.brandName = brand.name;
          } else {
            console.error('Brand not found');
          }
        });
      }
    });
  }
  addBrand() {
    console.log('Form submitted. Name:', this.brandName);
    this.brandService.createBrand({ name: this.brandName }).subscribe({
      next: (response) => {
        alert('Brand created successfully!');
        this.router.navigateByUrl('/admin/brands');
      },
      error: (error) => {
        console.error('Error creating brand:', error);
      },
    });
  }
  editBrand() {
    console.log('Form submitted. Name:', this.brandName);
    this.brandService
      .updateBrand(this.brandId, { name: this.brandName })
      .subscribe({
        next: (response) => {
          alert('Brand updated successfully!');
          this.router.navigateByUrl('/admin/brands');
        },
        error: (error) => {
          console.error('Error updating brand:', error);
        },
      });
  }
}
