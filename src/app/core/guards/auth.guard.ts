import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let checkLogin = this.auth.isLogin();
    if (route?.data['noAuth'] && checkLogin) {
      return this.router.navigate(['dashboard']);
    }
    if (route?.data['noAuth'] && !checkLogin) {
      return true
    }
    if (checkLogin) {
      return true;
    } else {
      return this.router.navigate(['auth']);
    }
  }
}
