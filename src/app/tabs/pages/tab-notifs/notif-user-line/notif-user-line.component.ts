import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { Image, Comment, Avatar } from 'ts-devrant';
import dayjs from 'dayjs';
import { getImageURL } from 'ts-devrant';

@Component({
    selector: 'app-notif-user-line',
    templateUrl: './notif-user-line.component.html',
    styleUrls: ['./notif-user-line.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineProfileComponent implements OnInit {
    @Input()
    time: number;

    @Input()
    user: {
        id: number;
        name: string;
        avatar: Avatar;
    };

    humanReadableTime: string;

    constructor() {}

    noBubble(event: Event) {
        event.stopImmediatePropagation();
    }

    imageUrl(imageId) {
        return getImageURL(imageId);
    }

    ngOnInit(): void {
        if (this.time) {
            this.humanReadableTime = dayjs(this.time * 1000).fromNow();
        }
    }
}
