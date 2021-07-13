import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AddKategoriPage } from '../add-kategori/add-kategori.page';
import { Kategori } from '../kategoris/kategori.model';
import { KategorisService } from '../services/kategoris.service';

import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-rinci',
  templateUrl: './rinci.component.html',
  styleUrls: ['./rinci.component.scss'],
})
export class RinciComponent implements OnInit {
  @Input() kategori: Kategori;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private kategorisService: KategorisService,
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController,
  ) { }

  ngOnInit() {}

  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.kategori, role);
  }


  async openEditModal(){
    const modal = await this.modalCtrl.create({
      component: AddKategoriPage,
      componentProps: { kategori: this.kategori },
    });

    await modal.present();


    const { data: updateKategori } = await modal.onDidDismiss();
    if(updateKategori){
      this.kategori = updateKategori;
    }
  }



  async onDeleteKategori() {
    const loading = await this.loadingCtrl.create({ message:  'Deleting ... ' });
    loading.present();

    this.kategorisService
    .deleteKategori(this.kategori.id)
    .pipe(take(1))
    .subscribe(() => {
      loading.dismiss();
      this.closeModal('delete');
      this.presentToastDelete();
    });
  }


  save() {
        localStorage.setItem('fav', JSON.stringify(this.kategori));
        this.presentToast();
    }

    async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Data disimpan di Local Storage',
      duration: 2000
    });
    toast.present();
    }

    async presentToastDelete() {
    const toast = await this.toastCtrl.create({
      message: 'Data berhasil dihapus!',
      duration: 2000
    });
    toast.present();
    }

    async presentActionSheet() {
    const actionSheet = await this.actionCtrl.create({
      header: 'Pengaturan',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Simpan',
        icon: 'bookmarks-outline',
        handler: () => {
          // console.log('Share clicked');
          this.save();
        }
      },{
        text: 'Edit',
        icon: 'create-outline',
        handler: () => {
          // console.log('Share clicked');
          this.openEditModal();
        }
      },{
        text: 'Hapus',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          // console.log('Delete clicked');
          this.onDeleteKategori();
        }
      },{
        text: 'Batal',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

}
