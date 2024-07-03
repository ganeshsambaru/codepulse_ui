import { HomeComponent } from './features/Public/home/home.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { LoginComponent } from './features/Auth/login/login.component';
import { authGuard } from './features/Auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path:'admin/categories',
    component:CategoryListComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/categories/add',
    component:AddCategoryComponent,
    canActivate:[authGuard]
  },
  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent,
    canActivate:[authGuard]
  },
  {
    path: 'admin/blogposts',
    component:BlogpostListComponent,
    canActivate:[authGuard]
  },
  {
    path: 'admin/blogposts/add',
    component: AddBlogpostComponent,
    canActivate:[authGuard]
  },
  {
    path: 'admin/blogposts/:id',
    component:EditBlogpostComponent,
    canActivate:[authGuard]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
