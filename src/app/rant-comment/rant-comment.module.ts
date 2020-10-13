import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InlineProfileModule } from '../inline-profile/inline-profile.module';
import { RenderContentModule } from '../render-content/render-content.module';
import { VoteBarModule } from '../vote-bar/vote-bar.module';
import { RantCommentComponent } from './rant-comment.component';


@NgModule({
  declarations: [RantCommentComponent],
  imports: [
    IonicModule,
    CommonModule,
    InlineProfileModule,
    VoteBarModule,
    RenderContentModule
  ],
  exports: [RantCommentComponent]
})
export class RantCommentModule { }
