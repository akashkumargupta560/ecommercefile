import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';
import { authRegister, authLogin, sellerAddProduct, cart } from 'src/app/shared/data-type';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  email_pattern = '^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$';
  // email_patterns ='^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$'

  isShowLogin = false;
  authError!: string | undefined;
  constructor(private userSrv:UsersService, private productSrv:ProductsService) { }
  ngOnInit(): void { 
    this.userSrv.userReloader();
  }

  userSignUpForm(data: authRegister) {
    this.userSrv.userSignUpApi(data);
   }
  userLoginForm(data: authLogin) { 
    this.userSrv.userLoginApi(data);
    this.userSrv.isLoginErr.subscribe((isError)=>{
      if(isError){
        this.authError ="Email or Password is not Correct!";
      }else{
        this.localCartToRemoteCart();
      }
      setTimeout(()=>{
        this.authError=undefined;
      },3000);
    })
  }

  openLoginform() {
    this.isShowLogin = true;
  }
  openSignUpform() {
    this.isShowLogin = false
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId= user && JSON.parse(user)[0].id;
    console.log("user-auth-id",userId)
    if(data){
     let cartDataList:sellerAddProduct[]= JSON.parse(data);
       console.log('Logged in userId:', user);
      console.log('Logged in userId:', userId);
     cartDataList.forEach((product:sellerAddProduct, index)=>{
       let cartData:cart={
         ...product,
         productId:product.id,
         userId
       }
       delete cartData.id;
       setTimeout(() => {
         this.productSrv.addToCartApi(cartData).subscribe((result)=>{
           if(result){
             console.warn("data is stored in DB");
           }
         })
       }, 500);
       if(cartDataList.length===index+1){
         localStorage.removeItem('localCart')
       }
     })
    }
 
    setTimeout(() => {
     this.productSrv.getCartList(userId)
    }, 2000);
     
   }
}
