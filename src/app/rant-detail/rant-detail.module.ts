import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RantDetailRoutingModule } from './rant-detail-routing.module';
import { RantDetailPage } from './rant-detail.page';
import { RantModule } from '../rant/rant.module';
import { RantCommentModule } from '../rant-comment/rant-comment.module'
import { ContentLoadingComponent } from '../content-loading/content-loading.component';
import { ContentLoadingModule } from '../content-loading/content-loading.module';


@NgModule({
  declarations: [RantDetailPage],
  imports: [
    IonicModule,
    CommonModule,
    RantModule,
    RantCommentModule,
    RantDetailRoutingModule,
    ContentLoadingModule,
  ]
})
export class RantDetailModule { }
