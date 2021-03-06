import {
    Component,
    HostBinding,
    HostListener,
    ViewEncapsulation,
} from '@angular/core';
import { DevRantService } from '@services/devrant.service';
import { NotificationService } from 'src/services/notification.service';
import { ConfigService } from '@services/config.service';
import { AlertService } from '@services/alert.service';

@Component({
    selector: 'app-tab-notifications',
    templateUrl: 'tab-notifs.page.html',
    styleUrls: ['tab-notifs.page.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class TabNotifsPageComponent {
    @HostBinding() id = 'notifs';
    hasErrors: boolean;
    constructor(
        private notifyService: NotificationService,
        readonly devrant: DevRantService,
        readonly alert: AlertService,
        readonly config: ConfigService
    ) { }

    @HostListener('window:tab-change', ['$event'])
    tabSelected(event: CustomEvent<{ tab: string }>) {
        if (event.detail.tab === 'tab2') {
            this.notifyService.userCheckedNotifications();
        }
    }

    async pushNotificationUpdateRequest(event: CustomEvent) {
        const target = event.target as HTMLIonRefresherElement;
        try {
            await this.forceUpdate();
            this.hasErrors = false;
        } catch (e) {
            this.hasErrors = true;
        } finally {
            target.complete();
        }
    }

    clearNotifs() {
        try {
            this.devrant.clearNotifications()
        } catch (err) {
            this.alert.genericAlert('Error!', err.message);
        }
    }

    async forceUpdate() {
        return this.notifyService.forceUpdate();
    }

    remapToProfile(userId: number) {
        const containsUser = this.notifyService.notifications.username_map[
            userId
        ];
        if (containsUser) {
            return {
                id: userId,
                name: containsUser.name,
                avatar: containsUser.avatar,
            };
        }
    }

    get user_map() {
        if (this.notifyService.notifications) {
            return this.notifyService.notifications.username_map;
        } else {
            return {};
        }
    }

    get notifications() {
        if (this.notifyService.notifications) {
            return this.notifyService.notifications.items;
        } else {
            return null;
        }
    }
}
