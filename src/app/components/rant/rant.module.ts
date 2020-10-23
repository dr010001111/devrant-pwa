import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RenderContentModule } from '@app/generic/render-content/render-content.module';
import { IonicModule } from '@ionic/angular';
import { InlineProfileModule } from '../inline-profile/inline-profile.module';
import { VoteBarModule } from '../vote-bar/vote-bar.module';
import { RantComponent } from './rant.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [RantComponent],
    imports: [
        RouterModule,
        IonicModule,
        CommonModule,
        VoteBarModule,
        InlineProfileModule,
        RenderContentModule,
    ],
    exports: [RantComponent],
})
export class RantModule { }
