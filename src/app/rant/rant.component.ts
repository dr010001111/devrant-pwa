import { Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RantInFeed, VoteState } from 'ts-devrant';
import { DevRantService } from '../../services/devrant.service';
import { tapOrDouble } from '../../utils/tap-utils';
import { isVisible } from '../../utils/viewport-utils';
import { VoteBarComponent } from '../vote-bar/vote-bar.component';

@Component({
  selector: 'app-rant',
  templateUrl: './rant.component.html',
  styleUrls: ['./rant.component.scss']
})
export class RantComponent implements OnInit {
  internalRant: RantInFeed;

  @Input()
  set rant(rant: RantInFeed) {
    this.internalRant = rant;
  }

  @Input()
  rantId: number;

  @Input()
  @HostBinding('class.rant-complete')
  complete: boolean;

  @Input()
  @HostBinding('class.rant-small')
  small: boolean;

  @Input()
  showUser: boolean;

  @ViewChild('voter')
  votebar: VoteBarComponent;

  doubleChecker;

  constructor(private refEl: ElementRef, private readonly devrant: DevRantService, private readonly router: Router) { }

  ngOnInit() {
    if (!this.internalRant && this.rantId) {
      const untilVisible = () => requestAnimationFrame(() => {
        if (isVisible(this.refEl.nativeElement)) {
          this.fetchRant();
        } else {
          untilVisible()
        }

      })
      untilVisible();
    }
  }

  async fetchRant() {
    const rantResponse = await this.devrant.getRant(this.rantId)
    this.rant = rantResponse.rant
  }

  @HostListener('touchmove', ['$event'])
  clearTap() {
    this.doubleChecker && this.doubleChecker.clear()
  }

  /**
   * Also make sure this blob is the same as in rant-comment component you dumbfuck
   */
  @HostBinding() tabindex = 0;
  @HostListener('click', ['$event'])
  @HostListener('keyup', ['$event'])
  onDoubleClick(event: MouseEvent | KeyboardEvent) {
    this.doubleChecker = tapOrDouble({
      double: () => this.votebar.onUpvote(),
      single: () => this.router.navigate([`/rant/${this.internalRant.id}`])
    }, event)
  }

  async clearVote() {
    this.rant = await this.devrant.vote(VoteState.Unvoted, this.internalRant.id)
  }

  async upvote() {
    this.rant = await this.devrant.vote(VoteState.Upvoted, this.internalRant.id)
  }

  async downvote() {
    this.rant = await this.devrant.vote(VoteState.Downvoted, this.internalRant.id)
  }


}

