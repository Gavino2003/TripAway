import { Component, OnInit } from '@angular/core';
import {ModalController, ToastController } from '@ionic/angular';
import { ModalviagensComponent } from '../modalviagens/modalviagens.component';

@Component({
  selector: 'app-navigationbtn',
  templateUrl: './navigationbtn.component.html',
  styleUrls: ['./navigationbtn.component.scss'],
})
export class NavigationbtnComponent  implements OnInit {
  isDarkMode: boolean = false;
  constructor(private modalController: ModalController) { 
    this.isDarkMode = document.body.classList.contains('dark');
  }


  async openModal() {
    const modal = await this.modalController.create({
      component: ModalviagensComponent,
      backdropDismiss: false, // Impede o fechamento clicando fora do modal
    });
    await modal.present();
  }
  
  ngOnInit() {}

  // Função que alterna entre os modos claro e escuro
  toggleTheme() {
    if (this.isDarkMode) {
      // Se estiver no modo escuro, altera para o modo claro
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    } else {
      // Se estiver no modo claro, altera para o modo escuro
      document.body.classList.remove('light');
      document.body.classList.add('dark');
    }
    
    // Alterna o valor da variável isDarkMode
    this.isDarkMode = !this.isDarkMode;
  }
}
