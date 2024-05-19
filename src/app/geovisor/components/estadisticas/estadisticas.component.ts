import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styles: [
  ]
})
export class EstadisticasComponent {

  showModalEstadisticas: boolean = false;

  openModal(){
    this.showModalEstadisticas = !this.showModalEstadisticas;
  }

}
