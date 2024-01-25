import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sellerAddProduct } from '../shared/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl='http://localhost:3000/products/'

  constructor(private http:HttpClient) { }
  ngOnInit():void{}
 fetchProductPostApi(data:sellerAddProduct){
    return this.http.post(this.apiUrl,data);
  }
  fetchProductAllDataApi(){
    return this.http.get<sellerAddProduct[]>(this.apiUrl);
  }
  fetchProductDeleteDataApi(id:number){
    return this.http.delete<any>(this.apiUrl+`${id}`)
  }  
  productEditApi(id:string){
    return this.http.get<sellerAddProduct[]>(this.apiUrl+`${id}`);
  }
  productUpDateApi(data:sellerAddProduct){
    return this.http.put<sellerAddProduct[]>(this.apiUrl+`${data.id}`,data);
  }
  popularProduct(){
    return this.http.get<sellerAddProduct>('http://localhost:3000/products?_limit=4');
  }
}
