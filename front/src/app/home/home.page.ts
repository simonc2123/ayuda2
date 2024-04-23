import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  items: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.getItems();
  }
  getItems() {
    this.http
      .get<any[]>('http://localhost/IONIC/parcial2/backend/items/get-all.php')
      .subscribe(
        (response: any[]) => {
          this.items = response.map(item => ({
            name: item.name,
            description: item.description,
            price: item.price
          }));
        },(error) => {
          console.error('Error fetching items:', error);
        }
      );
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
