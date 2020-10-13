import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'rant',
    loadChildren: () => import('./rant-detail/rant-detail.module').then(m => m.RantDetailModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./profile-detail/profile-detail.module').then( m => m.ProfileDetailPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
