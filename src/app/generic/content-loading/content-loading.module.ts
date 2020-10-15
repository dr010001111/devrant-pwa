import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ContentLoadingComponent } from './content-loading.component';

@NgModule({
    declarations: [ContentLoadingComponent],
    imports: [IonicModule, CommonModule],
    exports: [ContentLoadingComponent],
})
export class ContentLoadingModule {}
