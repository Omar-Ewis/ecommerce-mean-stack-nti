import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/layout-services/auth/auth-service';
import { CategoryService } from '../../core/services/layout-services/Category/category-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit{
  categoryTree!:any[];
  loggedIn = false;
  constructor(private _authService:AuthService ,private _router:Router,private _categoryService:CategoryService){}
  ngOnInit(): void {
    this._categoryService.getCategoryTreeForUser().subscribe(
      (res)=>{
        this.categoryTree = res.data;
    })
    this._authService.isAuth$.subscribe(res=>{
      if(res){
        this.loggedIn = true ;
      }
    })
  }
  logOut(){
    this._authService.logout();
    this.loggedIn = false;
    this._router.navigate(['/login']);
  }

}
