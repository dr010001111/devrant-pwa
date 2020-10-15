import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RantModule } from '@app/components/rant/rant.module';
import { CenterContentModule } from '@app/generic/center-content/center-content.module';
import { IonicModule } from '@ionic/angular';
import { TabFeedPageRoutingModule } from './tab-feed-routing.module';
import { TabFeedPage } from './tab-feed.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabFeedPageRoutingModule,
        RantModule,
        CenterContentModule,
    ],
    declarations: [TabFeedPage],
})
export class TabFeedPageModule {}
