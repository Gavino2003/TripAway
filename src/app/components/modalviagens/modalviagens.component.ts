import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Travel, TravelsService } from 'src/app/api/travels.service';

@Component({
  selector: 'app-modalviagens',
  templateUrl: './modalviagens.component.html',
  styleUrls: ['./modalviagens.component.scss'],
})
export class ModalviagensComponent implements OnInit {
  
  @Input() travel: any;  // Input property to receive data
  @Output() modalClosed: EventEmitter<any> = new EventEmitter();  // Output property to emit events
  paginaAtual: number = 1;  // Controla qual seção está visível
  showDateInicio: boolean = false;
  showDateFim: boolean = false;
  modalController: any;
  teste: string = 'teste';
  constructor(private modalCtrl: ModalController,private travelsService: TravelsService) { }

  ngOnInit() {
    
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
