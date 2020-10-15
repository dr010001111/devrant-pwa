import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CenterContentModule } from '@app/generic/center-content/center-content.module';
import { ContentLoadingModule } from '@app/generic/content-loading/content-loading.module';
import { IonicModule } from '@ionic/angular';
import { RantCommentModule } from '../rant-comment/rant-comment.module';
import { RantModule } from '../rant/rant.module';
import { ProfileComponent } from './profile.component';

@NgModule({
    declarations: [ProfileComponent],
    imports: [
        IonicModule,
        CommonModule,
        RantCommentModule,
        RouterModule,
        RantModule,
        CenterContentModule,
        ContentLoadingModule,
    ],
    exports: [ProfileComponent],
})
export class ProfileModule {}
