import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPageComponent } from './tabs.page';

const routes: Routes = [
    {
        path: 'tab',
        component: TabsPageComponent,
        children: [
            {
                path: 'feed',
                loadChildren: () =>
                    import('./pages/tab-feed/tab-feed.module').then(
                        (m) => m.TabFeedPageModule
                    ),
            },
            {
                path: 'notifications',
                loadChildren: () =>
                    import('./pages/tab-notifs/tab-notifs.module').then(
                        (m) => m.TabNotifsPageModule
                    ),
            },
            {
                path: 'profile',
                loadChildren: () =>
                    import('./pages/tab-profile/tab-profile.module').then(
                        (m) => m.TabProfilePageModule
                    ),
            },
        ],
    },
    {
        path: '',
        redirectTo: 'tab/feed',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule { }
