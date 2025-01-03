import { Component, OnInit } from '@angular/core';
import { TravelsService } from '../../api/travels.service'; // Caminho para o serviço
import { Travel } from '../../api/travels.service'; // Importa a interface Travel
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  travels: Travel[] = [];
  constructor(private travelsService: TravelsService,) { }

  ngOnInit() {
    this.loadTravels(); 
  }

  async loadTravels() {
    try {
      await this.travelsService.getTravels();
      
      this.travels = this.travelsService.travels;
      console.log('Viagens carregadas:', this.travels);
    } catch (error) {
      console.error('Erro ao carregar viagens:', error);
    }
}

async createTravel() {
  const travel: Travel = {
    id: "",
    description: 'Viagem Lisboa',
    type: 'lazer',
    state: 'planeamento',
    map: 'Lisboa',
    
    startAt: new Date().toISOString(),
    endAt: new Date().toISOString(),
    createdBy: '',
    prop1: 'VascoGavino',
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


}