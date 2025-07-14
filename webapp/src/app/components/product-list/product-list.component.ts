import { Component, inject } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductInterface } from '../../models/product';
import { CustomerService } from '../../services/customer.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    ProductCardComponent,
    MatExpansionModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: ProductInterface[] = [];
  filteredProducts: ProductInterface[] = [];
  brands: any[] = [];
  selectedBrands: string[] = [];
  customerService = inject(CustomerService);
  activatedRoute = inject(ActivatedRoute);
  brandService = inject(BrandService);
  searchTerm: string = '';
  categoryId: string = '';
  brandId: string = '';
  sortBy: string = '';
  sortOrder: number = -1;
  pageSize: number = 50;
  page: number = 1;

  priceMin: number = 0;
  priceMax: number = 100000;

  ratings = [
    { value: 4, selected: false },
    { value: 3, selected: false },
    { value: 2, selected: false },
    { value: 1, selected: false },
  ];
  brandList: any[] = [];

  constructor() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.brandId = params['brand'] ? params['brand'] : '';
      this.categoryId = params['category'] ? params['category'] : '';
      console.log('categoryId', this.categoryId);
      this.searchTerm = params['q'] ? params['q'] : '';
      this.getProductListBySearch();
    });
  }

  ngOnInit() {
    this.getProductListBySearch();
    this.getAllBrands();
  }

  applyFilters() {
    this.filteredProducts = this.products.filter((p: any) => {
      const matchesBrand = this.selectedBrands.length
        ? this.selectedBrands.includes(p.brand)
        : true;
      const matchesPrice = p.price >= this.priceMin && p.price <= this.priceMax;
      const matchesRating =
        this.ratings.some((r) => r.selected && p.rating >= r.value) ||
        this.ratings.every((r) => !r.selected);
      return matchesBrand && matchesPrice && matchesRating;
    });
  }

  getProductListBySearch() {
    this.products = [];
    this.filteredProducts = [];
    this.customerService
      .getProductList(
        this.searchTerm,
        this.categoryId,
        this.brandId,
        this.sortBy,
        this.sortOrder,
        this.pageSize,
        this.page
      )
      .subscribe((data: any) => {
        console.log('products -->', data);
        this.products = data.productList;
        // console.log('products with brands-->', this.products);
        this.filteredProducts = data.productList;
        this.getBrandsBasedOnCategoryId()
      });
  }

  getAllBrands() {
    // Logic to fetch brands from a service
    this.brandService.getBrands().subscribe((data: any) => {
      this.brands = data.brands; // Assuming the API returns an object with a 'categories' array
      this.brandList = data.brands;
      console.log('brands Data: ', this.brands);
    });
  }

  getBrandsBasedOnCategoryId() {
    this.brands = [];
    // Create a map for quick lookup
    const brandMap = new Map(this.brandList.map((brand) => [brand._id, brand.name]));

    // Match products with brand names
    this.brands = this.products.map((product) => ({
      ...product,
      name: brandMap.get(product.brandId) || 'Unknown',
    }));

    console.log("this.brands", this.brands);
  }

  getBrandMatchedProduct(brandId:any){
    console.log("brandId", brandId)
    this.products = this.products
  .filter((res: any) => res._id === brandId)
  }

  pageChange(page:any){
    this.page = page
  }
}
