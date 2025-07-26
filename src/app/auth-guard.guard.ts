import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if (inject(AuthServiceService).isLoggedIn === false) {
    inject(Router).navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
