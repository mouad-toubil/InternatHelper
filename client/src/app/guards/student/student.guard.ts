import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../services/token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {
  private roles: string[] = [];
  isLoggedIn = false;
  isStudent = false;
  constructor(private router:Router,private tokenStorageService: TokenStorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      if (this.isLoggedIn){
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
        this.isStudent = this.roles.includes('ROLE_USER');
      }
      if (this.isStudent) {
        return true;
      }else{
        this.router.navigate(['/unauthorized']);
        return false;
      }
  }
  
}
