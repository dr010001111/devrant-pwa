import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit
} from '@angular/core';
import dayjs from 'dayjs';
import { Comment, getImageURL } from 'ts-devrant';

@Component({
    selector: 'app-inline-profile',
    templateUrl: './inline-profile.component.html',
    styleUrls: ['./inline-profile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineProfileComponent implements OnInit {
    @Input()
    profile: Comment;

    humanReadableTime: string;

    constructor() { }

    noBubble(event: Event) {
        event.stopImmediatePropagation();
    }

    imageUrl(url) {
        return getImageURL(url);
    }

    ngOnInit(): void {
        if (this.profile.created_time) {
            this.humanReadableTime = dayjs(
                this.profile.created_time * 1000
            ).fromNow();
        }
    }
}
