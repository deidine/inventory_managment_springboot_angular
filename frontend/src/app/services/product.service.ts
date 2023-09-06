import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private httpClient:HttpClient) { }

  getProducts(){
    return this.httpClient.get<Product[]>("http://172.29.57.61:8080/product");
  }

  public save(product:Product){
    return this.httpClient.post<Product>("http://172.29.57.61:8080/product",product);
  }

  public updateProduct (product:Product){
    return this.httpClient.put<Product>("http://172.29.57.61:8080/product", product);
  }
}