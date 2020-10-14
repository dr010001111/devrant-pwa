import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { debug } from 'debug';
debug.enable('dr*')

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime)

window.addEventListener('keydown', (ev) => {
  document.documentElement.classList.add('using-keyboard')
  document.documentElement.classList.remove('using-mouse')
});

// needed for non-form components like alerts
const submitSelector = 'button[type="submit"],button[type="button"]';
window.addEventListener('keypress', (ev) => {
  if (ev.code === "Enter" && ev.ctrlKey) {
    const target = ev.target as HTMLElement
    const parentFocusable: HTMLElement = target.parentElement.closest('[tabindex]')

    if (parentFocusable) {
      const submitButton: HTMLElement = parentFocusable.querySelector(submitSelector)
      submitButton.click()
    } else {
      const closestSubmit: HTMLElement = target.closest(submitSelector)
      if (closestSubmit) {
        closestSubmit.click();
      }
    }
  }
});

window.addEventListener('mousedown', (ev) => {
  document.documentElement.classList.remove('using-keyboard')
  document.documentElement.classList.add('using-mouse')
});

window.addEventListener('keyup', (ev) => {
  const target = ev.target as HTMLElement;
  if (target.matches('[tabIndex]')) {
    if (ev.code === "Enter" || ev.code === "Space") {
      ev.preventDefault();
      target.click();
    }
  }
})

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
