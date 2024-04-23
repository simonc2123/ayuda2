import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // Importa el Router
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {} // Inyecta el Router en el constructor

  ngOnInit() {}

  login() {
    const data = { username: this.username, password: this.password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http
      .post<any>(
        'http://localhost/IONIC/parcial2/backend/auth/login.php',
        data,
        { headers }
      )
      .subscribe(
        (response: any) => {
          if (response.success) {
            console.log('Login Successful');
            // Redirecciona a la página principal después del inicio de sesión exitoso
            this.router.navigate(['/main']); // Ajusta la ruta según corresponda
          }
        },
        (error) => {
          console.error('Error during login:', error);
          this.presentAlert('Error', 'Usuario o contraseña incorrectos');
        }
      );
  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
