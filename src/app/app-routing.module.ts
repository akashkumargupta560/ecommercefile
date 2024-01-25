import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './website/home/home.component';
import { SellerAuthComponent } from './website/seller-component/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './website/seller-component/seller-home/seller-home.component';
import { AuthGuard } from './core/auth.guard';
import { SellerAddProductComponent } from './website/seller-component/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './website/seller-component/seller-update-product/seller-update-product.component';



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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
