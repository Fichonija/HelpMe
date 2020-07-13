import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AuthService {
  private authEndpoint: string = "http://localhost:3000/api/auth";

  private tokenTimer: any;

  private token: string;
  private isAuthenticated: boolean = false;
  private authStatusListener: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData);
    this.http
      .post<{ message: string; data: { token: string; expiresIn: number } }>(
        this.authEndpoint + "/login",
        authData
      )
      .subscribe((res) => {
        this.token = res.data.token;
        if (this.token) {
          const expiresIn = res.data.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresIn);
          console.log(expiresIn * 1000);

          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.router.navigate(["/"]);
        }
      });
  }

  logout() {
    this.isAuthenticated = false;
    clearTimeout(this.tokenTimer);
    this.token = null;
    this.authStatusListener.next(false);

    this.router.navigate(["/"]);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getToken(): string {
    return this.token;
  }
}
