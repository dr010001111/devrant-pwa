import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { debug } from 'debug';
debug.enable('dr*')

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

dayjs.extend(relativeTime)

window.addEventListener('touchstart', (e: any) => {
  // is not near edge of view, exit
  if (e.pageX > 10 && e.pageX < window.innerWidth - 10) return;

  // prevent swipe to navigate gesture
  e.preventDefault();
});

window.addEventListener('keydown', (ev) => {
  document.documentElement.classList.add('using-keyboard')
  document.documentElement.classList.remove('using-mouse')
});

window.addEventListener('mousedown', (ev) => {
  document.documentElement.classList.remove('using-keyboard')
  document.documentElement.classList.add('using-mouse')
})

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
