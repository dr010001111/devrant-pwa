import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabFeedPage } from './tab-feed.page';

const routes: Routes = [
  {
    path: '',
    component: TabFeedPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabFeedPageRoutingModule { }
