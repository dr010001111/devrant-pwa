import pkg from '@/package.json';
import { AfterViewInit, Component, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Config, IonVirtualScroll, IonInfiniteScroll, IonRefresher, PopoverController } from '@ionic/angular';
import { DevRantService } from '@services/devrant.service';
import { Sort, RantInFeed } from 'ts-devrant';
import { PopoverMenuComponent } from '@app/presentationals/popover-menu/popover-menu.component';

@Component({
    selector: 'app-tab-feed',
    templateUrl: 'tab-feed.page.html',
    styleUrls: ['tab-feed.page.scss']
})
export class TabFeedPageComponent implements AfterViewInit {
    limit = 20;
    offset = 0;

    feed = [];

    sort = Sort.Recent;

    pkg = pkg;

    @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
    @ViewChild(IonVirtualScroll) virtualScroll: IonVirtualScroll;
    @ViewChild(IonRefresher) refresher: IonRefresher;

    @ViewChild('content')
    contentEl: { el: HTMLIonContentElement };

    @ViewChild('header')
    headerEl: { el: HTMLElement };

    @ViewChild('segment')
    segmentEl: { el: HTMLElement };

    hasErrors: boolean;

    constructor(
        private readonly config: Config,
        private readonly service: DevRantService,
        private readonly popoverController: PopoverController
    ) {
        this.fetchFeed();
    }

    async presentPopover(ev) {
        const popover = await this.popoverController.create({
            component: PopoverMenuComponent,
            event: ev,
            translucent: true,

        });
        popover.present();
    }

    rantIdentity(_index, rant: RantInFeed) {
        return rant.id;
    }

    ngAfterViewInit(): void {
        if (this.config.get('mode') !== 'ios') {
            this.headerEl.el.append(this.segmentEl.el);
        }
    }

    async doRefresh() {
        this.fetchFeed(true);
    }

    feedFilterChange(ev) {
        switch (ev.detail.value) {
            case 'algo':
                this.sort = Sort.Algo;
                break;
            case 'recent':
                this.sort = Sort.Recent;
                break;
            case 'top':
                this.sort = Sort.Top;
                break;
        }

        this.fetchFeed(true);
    }

    async fetchFeed(reset?: boolean) {
        try {
            if (reset) {
                this.offset = 0;
            }

            const response = await this.service.getFeedRants(
                this.sort,
                this.limit,
                this.offset
            );

            if (reset) {
                this.feed = response.rants;
            } else {
                this.feed.push(...response.rants);
            }
            this.infiniteScroll.complete();
            if (this.virtualScroll) {
                this.virtualScroll.checkEnd();
            }
            if (this.refresher) {
                this.refresher.complete();
                this.refresher.disabled = true;
                setTimeout(() => {
                    this.refresher.disabled = false
                }, 3e3)
            }

            this.offset += this.limit;
            this.hasErrors = false;
        } catch (e) {
            this.hasErrors = true;
            console.error(e)
        }
    }

    async loadMore() {
        await this.fetchFeed();
    }
}
