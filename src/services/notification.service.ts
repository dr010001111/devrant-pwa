import { Injectable } from '@angular/core';
import { Notifications } from 'ts-devrant';
import {
    ForceUpdateNotifcationsRequest,
    MessageKinds,
    NotificationsChecked,
} from 'src/service-worker/messages';
import { getWorker } from '../utils/workers';
import { DevRantService } from './devrant.service';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    userCheckedNotifications() {
        this.worker.postMessage({
            type: 'notifsChecked',
        } as NotificationsChecked);
    }

    notifications: Notifications;
    worker: ServiceWorker;

    constructor(devrant: DevRantService) {
        this.setupWorkerListeners();
    }

    forceUpdate() {
        return new Promise((resolve, reject) => {
            this.worker.postMessage({
                type: 'forceUpdateNotifs',
            } as ForceUpdateNotifcationsRequest);

            const timeoutExceededId = setTimeout(() => {
                reject('Timeout error');
            }, 1e3 * 5);

            const resolvePromise = (ev: MessageEvent) => {
                const message = ev.data as MessageKinds;

                switch (message.type) {
                    case 'notifications':
                        clearTimeout(timeoutExceededId);
                        resolve();
                        navigator.serviceWorker.removeEventListener(
                            'message',
                            resolvePromise
                        );
                }
            };

            navigator.serviceWorker.addEventListener(
                'message',
                resolvePromise
            );
        });
    }

    get count() {
        if (this.notifications) {
            return this.notifications.unread.total;
        }
        return null;
    }

    async setupWorkerListeners() {
        this.worker = await getWorker();
        navigator.serviceWorker.addEventListener(
            'message',
            (ev: MessageEvent) => {
                const message = ev.data as MessageKinds;

                switch (message.type) {
                    case 'notifications':
                        this.updateNotifications(message.notifications);
                }
            }
        );
    }

    updateNotifications(notifications: Notifications) {
        const newNotifs = JSON.stringify(notifications.items);
        const oldNotifs = JSON.stringify(
            this.notifications && this.notifications.items
        );
        const isNewSet = oldNotifs !== newNotifs;

        if (isNewSet) {
            this.notifications = notifications;
        }
    }
}
