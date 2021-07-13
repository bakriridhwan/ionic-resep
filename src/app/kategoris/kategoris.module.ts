import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KategorisPageRoutingModule } from './kategoris-routing.module';

import { KategorisPage } from './kategoris.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KategorisPageRoutingModule
  ],
  declarations: [KategorisPage]
})
export class KategorisPageModule {}
