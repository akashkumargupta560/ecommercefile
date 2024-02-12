import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { cart, priceSummary } from 'src/app/shared/data-type';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  cartData: cart[] | undefined;
  finalyPrice:any;
  priceSummary:priceSummary={
    price:0,
    discount:0,
    tax:0,
    delivery:0,
    total:0
  }
  constructor(private productSrv:ProductsService, private route:Router){}
  ngOnInit(): void {
    this.productSrv.currentCart().subscribe((result) =>{
      this.cartData =result;
      // console.warn("cart-page",this.cartData)this.priceSummary.total =100+(price-((price*10)/100))-(price/10);
      let price =0;
      result.forEach((items)=>{
        if(items.quantity){
          price = price+(+items.price *items.quantity)
        }
      });
      
      this.priceSummary.price =price;
      this.priceSummary.discount = price/10;
      this.priceSummary.tax = price/18;
      this.priceSummary.delivery = 100;
      this.priceSummary.total =price+(price/10)+100-(price/18);
      this.finalyPrice = this.priceSummary.total;
    
    });
    
  }
  checkOut(){
      this.route.navigate(['/checkout']);
  }
  

}
