import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from 'src/app/services/seller.service';
import { authLogin, authRegister } from 'src/app/shared/data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent {
  isShowLogin = false;
  authError!:string;
  constructor(private sellerSrv:SellerService,private router:Router){}

  ngOnInit():void{
    this.sellerSrv.reloadSeller();
  }
  signUpForm(data:authRegister):void{
    // this.sellerSrv.fetchSellerPostApi(data).subscribe((resp:any)=>{
    //   console.warn(resp);
    //   if(resp){
    //     this.router.navigate(['seller-home']);
    //   }
    // })
    this.sellerSrv.fetchSellerPostApi(data);
  }
  LoginForm(data:authLogin):void{
    // this.sellerSrv.fetchSellerPostApi(data).subscribe((resp:any)=>{
    //   console.warn(resp);
    //   if(resp){
    //     this.router.navigate(['seller-home']);
    //   }
    // })
    this.sellerSrv.fetchLoginPostApi(data);
    this.sellerSrv.isLoginErr.subscribe((isError)=>{
      if(isError){
        this.authError ="Email or Password is not Correct!";
      }
    })
  }
 
  openLoginform(){
    this.isShowLogin=true;
  }
  openSignUpform(){
    this.isShowLogin = false
  }

}
