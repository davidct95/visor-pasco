import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSharingEconomiaService } from '../../services/data-sharing-economia.service';

@Component({
  selector: 'app-modal-capas-economia',
  templateUrl: './modal-capas-economia.component.html',
  styles: [
  ]
})
export class ModalCapasEconomiaComponent implements OnInit{

  @Input() showModal!:boolean;
  @Output() hideModal = new EventEmitter<boolean>();

  checkbox1Economia: boolean = false;
  checkbox2Economia: boolean = false;
  checkbox3Economia: boolean = false;
  checkbox4Economia: boolean = false;

  botonDesactivado: boolean = false;


  constructor(private dataService: DataSharingEconomiaService){}

  ngOnInit(): void {
    this.getDataCheckBoxDesactivado();
    this.getDataCheckbox2Economia();
    this.getDataCheckbox3Economia();
    this.getDataCheckbox4Economia();

    const savedCheckbox1 = localStorage.getItem('checkbox1Economia');
    if(savedCheckbox1 !== null){
      this.checkbox1Economia = savedCheckbox1 === 'true';
    }
    const savedCheckbox2 = localStorage.getItem('checkbox2Economia');
    if(savedCheckbox2 !== null){
      this.checkbox2Economia = savedCheckbox2 === 'true';
    }
    const savedCheckbox3 = localStorage.getItem('checkbox3Economia');
    if(savedCheckbox3 !== null){
      this.checkbox3Economia = savedCheckbox3 === 'true';
    }
    const savedCheckbox4 = localStorage.getItem('checkbox4Economia');
    if(savedCheckbox4 !== null){
      this.checkbox4Economia = savedCheckbox4 === 'true';
    }
  }

  ngOnDestroy(){
    localStorage.setItem('checkbox1Economia', this.checkbox1Economia.toString());
    localStorage.setItem('checkbox2Economia', this.checkbox2Economia.toString());
    localStorage.setItem('checkbox3Economia', this.checkbox3Economia.toString());
    localStorage.setItem('checkbox4Economia', this.checkbox4Economia.toString());
  }

  closeModal(){
    this.hideModal.emit(false);
  }

  getDataCheckBoxDesactivado(){
    this.dataService.getSharedBtnDesc().subscribe(data => {
      this.botonDesactivado = data;
    })
  }

  getDataCheckbox2Economia() {
    this.dataService.getSharedCheckbox2econ().subscribe(data => {
      this.checkbox2Economia = data;
    });
  }

  getDataCheckbox3Economia() {
    this.dataService.getSharedCheckbox3econ().subscribe(data => {
      this.checkbox3Economia = data;
    });
  }

  getDataCheckbox4Economia() {
    this.dataService.getSharedCheckbox4econ().subscribe(data => {
      this.checkbox4Economia = data;
    });
  }

  sendDataCheckbox1Economia(){
    this.dataService.updateSharedCheckbox1econ(this.checkbox1Economia);
  }

  sendDataCheckbox2Economia(){
    this.dataService.updateSharedCheckbox2econ(this.checkbox2Economia);
  }

  sendDataCheckbox3Economia(){
    this.dataService.updateSharedCheckbox3econ(this.checkbox3Economia);
  }

  sendDataCheckbox4Economia(){
    this.dataService.updateSharedCheckbox4econ(this.checkbox4Economia);
  }

}
