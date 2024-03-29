import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { order } from 'src/app/shared/data-type';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent {
  orderData:order[] | undefined;
  constructor(private productSrc:ProductsService){}
  ngOnInit():void{
    this.getOrderList();
  }
  cancelOrder(orderId:number | undefined){
    orderId && this.productSrc.cancelOrder(orderId).subscribe((result) =>{
      this.getOrderList();
    });
  }
  getOrderList(){
    this.productSrc.orderList().subscribe((result) =>{
      this.orderData = result;
    });
  }
}
