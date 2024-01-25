import { Component } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  menuItem:string='default';
  sellerName:string="";
  constructor(private router:Router){}
  ngOnInit():void{
    this.router.events.subscribe((value:any)=>{
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          let sellerStore = localStorage.getItem('seller');
          let sellerData =sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName =sellerData.fullname;
          this.menuItem='seller';
        }else{
          // console.warn('outside to selle area');
          this.menuItem='default';
        }
      }
    })
  }
  logOut(){
    localStorage.removeItem('seller');
    this.router.navigate(['/'])
  }
}
