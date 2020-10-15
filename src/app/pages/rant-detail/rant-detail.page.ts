import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { DevRantService } from '@services/devrant.service';
import { Subscription } from 'rxjs';
import { RantInFeed } from 'ts-devrant';

@Component({
    templateUrl: './rant-detail.page.html',
    styleUrls: ['./rant-detail.page.scss'],
})
export class RantDetailPageComponent implements OnInit, OnDestroy {
    isLoading: boolean;
    hasErrors: boolean;

    routeSub: Subscription;

    rant: RantInFeed;
    comments: any[];
    highlightComment: string;

    @ViewChild('content', { static: false })
    content: HTMLIonContentElement;

    constructor(
        private readonly service: DevRantService,
        private route: ActivatedRoute,
        private router: Router,
        private _location: Location
    ) {
        this.router.events.subscribe((ev) => {
            if (ev instanceof Scroll) {
                this.highlightComment = ev.anchor;
                this.scrollToComment();
            }
        });
    }

    async doRefresh(event: CustomEvent) {
        await this.fetchRant(this.rant.id);
        (event.target as HTMLIonRefresherElement).complete();
    }

    async ngOnInit() {
        this.routeSub = this.route.params.subscribe(async (params) => {
            this.isLoading = true;
            const rantId = params['id'];

            await this.fetchRant(rantId);
            this.isLoading = false;
        });
    }

    scrollToComment() {
        setTimeout(() => {
            const targetComment = document.getElementById(
                `comment-${this.highlightComment}`
            );

            if (targetComment) {
                setTimeout(() => {
                    const elBounds = targetComment.getBoundingClientRect();
                    targetComment.classList.add('highlight');
                    this.content.scrollToPoint(
                        elBounds.left,
                        elBounds.top - 100,
                        400
                    );
                }, 200);
            }
        }, 100);
    }

    async fetchRant(rantId: number) {
        const response = await this.service.getRant(rantId);

        this.comments = response.comments;
        this.rant = response.rant;

        this.scrollToComment();
    }

    back() {
        this._location.back();
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
