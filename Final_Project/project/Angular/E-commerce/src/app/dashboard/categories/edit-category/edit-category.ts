import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICategory } from '../../../core/models/category.model';
import { CategoryDashboardService } from '../../../core/services/dashboard-services/Category/category-dashboard-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css'
})
export class EditCategory {
  categoryForm!: FormGroup;
  parentCategories: ICategory[] = [];
  isLoading = true;
  categoryId!: string;
  constructor(private _categoryService: CategoryDashboardService,private _route: ActivatedRoute,private _router: Router) {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      parentId: new FormControl('')
    });
    const slug = this._route.snapshot.paramMap.get('slug');
    if (!slug) return;
    this._categoryService.getCategoryBySlug(slug).subscribe({
      next: (res) => {
        const category = res.data;
        this.categoryId = category._id;
        this.categoryForm.patchValue({
          name: category.name,
          parentId: category.parentId || ''
        });
        this._categoryService.getCategoryTreeForAdmin().subscribe({
          next: (parentRes) => {
            this.parentCategories = parentRes.data.filter(c => c._id !== this.categoryId);
            this.isLoading = false;
          }
        });
      }
    });
  }

  onSubmit() {
    if (this.categoryForm.invalid) return;
    const updatedData = { ...this.categoryForm.value };
    if (updatedData.parentId === '') {
      updatedData.parentId = null;
      }
    this._categoryService.updateCategory(this.categoryId, updatedData).subscribe({
      next: () => this._router.navigate(['/dashboard/categories'])
    });
    }
}
