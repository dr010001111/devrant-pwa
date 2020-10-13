import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { DevRantService } from '@services/devrant.service';
import { Subscription } from 'rxjs';
import { RantInFeed } from 'ts-devrant';

import { CommentFormComponent } from '../../components/comment-form/comment-form.component';

@Component({
  templateUrl: './rant-detail.page.html',
  styleUrls: ['./rant-detail.page.scss']
})
export class RantDetailPage implements OnInit, OnDestroy {
  isLoading: boolean;
  hasErrors: boolean;

  routeSub: Subscription;

  rant: RantInFeed;
  rantId: number;
  comments: any[];
  highlightComment: string;

  @ViewChild('content', { static: false })
  content: HTMLIonContentElement;

  constructor(
    private readonly service: DevRantService,
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private modalController: ModalController,
  ) {

    this.router.events.subscribe(
      ev => {
        if (ev instanceof Scroll) {
          this.highlightComment = ev.anchor;
          this.scrollToComment()
        }
      });
  }

  async doRefresh(event: CustomEvent) {
    await this.fetchRant(this.rant.id);
    (event.target as HTMLIonRefresherElement).complete()
  }

  async ngOnInit() {
    this.routeSub = this.route.params.subscribe(async params => {
      this.isLoading = true;
      this.rantId = params["id"];

      await this.fetchRant(this.rantId);
      this.isLoading = false;
    });
  }

  scrollToComment() {
    setTimeout(() => {
      const targetComment = document.getElementById(`comment-${this.highlightComment}`)

      if (targetComment) {
        setTimeout(() => {
          const elBounds = targetComment.getBoundingClientRect();
          targetComment.classList.add('highlight')
          this.content.scrollToPoint(elBounds.left, elBounds.top - 100, 400)
        }, 200)
      }
    }, 100)
  }

  async fetchRant(rantId: number) {
    const response = await this.service.getRant(rantId)

    this.comments = response.comments;
    this.rant = response.rant;

    this.scrollToComment();
  }

  back() {
    this._location.back();
  }

  /**
   * showCommentForm displays the comment modal 
   * it passes the rantId to the modal
   */
  async showCommentForm() {
    const modal = await this.modalController.create({
      component: CommentFormComponent,
      componentProps: {
        'rantId': this.rantId,
      }
    });
    return await modal.present();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
