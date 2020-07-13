import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  loading: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loading = false;
  }

  onLogin() {
    console.log(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    let email = this.loginForm.value.username;
    let password = this.loginForm.value.password;
    this.authService.login(email, password);
  }
}
