import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
})
export class MainPage implements OnInit {
  items: any[] = [];
  itemName: string = '';
  itemDescription: string = '';
  itemPrice: string = '';
  itemId: string = '';

  constructor(
    private http: HttpClient,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    this.http
      .get<any[]>('http://localhost/IONIC/parcial2/backend/items/get-all.php')
      .subscribe(
        (response: any[]) => {
          this.items = response;
        },
        (error) => {
          console.error('Error fetching items:', error);
          this.presentAlert('Error', 'No se pudieron cargar los artículos.');
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
  addItem() {
    // Verificar si todos los campos están llenos
    if (!this.itemName || !this.itemDescription || !this.itemPrice) {
      this.presentAlert('Error', 'Por favor complete todos los campos.');
      return;
    }

    // Crear el objeto con los datos a enviar
    const formData = new URLSearchParams();
    formData.set('name', this.itemName);
    formData.set('description', this.itemDescription);
    formData.set('price', this.itemPrice.toString());

    // Establecer las cabeceras para enviar datos en formato x-www-form-urlencoded
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    // Enviar los datos al servidor
    this.http
      .post<any>(
        'http://localhost/IONIC/parcial2/backend/items/add.php',
        formData.toString(), // Convertir los datos a cadena
        httpOptions // Especificar las cabeceras
      )
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.presentAlert('Éxito', 'Artículo agregado exitosamente.');
            this.getItems(); // Actualizar la lista de artículos después de agregar uno nuevo
          } else {
            this.presentAlert('Error', 'No se pudo agregar el artículo.');
          }
        },
        (error) => {
          console.error('Error adding item:', error);
          this.presentAlert('Error', 'No se pudo agregar el artículo.');
        }
      );
  }
  deleteItem() {
    // Verificar si el campo de ID está vacío
    if (!this.itemId) {
      this.presentAlert('Error', 'Por favor ingrese un ID de ítem.');
      return;
    }

    // Crear el objeto con los datos a enviar
    const formData = new URLSearchParams();
    formData.set('id', this.itemId);

    // Establecer las cabeceras para enviar datos en formato x-www-form-urlencoded
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    };

    // Enviar la solicitud de eliminación al servidor
    this.http
      .post<any>(
        'http://localhost/IONIC/parcial2/backend/items/delete.php',
        formData.toString(), // Convertir los datos a cadena
        httpOptions // Especificar las cabeceras
      )
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.presentAlert('Éxito', 'Ítem eliminado exitosamente.');
            this.getItems(); // Opcional: Actualizar la lista de ítems después de eliminar
          } else {
            this.getItems(); 
            this.presentAlert(
              'Error',
              'No se pudo eliminar el ítem: ' + response.message
            );
          }
        },
        (error) => {
          console.error('Error deleting item:', error);
          this.presentAlert('Error', 'Ocurrió un error al eliminar el ítem.');
        }
      );
  }
}
