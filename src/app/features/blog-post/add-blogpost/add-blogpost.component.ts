import { category } from './../../category/models/category.model';
import { CategoryService } from './../../category/services/category.service';
import { Component, OnInit } from '@angular/core';
import { AddBlogpost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogpost;
  categories$?: Observable<category[]>;

   constructor(private blogpostservice:BlogPostService,
    private router:Router,
    private categoryService:CategoryService) {
    this.model ={
      title:'',
      shortDescription:'',
      urlHandle:'',
      content:'',
      featuredImageUrl:'',
      author:'',
      isVisible: true,
      publishedDate: new Date(),
      categories: []

    }
   }
  ngOnInit(): void {
     this.categories$ =this.categoryService.getAllCategories();

  }
    onFormSubmit(): void{
      console.log(this.model);
      this.blogpostservice.createBlogPost(this.model)
      .subscribe({
        next: (response) =>{
          this.router.navigateByUrl('/admin/blogposts')

        }
      })
    }
}
