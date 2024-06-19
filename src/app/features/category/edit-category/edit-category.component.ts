import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from './../services/category.service';
import { category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request_model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  onclick() {
    throw new Error('Method not implemented.');
  }

  id: string | null = null;
  paramsSubscription?: Subscription;
  category?: category;
  editCategorySubscription?: Subscription;


  constructor(
    private route: ActivatedRoute,
    private CategoryService: CategoryService,private router:Router
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          //get the data from the API for this category Id
          this.CategoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              this.category = response;
            },
          });
        }
      },
    });
  }
  onFormSubmit(): void {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };

    // pass this object to service
    if (this.id) {
      this.editCategorySubscription = this.CategoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.CategoryService.deleteCategory(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
