import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { ILogin, ILoginRes, IRegister, IUserData } from '../../../models/user.model';
import { environment } from '../../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _http:HttpClient, private _router:Router , private _activatedRoute:ActivatedRoute ){}
  private isAuth = new BehaviorSubject<IUserData|null>(null);
  public isAuth$ = this.isAuth.asObservable();
  private url = environment.apiURL + '/auth';
  private token_key = 'token';

  private storeToken(token:string){
    if(localStorage){
      localStorage.setItem(this.token_key,token);
    }
  }
  private decodeToken(token:string):IUserData|null{
    try{
      const decode = jwtDecode<IUserData>(token);
      if(!decode){
        return null;
      }
      if(decode.exp){
        const expiry = decode.exp * 1000;
        if(expiry > Date.now()){
          return decode
        }
      }
      return null;
    }
    catch(err){
      return null;
    }
  }
  isLoggedin():IUserData | null{
      const token = this.getToken();
      console.log('islog',token)
      if(token){
        const decode = this.decodeToken(token);
        return decode;
      }
      return null;
  }
  ininitLogin(){
    this.isAuth.next(this.isLoggedin());
  }
  private isSecureRoute(url:string, routes:Routes):boolean{
      for(const myRoute of routes){
        if(url.startsWith('/' + myRoute.path)){
          if(myRoute.canActivate?.length){
            return true;
          }
          if(myRoute.children){
            return this.isSecureRoute(url,myRoute.children);
          }

        }
      }
      return false;
  }
  login(data:ILogin){
    return this._http.post<ILoginRes>(this.url + '/login' ,data).pipe(
      tap(
        res =>{
          const token = res.access_token;
          if(token){
            this.storeToken(token);
            const decoded = this.decodeToken(token);
            this.isAuth.next(decoded);
            if(decoded?.role){
              if(decoded.role === 'admin'){
                this._router.navigate(['/dashboard']);
              }
              else{
                this._router.navigate(['/home']);
              }
            }
          }
        }
      )
    )
  }
  logout(){
      localStorage.removeItem(this.token_key);
      this.isAuth.next(null);
      const routes = this._router.config;
      const currentURL = this._router.url;
      const isSecure = this.isSecureRoute(currentURL,routes);
      console.log('url',currentURL);
      console.log('routes',routes);
      if(isSecure === true){
        this._router.navigate(['/login']);
    }
  }
  getToken(){
    console.log('stored token',localStorage.getItem(this.token_key));
    return  localStorage.getItem(this.token_key);
  }

  isUserLoggedin():boolean{
    const token = this.getToken();
    if(token){
      return true;
    }
    return false;
  }

  register(data: IRegister) {
    return this._http.post<{ message: string }>(this.url + '/signup', data);
  }
}
