import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { DevRantService } from '@services/devrant.service';
import { fromEvent } from 'file-selector';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/services/alert.service';
import { RantInFeed } from 'ts-devrant';


@Component({
    templateUrl: './rant-detail.page.html',
    styleUrls: ['./rant-detail.page.scss'],
})
export class RantDetailPageComponent implements OnInit, OnDestroy {
    isLoading: boolean;
    hasErrors: boolean;

    routeSub: Subscription;
    private commentString = '';

    rant: RantInFeed;
    rantId: number;
    comments: any[];
    highlightComment: string;

    @ViewChild('content', { static: false })
    content: HTMLIonContentElement;

    attachedImage: File = null;

    constructor(
        readonly service: DevRantService,
        private route: ActivatedRoute,
        private router: Router,
        private _location: Location,
        private alertService: AlertService
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
            const rant = params['id'];

            await this.fetchRant(rant);
            this.isLoading = false;
        });
    }

    async onDrop(event: Event) {
        event.preventDefault();
        this.fileChange(event)
    }

    async applyFile(files: File[]) {
        const [firstFile = null] = files;
        this.attachedImage = firstFile;
    }

    async fileChange(event: Event) {
        const files = (await fromEvent(event)) as File[];
        this.applyFile(files);
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

    getCommentInput($event) {
        this.commentString = $event.target.value;
    }
    /**
     * Submit the comment with the API
     */
    submitComment() {
        // length checks on text area
        if (this.commentString.length < 1) {
            console.log('Comment length has to be greater than 1');
            this.alertService.genericAlert('Empty Comment', 'Type more things!!');
            return;
        } else if (this.commentString.length > 1000) {
            console.log('Comment characters cannot exceed 1000');
            // this.showToast('Comment length cannot exceed 1000 characters');
            this.alertService.genericAlert(
                'Comment too Long',
                'Comment length cannot exceed 1000 characters'
            );
            return;
        }

        if (this.service.isSignedIn) {
            const token = this.service.token;
            const response = this.service.postComment(
                this.rant.id,
                this.commentString,
                this.attachedImage
            );
            // this.fetchRant(this.rant.id);
        }
    }
}
