import { Injectable } from "@angular/core";
import { AlertController, IonFab } from '@ionic/angular';
import debug from 'debug';
import pkg from '../../package.json';

const log = debug('dr:service:app');

@Injectable({
    providedIn: 'root'
})
export class AppService {
    constructor(private alert: AlertController) {
        log('init');
        this.checkForUpdates()
    }

    async checkForUpdates() {
        const response = await fetch('/appInfo', {
            cache: 'no-cache'
        });

        const appInfo = await response.text();

        const [_bin, version, commit, date] = appInfo.split(/v|#|@/)

        if (version !== pkg.version) {
            log('!!! NEW VERSION DETECTED !!!')
            const alert = await this.alert.create({
                header: "Update available!",
                message: "Do you want to update immediately?",
                buttons: [
                    {
                        text: "Heck yea!",
                        handler: () => location.reload(true)
                    },
                    {
                        text: "Later"
                    }
                ]
            })

            alert.present();
        } else {
            if (
                pkg.commit.sha !== commit ||
                pkg.commit.date !== date
            ) {
                log(`The version remained the same, the commit or deploy date changed. Handling as optional update.`)
            }
        }
    }
}
