import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userDetails = JSON.parse(localStorage.getItem('loggedUser')).result[0];
    if (userDetails.role === 'superAdmin') {
      return true;
    }
    else {
      this.router.navigate(['/auth/dashboard']);
      return false;
    }
  }
}
