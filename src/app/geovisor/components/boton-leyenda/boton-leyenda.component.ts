import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-boton-leyenda',
  templateUrl: './boton-leyenda.component.html',
  styles: [
  ]
})
export class BotonLeyendaComponent implements OnInit {

  showModalLeyenda: boolean = false;
  modalCapas?: boolean;

  constructor(private modalService: ModalService){}

  ngOnInit(): void {

    this.closeModalCapas();
    this.statusModal();
    
  }

  cambiarValorShowModal(){
    this.showModalLeyenda = !this.showModalLeyenda;
    this.modalService.updateStatusModalLeyenda(this.showModalLeyenda);
  }

  closeModalCapas(){
    this.modalService.getStatusModalCapas().subscribe(data => {
      this.modalCapas = data;
      if(this.modalCapas == true){
        this.showModalLeyenda = false;
      }
    })
  }

  statusModal(){
    this.modalService.getStatusModalLeyenda().subscribe(data => {
      this.showModalLeyenda = data;
    })
  }
}
