import { AfterContentInit, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Sort } from 'ts-devrant';
import { DevRantService } from '../../services/devrant.service';
import pkg from '../../../package.json';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: 'tab-feed.page.html',
  styleUrls: ['tab-feed.page.scss']
})
export class TabFeedPage implements AfterViewInit {
  limit = 20;
  offset = 0;

  feed = [];

  sort = Sort.Recent;

  pkg = pkg;

  @ViewChild('content')
  contentEl: { el: HTMLIonContentElement }

  @ViewChild('list')
  listEl: { el: HTMLIonListElement }

  @ViewChild('feedContainer')
  feedEl: { el: HTMLElement }

  @ViewChild('header')
  headerEl: { el: HTMLElement }

  @ViewChild('segment')
  segmentEl: { el: HTMLElement }

  hasErrors: boolean;

  constructor(
    private readonly platform: Platform,
    private readonly service: DevRantService
  ) {
    this.fetchFeed();
  }

  ngAfterViewInit(): void {
    if (!this.platform.is('ios')) {
      this.headerEl.el.append(this.segmentEl.el)
    }
  }

  async doRefresh(event: CustomEvent) {
    this.resetFeed();
    const target = (event.target as HTMLIonRefresherElement);
    setTimeout(() => {
      target.complete()
      target.disabled = true
    }, 1e3)
  }

  feedFilterChange(ev) {
    switch (ev.detail.value) {
      case 'algo':
        this.sort = Sort.Algo
        break;
      case 'recent':
        this.sort = Sort.Recent
        break;
      case 'top':
        this.sort = Sort.Top
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
      const response = await this.service.getFeedRants(this.sort, this.limit, this.offset);
      this.feed = [
        ...this.feed,
        ...response.rants
      ];

      this.offset += this.limit;
      this.hasErrors = false;
    } catch (e) {
      this.hasErrors = true;
    }
  }

  async loadMore(event: CustomEvent) {
    await this.fetchFeed();
    (event.target as HTMLIonInfiniteScrollElement).complete();
  }

}
