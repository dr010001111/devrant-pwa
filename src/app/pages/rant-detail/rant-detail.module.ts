import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RantCommentModule } from '@app/components/rant-comment/rant-comment.module';
import { RantModule } from '@app/components/rant/rant.module';
import { ContentLoadingModule } from '@app/generic/content-loading/content-loading.module';
import { IonicModule } from '@ionic/angular';
import { RantDetailRoutingModule } from './rant-detail-routing.module';
import { RantDetailPageComponent } from './rant-detail.page';

@NgModule({
    declarations: [RantDetailPageComponent],
    imports: [
        IonicModule,
        CommonModule,
        RantModule,
        RantCommentModule,
        RantDetailRoutingModule,
        ContentLoadingModule,
    ],
})
export class RantDetailModule {}
