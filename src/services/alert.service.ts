import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  constructor(
    public alertController: AlertController
  ) { }

  async genericAlert(header: string, message?: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      backdropDismiss: false,
      buttons: ['OK']
    });

    alert.present();
  }
}

