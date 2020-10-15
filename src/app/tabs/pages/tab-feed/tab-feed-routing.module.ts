import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabFeedPageComponent } from './tab-feed.page';

const routes: Routes = [
    {
        path: '',
        component: TabFeedPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabFeedPageRoutingModule {}
