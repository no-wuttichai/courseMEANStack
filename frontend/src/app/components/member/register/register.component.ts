import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // DI: dependency injection
  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  register(registerForm: NgForm) {
    this.router.navigate(["/login"]);
    alert(JSON.stringify(registerForm.value))
  }

}
