import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ResepsService } from '../services/reseps.service';
import { Resep } from './reseps.model';

import { map, tap } from "rxjs/operators";
import { DetailComponent } from '../detail/detail.component';

import { ActionSheetController } from '@ionic/angular';

import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-reseps',
  templateUrl: './reseps.page.html',
  styleUrls: ['./reseps.page.scss'],
})
export class ResepsPage{

  reseps$: Observable<Resep[]>;

  constructor(
    private resepsService: ResepsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private actionCtrl: ActionSheetController,
    private menuCtrl: MenuController,
  ) {}

  async ionViewDidEnter() {
    const loading = await this.loadingCtrl.create({ message: 'Loading ... '});
    loading.present();

    this.reseps$ = this.resepsService.getReseps().pipe(
      tap((reseps) => {
        loading.dismiss();
        return reseps;
      })
    )
  }

  async openDetailModal(resep: Resep) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: { resep },
    });

    await modal.present();

    const { data: updatedResep, role } = await modal.onDidDismiss();

    if(updatedResep && role === 'edit'){
      this.reseps$ = this.reseps$.pipe(
        map((reseps) => {
          reseps.forEach((rese) => {
            if (rese.id === updatedResep.id) {
              rese = updatedResep;
            }
            return rese;
          });
          return reseps;
        })
      )
    }

    if(role === 'delete') {
      this.reseps$ = this.reseps$.pipe(
        map((reseps) => {
          reseps.filter((rese) => rese.id !== updatedResep.id);
          return reseps;
        })
      );
    }

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ionViewDidEnter();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  toggleTheme(event){
    // console.log($event);
    if(event.detail.checked){
      document.body.setAttribute('color-theme', 'dark')
    }else{
      document.body.setAttribute('color-theme', 'light')
    }
  }




  openFirst() {
    this.menuCtrl.enable(true, 'first');
    this.menuCtrl.open('first');
  }

  openEnd() {
    this.menuCtrl.open('end');
  }

  openCustom() {
    this.menuCtrl.enable(true, 'custom');
    this.menuCtrl.open('custom');
  }

}
