import { category } from './../models/category.model';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { UpdateCategoryRequest } from '../models/update-category-request_model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,private cookieService
    : CookieService) { }

  addCategory(model:AddCategoryRequest): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/categories?addAuth=true`,model);
  }

  getAllCategories(query?:string,sortBy? :string, sortDirection?: string,
    pageNumber?: number,pageSize?: number): Observable<category[]> {
    let params = new HttpParams();

    if(query) {
      params = params.set('query',query)
    }
    if(sortBy) {
      params = params.set('sortBy', sortBy)
    }
    if(sortDirection) {
      params = params.set('sortDirection', sortDirection)
    }

    if(pageNumber) {
      params = params.set('pageNumber', pageNumber)
    }

    if(pageSize) {
      params = params.set('pageSize', pageSize)
    }


    return this.http.get<category[]>(`${environment.apiBaseUrl}/api/Categories`,{
      params: params
    });
  }
  getCategoryById(id:string):Observable<category>{
    return this.http.get<category>(`${environment.apiBaseUrl}/api/categories/${id}`);

  }

  getCategoryCount():Observable<number>{
    return this.http.get<number>(`${environment.apiBaseUrl}/api/categories/count`);

  }
  updateCategory ( id: string, updateCategoryRequest: UpdateCategoryRequest):
   Observable<category> {
  return this.http.put<category>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`,
    updateCategoryRequest);
}

  deleteCategory(id :string): Observable<category> {
    return this.http.delete<category>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`);
  }
}
