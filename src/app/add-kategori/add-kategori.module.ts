import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddKategoriPageRoutingModule } from './add-kategori-routing.module';

import { AddKategoriPage } from './add-kategori.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddKategoriPageRoutingModule
  ],
  declarations: [AddKategoriPage]
})
export class AddKategoriPageModule {}
