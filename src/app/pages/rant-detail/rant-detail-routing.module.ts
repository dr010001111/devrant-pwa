import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RantDetailPageComponent } from './rant-detail.page';

const routes: Routes = [{ path: ':id', component: RantDetailPageComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RantDetailRoutingModule {}
