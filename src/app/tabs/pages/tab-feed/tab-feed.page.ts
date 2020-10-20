import pkg from '@/package.json';
import { AfterViewInit, Component, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { Config, IonVirtualScroll, IonInfiniteScroll } from '@ionic/angular';
import { DevRantService } from '@services/devrant.service';
import { Sort, RantInFeed } from 'ts-devrant';

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

    @ViewChild('content')
    contentEl: { el: HTMLIonContentElement };

    @ViewChild('header')
    headerEl: { el: HTMLElement };

    @ViewChild('segment')
    segmentEl: { el: HTMLElement };

    hasErrors: boolean;

    constructor(
        private readonly config: Config,
        private readonly service: DevRantService
    ) {
        this.fetchFeed();
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
        this.resetFeed();
        this.fetchFeed();
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

        this.resetFeed();
        this.fetchFeed();
    }

    resetFeed() {
        this.offset = 0;
        this.feed = [];
    }

    async fetchFeed() {
        try {
            const response = await this.service.getFeedRants(
                this.sort,
                this.limit,
                this.offset
            );

            this.feed.push(...response.rants);
            this.infiniteScroll.complete();
            if (this.virtualScroll) {
                this.virtualScroll.checkEnd();
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
