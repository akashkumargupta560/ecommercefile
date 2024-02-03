import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { authLogin, authRegister } from '../shared/data-type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
 apiUrl ='http://localhost:3000/sellers';
 
 isSellerloggedIn= new BehaviorSubject<boolean>(false);
 isLoginErr = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient,private router:Router) { }
  ngOnInit():void{}
  // fetchSellerPostApi(data:sellerRegister):Observable<any>{
  //   return this.http.post<any>(this.apiUrl,data).pipe(map((response:any) =>{
  //     return response;
  //   }))
  // }
  fetchSellerPostApi(data:authRegister){
     this.http.post(this.apiUrl,data,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.isSellerloggedIn.next(true);
        localStorage.setItem('seller',JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
    })
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerloggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  fetchLoginPostApi(data:authLogin){
    this.http.get(`http://localhost:3000/sellers?email=${data.email}&password=${data.password}`,
    {observe:'response'}).subscribe((response:any)=>{
      if(response && response.body && response.body.length === 1){
        this.isLoginErr.emit(false);
        localStorage.setItem('seller',JSON.stringify(response.body));
        this.router.navigate(['seller-home']);
      }else{
        console.warn('Login Failed');
        this.isLoginErr.emit(true);
      }
    })
  }
}
