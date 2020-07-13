import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class AuthService {
  private authEndpoint: string = "http://localhost:3000/api/auth";

  private token: string;
  private isAuthenticated: boolean = false;
  private authStatusListener: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData);
    this.http
      .post<{ message: string; data: string }>(
        this.authEndpoint + "/login",
        authData
      )
      .subscribe((res) => {
        this.token = res.data;
        if (this.token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
      });
  }

  logout() {
    this.isAuthenticated = false;
    this.token = null;
    this.authStatusListener.next(false);
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getToken(): string {
    return this.token;
  }
}
