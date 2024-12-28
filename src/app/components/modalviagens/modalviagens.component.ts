import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalviagens',
  templateUrl: './modalviagens.component.html',
  styleUrls: ['./modalviagens.component.scss'],
})
export class ModalviagensComponent  implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {}

  async dismissModal(message : any = null) {
    this.modalCtrl.dismiss({message: message})
  }

  async closeModal() {
    this.modalCtrl.dismiss();
  }
}
