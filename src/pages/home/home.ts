import { RestApiProvider } from './../../providers/rest-api/rest-api';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  data= [];
  users = [];
  errorMessage: string;
  page = 1;
  perPage = 10;
  totalPage = 0;
  i = 0;
  totalData: any;

  constructor(public navCtrl: NavController, public restApi: RestApiProvider) {
    this.getUsers();
  }

  getUsers() {
    this.restApi.getUsers()
      .subscribe(
      res => {
        this.totalData = res;
        for(let c=0; c< 10; c++)
        this.data.push(this.totalData[c]);
        console.log(typeof this.data)
      },
      error => this.errorMessage = <any>error);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.restApi.getUsers()
        .subscribe(
        res => {
          this.totalData = res;

          if (this.perPage < this.totalData.length) {
            for (this.i = this.perPage; this.i < this.perPage + 10; this.i++) {
              this.users.push(this.totalData[this.i]);
            }
            this.perPage = this.i;
            console.log(this.perPage);
          }
        },
        error => this.errorMessage = <any>error);
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);

  }

}

//   doInfinite(infiniteScroll): Promise<any> {
//     console.log('Begin async operation');

//     return new Promise((resolve) => {
//       setTimeout(() => {
//         for (var i = 0; i < 30; i++) {
//           this.data.push(this.data.length);
//         }
//         console.log(this.data)

//         console.log('Async operation has ended');
//         resolve();
//       }, 500);
//     })
//   }
// }
