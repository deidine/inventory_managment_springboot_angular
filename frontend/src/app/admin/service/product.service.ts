import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }
    
  getProducts(){
    return this.httpClient.get<Product[]>("http://localhost:8080/api/personnelle/find-all");
  }
  
  getProductById(productId){
    return this.httpClient.get<Product>("http://localhost:8080/api/personnelle/find-all/"+productId);
  }
  
  public save(product:Product){
    return this.httpClient.post<Product>("http://localhost:8080/api/personnelle/save",product);
  }
  
  public updateProduct (product:Product){
  
    return this.httpClient.put<Product>("http://localhost:8080/api/personnelle/find-all/", product);
  }
}