import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { cart, sellerAddProduct } from 'src/app/shared/data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productDetails: undefined | sellerAddProduct;
  productQuantity: number = 1;
  removeCart = false;
  cartData: sellerAddProduct | undefined;

  constructor(private activateRoute: ActivatedRoute, private productSrv: ProductsService) { }

  ngOnInit(): void {
    let productId = this.activateRoute.snapshot.paramMap.get('productId');
    productId && this.productSrv.getProductIdApi(productId).subscribe((result) => {
      
      this.productDetails = result;
      let cartData = localStorage.getItem('localCart');

      if (productId && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: sellerAddProduct) => productId == item.id.toString());
        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user)[0].id;
        this.productSrv.getCartList(userId);
        this.productSrv.cartData.subscribe((result)=>{
          let item = result.filter((item:sellerAddProduct) =>productId?.toString() === item.productId?.toString());
          if(item.length){
            this.cartData = item[0];
            this.removeCart =true;
          }
        });
      }

    });
    
    this.addToCart();

  }
  handalQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity -= 1;
    }
  }
  addToCart() {

    if (this.productDetails) {
      this.productDetails.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productSrv.localAddToCart(this.productDetails);
        this.removeCart = true;
      } else {
       
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        let cartData:cart={
          ...this.productDetails,
          userId,
          productId:this.productDetails.id,
        }
        delete cartData.id;
        console.warn("loggged user cartData",cartData);
        this.productSrv.addToCartApi(cartData).subscribe((result)=>{
          
          if(result){
            this.productSrv.getCartList(userId);
            this.removeCart = true;
          }
        })
      }

    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productSrv.removeItemFromCart(productId);
      this.removeCart = false;
    }else{
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user)[0].id;
      console.warn("card-data-->>",userId);
      
      console.warn(this.cartData);
      this.cartData && this.productSrv.removeToCart(this.cartData.id).subscribe((result)=>{
        if(result){
          this.productSrv.getCartList(userId);
        }
      });
      
    }
    this.removeCart = false;

  }
}
