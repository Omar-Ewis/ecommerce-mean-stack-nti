import { Component } from '@angular/core';
import { CategoryDashboardService } from '../../../core/services/dashboard-services/Category/category-dashboard-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../../../core/models/category.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css'
})
export class AddCategory {
  categoryForm!: FormGroup;
  parentCategories: ICategory[] = [];
  isLoading = false;

  constructor(
    private _categoryService: CategoryDashboardService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      parentId: new FormControl('')
    });

    this._categoryService.getCategoryTreeForAdmin().subscribe({
      next: (res) => {
        this.parentCategories = res.data.filter(c => !c.parentId);
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;

    const formValue = this.categoryForm.value;
    if (!formValue.parentId) delete formValue.parentId;

    this.isLoading = true;
    this._categoryService.createCategory(formValue).subscribe({
      next: () => this._router.navigate(['/dashboard/categories']),
      error: () => this.isLoading = false
    });
  }
}
