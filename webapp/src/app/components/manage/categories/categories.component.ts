import {AfterViewInit, Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CategoryService } from '../../../services/category.service';
import { Router, RouterLink } from '@angular/router';
import { routes } from '../../../app.routes';
import { CategoryInterface } from '../../../models/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MatFormFieldModule, MatInputModule, MatTableModule, 
    MatSortModule, MatPaginatorModule, MatButtonModule,
    RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements AfterViewInit{
   displayedColumns: string[] = ['_id', 'name', 'action'];
  dataSource: MatTableDataSource<CategoryInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categoryService = inject(CategoryService);
  router = inject(Router);

  constructor() {
    // Initialize the data source with an empty array
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    // Fetch categories data from the service
    this.getCategories()
  }

  getCategories() {
      this.categoryService.getCategories().subscribe((data: any) => {
      console.log("Categories Data: ", data);
      this.dataSource.data = data.categories; // Assuming the API returns an object with a 'categories' array
    }); 
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editCategory(id: string) {
    this.router.navigate([`/admin/categories/${id}`]);

  }

  deleteCategory(id: string) {
    // Implement the delete functionality here
    console.log(`Delete category with ID: ${id}`);
    // Call the service to delete the category
    this.categoryService.deleteCategory(id).subscribe({
      next: (response) => {
        alert('Category deleted successfully!');
        this.getCategories(); // Refresh the categories list
      }
      , error: (error) => {
        console.error('Error deleting category:', error);
      }
    });
  }
}

