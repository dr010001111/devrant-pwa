import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { debug } from 'debug';
debug.enable('dr*');

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';

import dayjs from 'dayjs';

dayjs.extend(updateLocale);
dayjs.extend(relativeTime);

dayjs.updateLocale('en', {
    relativeTime: {
        future: 'in %s',
        past: '%s ago',
        s: 'a few seconds',
        m: 'a minute',
        mm: '%dm',
        h: 'an hour',
        hh: '%dh',
        d: 'a day',
        dd: '%dd',
        M: 'a month',
        MM: '%dm',
        y: 'a year',
        yy: '%dy',
    },
});

window.addEventListener('keydown', (ev) => {
    if (!navigator.maxTouchPoints) {
        document.documentElement.classList.add('using-keyboard');
        document.documentElement.classList.remove('using-mouse');
    }
});

window.addEventListener('mousedown', (ev) => {
    if (!navigator.maxTouchPoints) {
        document.documentElement.classList.remove('using-keyboard');
        document.documentElement.classList.add('using-mouse');
    }
});

// needed for non-form components like alerts
const submitSelector = 'button[type="submit"],button[type="button"]';
window.addEventListener('keypress', (ev) => {
    const inputEnter = ev.key === 'Enter' && (ev.target as HTMLElement).tagName === 'INPUT';
    if (inputEnter || (ev.key === 'Enter' && ev.ctrlKey)) {
        const target = ev.target as HTMLElement;
        const parentFocusable: HTMLElement = target.parentElement.closest(
            '[tabindex]'
        );

        if (parentFocusable) {
            const submitButton: HTMLElement = parentFocusable.querySelector(
                submitSelector
            );
            submitButton.click();
        } else {
            const closestSubmit: HTMLElement = target.closest(submitSelector);
            if (closestSubmit) {
                closestSubmit.click();
            }
        }
    }
});

window.addEventListener('keyup', (ev) => {
    const target = ev.target as HTMLElement;
    if (target.matches('[tabIndex]')) {
        if (ev.code === 'Enter' || ev.code === 'Space') {
            ev.preventDefault();
            target.click();
        }
    }
});

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.log(err));
