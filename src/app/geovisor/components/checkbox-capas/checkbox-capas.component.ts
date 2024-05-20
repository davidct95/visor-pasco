import { Component, Input } from '@angular/core';
import { GeovisorService } from '../../services/geovisor.service';

@Component({
  selector: 'app-checkbox-capas',
  templateUrl: './checkbox-capas.component.html',
  styles: [
  ]
})
export class CheckboxCapasComponent {

  @Input() textoBoton: string = '';

  constructor(private geovisorService: GeovisorService){}

  onCheckboxChange(capa: string) {
    this.geovisorService.toggleCapa(capa);
  }

}
