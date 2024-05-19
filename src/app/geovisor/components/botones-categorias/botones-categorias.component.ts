import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-botones-categorias',
  templateUrl: './botones-categorias.component.html',
  styles: [
  ]
})
export class BotonesCategoriasComponent implements OnInit{

  @Input() showButtons!: boolean;
  @Output() hideButton = new EventEmitter<boolean>();
  
  showModal: boolean = false;
  modalLeyenda?: boolean;
  selectedLayer!: string;


  constructor(private modalService: ModalService){}

  ngOnInit(): void {
    this.closeModalLeyenda();
  }

  openModal(selectedLayer: string){
    this.changeValueShowButtons();
    this.showModal = true;
    this.selectedLayer = selectedLayer;
    this.modalService.updateStatusModalCapas(this.showModal);
  }

  closeModal(hideModal: boolean){
    this.showModal = hideModal;
  }

  closeModalLeyenda(){
    this.modalService.getStatusModalLeyenda().subscribe(data => {
      this.modalLeyenda = data;

      if(this.modalLeyenda == true){
        this.showModal = false;
      }
    })
  }

  changeValueShowButtons(){
    this.hideButton.emit(false);
  }
}
