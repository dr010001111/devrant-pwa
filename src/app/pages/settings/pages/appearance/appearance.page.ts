import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ConfigService } from '@services/config.service';

@Component({
    selector: 'app-appearance',
    templateUrl: './appearance.page.html',
    styleUrls: ['./appearance.page.scss'],
})
export class AppearancePageComponent implements OnInit {
    params: Params;

    constructor(
        private route: ActivatedRoute,
        private readonly configService: ConfigService
    ) {
        console.log(this.configService.scheme);
    }

    applyTheme(event: CustomEvent<{ value: string }>) {
        switch (event.detail.value) {
            case 'auto':
                return (this.configService.scheme = 'auto');
            case 'black':
                return (this.configService.scheme = 'black');
            case 'dark':
                return (this.configService.scheme = 'dark');
            case 'light':
                return (this.configService.scheme = 'light');
        }
    }

    ngOnInit() {
        this.params = this.route.snapshot.params;
    }
}
