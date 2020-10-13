import { Component, ElementRef, HostBinding, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Comment, VoteState } from 'ts-devrant';
import { DevRantService } from '../../services/devrant.service';
import { tapOrDouble } from '../../utils/tap-utils';
import { isVisible } from '../../utils/viewport-utils';
import { VoteBarComponent } from '../vote-bar/vote-bar.component';

@Component({
  selector: 'app-rant-comment',
  templateUrl: './rant-comment.component.html',
  styleUrls: ['./rant-comment.component.scss']
})
export class RantCommentComponent implements OnInit {
  protected _internalComment: any;

  get internalComment() {
    return this._internalComment;
  }

  set internalComment(applyComment) {
    this._internalComment = applyComment;
    (this.elRef.nativeElement as HTMLElement).id = `comment-${this.internalComment.id}`
  }

  @Input()
  set comment(comment: any) {
    this.internalComment = comment;
  }

  @Input()
  commentId: number;

  constructor(private elRef: ElementRef, private readonly devrant: DevRantService) { }

  ngOnInit(): void {
    if (!this.internalComment && this.commentId) {
      const untilVisible = () => requestAnimationFrame(() => {
        if (isVisible(this.elRef.nativeElement)) {
          this.fetchComment();
        } else {
          untilVisible()
        }

      })
      untilVisible();
    }
  }

  async fetchComment() {
    const commentReponse = await this.devrant.getComment(this.commentId)
    this.internalComment = commentReponse.comment
  }

  @ViewChild('voter')
  votebar: VoteBarComponent;

  doubleChecker;

  @HostListener('touchmove', ['$event'])
  clearTap() {
    this.doubleChecker && this.doubleChecker.clear()
  }

  /**
   * Also make sure this blob is the same as in rant component you dumbfuck
   */
  @HostBinding() tabindex = 0;
  @HostListener('click', ['$event'])
  @HostListener('keyup', ['$event'])
  onDoubleClick(event: MouseEvent | KeyboardEvent) {
    this.doubleChecker = tapOrDouble({
      double: () => this.votebar.onUpvote()
    }, event)
  }

  async clearVote() {
    this.comment = await this.devrant.voteComment(VoteState.Unvoted, this.comment.id)
  }

  async upvote() {
    this.comment = await this.devrant.voteComment(VoteState.Upvoted, this.comment.id)
  }

  async downvote() {
    this.comment = await this.devrant.voteComment(VoteState.Downvoted, this.comment.id)
  }

}
