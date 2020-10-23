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
import {
    AlertController,
    Platform,
    Config,
    IonRouterOutlet,
    LoadingController,
} from '@ionic/angular';
import { ConfigService } from '@services/config.service';

import { DevRantService } from 'src/services/devrant.service';
import { applyThemeFromHex } from '@utils/color-utils';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
    tabletOrAbove = false;

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

        const media = matchMedia('(min-width: 770px)');
        this.tabletOrAbove = media.matches;
        media.addEventListener('change', () => {
            this.tabletOrAbove = media.matches;
        });

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

        const schemeWatcher = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        schemeWatcher.onchange = this.systemOSChange.bind(this);
        this.systemOSChange();
    }

    @HostListener('window:internal-link', ['$event'])
    internalRedirect(ev: CustomEvent) {
        this.router.navigate([ev.detail]);
    }

    systemOSChange() {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)')
            .matches;
        document.documentElement.classList.remove('auto-light');
        document.documentElement.classList.remove('auto-dark');

        if (this.configService.scheme !== 'auto') {
            return;
        }

        if (isDark) {
            document.documentElement.classList.add('auto-dark');
        } else {
            document.documentElement.classList.add('auto-light');
        }
    }

    initializeApp() {
        this.configService.registerRunner(
            'scheme',
            (newScheme: string, oldScheme: null | string) => {
                document.documentElement.classList.remove(
                    'theme-custom',
                    `theme-${oldScheme}`
                );

                if (String(oldScheme).startsWith('#')) {
                    const body = document.body;
                    // @see applyThemeFromHex
                    body.style.removeProperty('--ion-background-color');
                    body.style.removeProperty('--ion-border-color');
                    body.style.removeProperty('--ion-toolbar-background');
                    body.style.removeProperty('--ion-tab-bar-background');
                }

                if (newScheme.startsWith('#')) {
                    document.documentElement.classList.add(`theme-custom`);
                    applyThemeFromHex(newScheme);
                } else {
                    document.documentElement.classList.add(
                        `theme-${newScheme}`
                    );
                }

                this.systemOSChange();
            }
        );

        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.disableSwipeGestures();
        });
    }

    disableSwipeGestures() {
        this.ref.nativeElement.addEventListener(
            'touchstart',
            (e: TouchEvent & { pageX: number }) => {
                if (e.pageX < 50 || e.pageX > window.innerWidth - 10) {
                    console.log('TOUCHSTART');
                    e.preventDefault();
                }
            }
        );
    }
}
