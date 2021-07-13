import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResepsPage } from './reseps.page';

const routes: Routes = [
  {
    path: '',
    component: ResepsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResepsPageRoutingModule {}
