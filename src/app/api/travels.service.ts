import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TravelsService {

  constructor(private http: HttpClient,) { }

  apiUrl : string = "https://mobile-api-one.vercel.app/api";
  username : string = "vascogavino@ipvc.pt";
  password : string = "X4z!2I7V";
  travels: any[] = []
  
  async getTravels() {
    //const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`,
    });

    try {
      this.travels = await firstValueFrom(this.http.get<any[]>(`${this.apiUrl}/travels`, { headers }));
      //loading.dismiss();
      if (this.travels.length == 0) {
        //await this.noteToast('nonotes', 'bottom');
      }
      else {
        //await this.noteToast(availablenotes, 'bottom');
      }

    } catch (error: any) {
      //loading.dismiss();
      //await this.noteToast('erro', 'bottom', error.error);
    }
  }

  async postTravel(travel: Travel) {
    //const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`,
    });

    try {
      await firstValueFrom(this.http.post(`${this.apiUrl}/travels`, travel, { headers }));
      //loading.dismiss();
      //await this.noteToast('notecreated', 'bottom');
    } catch (error: any) {
      //loading.dismiss();
      //await this.noteToast('erro', 'bottom', error.error);
    }
  }
  
  async deleteTravel(travel: Travel) {
    //const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`,
    });

    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/travels/${travel.id}`, { headers }));
      //loading.dismiss();
      //await this.noteToast('notedeleted', 'bottom');
    } catch (error: any) {
      //loading.dismiss();
      //await this.noteToast('erro', 'bottom', error.error);
    }
  }

}

export interface Travel {
  id: string;
  description: string;
  type : string;
  state: string;
  map: string;
  startAt: string;
  endAt: string;
  createdBy : string;
  //createdAt: string;
  //updateBy: string;
  //updateAt: string;
  //travelid: string;
  
  //startDate: string;
  //endDate: string;
  //price: number;
  prop1: string;//username
  prop2: string;//password
  prop3: string;//imagem
  isFav: boolean;
}
export interface TravelLocations {
  id: string;
  description: string;
  type : string;
  state: string;
  //map: string;
  startAt: string;
  endAt: string;
  createdBy : string;
  //createdAt: string;
  //updateBy: string;
  //updateAt: string;
  //travelid: string;
  
  //startDate: string;
  //endDate: string;
  //price: number;
  prop1: string;
  prop2: string;
  prop3: string;
  isFav: boolean;
}


