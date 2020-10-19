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

const acuratePointing = window.matchMedia('@media (pointer: fine)').matches;

@NgModule({
    declarations: [AppComponent, ColorPickerComponent],
    imports: [
        BrowserModule,
        HammerModule,
        IonicModule.forRoot({
            experimentalTransitionShadow: true,
            scrollAssist: true,
            swipeBackEnabled: true,
            mode: acuratePointing && navigator.platform === 'MacIntel' ? 'ios' : undefined,
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
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: GlobalErrorHandler },
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
