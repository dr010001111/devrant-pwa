import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { Comment, RantInFeed, VoteState } from 'ts-devrant';

@Component({
    selector: 'app-vote-bar',
    templateUrl: './vote-bar.component.html',
    styleUrls: ['./vote-bar.component.scss'],
})
export class VoteBarComponent implements OnInit {
    private _voteTo: RantInFeed | Comment | { [k: string]: any };
    voteBefore = false;

    isLoading = true;

    @Input()
    set voteTo(value: RantInFeed | Comment | { [k: string]: any }) {
        this.isLoading = !Boolean(value);
        this.updateDisabled();

        const v: any = value || {};

        this._voteTo = v;
        this.voteBefore = v.vote_state !== VoteState.Unvoted;
        this.localStoreBeforeUpdate = null;
    }

    get voteTo() {
        return this._voteTo || {};
    }

    localStoreBeforeUpdate: number = null;

    @Output()
    clearVote: EventEmitter<VoteState.Downvoted> = new EventEmitter();

    @Output()
    downvote: EventEmitter<VoteState.Downvoted> = new EventEmitter();

    @Output()
    upvote: EventEmitter<VoteState.Upvoted> = new EventEmitter();

    constructor(private readonly ref: ElementRef<HTMLElement>) {
        Object.assign(ref, {
            upvote: this.onUpvote,
            downvote: this.onDownvote,
        });
    }

    ngOnInit(): void {
        this.updateDisabled();
    }
    updateDisabled() {
        this.ref.nativeElement.toggleAttribute(
            'disabled',
            this.voteTo
                ? this.voteTo.vote_state === VoteState.NotAllowed
                : true
        );
    }

    get canVote() {
        if (this._voteTo) {
            return this._voteTo.vote_state !== VoteState.NotAllowed;
        }
    }

    @Output()
    onUpvote(ev?: Event) {
        if (ev) {
            ev.stopImmediatePropagation();
        }
        if (this.canVote) {
            if (!this.voteBefore) {
                this.upvote.emit(1);
                this.localStoreBeforeUpdate = this.voteTo.score + 1;
                this.voteBefore = true;
            } else {
                this.clearVote.emit(0);
                this.localStoreBeforeUpdate = this.voteTo.score - 1;
                this.voteBefore = false;
            }
        }
    }

    @Output()
    onDownvote(ev?: Event) {
        if (ev) {
            ev.stopImmediatePropagation();
        }
        if (this.canVote) {
            if (!this.voteBefore) {
                this.downvote.emit(-1);
                this.localStoreBeforeUpdate = this.voteTo.score - 1;
                this.voteBefore = true;
            } else {
                this.clearVote.emit(0);
                this.localStoreBeforeUpdate = this.voteTo.score + 1;
                this.voteBefore = false;
            }
        }
    }
}
