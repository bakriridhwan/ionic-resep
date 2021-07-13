import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddKategoriPage } from './add-kategori.page';

const routes: Routes = [
  {
    path: '',
    component: AddKategoriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddKategoriPageRoutingModule {}
