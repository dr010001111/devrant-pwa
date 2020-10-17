import {
    Component,
    HostListener,
    OnInit,
    ViewEncapsulation,
    ViewChild,
    ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController, Platform, Config } from '@ionic/angular';
import { ConfigService } from '@services/config.service';

import { DevRantService } from 'src/services/devrant.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    constructor(
        private ref: ElementRef,
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private configService: ConfigService,
        private ionicConfig: Config,
        private router: Router,
        private alert: AlertController
    ) {
        this.initializeApp();
    }

    async ngOnInit() {
        const fl = 'devrant-pwa-first-load';
        const firstUsage = !localStorage.getItem(fl);

        if (firstUsage) {
            const firstUsageAlert = await this.alert.create({
                header: 'Unofficial App',
                backdropDismiss: false,
                cssClass: 'greetings-alert',
                subHeader: 'Thanks for using the UNOFFICIAL devRant PWA.',
                message: `devrant.app is an open source project created by 010001111 and is not officially supported by devrant.com!`,
                buttons: [
                    'Continue',
                    {
                        text: 'I know',
                        handler: () => localStorage.setItem(fl, 'true'),
                    },
                ],
            });

            firstUsageAlert.present();
        }
    }

    @HostListener('window:internal-link', ['$event'])
    internalRedirect(ev: CustomEvent) {
        this.router.navigate([ev.detail]);
    }

    initializeApp() {
        this.configService.registerRunner('scheme', (newScheme, oldScheme) => {
            document.documentElement.classList.remove(oldScheme);
            document.documentElement.classList.add(newScheme);
        });

        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.disableSwipeGestures()
        });
    }

    disableSwipeGestures() {
        this.ref.nativeElement.addEventListener('touchstart', (e: TouchEvent & { pageX: number }) => {
            if (e.pageX < 50 || e.pageX > window.innerWidth - 10) {
                console.log('TOUCHSTART')
                e.preventDefault();
            }
        });
    }
}
