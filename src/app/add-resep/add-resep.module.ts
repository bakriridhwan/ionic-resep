import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddResepPageRoutingModule } from './add-resep-routing.module';

import { AddResepPage } from './add-resep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddResepPageRoutingModule
  ],
  declarations: [AddResepPage]
})
export class AddResepPageModule {}
