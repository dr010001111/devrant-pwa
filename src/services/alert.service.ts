import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    public alertController: AlertController
  ) { }

  async showAlert(header: string, msg: string) {
    const alert = await this.alertController.create({
      header: header,
      message: msg,
      backdropDismiss: false,
      buttons: ['OK']
    });

    await alert.present();
  }
}

