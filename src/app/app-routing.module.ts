import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './website/home/home.component';
import { SellerAuthComponent } from './website/seller-component/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './website/seller-component/seller-home/seller-home.component';
import { AuthGuard } from './core/auth.guard';
import { SellerAddProductComponent } from './website/seller-component/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './website/seller-component/seller-update-product/seller-update-product.component';
import { SearchComponent } from './website/search/search.component';
import { ProductDetailsComponent } from './website/customer-component/product-details/product-details.component';
import { UserAuthComponent } from './website/customer-component/user-auth/user-auth.component';
import { CartPageComponent } from './website/customer-component/cart-page/cart-page.component';



const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'seller-auth', component:SellerAuthComponent},
  {
    path:'seller-home', component:SellerHomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-add-product', component:SellerAddProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'seller-update/:id',component:SellerUpdateProductComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'search/:query', component:SearchComponent
  },
  {
    path:'details/:productId', component:ProductDetailsComponent
  },
  {
    path:'user-auth', component:UserAuthComponent
  },
  {
    path:'cart-page', component:CartPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
