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
    
  }
  
  

async createTravel() {
  const travel: Travel = {
    id: "",
    description: 'Viagem Lisboa',
    type: 'work',
    state: 'active',
    map: 'Lisboa',
    startAt: new Date().toISOString(),
    endAt: new Date().toISOString(),
    createdBy: 'Vasco',
    prop1: 'Propriedade 1',
    prop2: 'Propriedade 2',
    prop3: 'Propriedade 3',
    isFav: true,
  };
  try {
    await this.travelsService.postTravel(travel);
    
    console.log('Viagem criada:', travel);
  } catch (error) {
    console.error('Erro ao criar viagem:', error);
  }
}

async deleteTravel() {
  const travel: Travel = {
    id: "28060408-1ea5-412b-bde6-fc0de9babd4e",
    description: 'Descrição da nova viagem',
    type: 'work',
    state: 'active',
    map: 'paris',
    startAt: new Date().toISOString(),
    endAt: new Date().toISOString(),
    createdBy: 'Vasco',
    prop1: 'Propriedade 1',
    prop2: 'Propriedade 2',
    prop3: 'Propriedade 3',
    isFav: true,
  };
  try {
    await this.travelsService.deleteTravel(travel);
   
    console.log('Viagem deletada:', travel);
  } catch (error) {
    console.error('Erro ao deletar viagem:', error);
  }

}
}