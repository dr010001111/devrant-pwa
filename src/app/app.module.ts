import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import {
    BrowserModule,
    HammerGestureConfig,
    HammerModule,
    HAMMER_GESTURE_CONFIG,
} from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy, IonRouterOutlet } from '@ionic/angular';
import Hammer from 'hammerjs';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './crashed';
import { ColorPickerComponent } from './generic/color-picker/color-picker.component';
import { PopoverMenuComponent } from './presentationals/popover-menu/popover-menu.component';
import { isPlatform } from '@ionic/core';


@Injectable()
export class DrantHammerConfig extends HammerGestureConfig {
    overrides = <any>{
        pan: { direction: 6 },
        pinch: { enable: false },
        rotate: { enable: false },
    };

    buildHammer(element: HTMLElement) {
        const mc = new Hammer(element, {
            touchAction: 'pan-y',
        });

        return mc;
    }
}

@NgModule({
    declarations: [AppComponent, ColorPickerComponent, PopoverMenuComponent],
    imports: [
        BrowserModule,
        HammerModule,
        IonicModule.forRoot({
            experimentalTransitionShadow: true,
            scrollAssist: true,
            swipeBackEnabled: true,
            mode: isPlatform('desktop') && navigator.platform === 'MacIntel' ? 'ios' : undefined,
            animated: !window.matchMedia('(prefers-reduced-motion: reduce)')
                .matches,
        }),
        AppRoutingModule,
        environment.production
            ? ServiceWorkerModule.register('/sw-master.js', {
                enabled: true,
                registrationStrategy: 'registerImmediately',
            })
            : ServiceWorkerModule.register('/sw-devrant.js', {
                enabled: true,
            }),
    ],
    providers: [
        {
            provide: HAMMER_GESTURE_CONFIG,
            useClass: DrantHammerConfig,
        },
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
