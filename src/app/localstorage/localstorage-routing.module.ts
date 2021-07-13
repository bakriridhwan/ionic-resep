import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalstoragePage } from './localstorage.page';

const routes: Routes = [
  {
    path: '',
    component: LocalstoragePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalstoragePageRoutingModule {}
