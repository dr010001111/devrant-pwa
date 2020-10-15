import { ErrorHandler, Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    errorCount = 0;
    alertElement: HTMLIonAlertElement;

    handleError(error) {
        console.warn(error);
        this.errorCount++;
        //this.showAlertIfNotPresent()
    }

    showAlertIfNotPresent() {
        if (this.alertElement) {
            this.alertElement.subHeader = `App crashed (${this.errorCount} Error[s])`;
            return;
        }

        this.alertElement = document.createElement(
            'ion-alert'
        ) as HTMLIonAlertElement;

        this.alertElement.backdropDismiss = false;
        this.alertElement.header = 'Shucks!';
        this.alertElement.message =
            "There is still the chance it's not completly broken, choose wisely.";
        this.alertElement.subHeader = 'App crashed';
        this.alertElement.buttons = [
            {
                text: 'Whatever, bro.',
                handler: () => {
                    this.alertElement = null;
                },
            },
            {
                text: 'Reload!',
                handler: () => {
                    this.alertElement.message = "We'll be right back...";
                    this.alertElement = null;
                    location.reload();
                    return false;
                },
            },
        ];

        document.body.append(this.alertElement);
        this.alertElement.present();
    }
}
