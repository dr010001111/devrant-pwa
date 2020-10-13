import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabProfilePage } from './tab-profile.page';

const routes: Routes = [
  {
    path: '',
    component: TabProfilePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
