import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { Resep } from '../reseps/reseps.model';
import { ResepsService } from '../services/reseps.service';

@Component({
  selector: 'app-add-resep',
  templateUrl: './add-resep.page.html',
  styleUrls: ['./add-resep.page.scss'],
})
export class AddResepPage implements OnInit {
  @Input() resep: Resep;
  isEditMode = false;
  form: FormGroup;

  constructor(
    private  resepsService: ResepsService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    ) { }

  ngOnInit() {
    this.initAddResepForm();


    if(this.resep) {
      this.isEditMode = true;
      this.setFormValues();
    }
  }

  initAddResepForm(){
    this.form = new FormGroup({
      jenis: new FormControl(null, [Validators.required]),
      judul: new FormControl(null, [Validators.required]),
      gambar: new FormControl(null, [Validators.required]),
      deskripsi: new FormControl(null),
      bahan: new FormControl(null, [Validators.required]),
      alat: new FormControl(null, [Validators.required]),
      langkah: new FormControl(null, [Validators.required]),
    });
  }

  setFormValues(){
    this.form.setValue({
      jenis: this.resep.jenis,
      judul: this.resep.judul,
      gambar: this.resep.gambar,
      deskripsi: this.resep.deskripsi,
      bahan: this.resep.bahan,
      alat: this.resep.alat,
      langkah: this.resep.langkah,
    });

    this.form.updateValueAndValidity();
  }

  closeModal(data = null) {
    this.modalCtrl.dismiss(data);
  }


  async submitResep(){
    // console.log(this.form.value);

    const loading = await this.loadingCtrl.create({message: 'Loading ... '});
    loading.present();


    let response;
    if(this.isEditMode) {
      response = this.resepsService.updateResep(
        this.resep.id,
        this.form.value
      );
    }else{
      response = this.resepsService.addResep(this.form.value);
      this.presentToast();
    }


    response.pipe(take(1))
    .subscribe((resep) => {
      // console.log(resep);
      this.form.reset();
      loading.dismiss();

      if(this.isEditMode) {
        this.closeModal(resep);
      }
    });
  }


  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Berhasil',
      duration: 2000
    });
    toast.present();
    }

}
