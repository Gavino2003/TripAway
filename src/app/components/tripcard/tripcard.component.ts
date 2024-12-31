import { Component, OnInit, Input } from '@angular/core';
import {ModalController, ToastController } from '@ionic/angular';
import { ModalviagensComponent } from '../modalviagens/modalviagens.component';
@Component({
  selector: 'app-tripcard',
  templateUrl: './tripcard.component.html',
  styleUrls: ['./tripcard.component.scss'],
})
export class TripcardComponent  implements OnInit {
  @Input() travel: any; 
  
  constructor(private modalController: ModalController) { }
  local: string = '';
  creatorname: string = '';
  description: string = '';
  ngOnInit() {
    this.description = this.travel.description;
    this.local = this.travel.local;
    this.creatorname = this.travel.creatorname;
  }
  async openModal() {
    const modal = await this.modalController.create({
      component: ModalviagensComponent,
      componentProps: { travel : this.travel}, // Passa o dado 'local' ao modal
      backdropDismiss: false, // Impede o fechamento clicando fora do modal
    });
    await modal.present();
  }

}
