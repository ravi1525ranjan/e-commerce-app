import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../../services/category.service';
import { MatSelectModule } from '@angular/material/select';
import { BrandService } from '../../../services/brand.service';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatCheckboxModule
    
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  // Import FormBuilder from Angular's Reactive Forms module

  formBuilder = inject(FormBuilder);
  productForm = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, Validators.required],
    shortDescription: ['', Validators.required],
    discount: [0],
    images: this.formBuilder.array([]), // Assuming you will handle image uploads separately
    categoryId: ['', Validators.required],
    brandId: ['', Validators.required], // Assuming you have a brandId field
    isFeatured: [false],
    isNewArrival: [false],
  });
  categories: any;
  categoryService = inject(CategoryService); // Assuming you have a CategoryService to fetch categories
  brandService = inject(BrandService); // Assuming you have a BrandService to fetch brands
  productService = inject(ProductService); // Assuming you have a ProductService to handle product operations
  router = inject(Router); // Assuming you have a Router to navigate after product creation
  activatedRoute = inject(ActivatedRoute);

  brands: any;
  productFormValue: any;
  productId: any;

  constructor() {
    // Initialize the form with default values or any necessary setup
  }

  ngOnInit() {
    // Any additional initialization logic can go here
    // this.addImage();
    this.getCategories();
    this.getBrands();

    this.activatedRoute.params.subscribe((params) => {
      this.productId = params['id'];
      if (this.productId) {
        // If an ID is present, fetch the product details to populate the form
        this.productService
          .getProductById(this.productId)
          .subscribe((response: any) => {
            console.log('Product Data: ', response.product);
            this.productForm.patchValue({
              name: response.product.name,
              description: response.product.description,
              price: response.product.price,
              shortDescription: response.product.shortDescription,
              discount: response.product.discount,
              categoryId: response.product.categoryId,
              brandId: response.product.brandId,
              isFeatured: response.product.isFeatured,
              isNewArrival: response.product.isNewArrival,
            });
            // Assuming images are stored as an array of strings in the product object
            // this.images.clear();
            response.product.images.forEach((image: string) => {
              this.images.push(this.formBuilder.control(image));
            });
          });
      }
    });
  }

  get images() {
    return this.productForm.get('images') as FormArray;
  }

  addImage() {
    // Logic to add an image to the form array
    this.images.push(this.formBuilder.control(''));
    // This could involve opening a file picker and uploading the image
    // For now, we will just log a message
    console.log('Add Image functionality not implemented yet');
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      console.log('Categories Data: ', data);
      this.categories = data.categories; // Assuming the API returns an object with a 'categories' array
    });
  }

  getBrands() {
    // Logic to fetch brands from a service
    this.brandService.getBrands().subscribe((data: any) => {
      console.log('brands Data: ', data);
      this.brands = data.brands; // Assuming the API returns an object with a 'categories' array
    });
  }

  removeImage() {
    // Logic to remove an image from the form array
    this.images.removeAt(this.images.length - 1);
  }

  onCategoryChange(event: any) {
    // Logic to handle category change
    console.log('Selected Category:', event.value);
    // You can perform additional actions based on the selected category
  }

  addProduct() {
    // Logic to handle form submission
    console.log('Product Form Submitted', this.productForm.value);
    this.productFormValue = this.productForm.value;
    this.productService.createProduct(this.productFormValue).subscribe({
      next: (response: any) => {
        console.log('Product created successfully:', response);
        alert('Product created successfully!');
        this.productForm.reset(); // Reset the form after successful submission
        this.router.navigate(['/admin/products']); // Navigate to the products list or any other page
      },
      error: (error: any) => {
        console.error('Error creating product:', error);
        alert('Failed to create product. Please try again.');
      },
    });
  }

  updateProduct() {
    // Logic to handle form submission for updating a product
    console.log('Product Form Submitted', this.productForm.value);
    this.productFormValue = this.productForm.value;
    this.productService
      .updateProduct(this.productId, this.productFormValue)
      .subscribe({
        next: (response: any) => {
          console.log('Product updated successfully:', response);
          alert('Product updated successfully!');
          this.router.navigate(['/admin/products']); // Navigate to the products list or any other page
        },
        error: (error: any) => {
          console.error('Error updating product:', error);
          alert('Failed to update product. Please try again.');
        },
      });
  }
}
