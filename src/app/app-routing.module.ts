import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutPageModule)
    },
    {
        path: 'rant',
        loadChildren: () =>
            import('./pages/rant-detail/rant-detail.module').then(
                (m) => m.RantDetailModule
            ),
    },
    {
        path: 'user',
        loadChildren: () =>
            import('./pages/profile-detail/profile-detail.module').then(
                (m) => m.ProfileDetailPageModule
            ),
    },
    {
        path: 'settings',
        loadChildren: () =>
            import('./pages/settings/settings.module').then(
                (m) => m.SettingsPageModule
            ),
    },
    {
        path: '',
        loadChildren: () =>
            import('./tabs/tabs.module').then((m) => m.TabsPageModule),
    },
];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
