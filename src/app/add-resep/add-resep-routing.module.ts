import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddResepPage } from './add-resep.page';

const routes: Routes = [
  {
    path: '',
    component: AddResepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddResepPageRoutingModule {}
