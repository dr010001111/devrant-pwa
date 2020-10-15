import debug from 'debug';
import tsdr, { Notifications, Token } from 'ts-devrant';
import { MessageKinds, NotificationsChange } from './messages';

debug.enable('*');

const log = debug('dr:sw');
log.log = console.log.bind(console);

const updateInterval = 1e3 * 7;

class DevrantServiceWorker {
    token?: Token;
    updaterId: number;
    notifications: Notifications;
    notificationsStateSinceLastChecked: Notifications;
    reg = (self as any).registration as ServiceWorkerRegistration;

    isUpdating = false;

    constructor() {
        self.addEventListener('message', (ev) => {
            const message = ev.data as MessageKinds;
            debug(`Message: ${message.type}`);

            switch (message.type) {
                case 'setAPI': {
                    tsdr.updateConfig({
                        api: message.apiURL,
                    });
                    break;
                }
                case 'newToken': {
                    this.token = message.token;
                    this.resetAndRunUpdater();
                    break;
                }
                case 'notifsChecked': {
                    this.notificationsChecked();
                    break;
                }
                case 'forceUpdateNotifs': {
                    this.checkNotifications(true);
                    break;
                }
            }
        });

        log('Init');
        log(tsdr);

        this.runUpdater();
    }

    notificationsChecked() {
        // if the user is checking the notifications, set the last state to the current one.
        this.notificationsStateSinceLastChecked = this.notifications;
    }

    reset() {
        clearInterval(this.updaterId);
        this.notificationsStateSinceLastChecked = null;
    }

    resetAndRunUpdater() {
        this.reset();
        this.runUpdater();
    }

    runUpdater() {
        this.updaterId = setInterval(
            this.update.bind(this),
            updateInterval
        ) as any;
        this.update();
    }

    /**
     * Generic periodic background updates.
     */
    update() {
        if (!this.token) {
            return;
        }

        log('Update');
        this.checkNotifications();
    }

    async checkNotifications(forcedRequest?: boolean) {
        if (this.isUpdating) {
            log('skip update due to active queue.');
            return;
        }

        this.isUpdating = true;
        try {
            const notifs = await tsdr.notifications(this.token);

            if (!forcedRequest) {
                this.notifyUserOfNewNotifications(notifs.data);
            } else {
                this.notificationsChecked();
            }

            this.notifyUI(notifs.data, forcedRequest);
            this.notifications = notifs.data;
        } finally {
            this.isUpdating = false;
        }
    }

    /**
     * This logic is brainfuck and I'm happy it works,
     * please don't let me touch this again
     * @param newNotifs
     */
    notifyUserOfNewNotifications(newNotifs: Notifications) {
        // abort when there has no notifications been set yet (cold bootup)
        if (!this.notifications) {
            return;
        }

        // if there is a previous state...
        if (this.notificationsStateSinceLastChecked) {
            // and the updated response's total is great than the last response's total...
            if (newNotifs.unread.total > this.notifications.unread.total) {
                const notifStateSLC = this.notificationsStateSinceLastChecked;
                // then we get the number of _locally unread_ notifications from all the _server unread_ notifications...
                const notificationChange =
                    newNotifs.unread.total - notifStateSLC.unread.total;

                // right before we annoy the user, let's make sure there is anything true to that calculation.
                if (notificationChange > 0) {
                    // and we finally inform the user that there are X new notifications since he last checked, but not read
                    this.notify(
                        `You have ${notificationChange} new notifications!`
                    );
                }
            }
        }
    }

    async notifyUI(notifs: Notifications, forcedRequest?: boolean) {
        const allClients: any[] = await (self as any).clients.matchAll({
            includeUncontrolled: true,
            type: 'window',
        });
        log(`notify ${allClients.length} clients`);
        allClients.forEach((client) => {
            client.postMessage({
                type: 'notifications',
                notifications: notifs,
            } as NotificationsChange);
        });
    }

    async notify(
        title,
        message?,
        additionalOptions?: Omit<NotificationOptions, 'message'>
    ) {
        this.reg.showNotification(title, {
            ...additionalOptions,
            body: message,
            icon: '/assets/icons/icon-128x128.png',
        });
    }
}

new DevrantServiceWorker();
