import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { NotificationService } from 'src/services/notification.service';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
    @ViewChild('tabs')
    tabs: IonTabs;

    constructor(
        private elRef: ElementRef,
        public notifs: NotificationService
    ) {}

    async tabChange(event: { tab: string }) {
        const ev = new CustomEvent('tab-change', {
            detail: event,
        });
        window.dispatchEvent(ev);
    }
}
