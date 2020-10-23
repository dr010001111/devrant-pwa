import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPageComponent } from './settings.page';
import { InlineProfileModule } from '@app/components/inline-profile/inline-profile.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SettingsPageRoutingModule,
        InlineProfileModule,
    ],
    declarations: [SettingsPageComponent],
})
export class SettingsPageModule { }
