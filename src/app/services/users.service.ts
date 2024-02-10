import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { authLogin, authRegister } from '../shared/data-type';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl ='http://localhost:3000/users';
  
  isLoginErr = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }
  ngOnInit(): void { }
  userSignUpApi(user:authRegister){
    this.http.post<authRegister>(this.apiUrl,user,{observe:'response'}).subscribe((result:any) =>{
      if(result){
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    });
  }
  userLoginApi(data:authLogin){
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((result:any) =>{
      if(result && result.body && result.body.length === 1){
        console.log("Login API called :", result.body)
        localStorage.setItem('user',JSON.stringify(result.body));
        this.router.navigate(['/']);
        this.isLoginErr.emit(false);
      }else{
         console.warn('Login Failed');
        this.isLoginErr.emit(true);
      }
    });
  }
  userReloader(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/']);
    }
  }
}
