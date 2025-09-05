import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../services/layout-services/auth/auth-service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const _authS = inject(AuthService);
  const token = _authS.getToken();
  if(token){
    const cloned= req.clone(
    {
      setHeaders:{
      Authorization: `Bearer ${token}`
      }
    })
    return next(cloned);
  }
  return next(req);
};
