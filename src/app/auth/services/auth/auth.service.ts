import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = "https://task-management-system.up.railway.app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(signupRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "/api/auth/signup", signupRequest);
  }

  login(loginRequest: any): Observable<any>{
    return this.http.post(BASE_URL+"/api/auth/login",loginRequest);
  }

}
