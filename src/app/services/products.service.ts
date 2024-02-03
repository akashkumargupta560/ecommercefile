import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, sellerAddProduct } from '../shared/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = 'http://localhost:3000/products/';
  cartUrl = 'http://localhost:3000/cart/';

  cartData = new EventEmitter<sellerAddProduct[] | []>();
  constructor(private http: HttpClient) { }
  ngOnInit(): void { }
  fetchProductPostApi(data: sellerAddProduct) {
    return this.http.post(this.apiUrl, data);
  }
  fetchProductAllDataApi() {
    return this.http.get<sellerAddProduct[]>(this.apiUrl);
  }
  fetchProductDeleteDataApi(id: number) {
    return this.http.delete<any>(this.apiUrl + `${id}`)
  }
  getProductIdApi(id: string) {
    return this.http.get<sellerAddProduct[]>(this.apiUrl + `${id}`);
  }
  productUpDateApi(data: sellerAddProduct) {
    return this.http.put<sellerAddProduct[]>(this.apiUrl + `${data.id}`, data);
  }
  popularProduct() {
    return this.http.get<sellerAddProduct[]>('http://localhost:3000/products?_limit=4');
  }
  trendingProducts() {
    return this.http.get<sellerAddProduct[]>('http://localhost:3000/products?_limit=12')
  }
  searchProducts(query: string) {
    return this.http.get<sellerAddProduct[]>(`http://localhost:3000/products?q=${query}`);
  }
  localAddToCart(data: sellerAddProduct) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
  removeItemFromCart(productId:number){
    let cartData =localStorage.getItem('localCart');
    if(cartData){
      let items:sellerAddProduct[] =JSON.parse(cartData);
      items =items.filter((item:sellerAddProduct) => productId!== item.id);
      console.warn("remove-items",items)
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cartData:cart){
    return this.http.post(this.cartUrl, cartData);
  }
}
