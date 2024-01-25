import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { sellerAddProduct } from 'src/app/shared/data-type';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent {
  productList: undefined | sellerAddProduct[];
  productMessage: undefined |string
  constructor(private productSrv:ProductsService){}

  ngOnInit():void{
    this.getSellerAllData();
  }
  getSellerAllData(){
    this.productSrv.fetchProductAllDataApi().subscribe((response:any)=>{
      // console.warn(response);
      if(response){
        this.productList=response;
      }
    });
  }
  removeProduct(id:number){
    console.warn(id)
    this.productSrv.fetchProductDeleteDataApi(id).subscribe((result:any)=>{
      // console.log(result)
      if(result){
        this.getSellerAllData();
        this.productMessage='Product has deleted Successfully!';
      }
    });
    setTimeout(()=>{
      this.productMessage =undefined;
    },3000);
  }
  // upDateProductForm(id:number){}

}
