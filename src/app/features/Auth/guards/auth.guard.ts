import { jwtDecode } from 'jwt-decode';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  const cookieService= inject(CookieService);
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getuser();


  // check for the jwt token
  let token = cookieService.get('Authorization');

  if(token && user) {
    token = token.replace('Bearer', '');
   const decodedToken : any = jwtDecode(token);

   // check if token expired
   const expirationDate = decodedToken.exp *1000;
   const currentTime = new Date().getTime();

    if(expirationDate < currentTime) {
      authService.logout();
    return router.createUrlTree(['/login'],{ queryParams : { returnUrl: state.url}})


    } else {
      // token is still valid
      if(user.roles.includes('Writer')){
        return true;
      } else {
        alert('Unauthorized');
        return false;
      }
    }

  } else {
    // Logout
    authService.logout();
    return router.createUrlTree(['/login'],{ queryParams : { returnUrl: state.url}})
  }


};
