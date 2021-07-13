import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Kategori } from '../kategoris/kategori.model';
import { KategorisService } from '../services/kategoris.service';

// import { ImagePicker } from '@ionic-native/image-picker/ngx';

@Component({
  selector: 'app-add-kategori',
  templateUrl: './add-kategori.page.html',
  styleUrls: ['./add-kategori.page.scss'],
})
export class AddKategoriPage implements OnInit {

  @Input() kategori: Kategori;
  isEditMode = false;
  form: FormGroup;

  constructor(
    private kategorisService: KategorisService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    // private imgPicker: ImagePicker,
  ) { }

  ngOnInit() {
    this.initcreateAddKategoriForm();


    if(this.kategori){
      this.isEditMode = true;
      this.setFormValues();
    }

  }

  initcreateAddKategoriForm(){
    this.form = new FormGroup({
      nama_kategori : new FormControl(null, [Validators.required]),
      gambar_kategori : new FormControl(null, [Validators.required]),
      deskripsi_kategori : new FormControl(null, [Validators.required]),
    });
  }


  setFormValues(){
    this.form.setValue({
      nama_kategori: this.kategori.nama_kategori,
      gambar_kategori: this.kategori.gambar_kategori,
      deskripsi_kategori: this.kategori.deskripsi_kategori,
    });

    this.form.updateValueAndValidity();
  }


  closeModal(data = null){
    this.modalCtrl.dismiss(data);
  }


  async submitKategori(){
    const loading = await this.loadingCtrl.create({ message: 'Loading ... ' });
    loading.present();

    let response: Observable<Kategori>;

    if(this.isEditMode) {
      response = this.kategorisService.updateKategori(
        this.kategori.id,
        this.form.value
      );
      this.presentToastUpdate();
    }else{
      response = this.kategorisService.addKategori(this.form.value);
      this.presentToastAdd();
    }


    response.pipe(take(1)).subscribe((kategori) => {
      // console.log(kategori);
      this.form.reset();
      loading.dismiss();

      if(this.isEditMode){
        this.closeModal(kategori);
      }

    })
  }


  async presentToastAdd() {
    const toast = await this.toastCtrl.create({
      message: 'Berhasil ditambahkan!',
      duration: 2000
    });
    toast.present();
  }

  async presentToastUpdate() {
    const toast = await this.toastCtrl.create({
      message: 'Berhasil diubah!',
      duration: 2000
    });
    toast.present();
  }



}
