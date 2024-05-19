import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataSharingService } from '../../services/data-sharing.service';

@Component({
  selector: 'app-modal-capas-base',
  templateUrl: './modal-capas-base.component.html',
  styles: [
  ]
})
export class ModalCapasBaseComponent implements OnInit{

  @Input() showModal!:boolean;
  @Output() hideModal = new EventEmitter<boolean>();
  checkbox1base: boolean = true;
  checkbox2base: boolean = false;
  checkbox3base: boolean = false;
  checkbox4base: boolean = false;
  checkbox5base: boolean = false;
  checkbox6base: boolean = false;
  checkbox7base: boolean = false;
  checkbox8base: boolean = false;

  constructor(private dataService: DataSharingService){}

  ngOnInit(): void {
    const savedCheckbox1 = localStorage.getItem('checkbox1base');
    if(savedCheckbox1 !== null){
      this.checkbox1base = savedCheckbox1 === 'true';
    }
    const savedCheckbox2 = localStorage.getItem('checkbox2base');
    if(savedCheckbox2 !== null){
      this.checkbox2base = savedCheckbox2 === 'true';
    }
    const savedCheckbox3 = localStorage.getItem('checkbox3base');
    if(savedCheckbox3 !== null){
      this.checkbox3base = savedCheckbox3 === 'true';
    }
    const savedCheckbox4 = localStorage.getItem('checkbox4base');
    if(savedCheckbox4 !== null){
      this.checkbox4base = savedCheckbox4 === 'true';
    }
    const savedCheckbox5 = localStorage.getItem('checkbox5base');
    if(savedCheckbox5 !== null){
      this.checkbox5base = savedCheckbox5 === 'true';
    }
    const savedCheckbox6 = localStorage.getItem('checkbox6base');
    if(savedCheckbox6 !== null){
      this.checkbox6base = savedCheckbox6 === 'true';
    }
    const savedCheckbox7 = localStorage.getItem('checkbox7base');
    if(savedCheckbox7 !== null){
      this.checkbox7base = savedCheckbox7 === 'true';
    }
    const savedCheckbox8 = localStorage.getItem('checkbox8base');
    if(savedCheckbox8 !== null){
      this.checkbox8base = savedCheckbox8 === 'true';
    }

  }

  ngOnDestroy() {
    localStorage.setItem('checkbox1base', this.checkbox1base.toString());
    localStorage.setItem('checkbox2base', this.checkbox2base.toString());
    localStorage.setItem('checkbox3base', this.checkbox3base.toString());
    localStorage.setItem('checkbox4base', this.checkbox4base.toString());
    localStorage.setItem('checkbox5base', this.checkbox5base.toString());
    localStorage.setItem('checkbox6base', this.checkbox6base.toString());
    localStorage.setItem('checkbox7base', this.checkbox7base.toString());
    localStorage.setItem('checkbox8base', this.checkbox8base.toString());
  }

  closeModal(){
    this.hideModal.emit(false);
  }

  mostrarInfo(){
    console.log(this.checkbox1base)
  }

  sendDataCheckbox1base(){
    this.dataService.updateSharedCheckbox1base(this.checkbox1base);
  }

  sendDataCheckbox2base(){
    this.dataService.updateSharedCheckbox2base(this.checkbox2base);
  }

  sendDataCheckbox3base(){
    this.dataService.updateSharedCheckbox3base(this.checkbox3base);
  }

  sendDataCheckbox4base(){
    this.dataService.updateSharedCheckbox4base(this.checkbox4base);
  }

  sendDataCheckbox5base(){
    this.dataService.updateSharedCheckbox5base(this.checkbox5base);
  }

  sendDataCheckbox6base(){
    this.dataService.updateSharedCheckbox6base(this.checkbox6base);
  }

  sendDataCheckbox7base(){
    this.dataService.updateSharedCheckbox7base(this.checkbox7base);
  }

  sendDataCheckbox8base(){
    this.dataService.updateSharedCheckbox8base(this.checkbox8base);
  }
}
