import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { order } from 'src/app/shared/data-type';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {
  totalPrice: number | undefined;
  constructor(private productSrv:ProductsService){}

  ngOnInit():void{
    this.productSrv.currentCart().subscribe((result) =>{
      // console.warn("cart-page",this.cartData)this.priceSummary.total =100+(price-((price*10)/100))-(price/10);
      let price =0;
      result.forEach((items)=>{
        if(items.quantity){
          price = price+(+items.price *items.quantity)
        }
      });
      this.totalPrice =price+(price/10)+100-(price/18);
      console.warn("total-Price",this.totalPrice);
      
    });
  }
  orderNow(data:{email:string,address:string,contact:string}){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user)[0].id;
    console.warn(userId);
    if(this.totalPrice){
      let orderData:order ={
        ...data,
        totalPrice:this.totalPrice,
        userId
      }
      this.productSrv.orderNow(orderData).subscribe((result) =>{
        if(result){
          alert('Your Order Placed!');
        }
      });
    }
    
  }
}
