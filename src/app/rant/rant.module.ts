import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { InlineProfileModule } from '../inline-profile/inline-profile.module';
import { RenderContentModule } from '../render-content/render-content.module';
import { VoteBarModule } from '../vote-bar/vote-bar.module';
import { RantComponent } from './rant.component';

@NgModule({
  declarations: [RantComponent],
  imports: [
    IonicModule,
    CommonModule,
    VoteBarModule,
    InlineProfileModule,
    RenderContentModule
  ],
  exports: [RantComponent],
})
export class RantModule { }
