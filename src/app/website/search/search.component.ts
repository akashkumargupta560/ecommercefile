import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { sellerAddProduct } from 'src/app/shared/data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchResult:undefined | sellerAddProduct[];
  constructor(private route:ActivatedRoute, private productSrc:ProductsService){}
  ngOnInit():void{
    let query =this.route.snapshot.paramMap.get('query')
    console.log(query);
    query && this.productSrc.searchProducts(query).subscribe((result:any) =>{
      this.searchResult =result;
    })
  }
}
