import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { VoteBarComponent } from './vote-bar.component';

@NgModule({
    declarations: [VoteBarComponent],
    imports: [IonicModule, CommonModule],
    exports: [VoteBarComponent],
})
export class VoteBarModule {}
