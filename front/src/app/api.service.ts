import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(credentials: { username: string; password: string }) {
    return this.http.post(
      'http://localhost/IONIC/parcial2/backend/auth/login.php',
      credentials
    );
  }
}
