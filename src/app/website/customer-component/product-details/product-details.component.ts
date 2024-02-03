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
  productQuantity: number=1;
  removeCart=false;
  constructor(private activateRoute:ActivatedRoute, private productSrv:ProductsService){}
  ngOnInit():void{
     let productId = this.activateRoute.snapshot.paramMap.get('productId');
    //  console.warn(productId);
     productId && this.productSrv.getProductIdApi(productId).subscribe((result:any)=>{
      this.productDetails = result;
     });  
     this.addToCart();

     let cartData = localStorage.getItem('localCart');
     if(productId && cartData){
      let itemsCart =JSON.parse(cartData);
      itemsCart =itemsCart.filter((items:sellerAddProduct) =>productId ==items.id.toString());
      if(itemsCart.length){
        this.removeCart = true;
      }else{
        this.removeCart =false;
      }
     }
  }
  handalQuantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity +=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity -=1;
    }
  }
  addToCart(){
    if(this.productDetails){
      this.productDetails.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        // console.warn("add-to-quantity",this.productDetails);
        this.productSrv.localAddToCart(this.productDetails);
        this.removeCart = true;
      }else{
        // console.log("User Logged-in");
        let user : any = localStorage.getItem('user');
        console.log("cartData fdhfh>>>>>",user);
        console.log("JSON Parse Data:",JSON.parse(user));
        let userId = user && JSON.parse(user)[0].id;
        console.log("cartData-id>>>-----",userId);
        let cartData:cart ={
          ...this.productDetails,
          userId,
          productId:this.productDetails.id
        }
        delete cartData.id;
        // console.log("cartData-value",cartData);
        this.productSrv.addToCart(cartData).subscribe((cartResult:any)=>{
          // console.warn("cartResult",cartResult);
          if(cartResult){
            alert('Product is add in Cart')
          }
        });
      }
    }
  }
  removeToCart(productId:number){
    this.productSrv.removeItemFromCart(productId);
    this.removeCart = false;
  }
}
