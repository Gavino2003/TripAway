import { Component, OnInit } from '@angular/core';
import { TravelsService } from '../../api/travels.service'; // Caminho para o serviço
import { Travel } from '../../api/travels.service'; // Importa a interface Travel
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  travels: Travel[] = []; // Armazena as viagens retornadas pelo serviço
  constructor(private travelsService: TravelsService) { }

  ngOnInit() {
    this.loadTravels(); // Carrega as viagens ao inicializar a página
  }
  
  async loadTravels() {
    try {
      await this.travelsService.getTravels();
      this.travels = this.travelsService.travels; // Atualiza a lista de viagens
      console.log('Viagens carregadas:', this.travels);
    } catch (error) {
      console.error('Erro ao carregar viagens:', error);
    }
}
}
