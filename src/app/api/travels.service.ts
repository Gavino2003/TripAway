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
  
  async deleteTravel(travel : any) {
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

  async updateTravel(travel: Travel) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`,
    });
  
    try {
      await firstValueFrom(
        this.http.put(`${this.apiUrl}/travels/${travel.id}`, travel, { headers })
      );
      // Sucesso: podes adicionar um feedback aqui, como um toast ou console.log
    } catch (error: any) {
      // Tratamento de erro: podes adicionar um feedback aqui, como um toast ou console.log
      console.error('Erro ao atualizar viagem:', error.error);
    }
  }

  async getTravelLocations(travelId: string) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`,
    });
  
    try {
      const url = `${this.apiUrl}/travels/${travelId}/locations`;
      const travelLocations = await firstValueFrom(this.http.get<TravelLocations[]>(url, { headers }));
      return travelLocations;
    } catch (error: any) {
      console.error('Erro ao obter localizações da viagem:', error.error);
      throw error;
    }
  }
  
  async postTravelLocation(location: TravelLocations) {
    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.username}:${this.password}`)}`,
    });
  
    try {
      const url = `${this.apiUrl}/travels/locations`;
      await firstValueFrom(this.http.post(url, location, { headers }));
      // Sucesso: podes adicionar um feedback aqui, como um toast ou console.log
    } catch (error: any) {
      console.error('Erro ao adicionar localização para a viagem:', error.error);
      throw error;
    }
  }


}




export interface Travel {
  id: string;
  description: string;
  type : 'lazer' | 'negocios' | 'aventura';
  state: 'planeamento'|'decorrer' | 'concluida';
  map: string;
  startAt: string;
  endAt: string;
  createdBy : string;
  prop1: string;
  prop2: string;
  prop3: string;
  isFav: boolean;
}

export interface TravelLocations {
  id: string;
  description: string;
  type : 'ponto_interesse' | 'alojamento' | 'restaurante' | 'transporte' | 'outro';
  state: 'decorrer' | 'visitada' | 'planeamento';
  map: string;
  startAt: string;
  endAt: string;
  prop1: string;
  prop2: string;
  prop3: string;
  isFav: boolean;
  travelId: number;
}



export interface TravelComments {
  id: number;
  comment: string;
  travelId: number;
}

export interface TravelLocationComments {
  id: number;
  comment: string;
  travelLocationId: number;
}

