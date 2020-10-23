import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '@services/config.service';
import { AlertService } from '@services/alert.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPageComponent implements OnInit {
    params: Params;

    constructor(
        private route: ActivatedRoute,
        private config: ConfigService,
        private alert: AlertService
    ) { }

    ngOnInit() {
        this.params = this.route.snapshot.params;
    }

    onToggle(event: CustomEvent) {
        const { checked } = event.detail;

        this.config['notifications:simple'] = checked
    }

    onNotifSettingToggle(event: CustomEvent, type) {
        switch (type) {
            default: this.alert.genericAlert('Not implemented.')
        }
    }
}

