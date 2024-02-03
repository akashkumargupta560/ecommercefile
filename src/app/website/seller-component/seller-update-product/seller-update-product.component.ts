import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { SellerService } from 'src/app/services/seller.service';
import { sellerAddProduct } from 'src/app/shared/data-type';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent {
  updateProductMessage: string | undefined;
  productData: undefined | sellerAddProduct
  constructor(private productSrv: ProductsService, private route: ActivatedRoute,private router:Router) { }
  ngOnInit(): void {

    let productId = this.route.snapshot.paramMap.get('id');
     console.log(productId)
    productId && this.productSrv.getProductIdApi(productId).subscribe((data: any) => {
      this.productData = data
    })
  }
  
  upDateProductForm(data:any) {
    if(this.productData){
      data.id = this.productData.id;
    }
    this.productSrv.productUpDateApi(data).subscribe((response:any)=>{
      if(response){
        this.router.navigate(['seller-home'])
        this.updateProductMessage ="Product has Updated!";
      }
    });
    setTimeout(()=>{
      this.updateProductMessage =undefined;
    },3000)
  }
}
