import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResepsPageRoutingModule } from './reseps-routing.module';

import { ResepsPage } from './reseps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResepsPageRoutingModule
  ],
  declarations: [ResepsPage]
})
export class ResepsPageModule {}
