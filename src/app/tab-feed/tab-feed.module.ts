import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CenterContentModule } from '../center-content/center-content.module';
import { RantModule } from '../rant/rant.module';
import { Tab1PageRoutingModule } from './tab-feed-routing.module';
import { TabFeedPage } from './tab-feed.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    RantModule,
    CenterContentModule,
  ],
  declarations: [TabFeedPage]
})
export class TabFeedPageModule { }
