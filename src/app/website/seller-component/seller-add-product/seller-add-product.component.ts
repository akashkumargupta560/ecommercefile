import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { sellerAddProduct } from 'src/app/shared/data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {
  addproductMessage:string | undefined;
  constructor(private productSrv:ProductsService,private route:Router) { }
  ngOnInit(): void { }
  addProductForm(data:sellerAddProduct) { 
    this.productSrv.fetchProductPostApi(data).subscribe((resp:any)=>{
      if(resp){
        this.route.navigate(['seller-home'])
        this.addproductMessage='Product is added Successfully'; 
      }
    });
    setTimeout(() =>{
      this.addproductMessage=undefined;
    },3000);
  }
}
