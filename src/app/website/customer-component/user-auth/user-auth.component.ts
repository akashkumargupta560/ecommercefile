import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { authRegister, authLogin } from 'src/app/shared/data-type';

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
  constructor(private userSrv:UsersService) { }
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
}
