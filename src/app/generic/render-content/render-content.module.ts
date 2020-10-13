import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenderContentComponent } from './render-content.component';



@NgModule({
  declarations: [RenderContentComponent],
  imports: [
    CommonModule
  ],
  exports: [RenderContentComponent]
})
export class RenderContentModule { }
