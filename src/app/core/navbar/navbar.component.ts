import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { ProductsService } from 'src/app/services/products.service';
import { sellerAddProduct } from 'src/app/shared/data-type';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuItem: string = 'default';
  sellerName: string = "";
  userName: string = "";
  searchResult: undefined | sellerAddProduct[];
  cartItems = 0;
  constructor(private router: Router, private productSrv: ProductsService) { }

  ngOnInit(): void {
    this.router.events.subscribe((value: any) => {
      if (value.url) {
        //For Seller
        if (localStorage.getItem('seller') && value.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.fullname;
          this.menuItem = 'seller';

        } else if (localStorage.getItem('user')) {

          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore)[0];
          this.userName = userData.fullname;
          // console.log("user",this.userName)
          this.menuItem = 'user';
        } else {
          // console.warn('outside to selle area');
          this.menuItem = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.productSrv.cartData.subscribe((items) =>{
      this.cartItems =items.length;
    });
  }
  // logOut() {
  //   localStorage.removeItem('seller');
  //   this.router.navigate(['/']);
  // }


  logOut() {
    if (this.sellerName) {
      localStorage.removeItem('seller');
      this.router.navigate(['/']);

    } else if (this.userName) {
      localStorage.removeItem('user');
      this.router.navigate(['/'])
    } else {

    }

  }
  searchProductList(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productSrv.searchProducts(element.value).subscribe((result: any) => {
        if (result.length > 5) {
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }
  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id]);
  }
  hideSearch() {
    this.searchResult = undefined;
  }
  submitSearch(val: string) {
    this.router.navigate([`search/${val}`])
  }
}
