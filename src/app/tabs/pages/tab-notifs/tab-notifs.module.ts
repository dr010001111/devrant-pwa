import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InlineProfileModule } from '@app/components/inline-profile/inline-profile.module';
import { RantCommentModule } from '@app/components/rant-comment/rant-comment.module';
import { RantModule } from '@app/components/rant/rant.module';
import { CenterContentModule } from '@app/generic/center-content/center-content.module';
import { ContentLoadingModule } from '@app/generic/content-loading/content-loading.module';
import { IonicModule } from '@ionic/angular';
import { NotifUserLineModule } from './notif-user-line/notif-user-line.module';
import { TabNotifsPageRoutingModule } from './tab-notifs-routing.module';
import { TabNotifsPageComponent } from './tab-notifs.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabNotifsPageRoutingModule,
        RantModule,
        RantCommentModule,
        CenterContentModule,
        ContentLoadingModule,
        InlineProfileModule,
        NotifUserLineModule,
    ],
    declarations: [TabNotifsPageComponent],
})
export class TabNotifsPageModule {}
