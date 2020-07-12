import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private authEndpoint: string = "http://localhost:3000/api/auth";

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    console.log(authData);
    this.http.post(this.authEndpoint + "/login", authData).subscribe((res) => {
      console.log(res);
    });
  }
}
