import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  isLogin() {
    return localStorage.getItem(environment.keyLocalAuthenInfo);
  }

  login(token: string) {
    localStorage.setItem(environment.keyLocalAuthenInfo, token);
    this.router.navigate(["/stock"]);
  }

  logout() {
    localStorage.removeItem(environment.keyLocalAuthenInfo);
    this.router.navigate(["/login"]);
  }
}
