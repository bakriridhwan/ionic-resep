import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { AddResepPage } from '../add-resep/add-resep.page';
import  { Resep } from '../reseps/reseps.model';
import { ResepsService } from '../services/reseps.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() resep: Resep;

  constructor(private modalCtrl: ModalController, private loadingCtrl: LoadingController, private resepService: ResepsService) { }

  ngOnInit() {}

  closeModal(role = 'edit'){
    this.modalCtrl.dismiss(this.resep, role);
  }


  async openEditModal (){
    const modal = await this.modalCtrl.create({
      component: AddResepPage,
      componentProps: { resep: this.resep },
    });

    await modal.present();


    const { data: updatedResep } = await modal.onDidDismiss();
    if(updatedResep) {
      this.resep = updatedResep;
    }
  }


  async onDeleteResep() {
    const loading = await this.loadingCtrl.create({ message:  'Deleting ... ' });
    loading.present();

    this.resepService
    .deleteResep(this.resep.id)
    .pipe(take(1))
    .subscribe(() => {
      loading.dismiss();
      this.closeModal('delete');
    });
  }

}
