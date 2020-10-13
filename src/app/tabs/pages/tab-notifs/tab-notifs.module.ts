import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CenterContentModule } from '../center-content/center-content.module';
import { ContentLoadingModule } from '../content-loading/content-loading.module';
import { InlineProfileModule } from '../inline-profile/inline-profile.module';
import { NotifUserLineModule } from '../notif-user-line/notif-user-line.module';
import { RantCommentModule } from '../rant-comment/rant-comment.module';
import { RantModule } from '../rant/rant.module';
import { Tab2PageRoutingModule } from './tab-notifs-routing.module';
import { TabNotifsPage } from './tab-notifs.page';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    RantModule,
    RantCommentModule,
    CenterContentModule,
    ContentLoadingModule,
    InlineProfileModule,
    NotifUserLineModule
  ],
  declarations: [TabNotifsPage]
})
export class TabNotifsPageModule { }
