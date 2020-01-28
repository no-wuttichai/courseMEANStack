import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myApp = "POS";

  constructor(private router: Router, private authServices: AuthService) { }

  ngOnInit() {
    if (this.authServices.isLogin()) {
      this.router.navigate(["/stock"]);
    }
  }

  onSayHi() {
    //alert(this.myApp + this.onGetName())
  }

  onGetName(): string {
    return "No";
  }

  // any (default)
  login(loginForm: NgForm) {
    // alert(JSON.stringify(loginForm.value))
    this.authServices.login("Test");
  }

}
