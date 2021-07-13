import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KategorisPage } from './kategoris.page';

const routes: Routes = [
  {
    path: '',
    component: KategorisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KategorisPageRoutingModule {}
