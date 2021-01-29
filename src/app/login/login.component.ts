import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../service/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService
  ) {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.apiService
      .login(
        this.loginForm.controls.username.value,
        this.loginForm.controls.password.value
      )
      .subscribe((data) => {
        if (data.success) {
          this.router.navigate(["list-product"]);
          localStorage.setItem('authenticated', JSON.stringify(true))
        } else {
          this.invalidLogin = true;
        }
      });
  }

  ngOnInit() {
    window.localStorage.removeItem("token");
    this.loginForm = this.formBuilder.group({
      username: ["11234567890", Validators.compose([Validators.required])],
      password: ["09876543211", Validators.required],
    });
  }
}
