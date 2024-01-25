import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { sellerAddProduct } from 'src/app/shared/data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  popularProducts:undefined |sellerAddProduct[];
  constructor(private productSrv:ProductsService){}
  ngOnInit():void{
    this.topProductList();
  }
  topProductList(){
    this.productSrv.popularProduct().subscribe((resp:any)=>{
      this.popularProducts=resp;
      console.log("popular-list",this.popularProducts)
    });
  }

}
