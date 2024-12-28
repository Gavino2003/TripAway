import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelsService } from '../api/travels.service'; // Caminho para o serviço
import { Travel } from '../api/travels.service'; // Importa a interface Travel
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 travels: Travel[] = [{
  id: "7ac3e40b-4d42-4f8b-83ba-df851624476a",
  description: 'Descrição da nova viagem',
  type: 'work',
  state: 'active',
  map: 'angola',
  startAt: new Date().toISOString(),
  endAt: new Date().toISOString(),
  createdBy: 'Vasco',
  prop1: 'Propriedade 1',
  prop2: 'Propriedade 2',
  prop3: 'Propriedade 3',
  isFav: true,
}]; // Armazena as viagens retornadas pelo serviço
  constructor(private router: Router,private travelsService: TravelsService) {}
  search: string = '';
  
  gotologin(){
    this.router.navigate(['/login'])
  }

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
