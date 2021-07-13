import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalstoragePageRoutingModule } from './localstorage-routing.module';

import { LocalstoragePage } from './localstorage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalstoragePageRoutingModule
  ],
  declarations: [LocalstoragePage]
})
export class LocalstoragePageModule {}
