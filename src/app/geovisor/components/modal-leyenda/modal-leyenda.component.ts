import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal-leyenda',
  templateUrl: './modal-leyenda.component.html',
  styles: [
  ]
})
export class ModalLeyendaComponent {

  @Input() showModal?: boolean;

}
