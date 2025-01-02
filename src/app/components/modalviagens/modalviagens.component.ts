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
  isLoading: boolean = false;  // Controle de carregamento
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
    this.loadTravelData();
  }

  loadTravelData() {
    this.isLoading = true;
  
    // Se não existir nenhuma localização, inicializa como vazio
    if (!this.travel || !this.travel.locations || this.travel.locations.length === 0) {
      console.log('Nenhuma localização encontrada na viagem.');
      this.isLoading = false;
      return;
    }
  
    // Atribuir a descrição ao autocomplete.input
    this.autocomplete.input = this.travel.locations[0]?.description || '';
  
    // Preencher a primeira posição do array `paragens` com a localização inicial
    const firstLocation = this.travel.locations[0];
    if (firstLocation) {
      this.paragens[0] = {
        location: firstLocation.description,
        startAt: firstLocation.startAt || '',
        endAt: firstLocation.endAt || '',
      };
    }
  
    // Preencher as demais paragens com os dados a partir da posição 1
    this.paragens = [
      this.paragens[0], // Mantém a primeira paragem
      ...this.travel.locations.slice(1), // Adiciona as demais paragens
    ];
  
    console.log('Dados da viagem carregados:', this.travel);
  
    this.isLoading = false;
  }

 

  toggleDateInicio() {
    this.showDateInicio = !this.showDateInicio;
  }

  toggleDateFim() {
    this.showDateFim = !this.showDateFim;
  }

  async finalizar() {
    if (this.paragens.length === 0) {
      console.error('Nenhuma localização foi adicionada.');
      return;
    }
  
    try {
      if (!this.travel || !this.travel.id) {
        console.error('ID da viagem não encontrado');
        return;
      }
  
      for (let i = 0; i < this.paragens.length; i++) {
        const stop = this.paragens[i];
  
        if (!stop.location) {
          console.error(`Localização na posição ${i} não preenchida`);
          continue;
        }
  
        const location = {
          id: '', // O ID será gerado pelo servidor
          description: stop.location,
          startAt: stop.startAt,
          endAt: stop.endAt,
          type: 'alojamento' as 'alojamento' | 'ponto_interesse' | 'restaurante' | 'transporte' | 'outro',
          state: 'planeamento' as 'planeamento' | 'decorrer' | 'visitada',
          map: '', // O mapa será gerado pelo servidor
          prop1: '',
          prop2: '',
          prop3: '',
          isFav: false,
          travelId: this.travel.id,
        };
  
        try {
          console.log('Tentando criar localização:', location);
          const response = await this.travelsService.postTravelLocation(location);
          console.log('Localização criada com sucesso:', response);
        } catch (error: any) {
          console.error('Erro ao criar localização específica:', {
            error: error,
            errorMessage: error.message,
            location: location,
            status: error.status,
            response: error.error,
          });
        }
      }
  
      this.closeModal();
    } catch (error: any) {
      console.error('Erro geral ao criar localizações:', {
        error: error,
        message: error.message,
        status: error.status,
      });
    }
  }
}