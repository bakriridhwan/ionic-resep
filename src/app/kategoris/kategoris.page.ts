import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { KategorisService } from '../services/kategoris.service';
import { Kategori } from './kategori.model';
import { tap, map } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';

import { RinciComponent } from '../rinci/rinci.component';

@Component({
  selector: 'app-kategoris',
  templateUrl: './kategoris.page.html',
  styleUrls: ['./kategoris.page.scss'],
})
export class KategorisPage implements OnInit {
  kategoris$: Observable<Kategori[]>;

  constructor(
    private kategorisService: KategorisService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async ionViewDidEnter() {
    const loading = await this.loadingCtrl.create({ message: 'Loading ... '});
    loading.present();

    this.kategoris$ = this.kategorisService.getKategoris().pipe(
      tap((kategoris) => {
        loading.dismiss();
        return kategoris;
      })
    )
  }


  async openDetailModal(kategori: Kategori) {
    const modal = await this.modalCtrl.create({
      component: RinciComponent,
      componentProps: { kategori },
    });

    await modal.present();

    const { data: updatedKategori, role } = await modal.onDidDismiss();

    if(updatedKategori && role === 'edit'){
      this.kategoris$ = this.kategoris$.pipe(
        map((kategoris) => {
          kategoris.forEach((kate) => {
            if (kate.id === updatedKategori.id) {
              kate = updatedKategori;
            }
            return kate;
          });
          return kategoris;
        })
      )
    }


    if(role === 'delete') {
      this.kategoris$ = this.kategoris$.pipe(
        map((kategoris) => {
          kategoris.filter((kate) => kate.id !== updatedKategori.id);
          return kategoris;
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
}
