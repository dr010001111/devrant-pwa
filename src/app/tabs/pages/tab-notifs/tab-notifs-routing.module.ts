import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabNotifsPage } from './tab-notifs.page';

const routes: Routes = [
    {
        path: '',
        component: TabNotifsPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabNotifsPageRoutingModule {}
