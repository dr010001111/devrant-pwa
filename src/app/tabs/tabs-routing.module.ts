import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'feed',
        loadChildren: () => import('../tab-feed/tab-feed.module').then(m => m.TabFeedPageModule)
      },
      {
        path: 'notifications',
        loadChildren: () => import('../tab-notifs/tab-notifs.module').then(m => m.TabNotifsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../tab-profile/tab-profile.module').then(m => m.TabProfilePageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
