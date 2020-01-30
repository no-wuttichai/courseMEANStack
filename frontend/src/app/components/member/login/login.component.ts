import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NetworkService } from 'src/app/services/network.service';

import Swal from 'sweetalert2'

// const Swal = require('sweetalert2')

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myApp = "POS";

  constructor(
    private router: Router,
    private authServices: AuthService,
    private networkService: NetworkService
  ) { }

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
    this.networkService.login(loginForm.value).subscribe(result => {
      if (result.token) {
        this.authServices.login(result.token);
      } else {
        Swal.fire(result.message)
        // alert(result.message)
      }
    }, error => {
      Swal.fire(error.error.message)
      // alert(error.error.message)
    })
  }
  

}
