import { Component } from '@angular/core';
import { ICategory } from '../../core/models/category.model';
import { CategoryDashboardService } from '../../core/services/dashboard-services/Category/category-dashboard-service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [RouterLink,RouterOutlet,CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css'
})
export class Categories {
  categories: ICategory[] = [];
  isLoading = true;

  constructor(private _categoryService: CategoryDashboardService) {}

  ngOnInit(): void {
      this.getCategories();
    }
  getCategories() {
    this.isLoading = true;
    this._categoryService.getCategoryTreeForAdmin().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

toggleFlag(id: string, flag: 'isActive' | 'isDeleted', current: boolean) {
  const payload = { [flag]: !current };
  if (flag === 'isDeleted' && !current) {
    payload['isActive'] = false;
  }
  this._categoryService.updateCategoryFlag(id, payload).subscribe({
    next: () => this.getCategories()
  });
}
}
