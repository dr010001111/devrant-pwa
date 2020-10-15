import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Image, Comment, Avatar } from 'ts-devrant';
import dayjs from 'dayjs';
import { getImageURL } from 'ts-devrant';

@Component({
  selector: 'app-notif-user-line',
  templateUrl: './notif-user-line.component.html',
  styleUrls: ['./notif-user-line.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineProfileComponent implements OnInit {

  @Input()
  userId: number;

  @Input()
  time: number;

  @Input()
  user: {
    name: string,
    avatar: Avatar
  }

  humanReadableTime: string;
  imageUrl: string;

  constructor() { }

  noBubble(event: Event) {
    event.stopImmediatePropagation();
  }

  ngOnInit(): void {
    this.imageUrl = getImageURL(this.user.avatar.i);
    if (this.time) {
      this.humanReadableTime = dayjs(this.time * 1000).fromNow()
    }
  }

}
