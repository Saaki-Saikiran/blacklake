import { Injectable, Input } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SummaryGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userDetails = localStorage.getItem('summaryPassword');
    if (userDetails) {
      return true;
    }
    this.router.navigate(['/auth/abstract/summary']);
    return false;
  }
}
