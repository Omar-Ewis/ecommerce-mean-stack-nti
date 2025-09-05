import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/layout-services/auth/auth-service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService= inject(AuthService);
  const router = inject(Router);
  if( authService.isUserLoggedin()===true)
    return true;
  return router.createUrlTree(['/login'],{queryParams:{returnurl:state.url}})
};
