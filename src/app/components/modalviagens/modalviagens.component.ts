import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalviagens',
  templateUrl: './modalviagens.component.html',
  styleUrls: ['./modalviagens.component.scss'],
})
export class ModalviagensComponent  implements OnInit {

  paginaAtual: number = 1;  // Controla qual seção está visível
  showDateInicio: boolean = false;
  showDateFim: boolean = false;

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {}

  async closeModal() {
    this.modalCtrl.dismiss();
  }

  avancar() {
    this.paginaAtual = 2;  // Muda para a segunda seção
  }

  toggleDateInicio() {
    this.showDateInicio = !this.showDateInicio;
  }

  toggleDateFim() {
    this.showDateFim = !this.showDateFim;
  }

  finalizar() {
    // Fechar a modal ao finalizar
    this.closeModal();
  }
}
