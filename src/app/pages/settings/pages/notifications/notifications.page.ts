import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.page.html',
    styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPageComponent implements OnInit {
    params: Params;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.params = this.route.snapshot.params;
    }
}
