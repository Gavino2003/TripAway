import { Component, OnInit, Input, Output, EventEmitter, NgZone } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Travel, TravelsService } from 'src/app/api/travels.service';

declare var google: any; // Declaração para utilizar a API do Google

@Component({
  selector: 'app-modalviagens',
  templateUrl: './modalviagens.component.html',
  styleUrls: ['./modalviagens.component.scss'],
})
export class ModalviagensComponent implements OnInit {
  @Input() mode: 'create' | 'view' = 'create'; // Define se é criação ou visualização
  @Input() travel: any;  // Input property to receive data
  @Output() modalClosed: EventEmitter<any> = new EventEmitter();  // Output property to emit events
  paginaAtual: number = 1;  // Controla qual seção está visível
  showDateInicio: boolean = false;
  showDateFim: boolean = false;
  modalController: any;
  teste: string = 'teste';
  
  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[] = [];  // Lista de resultados de autocompletar
  location: any;
  placeid: any;
  latitude: number = 0;
  longitude: number = 0;
  showMap: boolean = false;  // Adicionando controle para exibir o mapa
   // Lista de paragens
   paragens: any[] = [];
  constructor(private modalCtrl: ModalController, public zone: NgZone, private travelsService: TravelsService) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
  }
  ngOnInit() {
    // Se estamos a criar uma nova viagem, inicializa o objeto vazio
    if (this.mode === 'create') {
      this.travel = {
        startAt: null,
        endAt: null,
        prop1: 'VascoGavino',
      };
      
    }
    
  }
  addStop() {
    const newStop = {
      location: '',
      startAt: '',
      endAt: '',
    };

    this.paragens.push(newStop);
  }

  removeStop(index: number) {
    this.paragens.splice(index, 1);
  }
  // Atualiza os resultados da busca de locais
  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
  
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input }, (predictions, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
        this.autocompleteItems = [];
        this.zone.run(() => {
          predictions.forEach((prediction) => {
            this.autocompleteItems.push(prediction);
          });
        });
      } else {
        console.error('Erro ao buscar previsões de locais', status);
      }
    });
  }

  selectSearchResult(item: any) {
  console.log(item);
  this.location = item;
  this.placeid = this.location.place_id;
  console.log('placeid: ' + this.placeid);
  // Definir o nome da localização no input
  this.autocomplete.input = item.description;

  // Limpar as sugestões
  this.autocompleteItems = [];
  this.showMap = true;  // Exibir o mapa
  // Obter detalhes da localização, incluindo a latitude e longitude
  const placesService = new google.maps.places.PlacesService(document.createElement('div'));
  placesService.getDetails({ placeId: this.placeid }, (place: any, status: any) => {
    if (status === google.maps.places.PlacesServiceStatus.OK && place.geometry) {
      // Obter a latitude e longitude
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      console.log('Latitude: ' + lat + ', Longitude: ' + lng);

      // Armazenar as coordenadas para o mapa
      this.latitude = lat;
      this.longitude = lng;

      // Inicializar o mapa
      this.loadMap(lat, lng);
      
    } else {
      console.error('Erro ao buscar detalhes da localização', status);
    }
  });
}

// Função para inicializar o mapa
loadMap(lat: number, lng: number) {
  const mapOptions = {
    center: new google.maps.LatLng(lat, lng),
    zoom: 14, // Define o zoom do mapa
  };
  
  const map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);
  
  // Adicionar um marcador no mapa
  new google.maps.Marker({
    position: new google.maps.LatLng(lat, lng),
    map: map,
    title: 'Localização Selecionada',
  });
}


  saveTravel() {
    if (this.mode === 'create') {
      this.createTravel();
    } else if (this.mode === 'view') {
      this.updateTravel();
    }
  }
  async createTravel() {
    console.log('Criar nova viagem:', this.travel);

    try {
      await this.travelsService.postTravel(this.travel);
      
      console.log('Viagem criada:', this.travel);
    } catch (error) {
      console.error('Erro ao criar viagem:', error);
    }
  }

  async updateTravel() {
    console.log('Atualizar viagem existente:', this.travel);
    
    try {
      const response = await this.travelsService.updateTravel(this.travel);
      console.log('Viagem atualizada com sucesso:', response);
      // Aqui podes fechar o modal
    } catch (error) {
      console.error('Erro ao atualizar viagem:', error);
    }
  }

 async deleteTravel(travel: any) {
   
   try {
     await this.travelsService.deleteTravel(travel);
    
     console.log('Viagem deletada:', travel);
     window.location.reload();
     
     this.closeModal();
     
   } catch (error) {
     console.error('Erro ao deletar viagem:', error);
   }
   
 }



  async closeModal() {
    this.modalClosed.emit({ closed: true });  // Emit event when modal is closed
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
