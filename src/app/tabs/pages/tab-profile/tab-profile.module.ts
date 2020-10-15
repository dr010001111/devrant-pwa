import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '@app/components/profile/profile.module';
import { CenterContentModule } from '@app/generic/center-content/center-content.module';
import { IonicModule } from '@ionic/angular';

import { TabProfilePageRoutingModule } from './tab-profile-routing.module';
import { TabProfilePageComponent } from './tab-profile.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: TabProfilePageComponent },
        ]),
        TabProfilePageRoutingModule,
        ProfileModule,
        CenterContentModule,
    ],
    declarations: [TabProfilePageComponent],
})
export class TabProfilePageModule {}
