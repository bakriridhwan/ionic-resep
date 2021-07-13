import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-localstorage',
  templateUrl: './localstorage.page.html',
  styleUrls: ['./localstorage.page.scss'],
})
export class LocalstoragePage implements OnInit {

  public fav;

  constructor() {
    this.fav = JSON.parse(localStorage.getItem('fav'));
    console.log(this.fav);


  }

  localRefresh(){
      this.fav = JSON.parse(localStorage.getItem('fav'));
    console.log(this.fav);
    }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.localRefresh();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

}
