import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DevRantService } from '@services/devrant.service';

@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.page.html',
    styleUrls: ['./profile-detail.page.scss'],
})
export class ProfileDetailPageComponent implements OnInit {
    params: Params;

    userId: string;

    constructor(
        private route: ActivatedRoute,
        private devrant: DevRantService
    ) {}

    ngOnInit() {
        const params = this.route.snapshot.params;
        this.userId = params.userId;
    }
}
