import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, sellerAddProduct } from '../shared/data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  apiUrl = 'http://localhost:3000/products/';
  cartUrl = 'http://localhost:3000/cart/'
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

  getProduct(id: string) {
    return this.http.get<sellerAddProduct>(`http://localhost:3000/products/${id}`);
  }
  getProductIdApi(id: string) {
    return this.http.get<sellerAddProduct>(`http://localhost:3000/products/${id}`);
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
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }
  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: sellerAddProduct[] = JSON.parse(cartData);
      items = items.filter((item: sellerAddProduct) => productId! == item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCartApi(cartData: cart) {
    return this.http.post(this.cartUrl, cartData);
  }
  getCartList(userId: number) {
    return this.http.get<sellerAddProduct[]>('http://localhost:3000/cart?userId=' + userId, { observe: 'response' }).subscribe((result) => {
      if(result && result.body){
        this.cartData.emit(result.body);
      }
    });
  }
  
  removeToCart(cardId:number){
    return this.http.delete<sellerAddProduct[]>(this.cartUrl+`${cardId}`);
  }
}
