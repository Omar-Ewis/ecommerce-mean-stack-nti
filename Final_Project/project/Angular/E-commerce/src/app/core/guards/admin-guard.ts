import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/layout-services/auth/auth-service';

export const adminGuard: CanMatchFn = (route, segments) => {
  const _authS = inject(AuthService);
  const _router = inject(Router);
  if(_authS.isUserLoggedin() && _authS.isLoggedin()?.role === 'admin')
    return true;
  else{
    return  _router.createUrlTree(['/login'],
      {queryParams:{returnUrl: segments.join('/')}});
  }
};
