import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './core/auth-guard';
import { adminGuard } from './core/admin-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
    pathMatch: 'full',
    canActivate: [authGuard],
  },
  {
    path: 'admin/categories',
    loadComponent: () =>
      import('./components/manage//categories/categories.component').then(
        (m) => m.CategoriesComponent
      ),
    pathMatch: 'full',
      canActivate: [adminGuard],
  },
  {
    path: 'admin/categories/add',
    loadComponent: () =>
      import('./components/manage/category-form/category-form.component').then(
        (m) => m.CategoryFormComponent
      ),
    pathMatch: 'full',
          canActivate: [adminGuard],

  },
  {
    path: 'admin/categories/:id',
    loadComponent: () =>
      import('./components/manage/category-form/category-form.component').then(
        (m) => m.CategoryFormComponent
      ),
            canActivate: [adminGuard],

  },

  {
    path: 'admin/brands',
    loadComponent: () =>
      import('./components/manage/brands/brands.component').then(
        (m) => m.BrandsComponent
      ),
    pathMatch: 'full',
          canActivate: [adminGuard],

  },
  {
    path: 'admin/brands/add',
    loadComponent: () =>
      import('./components/manage/brand-form/brand-form.component').then(
        (m) => m.BrandFormComponent
      ),
    pathMatch: 'full',
          canActivate: [adminGuard],

  },

  {
    path: 'admin/brands/:id',
    loadComponent: () =>
      import('./components/manage/brand-form/brand-form.component').then(
        (m) => m.BrandFormComponent
      ),
    pathMatch: 'full',
          canActivate: [adminGuard],

  },

  {
    path: 'admin/products',
    loadComponent: () =>
      import('./components/manage/products/products.component').then(
        (m) => m.ProductsComponent
      ),
    pathMatch: 'full',
          canActivate: [adminGuard],

  },
  {
    path: 'admin/products/add',
    loadComponent: () =>
      import('./components/manage/product-form/product-form.component').then(
        (m) => m.ProductFormComponent
      ),
    pathMatch: 'full',
          canActivate: [adminGuard],

  },
  {
    path: 'admin/products/:id',
    loadComponent: () =>
      import('./components/manage/product-form/product-form.component').then(
        (m) => m.ProductFormComponent
      ),
    pathMatch: 'full',
          canActivate: [adminGuard],

  },

  {
    path: 'products',
    loadComponent: () =>
      import('./components/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
    pathMatch: 'full',
  },

  {
    path: 'product/:id',
    loadComponent: () =>
      import('./components/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },

  {
    path: 'login',
    component: LoginComponent,
  },
];
