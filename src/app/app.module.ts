import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { FooterComponent } from './core/footer/footer.component';
import { SellerAuthComponent } from './website/seller-component/seller-auth/seller-auth.component';
import { HomeComponent } from './website/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './website/seller-component/seller-home/seller-home.component';
import { SellerProductListComponent } from './website/seller-component/seller-product-list/seller-product-list.component';
import { SellerAddProductComponent } from './website/seller-component/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './website/seller-component/seller-update-product/seller-update-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './website/search/search.component';
import { ProductDetailsComponent } from './website/customer-component/product-details/product-details.component';
import { UserAuthComponent } from './website/customer-component/user-auth/user-auth.component';
import { ContactPageComponent } from './website/customer-component/contact-page/contact-page.component';
import { CartPageComponent } from './website/customer-component/cart-page/cart-page.component';
import { CheckoutPageComponent } from './website/customer-component/checkout-page/checkout-page.component';
import { MyOrderComponent } from './website/customer-component/my-order/my-order.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SellerAuthComponent,
    HomeComponent,
    SellerHomeComponent,
    SellerProductListComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    ContactPageComponent,
    CartPageComponent,
    CheckoutPageComponent,
    MyOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
